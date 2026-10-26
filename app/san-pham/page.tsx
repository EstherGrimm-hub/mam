import type { Metadata } from "next";
import { Leaf } from "lucide-react";
import ShopCatalog from "@/components/ShopCatalog";
import { products } from "@/data/products";

export const metadata: Metadata = {
  title: "Sản phẩm chăm sóc tóc thảo mộc",
  description: "Khám phá dầu gội, dầu xả, kem ủ, serum, xịt dưỡng và combo chăm sóc tóc từ mầm.",
  openGraph: { images: ["/images/dau-goi-thao-moc.png"] },
};

export default function ProductsPage() {
  return (
    <div className="shop-page page-shell">
      <div className="shop-intro">
        <span className="eyebrow"><Leaf size={14} /> Bộ sưu tập mầm</span>
        <h1 className="font-display">Chọn điều lành<br /><em>cho mái tóc.</em></h1>
        <p>Từ bước làm sạch đến dưỡng tóc mỗi ngày, mầm luôn ở đây để cùng bạn chăm chút mái tóc theo cách dịu dàng.</p>
      </div>
      <ShopCatalog products={products} />
    </div>
  );
}