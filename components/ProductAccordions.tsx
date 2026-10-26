import { Droplets, Leaf, PackageCheck, ShieldCheck, Sparkles } from "lucide-react";
import type { Product } from "@/data/products";

const benefitIcons = [Sparkles, Droplets, Leaf, ShieldCheck, PackageCheck];

export default function ProductAccordions({ product }: { product: Product }) {
  return (
    <div className="product-accordions">
      <details className="product-accordion" open>
        <summary>5 điều mầm gửi gắm<span>+</span></summary>
        <ul className="detail-benefit-list">{product.benefits.map((benefit, index) => {
          const Icon = benefitIcons[index];
          return <li key={benefit}><Icon size={17} strokeWidth={1.6} />{benefit}</li>;
        })}</ul>
      </details>
      <details className="product-accordion">
        <summary>Thành phần chính<span>+</span></summary>
        {product.ingredients.length ? <div className="ingredient-tags">{product.ingredients.map((ingredient) => <span key={ingredient}>{ingredient}</span>)}</div> : <p>Thông tin thành phần đang được cập nhật.</p>}
      </details>
      <details className="product-accordion">
        <summary>Hướng dẫn sử dụng<span>+</span></summary>
        <p>{product.usage}</p>
      </details>
    </div>
  );
}