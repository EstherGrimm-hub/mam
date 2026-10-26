"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { effects } from "@/config/effects";

type RevealProps = {
  children: ReactNode;
  delay?: number;
  className?: string;
};

export default function Reveal({ children, delay = 0, className = "" }: RevealProps) {
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;
    if (!effects.reveal || window.matchMedia("(prefers-reduced-motion: reduce)").matches || !("IntersectionObserver" in window)) {
      element.classList.add("is-visible");
      return;
    }

    element.classList.add("reveal-ready");
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      }
    }, { threshold: 0.12, rootMargin: "0px 0px -5% 0px" });

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      className={`reveal ${className}`.trim()}
      ref={elementRef}
      style={{ "--reveal-delay": `${delay}ms` } as React.CSSProperties}
    >
      {children}
    </div>
  );
}