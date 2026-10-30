import type { MetadataRoute } from "next";
import { campaigns } from "@/data/campaigns";
import { products } from "@/data/products";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://mam.vn").replace(/\/$/, "");
  const pages = [
    "",
    "/san-pham",
    "/ve-mam",
    "/lien-he",
    "/chinh-sach-doi-tra",
    "/chinh-sach-van-chuyen",
    "/chinh-sach-bao-mat",
  ];
  return [
    ...pages.map((path) => ({ url: `${baseUrl}${path}`, changeFrequency: "monthly" as const, priority: path ? 0.7 : 1 })),
    ...campaigns.map((campaign) => ({ url: `${baseUrl}/chien-dich/${campaign.slug}`, changeFrequency: "weekly" as const, priority: 0.9 })),
    ...products.map((product) => ({ url: `${baseUrl}/san-pham/${product.slug}`, changeFrequency: "weekly" as const, priority: 0.8 })),
  ];
}