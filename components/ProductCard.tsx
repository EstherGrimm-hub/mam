import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Product } from "@/data/products";
import { formatPrice } from "@/data/products";

export default function ProductCard({ product }: { product: Product }) {
  return (
    <article className="product-card">
      <Link className="product-image" href={`/san-pham/${product.slug}`} aria-label={`Xem ${product.name}`}>
        <Image
          src={product.images[0]}
          alt={product.name}
          fill
          sizes="(max-width: 640px) 46vw, (max-width: 1024px) 30vw, 250px"
        />
        <span className="product-category">{product.category}</span>
      </Link>
      <div className="product-card-body">
        <p className="product-volume">{product.volume}</p>
        <h3><Link href={`/san-pham/${product.slug}`}>{product.name}</Link></h3>
        <p className="product-short-desc">{product.shortDesc}</p>
        <div className="product-card-bottom">
          <div><strong>{formatPrice(product.price)}</strong><del>{formatPrice(product.comparePrice)}</del></div>
          <Link className="product-arrow" href={`/san-pham/${product.slug}`} aria-label={`Khám phá ${product.name}`}>
            <ArrowUpRight size={17} />
          </Link>
        </div>
      </div>
    </article>
  );
}