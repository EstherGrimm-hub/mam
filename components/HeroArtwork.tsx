"use client";

import { useEffect, useRef, type PointerEvent } from "react";
import Image from "next/image";
import { effects } from "@/data/effects";

export default function HeroArtwork({ src, alt }: { src: string; alt: string }) {
  const imageRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const image = imageRef.current;
    if (!image || !effects.parallax || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let frame = 0;
    const updateScrollParallax = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(() => {
        const offset = Math.max(-16, Math.min(16, window.scrollY * -0.025));
        image.style.setProperty("--hero-parallax-y", `${offset}px`);
        frame = 0;
      });
    };
    window.addEventListener("scroll", updateScrollParallax, { passive: true });
    return () => {
      window.removeEventListener("scroll", updateScrollParallax);
      window.cancelAnimationFrame(frame);
    };
  }, []);

  function handlePointerMove(event: PointerEvent<HTMLDivElement>) {
    if (event.pointerType !== "mouse" || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const rect = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    imageRef.current?.style.setProperty("--hero-parallax-x", `${x * -9}px`);
    imageRef.current?.style.setProperty("--hero-parallax-pointer-y", `${y * -7}px`);
  }

  function resetPointer() {
    imageRef.current?.style.setProperty("--hero-parallax-x", "0px");
    imageRef.current?.style.setProperty("--hero-parallax-pointer-y", "0px");
  }

  return (
    <div className="hero-artwork" onPointerMove={handlePointerMove} onPointerLeave={resetPointer}>
      <Image ref={imageRef} className="hero-image" src={src} alt={alt} fill priority sizes="100vw" />
    </div>
  );
}