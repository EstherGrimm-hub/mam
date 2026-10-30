export type Campaign = {
  slug: string;
  name: string;
  period: string;
  startsAt: string;
  endsAt: string;
  headline: { lead: string; accent: string };
  description: string;
  banner: { image: string; alt: string };
  primaryCta: { href: string; label: string };
  perks: { title: string; copy: string }[];
  offersTitle: string;
  offers: { image: string; alt: string; href: string }[];
  rescue?: {
    eyebrow: string;
    title: { lead: string; accent: string };
    copy: string;
    banner: { image: string; alt: string };
    cta: { href: string; label: string };
    steps: { name: string; note: string; slug: string }[];
  };
};

export const campaigns: Campaign[] = [
  {
    slug: "sieu-sale-12-12",
    name: "Siêu Sale 12.12",
    period: "06–19/12",
    startsAt: "2026-12-06T00:00:00+07:00",
    endsAt: "2026-12-19T23:59:59+07:00",
    headline: { lead: "Đủ bộ 5 món,", accent: "giảm ngay 14%." },
    description: "Mùa sale cuối năm của mầm: chọn món chăm tóc yêu thích, hoặc gom cả bộ để tiết kiệm hơn và sẵn sàng đón Tết.",
    banner: {
      image: "/images/banner/banner-uu-dai.png",
      alt: "Siêu Sale 12.12 mầm – Cứu tóc 7 ngày, combo đủ bộ 5 món giảm 14%, voucher 12.12, freeship từ 249K",
    },
    primaryCta: { href: "/san-pham/combo-du-bo-5-mon", label: "Săn combo" },
    perks: [
      { title: "Giảm 14%", copy: "Combo đủ bộ 5 món chăm tóc thảo mộc." },
      { title: "Voucher 12.12", copy: "Ưu đãi riêng trong mùa sale cuối năm." },
      { title: "Freeship từ 249K", copy: "Miễn phí vận chuyển cho đơn từ 249.000đ." },
    ],
    offersTitle: "Mầm ưu đãi 12.12",
    offers: [
      { image: "/images/products/dau-goi-uu-dai.png", alt: "Poster ưu đãi 12.12 dầu gội thảo mộc mầm", href: "/san-pham/dau-goi-thao-moc" },
      { image: "/images/products/dau-xa-uu-dai.png", alt: "Poster ưu đãi 12.12 dầu xả mầm", href: "/san-pham/dau-xa-phuc-hoi-mem-muot" },
      { image: "/images/products/kem-u-toc-uu-dai.png", alt: "Poster ưu đãi 12.12 kem ủ tóc mầm", href: "/san-pham/kem-u-toc" },
      { image: "/images/products/serum-uu-dai.png", alt: "Poster ưu đãi 12.12 serum tóc mầm", href: "/san-pham/serum-toc" },
      { image: "/images/products/xit-duong-uu-dai.png", alt: "Poster ưu đãi 12.12 xịt dưỡng tóc mầm", href: "/san-pham/xit-duong-toc" },
      { image: "/images/products/combo-2-uu-dai.png", alt: "Poster ưu đãi 12.12 combo gội và xả tặng xịt dưỡng", href: "/san-pham/combo-goi-xa-tang-xit-duong" },
      { image: "/images/products/combo-5-uu-dai.png", alt: "Poster ưu đãi 12.12 combo đủ bộ 5 món", href: "/san-pham/combo-du-bo-5-mon" },
    ],
    rescue: {
      eyebrow: "Chiến dịch · Cứu tóc 7 ngày",
      title: { lead: "Chăm tóc sớm,", accent: "tự tin đón Tết." },
      copy: "Một tuần nâng niu trọn vẹn với đủ 5 bước thảo mộc — để mái tóc sẵn sàng rạng rỡ cho những ngày sum vầy.",
      banner: {
        image: "/images/banner/banner-chien-dich.png",
        alt: "Chiến dịch Cứu tóc 7 ngày của mầm: chăm tóc sớm, tự tin đón Tết, combo đủ bộ 5 món giảm 14% từ 06 đến 19/12/2026",
      },
      cta: { href: "/san-pham/combo-du-bo-5-mon", label: "Nhận combo đủ bộ" },
      steps: [
        { name: "Gội", note: "Dầu gội thảo mộc", slug: "dau-goi-thao-moc" },
        { name: "Xả", note: "Dầu xả mềm mượt", slug: "dau-xa-phuc-hoi-mem-muot" },
        { name: "Ủ", note: "Kem ủ tóc", slug: "kem-u-toc" },
        { name: "Dưỡng", note: "Serum tóc", slug: "serum-toc" },
        { name: "Giữ ẩm", note: "Xịt dưỡng tóc", slug: "xit-duong-toc" },
      ],
    },
  },
];

// Chiến dịch hiển thị banner trên trang chủ. Đặt null để ẩn banner.
export const featuredCampaign: Campaign | null = campaigns[0] ?? null;

export const getCampaign = (slug: string) => campaigns.find((campaign) => campaign.slug === slug);
