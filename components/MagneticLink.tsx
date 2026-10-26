"use client";

import Link from "next/link";
import type { PointerEvent, ReactNode } from "react";
import { effects } from "@/config/effects";

export default function MagneticLink({
  href,
  className,
  children,
}: {
  href: string;
  className: string;
  children: ReactNode;
}) {
  function handlePointerMove(event: PointerEvent<HTMLAnchorElement>) {
    if (!effects.magneticButtons || event.pointerType !== "mouse" || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const bounds = event.currentTarget.getBoundingClientRect();
    const offsetX = (event.clientX - bounds.left - bounds.width / 2) * 0.1;
    const offsetY = (event.clientY - bounds.top - bounds.height / 2) * 0.1;
    event.currentTarget.style.translate = `${offsetX}px ${offsetY}px`;
  }

  function resetPointer(event: PointerEvent<HTMLAnchorElement>) {
    event.currentTarget.style.translate = "0 0";
  }

  return (
    <Link className={`${className} magnetic-link`} href={href} onPointerMove={handlePointerMove} onPointerLeave={resetPointer}>
      {children}
    </Link>
  );
}