"use client";

import { useEffect, useRef } from "react";
import { effects } from "@/data/effects";
import { journeyChapters, herbNames } from "@/data/homepage";
import { products } from "@/data/products";

const stats = [
  { value: products.filter((product) => product.category !== "combo").length, label: "sản phẩm chăm sóc tóc" },
  { value: herbNames.length, label: "thảo mộc thân quen" },
  { value: journeyChapters.length, label: "chương trong hành trình" },
];

function CountUpNumber({ value }: { value: number }) {
  const numberRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const element = numberRef.current;
    if (!element || !effects.counters || !("IntersectionObserver" in window)) return;

    const observer = new IntersectionObserver((entries) => {
      if (!entries[0]?.isIntersecting) return;
      observer.disconnect();
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      const start = performance.now();
      const duration = 650;
      const animate = (time: number) => {
        const progress = Math.min((time - start) / duration, 1);
        element.textContent = String(Math.round(value * progress));
        if (progress < 1) window.requestAnimationFrame(animate);
      };
      element.textContent = "0";
      window.requestAnimationFrame(animate);
    }, { threshold: 0.7 });

    observer.observe(element);
    return () => observer.disconnect();
  }, [value]);

  return <span className="stat-number" ref={numberRef} aria-label={String(value)}>{value}</span>;
}

export default function CountUpStats() {
  return (
    <section className="stats-band" aria-label="Một vài con số về mầm">
      <div className="page-shell stats-grid">
        {stats.map((stat) => (
          <article className="stat-item" key={stat.label}>
            <div><CountUpNumber value={stat.value} /></div>
            <p>{stat.label}</p>
          </article>
        ))}
      </div>
    </section>
  );
}