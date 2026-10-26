"use client";

import { useEffect, useRef, useState } from "react";
import { Droplets } from "lucide-react";
import { effects } from "@/config/effects";

export default function WaterPlant() {
  const [growth, setGrowth] = useState(0);
  const [score, setScore] = useState(0);
  const [isWatering, setIsWatering] = useState(false);
  const timerRef = useRef<number | null>(null);
  const growthRef = useRef(0);
  const growthFactor = growth / 100;

  useEffect(() => () => {
    if (timerRef.current !== null) window.clearInterval(timerRef.current);
  }, []);

  if (!effects.miniGame) return null;

  function waterOnce() {
    const nextGrowth = Math.min(100, growthRef.current + 5);
    growthRef.current = nextGrowth;
    setGrowth(nextGrowth);
    setScore((value) => value + 1);
  }

  function startWatering() {
    if (isWatering || growthRef.current >= 100) return;
    setIsWatering(true);
    waterOnce();
    if (growthRef.current >= 100) return;
    timerRef.current = window.setInterval(() => {
      const nextGrowth = Math.min(100, growthRef.current + 4);
      growthRef.current = nextGrowth;
      setGrowth(nextGrowth);
      setScore((value) => value + 1);
      if (nextGrowth >= 100) stopWatering();
    }, 280);
  }

  function stopWatering() {
    setIsWatering(false);
    if (timerRef.current !== null) {
      window.clearInterval(timerRef.current);
      timerRef.current = null;
    }
  }

  return (
    <section className="water-plant" aria-labelledby="water-plant-title">
      <div className="water-plant-copy">
        <span className="eyebrow eyebrow-light">Một khoảng nghỉ nhỏ</span>
        <h2 className="font-display" id="water-plant-title">Tưới mầm</h2>
        <p>Giữ nút một chút, để mầm lớn lên từng giọt.</p>
        <div className="water-plant-score"><span>Điểm tưới</span><strong aria-live="polite">{score}</strong></div>
        <button
          className="water-plant-button"
          type="button"
          onPointerDown={(event) => { event.preventDefault(); startWatering(); }}
          onPointerUp={stopWatering}
          onPointerLeave={stopWatering}
          onPointerCancel={stopWatering}
          onKeyDown={(event) => {
            if ((event.key === " " || event.key === "Enter") && !event.repeat) {
              event.preventDefault();
              startWatering();
            }
          }}
          onKeyUp={(event) => { if (event.key === " " || event.key === "Enter") stopWatering(); }}
          onBlur={stopWatering}
          aria-pressed={isWatering}
          aria-label="Giữ để tưới mầm"
        >
          <Droplets size={17} /> {growth >= 100 ? "Mầm đã lớn" : "Giữ để tưới"}
        </button>
      </div>
      <div className={`water-plant-scene${isWatering ? " is-watering" : ""}`} aria-hidden="true">
        <svg viewBox="0 0 220 210" className="water-plant-svg" fill="none">
          <path d="M34 179h152" stroke="#DCE8CF" strokeWidth="2" strokeLinecap="round" />
          <path className="water-plant-stem" d="M110 178V42" stroke="#DCE8CF" strokeWidth="4" strokeLinecap="round" style={{ transform: `scaleY(${Math.max(0.08, growthFactor)})` }} />
          <path className={`water-plant-leaf leaf-left${growth > 12 ? " is-grown" : ""}`} d="M108 110C76 108 58 88 62 64c27 2 45 19 46 46Z" fill="#DCE8CF" />
          <path className={`water-plant-leaf leaf-right${growth > 25 ? " is-grown" : ""}`} d="M112 83c29-2 46-19 44-42-27 3-43 19-44 42Z" fill="#C6D4B6" />
          <path className={`water-plant-leaf leaf-top${growth > 48 ? " is-grown" : ""}`} d="M109 58c-18-12-22-31-10-47 18 12 22 29 10 47Z" fill="#EDF2E6" />
          <path d="M95 180c-11-15-10-29 2-40 12 13 11 27-2 40Zm30 0c12-15 11-29-1-40-12 13-12 27 1 40Z" fill="#C6D4B6" />
        </svg>
        <span className="water-plant-growth">{growth}%</span>
      </div>
    </section>
  );
}