"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Check, Plus } from "lucide-react";
import { hotspotStories, promoSlides } from "@/data/homepage";
import { effects } from "@/config/effects";
import { formatPrice, products } from "@/data/products";
import { useCart } from "@/components/CartProvider";

export default function ProductHotspots() {
  const [slideIndex, setSlideIndex] = useState(0);
  const [activeSlug, setActiveSlug] = useState<string | null>(null);
  const [addedSlug, setAddedSlug] = useState<string | null>(null);
  const toastTimer = useRef<number | null>(null);
  const { addItem } = useCart();
  const hotspot = hotspotStories[slideIndex];
  const product = products.find((item) => item.slug === hotspot.productSlug);

  useEffect(() => () => {
    if (toastTimer.current !== null) window.clearTimeout(toastTimer.current);
  }, []);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setActiveSlug(null);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  function goToSlide(nextIndex: number) {
    setSlideIndex((nextIndex + promoSlides.length) % promoSlides.length);
    setActiveSlug(null);
    setAddedSlug(null);
  }

  function addProduct(productId: string, slug: string) {
    addItem(productId);
    setAddedSlug(slug);
    if (toastTimer.current !== null) window.clearTimeout(toastTimer.current);
    toastTimer.current = window.setTimeout(() => setAddedSlug(null), 1800);
  }

  return (
    <section className="spotlight-section" aria-labelledby="spotlight-heading">
      <div className="page-shell">
        <div className="spotlight-heading">
          <div><span className="eyebrow">Chạm vào điều bạn cần</span><h2 className="font-display" id="spotlight-heading">Chăm tóc theo cách của bạn</h2></div>
          <div className="carousel-controls" aria-label="Điều khiển bộ sưu tập sản phẩm">
            <button type="button" onClick={() => goToSlide(slideIndex - 1)} aria-label="Ảnh trước"><ArrowLeft size={17} /></button>
            <span aria-live="polite">0{slideIndex + 1} <i>/</i> 0{promoSlides.length}</span>
            <button type="button" onClick={() => goToSlide(slideIndex + 1)} aria-label="Ảnh tiếp theo"><ArrowRight size={17} /></button>
          </div>
        </div>
        <div
          className="product-carousel"
          aria-roledescription="carousel"
          aria-label="Bộ sưu tập sản phẩm mầm"
          tabIndex={0}
          onKeyDown={(event) => {
            if (event.key === "ArrowRight") goToSlide(slideIndex + 1);
            if (event.key === "ArrowLeft") goToSlide(slideIndex - 1);
          }}
        >
          {promoSlides.map((item, index) => (
            <article className={`carousel-slide${index === slideIndex ? " is-active" : ""}`} aria-hidden={index !== slideIndex} key={item.image}>
              <Image src={item.image} alt={item.alt} fill sizes="(max-width: 640px) 100vw, 92vw" priority={index === 0} />
              {index === slideIndex && product && effects.hotspots && (
                <div className="hotspot-layer">
                  <button
                    className="product-hotspot"
                    type="button"
                    style={{ left: `${hotspot.x}%`, top: `${hotspot.y}%` }}
                    aria-label={`Xem giá ${product.name}`}
                    aria-expanded={activeSlug === product.slug}
                    onClick={() => setActiveSlug(activeSlug === product.slug ? null : product.slug)}
                  >
                    <span><Plus size={18} /></span>
                  </button>
                  {activeSlug === product.slug && (
                    <div className={`hotspot-card${hotspot.x > 42 ? " hotspot-card-left" : ""}`} style={{ left: `${hotspot.x}%`, top: `${hotspot.y}%` }}>
                      <Link href={`/san-pham/${product.slug}`} className="hotspot-product-name">{product.name}</Link>
                      <span>{product.volume}</span>
                      <strong>{formatPrice(product.price)}</strong>
                      <button className="hotspot-add" type="button" onClick={() => addProduct(product.id, product.slug)}>
                        {addedSlug === product.slug ? <><Check size={15} /> Đã thêm vào giỏ</> : "Thêm vào giỏ"}
                      </button>
                    </div>
                  )}
                </div>
              )}
            </article>
          ))}
        </div>
        <div className="carousel-dots" role="group" aria-label="Chọn ảnh sản phẩm">
          {promoSlides.map((item, index) => <button type="button" className={index === slideIndex ? "is-active" : ""} key={item.image} onClick={() => goToSlide(index)} aria-label={`Xem ảnh ${index + 1}: ${item.label}`} aria-pressed={index === slideIndex} />)}
        </div>
        {addedSlug && <p className="cart-toast" role="status">Đã thêm vào giỏ</p>}
      </div>
    </section>
  );
}