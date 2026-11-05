#!/usr/bin/env bash
set -euo pipefail

: "${CLOUDFLARE_API_TOKEN:?}"
: "${CLOUDFLARE_ACCOUNT_ID:?}"

readonly API="https://api.cloudflare.com/client/v4"
readonly WARN_DAYS=30

fail() {
  echo "::error::$1"
  exit 1
}

# トークンを引数に載せないため、ヘッダを curl の設定として標準入力から渡す。
request() {
  printf 'header = "Authorization: Bearer %s"\n' "$CLOUDFLARE_API_TOKEN" |
    curl -sS -K - "$@"
}

# user token 用の endpoint。account-owned token に替えたら /accounts/{id}/tokens/verify にする。
verify=$(request "$API/user/tokens/verify") || fail "Cloudflare token verify request failed"
jq -e '.success == true' >/dev/null 2>&1 <<<"$verify" || fail "Cloudflare token verify was not successful"

status=$(jq -r '.result.status // empty' <<<"$verify" | tr -cd '[:lower:]')
[ "$status" = "active" ] || fail "Cloudflare API token is not active (status=${status:-unknown})"

expires_on=$(jq -r '.result.expires_on // empty' <<<"$verify")
if [ -n "$expires_on" ]; then
  [[ "$expires_on" =~ ^[0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}:[0-9]{2}Z$ ]] ||
    fail "Unexpected expires_on format in token verify response"
  jq -ne --arg e "$expires_on" '($e | fromdateiso8601 | todate) == $e' >/dev/null 2>&1 ||
    fail "Invalid calendar date in expires_on"
  secs_left=$(jq -nr --arg e "$expires_on" '($e | fromdateiso8601) - now | floor') ||
    fail "Cannot parse expires_on"
  [ "$secs_left" -ge 0 ] || fail "Cloudflare API token has expired ($expires_on)"
  days_left=$((secs_left / 86400))
  [ "$days_left" -ge "$WARN_DAYS" ] ||
    echo "::warning::Cloudflare API token expires in $days_left days ($expires_on)"
fi

# 書込み権限は書き込まずには確かめられないため、読み取りで scope の有無だけを確認する。
workers=$(request "$API/accounts/$CLOUDFLARE_ACCOUNT_ID/workers/scripts?per_page=1") ||
  fail "Cloudflare Workers list request failed"
jq -e '.success == true' >/dev/null 2>&1 <<<"$workers" || fail "Cloudflare API token cannot list Workers scripts"

echo "Cloudflare API token is active (expires_on=${expires_on:-none}, workers=ok)"
