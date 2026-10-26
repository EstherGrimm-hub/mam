"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { ArrowDown } from "lucide-react";
import { journeyChapters } from "@/data/homepage";
import { effects } from "@/data/effects";

export default function StoryJourney() {
  const [activeChapter, setActiveChapter] = useState(0);

  useEffect(() => {
    if (!effects.journey || !("IntersectionObserver" in window)) return;
    const chapters = document.querySelectorAll<HTMLElement>("[data-journey-chapter]");
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) setActiveChapter(Number((entry.target as HTMLElement).dataset.journeyChapter));
      });
    }, { threshold: 0.25, rootMargin: "-20% 0px -35% 0px" });
    chapters.forEach((chapter) => observer.observe(chapter));
    return () => observer.disconnect();
  }, []);

  const current = journeyChapters[activeChapter];
  const progress = ((activeChapter + 1) / journeyChapters.length) * 100;

  return (
    <section className="journey-section" aria-labelledby="journey-heading">
      <div className="page-shell journey-shell">
        <div className="journey-heading">
          <span className="eyebrow">Một nghi thức chăm tóc</span>
          <h2 className="font-display" id="journey-heading">Hành trình từ mầm</h2>
        </div>
        <div className="journey-layout">
          <div className="journey-visual" style={{ backgroundColor: current.tone }}>
            <Image key={current.image} src={current.image} alt={current.alt} fill sizes="(max-width: 760px) 100vw, 48vw" />
            <div className="journey-image-shade" />
            <div className="journey-visual-caption"><span>{current.number}</span><span>{current.title}</span></div>
            <div className="journey-progress" aria-label={`Chương ${activeChapter + 1} trên ${journeyChapters.length}`}>
              <span className="journey-progress-fill" style={{ transform: `scaleY(${progress / 100})` }} />
            </div>
          </div>
          <div className="journey-chapters">
            {journeyChapters.map((chapter, index) => (
              <article className={`journey-chapter${index === activeChapter ? " is-active" : ""}`} data-journey-chapter={index} id={`hanh-trinh-${chapter.number}`} key={chapter.number}>
                <span className="journey-chapter-number">{chapter.number} <i>·</i> {chapter.title}</span>
                <div>
                  <p>{chapter.eyebrow}</p>
                  <h3 className="font-display">{chapter.title}</h3>
                  <p>{chapter.copy}</p>
                </div>
                <ArrowDown className="journey-chapter-arrow" size={18} aria-hidden="true" />
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}