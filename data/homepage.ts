export const herbNames = ["Bưởi", "Bồ kết", "Hương nhu", "Hà thủ ô", "Lô hội"] as const;

export const journeyChapters = [
  {
    number: "01",
    title: "Hạt mầm",
    eyebrow: "Bắt đầu từ điều thân quen",
    copy: "Một lát bưởi xanh, một nhánh lá thơm. Câu chuyện chăm tóc của mầm bắt đầu từ những điều gần gũi ấy.",
    image: "/images/dau-goi-thao-moc.png",
    alt: "Chai dầu gội thảo mộc giữa lá xanh, bưởi và bồ kết",
    tone: "#263a23",
  },
  {
    number: "02",
    title: "Thảo mộc",
    eyebrow: "Nếp xưa, nhịp sống mới",
    copy: "Bồ kết, hương nhu, vỏ bưởi gợi lại nếp chăm tóc thân thương, được kể bằng ngôn ngữ của hôm nay.",
    image: "/images/dau-xa.png",
    alt: "Dầu gội thảo mộc mầm cùng hình ảnh lá xanh",
    tone: "#3d5235",
  },
  {
    number: "03",
    title: "Nâng niu",
    eyebrow: "Mỗi bước một cảm nhận",
    copy: "Gội, xả, ủ hay dưỡng thêm một chút. Bạn chọn nhịp chăm tóc vừa vặn với mình, mỗi ngày một khác.",
    image: "/images/kem-u-toc.png",
    alt: "Dầu xả mầm trong khung cảnh thảo mộc xanh",
    tone: "#536646",
  },
  {
    number: "04",
    title: "Mái tóc",
    eyebrow: "Một nghi thức nhỏ mỗi ngày",
    copy: "Chậm lại đôi chút, lắng nghe mái tóc và để khoảnh khắc chăm sóc trở thành khoảng riêng dịu dàng của bạn.",
    image: "/images/serum.png",
    alt: "Serum tóc mầm với lá xanh và ánh sáng dịu",
    tone: "#687756",
  },
];

export const hotspotStories = [
  { productSlug: "dau-goi-thao-moc", image: "/images/banner/banner-dau-goi.png", x: 62, y: 54, alt: "Poster dầu gội thảo mộc mầm" },
  { productSlug: "dau-xa-phuc-hoi-mem-muot", image: "/images/banner/banner-dau-xa.png", x: 48, y: 48, alt: "Poster dầu xả phục hồi và mềm mượt mầm" },
  { productSlug: "serum-toc", image: "/images/banner/banner-serum.png", x: 32, y: 52, alt: "Poster serum tóc mầm" },
];

export const promoSlides = [
  { image: "/images/banner/banner-dau-goi.png", alt: "Dầu gội thảo mộc mầm với bưởi và bồ kết", href: "/san-pham/dau-goi-thao-moc", label: "Khám phá dầu gội" },
  { image: "/images/banner/banner-dau-xa.png", alt: "Dầu xả phục hồi và mềm mượt mầm", href: "/san-pham/dau-xa-phuc-hoi-mem-muot", label: "Khám phá dầu xả" },
  { image: "/images/banner/banner-serum.png", alt: "Serum tóc mầm chăm sóc tóc hằng ngày", href: "/san-pham/serum-toc", label: "Khám phá serum" },
];

export const campaign1212 = {
  period: "06–19/12",
  items: [
    { image: "/images/products/dau-goi-uu-dai.png", alt: "Poster ưu đãi 12.12 dầu gội thảo mộc mầm", href: "/san-pham/dau-goi-thao-moc" },
    { image: "/images/products/dau-xa-uu-dai.png", alt: "Poster ưu đãi 12.12 dầu xả mầm", href: "/san-pham/dau-xa-phuc-hoi-mem-muot" },
    { image: "/images/products/kem-u-toc-uu-dai.png", alt: "Poster ưu đãi 12.12 kem ủ tóc mầm", href: "/san-pham/kem-u-toc" },
    { image: "/images/products/serum-uu-dai.png", alt: "Poster ưu đãi 12.12 serum tóc mầm", href: "/san-pham/serum-toc" },
    { image: "/images/products/xit-duong-uu-dai.png", alt: "Poster ưu đãi 12.12 xịt dưỡng tóc mầm", href: "/san-pham/xit-duong-toc" },
    { image: "/images/products/combo-2-uu-dai.png", alt: "Poster ưu đãi 12.12 combo gội và xả tặng xịt dưỡng", href: "/san-pham/combo-goi-xa-tang-xit-duong" },
    { image: "/images/products/combo-5-uu-dai.png", alt: "Poster ưu đãi 12.12 combo đủ bộ 5 món", href: "/san-pham/combo-du-bo-5-mon" },
  ],
};

// TODO: thay bằng đánh giá đã được khách hàng cho phép sử dụng.
export const SHOW_TESTIMONIALS = false;
export const sampleTestimonials = [
  "TODO: thay bằng đánh giá thật của khách hàng.",
  "TODO: thay bằng đánh giá thật của khách hàng.",
  "TODO: thay bằng đánh giá thật của khách hàng.",
];