"use client";

import { useEffect } from "react";
import type Lenis from "lenis";
import { effects } from "@/data/effects";

export default function SmoothScroll() {
  useEffect(() => {
    if (!effects.smoothScroll) return;

    const motionPreference = window.matchMedia("(prefers-reduced-motion: reduce)");
    let instance: Lenis | null = null;
    let disposed = false;

    const start = async () => {
      if (disposed || motionPreference.matches || instance) return;
      const { default: LenisConstructor } = await import("lenis");
      if (disposed || motionPreference.matches) return;
      instance = new LenisConstructor({
        autoRaf: true,
        anchors: true,
        lerp: 0.085,
        respectReducedMotion: true,
        stopInertiaOnNavigate: true,
      });
    };

    const handleMotionChange = () => {
      if (motionPreference.matches) {
        instance?.destroy();
        instance = null;
      } else {
        void start();
      }
    };

    void start();
    motionPreference.addEventListener("change", handleMotionChange);
    return () => {
      disposed = true;
      motionPreference.removeEventListener("change", handleMotionChange);
      instance?.destroy();
    };
  }, []);

  return null;
}