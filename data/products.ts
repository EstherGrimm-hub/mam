export type ProductCategory = "gội" | "xả" | "ủ" | "serum" | "xịt" | "combo";

export type Product = {
  id: string;
  slug: string;
  name: string;
  category: ProductCategory;
  volume: string;
  price: number;
  comparePrice: number;
  images: string[];
  shortDesc: string;
  benefits: [string, string, string, string, string];
  ingredients: string[];
  usage: string;
  weightGram: number;
};

export const products: Product[] = [
  {
    id: "mam-shampoo",
    slug: "dau-goi-thao-moc",
    name: "Dầu gội thảo mộc",
    category: "gội",
    volume: "300ml",
    price: 159000,
    comparePrice: 189000,
    images: ["/images/dau-goi-thao-moc.png", "/images/products/dau-goi-cach-dung.png"],
    shortDesc: "Làm sạch dịu nhẹ cùng bưởi, bồ kết và hương nhu.",
    benefits: [
      "Giúp tóc sạch thoáng, giảm cảm giác bết dính",
      "Thảo mộc dịu nhẹ cho da đầu",
      "Mang lại cảm giác mát lành sau khi gội",
      "Làm sạch bụi bẩn và dầu thừa trên tóc",
      "Chai pump tiện dùng, dung tích 300ml",
    ],
    ingredients: ["Bưởi", "Bồ kết", "Hương nhu"],
    usage: "Làm ướt tóc, lấy lượng vừa đủ tạo bọt và massage nhẹ da đầu. Xả sạch với nước; có thể gội lại nếu cần.",
    weightGram: 390,
  },
  {
    id: "mam-conditioner",
    slug: "dau-xa-phuc-hoi-mem-muot",
    name: "Dầu xả phục hồi & mềm mượt",
    category: "xả",
    volume: "200ml",
    price: 139000,
    comparePrice: 169000,
    images: ["/images/dau-xa.png", "/images/products/dau-xa-cach-dung.png"],
    shortDesc: "Nâng niu thân tóc, cho mái tóc mềm mượt dễ chải.",
    benefits: [
      "Bổ sung độ ẩm cho thân tóc",
      "Hỗ trợ chăm sóc tóc khô xơ, hư tổn",
      "Cho tóc mềm mượt và dễ chải hơn",
      "Hỗ trợ giảm gãy rụng do tóc rối khi chải",
      "Tuýp nhỏ gọn, tiện lấy lượng vừa đủ",
    ],
    ingredients: ["Lá hương nhu"],
    usage: "Sau khi gội, thoa dầu xả lên thân và ngọn tóc. Để trong 2–3 phút rồi xả sạch với nước.",
    weightGram: 250,
  },
  {
    id: "mam-hair-mask",
    slug: "kem-u-toc",
    name: "Kem ủ tóc",
    category: "ủ",
    volume: "200ml",
    price: 189000,
    comparePrice: 229000,
    images: ["/images/kem-u-toc.png", "/images/products/kem-u-cach-dung.png"],
    shortDesc: "Chăm sóc sâu với dầu dừa, bơ hạt mỡ và lô hội.",
    benefits: [
      "Dưỡng sâu cho mái tóc cần được chăm sóc",
      "Hỗ trợ chăm sóc tóc khô xơ, hư tổn",
      "Cho tóc mềm mượt và bóng khỏe",
      "Giúp duy trì độ ẩm mềm mại cho tóc",
      "Hũ 200ml dùng được nhiều lần",
    ],
    ingredients: ["Dầu dừa", "Bơ hạt mỡ", "Lô hội"],
    usage: "Sau khi gội, lấy lượng kem vừa đủ thoa đều lên thân và ngọn tóc. Ủ 5–10 phút rồi xả sạch.",
    weightGram: 270,
  },
  {
    id: "mam-serum",
    slug: "serum-toc",
    name: "Serum tóc",
    category: "serum",
    volume: "50ml",
    price: 219000,
    comparePrice: 259000,
    images: ["/images/serum.png", "/images/products/serum-cach-dung.png"],
    shortDesc: "Bước dưỡng nhẹ tênh cho mái tóc thêm chắc khỏe.",
    benefits: [
      "Hỗ trợ chăm sóc tóc khô xơ",
      "Nuôi dưỡng tóc trông chắc khỏe hơn",
      "Hỗ trợ giảm gãy rụng do tóc yếu",
      "Kết cấu nhẹ, không cần xả lại",
      "Chai nhỏ gọn, dễ mang theo",
    ],
    ingredients: [],
    usage: "Lấy 1–2 giọt xoa đều trong lòng bàn tay, thoa lên thân và ngọn tóc khô hoặc còn ẩm. Không cần xả lại.",
    weightGram: 100,
  },
  {
    id: "mam-hair-mist",
    slug: "xit-duong-toc",
    name: "Xịt dưỡng tóc",
    category: "xịt",
    volume: "150ml",
    price: 169000,
    comparePrice: 199000,
    images: ["/images/xit-duong.png", "/images/products/xit-duong-cach-dung.png"],
    shortDesc: "Dưỡng tóc nhanh gọn cùng hương bưởi nhẹ nhàng.",
    benefits: [
      "Nuôi dưỡng và bảo vệ mái tóc mỗi ngày",
      "Cho tóc mềm mượt, giảm cảm giác khô xơ",
      "Hỗ trợ giảm gãy rụng do tóc khô yếu",
      "Hương bưởi nhẹ nhàng, dễ chịu",
      "Dạng xịt nhanh gọn, dùng mọi lúc",
    ],
    ingredients: ["Bồ kết", "Hà thủ ô", "Tinh dầu bưởi"],
    usage: "Lắc nhẹ chai, xịt cách tóc khoảng 15–20cm. Dùng trên tóc khô hoặc ẩm, tập trung ở thân và ngọn tóc.",
    weightGram: 210,
  },
  {
    id: "combo-shampoo-conditioner",
    slug: "combo-goi-xa",
    name: "Combo Gội & Xả",
    category: "combo",
    volume: "300ml + 200ml",
    price: 269000,
    comparePrice: 358000,
    images: ["/images/dau-goi-thao-moc.png", "/images/dau-xa.png"],
    shortDesc: "Cặp đôi làm sạch và chăm sóc mềm mượt mỗi ngày.",
    benefits: ["Hai bước chăm sóc tóc liền mạch", "Làm sạch dịu nhẹ", "Bổ sung độ ẩm cho thân tóc", "Tóc mềm mượt, dễ chải hơn", "Tiết kiệm hơn khi chọn theo bộ"],
    ingredients: ["Bưởi", "Bồ kết", "Hương nhu"],
    usage: "Gội sạch tóc với dầu gội, sau đó dùng dầu xả ở thân và ngọn tóc rồi xả sạch.",
    weightGram: 640,
  },
  {
    id: "combo-care-trio",
    slug: "combo-goi-xa-u",
    name: "Combo Gội, Xả & Ủ",
    category: "combo",
    volume: "3 sản phẩm",
    price: 429000,
    comparePrice: 587000,
    images: ["/images/dau-goi-thao-moc.png", "/images/dau-xa.png", "/images/kem-u-toc.png"],
    shortDesc: "Trọn bộ chăm sóc từ làm sạch đến dưỡng sâu.",
    benefits: ["Đủ ba bước chăm sóc tóc tại nhà", "Làm sạch dịu nhẹ cùng thảo mộc", "Dưỡng ẩm thân tóc", "Ủ tóc mềm mượt hơn", "Tiết kiệm hơn khi chọn theo bộ"],
    ingredients: ["Bưởi", "Bồ kết", "Hương nhu", "Dầu dừa", "Bơ hạt mỡ", "Lô hội"],
    usage: "Gội sạch tóc, dùng dầu xả thường xuyên và thay bằng kem ủ 1–2 lần mỗi tuần.",
    weightGram: 910,
  },
  {
    id: "combo-full-set",
    slug: "combo-du-bo-5-mon",
    name: "Combo đủ bộ 5 món",
    category: "combo",
    volume: "5 sản phẩm",
    price: 749000,
    comparePrice: 975000,
    images: ["/images/products/box-5-product.png"],
    shortDesc: "Nâng niu mái tóc với đầy đủ 5 món chăm sóc từ mầm.",
    benefits: ["Đầy đủ 5 sản phẩm chăm sóc tóc", "Linh hoạt theo nhu cầu từng ngày", "Kết hợp làm sạch và dưỡng tóc", "Dễ dàng tạo thói quen chăm sóc", "Tiết kiệm hơn khi chọn trọn bộ"],
    ingredients: ["Bưởi", "Bồ kết", "Hương nhu", "Dầu dừa", "Lô hội", "Hà thủ ô"],
    usage: "Kết hợp dầu gội, dầu xả, kem ủ, serum và xịt dưỡng theo hướng dẫn riêng của từng sản phẩm.",
    weightGram: 1250,
  },
  {
    id: "combo-gift-mist",
    slug: "combo-goi-xa-tang-xit-duong",
    name: "Combo Gội & Xả tặng Xịt dưỡng 150ml",
    category: "combo",
    volume: "3 sản phẩm",
    price: 299000,
    comparePrice: 557000,
    images: ["/images/dau-goi-thao-moc.png", "/images/xit-duong.png"],
    shortDesc: "Bộ đôi gội xả kèm xịt dưỡng tóc 150ml.",
    benefits: ["Có đủ bước gội, xả và dưỡng tóc", "Xịt dưỡng tiện dùng mỗi ngày", "Hương bưởi nhẹ nhàng", "Chăm sóc tóc khô xơ", "Ưu đãi theo bộ tiết kiệm hơn"],
    ingredients: ["Bưởi", "Bồ kết", "Hương nhu", "Hà thủ ô"],
    usage: "Gội và xả như thường lệ. Xịt dưỡng lên thân tóc khô hoặc ẩm sau khi gội.",
    weightGram: 850,
  },
];

export function formatPrice(price: number) {
  return new Intl.NumberFormat("vi-VN").format(price) + "đ";
}