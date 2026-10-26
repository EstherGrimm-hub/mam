"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Check, ShoppingBag } from "lucide-react";
import { formatPrice, products } from "@/data/products";
import { useCart } from "@/components/CartProvider";

const packages = [
  { id: "mam-shampoo", label: "Lẻ", detail: "Dầu gội · 300ml" },
  { id: "combo-shampoo-conditioner", label: "Gội + Xả", detail: "Combo 2 món" },
  { id: "combo-care-trio", label: "Combo 3 bước", detail: "Gội · Xả · Ủ" },
  { id: "combo-full-set", label: "Đủ bộ 5 món", detail: "Trọn bộ chăm sóc" },
];

export default function PackageSelector() {
  const [selectedId, setSelectedId] = useState(packages[0].id);
  const [showToast, setShowToast] = useState(false);
  const timerRef = useRef<number | null>(null);
  const { addItem } = useCart();
  const selected = products.find((product) => product.id === selectedId) ?? products[0];

  useEffect(() => () => {
    if (timerRef.current !== null) window.clearTimeout(timerRef.current);
  }, []);

  function addSelected() {
    addItem(selected.id);
    setShowToast(true);
    if (timerRef.current !== null) window.clearTimeout(timerRef.current);
    timerRef.current = window.setTimeout(() => setShowToast(false), 1800);
  }

  return (
    <section className="package-selector-section page-shell" aria-labelledby="package-selector-title">
      <div className="package-selector-heading">
        <span className="eyebrow">Chọn nhịp chăm sóc</span>
        <h2 className="font-display" id="package-selector-title">Mầm nào hợp với bạn?</h2>
      </div>
      <div className="package-selector">
        <div className="package-options" role="group" aria-label="Chọn bộ sản phẩm">
          {packages.map((option) => (
            <button className={`package-option${selectedId === option.id ? " is-selected" : ""}`} type="button" key={option.id} onClick={() => setSelectedId(option.id)} aria-pressed={selectedId === option.id}>
              <span className="package-option-check">{selectedId === option.id && <Check size={13} />}</span>
              <span><strong>{option.label}</strong><small>{option.detail}</small></span>
              <span className="package-option-price">{formatPrice(products.find((product) => product.id === option.id)!.price)}</span>
            </button>
          ))}
        </div>
        <div className="package-preview" aria-live="polite">
          <Link className="package-preview-image" href={`/san-pham/${selected.slug}`} key={selected.id}>
            <Image src={selected.images[0]} alt={selected.name} fill sizes="(max-width: 760px) 90vw, 40vw" />
          </Link>
          <div className="package-preview-info">
            <span className="eyebrow">{selected.volume}</span>
            <h3 className="font-display"><Link href={`/san-pham/${selected.slug}`}>{selected.name}</Link></h3>
            <div className="package-preview-price"><strong>{formatPrice(selected.price)}</strong><del>{formatPrice(selected.comparePrice)}</del></div>
            <button className="button-primary" type="button" onClick={addSelected}><ShoppingBag size={16} /> Thêm vào giỏ</button>
          </div>
        </div>
      </div>
      {showToast && <p className="cart-toast" role="status">Đã thêm vào giỏ</p>}
      <Link className="package-all-link" href="/san-pham">Xem toàn bộ sản phẩm <ArrowRight size={15} /></Link>
    </section>
  );
}