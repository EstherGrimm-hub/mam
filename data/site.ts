export type SocialPlatform = "facebook" | "instagram" | "tiktok" | "zalo" | "shopee";

export const socialLinks: { platform: SocialPlatform; label: string; href: string | null }[] = [
  // TODO: thay bằng link Facebook chính thức của mầm.
  { platform: "facebook", label: "Facebook", href: null },
  // TODO: thay bằng link Instagram chính thức của mầm.
  { platform: "instagram", label: "Instagram", href: null },
  // TODO: thay bằng link TikTok chính thức của mầm.
  { platform: "tiktok", label: "TikTok", href: null },
  // TODO: thay bằng link Zalo OA chính thức của mầm.
  { platform: "zalo", label: "Zalo", href: null },
  // TODO: thay bằng link gian hàng Shopee chính thức của mầm.
  { platform: "shopee", label: "Shopee", href: null },
];