"use client";

import { useState } from "react";
import { SlidersHorizontal } from "lucide-react";
import type { Product, ProductCategory } from "@/data/products";
import ProductCard from "@/components/ProductCard";

const categories: { value: ProductCategory | "all"; label: string }[] = [
  { value: "all", label: "Tất cả" },
  { value: "gội", label: "Dầu gội" },
  { value: "xả", label: "Dầu xả" },
  { value: "ủ", label: "Kem ủ" },
  { value: "serum", label: "Serum" },
  { value: "xịt", label: "Xịt dưỡng" },
  { value: "combo", label: "Combo" },
];

export default function ShopCatalog({ products }: { products: Product[] }) {
  const [category, setCategory] = useState<ProductCategory | "all">("all");
  const [sort, setSort] = useState("featured");

  const visibleProducts = products
    .filter((product) => category === "all" || product.category === category)
    .sort((a, b) => sort === "price-asc" ? a.price - b.price : sort === "price-desc" ? b.price - a.price : 0);

  return (
    <div className="shop-catalog">
      <div className="shop-toolbar">
        <div className="category-filters" role="group" aria-label="Lọc theo loại sản phẩm">
          {categories.map((option) => (
            <button className={category === option.value ? "is-selected" : ""} key={option.value} type="button" onClick={() => setCategory(option.value)}>
              {option.label}
            </button>
          ))}
        </div>
        <label className="sort-select"><SlidersHorizontal size={16} /><span>Sắp xếp</span>
          <select value={sort} onChange={(event) => setSort(event.target.value)} aria-label="Sắp xếp sản phẩm">
            <option value="featured">Nổi bật</option>
            <option value="price-asc">Giá: thấp đến cao</option>
            <option value="price-desc">Giá: cao đến thấp</option>
          </select>
        </label>
      </div>
      <p className="shop-count">{visibleProducts.length} sản phẩm</p>
      {visibleProducts.length ? (
        <div className="product-grid shop-grid">{visibleProducts.map((product) => <ProductCard key={product.id} product={product} />)}</div>
      ) : <p className="shop-empty">Chưa có sản phẩm trong danh mục này.</p>}
    </div>
  );
}