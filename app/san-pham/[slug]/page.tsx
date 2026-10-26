import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Check, Leaf, Truck } from "lucide-react";
import ProductCard from "@/components/ProductCard";
import ProductPurchase from "@/components/ProductPurchase";
import { formatPrice, products } from "@/data/products";

type ProductPageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = products.find((item) => item.slug === slug);
  if (!product) return { title: "Không tìm thấy sản phẩm" };
  return {
    title: product.name,
    description: product.shortDesc,
    openGraph: { title: product.name, description: product.shortDesc, images: product.images },
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = products.find((item) => item.slug === slug);
  if (!product) notFound();

  const relatedProducts = products.filter((item) => item.category === product.category && item.id !== product.id).slice(0, 3);

  return (
    <div className="product-detail-page page-shell">
      <Link href="/san-pham" className="back-link"><ArrowLeft size={15} /> Tất cả sản phẩm</Link>
      <div className="product-detail-layout">
        <div className="product-gallery">
          <div className="product-main-image"><Image src={product.images[0]} alt={product.name} fill priority sizes="(max-width: 768px) 100vw, 52vw" /></div>
          <div className="product-thumbnails">
            {product.images.map((image, index) => <div className="product-thumbnail" key={image}><Image src={image} alt={`${product.name}, ảnh ${index + 1}`} fill sizes="100px" /></div>)}
          </div>
        </div>
        <div className="product-detail-copy">
          <span className="eyebrow">{product.category} · {product.volume}</span>
          <h1 className="font-display">{product.name}</h1>
          <p className="detail-short-desc">{product.shortDesc}</p>
          <div className="detail-price"><strong>{formatPrice(product.price)}</strong><del>{formatPrice(product.comparePrice)}</del></div>
          <p className="detail-description">Chăm sóc mái tóc mỗi ngày với công thức lấy cảm hứng từ thảo mộc Việt, dịu dàng và dễ dùng trong routine của bạn.</p>
          <ProductPurchase product={product} />
          <div className="shipping-note"><Truck size={18} /><span>Miễn phí vận chuyển cho đơn hàng từ 249.000đ</span></div>
          <div className="detail-highlights">
            <h2>Điều mầm gửi gắm</h2>
            <ul>{product.benefits.map((benefit) => <li key={benefit}><Check size={16} />{benefit}</li>)}</ul>
          </div>
        </div>
      </div>
      <div className="product-info-grid">
        <section><h2 className="font-display"><Leaf size={18} /> Thành phần chính</h2>{product.ingredients.length ? <div className="ingredient-tags">{product.ingredients.map((ingredient) => <span key={ingredient}>{ingredient}</span>)}</div> : <p>Thông tin thành phần đang được cập nhật.</p>}</section>
        <section><h2 className="font-display">Hướng dẫn sử dụng</h2><p>{product.usage}</p></section>
      </div>
      {relatedProducts.length > 0 && <section className="related-products"><div className="related-heading"><span className="eyebrow">Kết hợp cùng mầm</span><h2 className="font-display">Bạn có thể thích</h2></div><div className="product-grid">{relatedProducts.map((item) => <ProductCard key={item.id} product={item} />)}</div></section>}
    </div>
  );
}