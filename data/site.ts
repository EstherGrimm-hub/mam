export type SocialPlatform = "facebook" | "instagram" | "tiktok" | "zalo" | "shopee";

export const socialLinks: { platform: SocialPlatform; label: string; handle: string; cta: string; href: string | null }[] = [
  { platform: "facebook", label: "Facebook", handle: "mầm Natural Hair Care", cta: "Tin mới & ưu đãi sớm", href: "https://www.facebook.com/share/p/1RENgLosnS/" },
  // TODO: thay bằng link hồ sơ Instagram "Mầm" (vd. https://www.instagram.com/<ten-tai-khoan>/). Tạm dùng link tìm kiếm.
  { platform: "instagram", label: "Instagram", handle: "Mầm", cta: "Góc ảnh thảo mộc", href: "https://www.instagram.com/explore/search/keyword/?q=M%E1%BA%A7m" },
  // TODO: thay bằng link hồ sơ TikTok "Mầm Sprout" (vd. https://www.tiktok.com/@<ten-tai-khoan>). Tạm dùng link tìm kiếm.
  { platform: "tiktok", label: "TikTok", handle: "Mầm Sprout", cta: "Mẹo chăm tóc mỗi ngày", href: "https://www.tiktok.com/search/user?q=M%E1%BA%A7m%20Sprout" },
  // TODO: thay bằng link Zalo OA chính thức của mầm.
  { platform: "zalo", label: "Zalo", handle: "mầm", cta: "Nhắn tư vấn", href: null },
  { platform: "shopee", label: "Shopee", handle: "bennphuc", cta: "Gian hàng chính hãng", href: "https://shopee.vn/bennphuc" },
];
