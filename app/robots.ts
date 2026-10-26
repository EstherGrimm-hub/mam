import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://mam.vn").replace(/\/$/, "");
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/", "/gio-hang", "/thanh-toan", "/tra-cuu-don-hang"],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}