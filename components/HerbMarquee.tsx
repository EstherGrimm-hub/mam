"use client";

import { ArrowRight } from "lucide-react";
import { herbNames } from "@/data/homepage";

const words = ["Thảo mộc", ...herbNames.slice(0, 4), "Từ thiên nhiên"];

export default function HerbMarquee() {
  return (
    <div className="herb-marquee" aria-label="Thảo mộc: bưởi, bồ kết, hương nhu, hà thủ ô, lô hội">
      <div className="herb-marquee-track" aria-hidden="true">
        {[0, 1].map((copy) => (
          <div className="herb-marquee-group" key={copy}>
            {words.map((word, index) => <span className="herb-marquee-item" key={`${word}-${index}`}>{word}<ArrowRight size={16} /></span>)}
          </div>
        ))}
      </div>
    </div>
  );
}