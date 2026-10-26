import type { Metadata } from "next";
import { Be_Vietnam_Pro, Fraunces } from "next/font/google";
import "./globals.css";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { CartProvider } from "@/components/CartProvider";

const vietnamPro = Be_Vietnam_Pro({
  variable: "--font-vietnam",
  subsets: ["latin", "vietnamese"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin", "vietnamese"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "https://mam.vn"),
  title: {
    default: "mầm | Chăm sóc tóc từ thiên nhiên",
    template: "%s | mầm",
  },
  description:
    "Natural Hair Care - Từ thiên nhiên, nuôi dưỡng vẻ đẹp Việt. Khám phá chăm sóc tóc thảo mộc dịu lành từ mầm.",
  openGraph: {
    type: "website",
    locale: "vi_VN",
    siteName: "mầm Natural Hair Care",
    title: "mầm | Từ thiên nhiên, nuôi dưỡng vẻ đẹp Việt",
    description:
      "Chăm sóc tóc thảo mộc dịu lành, nâng niu mái tóc Việt mỗi ngày.",
    images: ["/images/dau-goi-thao-moc.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "mầm | Chăm sóc tóc từ thiên nhiên",
    description: "Từ thiên nhiên, nuôi dưỡng vẻ đẹp Việt.",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="vi" className={`${vietnamPro.variable} ${fraunces.variable}`}>
      <body className="min-h-screen antialiased">
        <CartProvider>
          <SiteHeader />
          <main>{children}</main>
          <SiteFooter />
        </CartProvider>
      </body>
    </html>
  );
}
