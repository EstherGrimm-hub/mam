"use client";

import { useRef, useState, type TouchEvent } from "react";
import Image from "next/image";
import { ArrowLeft, ArrowRight, X, ZoomIn } from "lucide-react";

export default function ProductGallery({ name, images }: { name: string; images: string[] }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isZoomOpen, setIsZoomOpen] = useState(false);
  const touchStartX = useRef<number | null>(null);
  const image = images[activeIndex];

  function changeImage(direction: number) {
    setActiveIndex((index) => (index + direction + images.length) % images.length);
  }

  function handleTouchStart(event: TouchEvent<HTMLDivElement>) {
    touchStartX.current = event.touches[0]?.clientX ?? null;
  }

  function handleTouchEnd(event: TouchEvent<HTMLDivElement>) {
    const startX = touchStartX.current;
    const endX = event.changedTouches[0]?.clientX;
    if (startX === null || endX === undefined) return;
    const delta = endX - startX;
    if (Math.abs(delta) > 45) changeImage(delta > 0 ? -1 : 1);
    touchStartX.current = null;
  }

  return (
    <div className="product-gallery">
      <div className="product-main-image" onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd} onKeyDown={(event) => {
        if (event.key === "ArrowLeft") changeImage(-1);
        if (event.key === "ArrowRight") changeImage(1);
      }} tabIndex={0} aria-label={`${name}, ảnh ${activeIndex + 1} trên ${images.length}`}>
        <Image src={image} alt={`${name}, ảnh ${activeIndex + 1}`} fill priority sizes="(max-width: 768px) 100vw, 52vw" />
        {images.length > 1 && <>
          <button className="gallery-arrow gallery-arrow-left" type="button" onClick={() => changeImage(-1)} aria-label="Ảnh trước"><ArrowLeft size={18} /></button>
          <button className="gallery-arrow gallery-arrow-right" type="button" onClick={() => changeImage(1)} aria-label="Ảnh tiếp theo"><ArrowRight size={18} /></button>
        </>}
        <button className="gallery-zoom-button" type="button" onClick={() => setIsZoomOpen(true)} aria-label="Phóng to ảnh"><ZoomIn size={19} /></button>
      </div>
      {images.length > 1 && <div className="product-thumbnails" role="group" aria-label="Chọn ảnh sản phẩm">{images.map((src, index) => <button className={`product-thumbnail${index === activeIndex ? " is-active" : ""}`} type="button" onClick={() => setActiveIndex(index)} key={src} aria-label={`Xem ảnh ${index + 1}`} aria-pressed={index === activeIndex}><Image src={src} alt="" fill sizes="74px" /></button>)}</div>}
      {isZoomOpen && <div className="gallery-zoom" role="dialog" aria-modal="true" aria-label={`Ảnh phóng to: ${name}`} onMouseDown={(event) => event.target === event.currentTarget && setIsZoomOpen(false)}><button type="button" onClick={() => setIsZoomOpen(false)} aria-label="Đóng ảnh phóng to"><X size={23} /></button><Image src={image} alt={`${name}, ảnh phóng to`} fill sizes="100vw" priority /></div>}
    </div>
  );
}