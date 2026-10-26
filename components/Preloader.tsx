"use client";

import { useEffect, useState } from "react";
import Logo from "@/components/Logo";
import { effects } from "@/data/effects";

const SESSION_KEY = "mam-preloader-seen-v1";
const DURATION_MS = 700;

export default function Preloader() {
  const [isVisible, setIsVisible] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!isVisible) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isVisible]);

  useEffect(() => {
    if (!effects.preloader || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    try {
      if (window.sessionStorage.getItem(SESSION_KEY)) return;
      window.sessionStorage.setItem(SESSION_KEY, "1");
    } catch {
      return;
    }

    let startTime = 0;
    let lastProgress = -1;
    let didComplete = false;
    let frameId = 0;
    let finishFrameId = 0;
    const timeoutId = window.setTimeout(() => {
      didComplete = true;
      setProgress(100);
      setIsVisible(false);
    }, 1050);

    const animate = (time: number) => {
      if (!startTime) startTime = time;
      const ratio = Math.min((time - startTime) / DURATION_MS, 1);
      const nextProgress = Math.floor(ratio * 100);
      if (nextProgress !== lastProgress) {
        lastProgress = nextProgress;
        setProgress(nextProgress);
      }
      if (ratio < 1) {
        frameId = window.requestAnimationFrame(animate);
      } else {
        didComplete = true;
        window.clearTimeout(timeoutId);
        finishFrameId = window.requestAnimationFrame(() => setIsVisible(false));
      }
    };

    frameId = window.requestAnimationFrame((time) => {
      setIsVisible(true);
      animate(time);
    });
    return () => {
      window.cancelAnimationFrame(frameId);
      window.cancelAnimationFrame(finishFrameId);
      window.clearTimeout(timeoutId);
      if (!didComplete) window.sessionStorage.removeItem(SESSION_KEY);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <div className="brand-preloader" role="status" aria-live="polite">
      <div className="preloader-center">
        <Logo variant="light" height={48} className="preloader-logo" />
        <svg className="preloader-sprout" viewBox="0 0 64 70" fill="none" aria-hidden="true">
          <path className="sprout-stem" d="M32 64C33 46 31 32 31 16" />
          <path className="sprout-leaf sprout-leaf-left" d="M31 36C17 35 10 27 12 17c12 1 19 8 19 19Z" />
          <path className="sprout-leaf sprout-leaf-right" d="M31 26C43 25 51 18 51 8 39 8 32 15 31 26Z" />
        </svg>
        <span className="preloader-progress" aria-label={`Đang tải ${progress}%`}>{progress}%</span>
      </div>
      <button className="preloader-skip" type="button" onClick={() => setIsVisible(false)}>Bỏ qua</button>
    </div>
  );
}