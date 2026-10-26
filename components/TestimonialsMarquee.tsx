"use client";

import { SHOW_TESTIMONIALS, sampleTestimonials } from "@/data/homepage";

export default function TestimonialsMarquee() {
  if (!SHOW_TESTIMONIALS) return null;

  return (
    <section className="testimonials-marquee" aria-label="Chia sẻ của khách hàng">
      <div className="testimonials-track">
        {[0, 1].map((copy) => <div className="testimonials-group" aria-hidden={copy === 1} key={copy}>{sampleTestimonials.map((quote, index) => <blockquote key={`${copy}-${index}`}>“{quote}” <span>· Chia sẻ mẫu</span></blockquote>)}</div>)}
      </div>
    </section>
  );
}