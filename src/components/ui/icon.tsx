import { SiFacebook, SiGithub, SiHatenabookmark, SiInstagram, SiMedium, SiX } from "@icons-pack/react-simple-icons";
import { type LucideIcon } from "lucide-react";

const PrimitiveIcon = {
  facebook: SiFacebook,
  instagram: SiInstagram,
  twitter: SiX,
  github: SiGithub,
  medium: SiMedium,
  hatenaBookmark: SiHatenabookmark,
};

type Icon = keyof typeof PrimitiveIcon;

type Size = "xs" | "sm" | "md" | "lg";

const iconSizes: Record<Size, number | undefined> = {
  lg: 28,
  md: 24,
  sm: 20,
  xs: 16,
};

export { PrimitiveIcon as Icons, iconSizes };
export type { LucideIcon, Size, Icon };
