import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Leaf } from "lucide-react";

export const metadata: Metadata = {
  title: "Về mầm",
  description: "Câu chuyện của mầm Natural Hair Care và cảm hứng chăm sóc tóc từ thảo mộc Việt.",
};

export default function AboutPage() {
  return (
    <div className="about-page">
      <section className="about-hero page-shell">
        <div className="about-copy">
          <span className="eyebrow"><Leaf size={14} /> Một khu vườn nhỏ</span>
          <h1 className="font-display">Từ thiên nhiên,<br /><em>nuôi dưỡng vẻ đẹp Việt.</em></h1>
          <p>mầm bắt đầu từ một niềm tin giản dị: mái tóc xứng đáng được chăm sóc bằng sự dịu dàng, và những điều gần gũi quanh ta luôn có thể trở thành nguồn cảm hứng đẹp.</p>
          <p>Tụi mình chọn thảo mộc Việt, kể câu chuyện bằng bao bì giấy mộc và tạo nên những bước chăm sóc vừa vặn với nhịp sống mỗi ngày.</p>
          <Link href="/san-pham" className="button-primary">Ghé thăm khu vườn <ArrowRight size={16} /></Link>
        </div>
        <div className="about-image"><Image src="/images/dau-goi-thao-moc.png" alt="Dầu gội thảo mộc mầm cùng nguyên liệu bưởi và bồ kết" fill priority sizes="(max-width: 760px) 100vw, 50vw" /></div>
      </section>
      <section className="about-values">
        <div className="page-shell">
          <span className="eyebrow">Điều mầm gìn giữ</span>
          <h2 className="font-display">Chậm một chút, để chăm sóc thật hơn.</h2>
          <div className="about-value-grid">
            <article><span>01</span><h3 className="font-display">Gần gũi</h3><p>Cảm hứng từ nguyên liệu thân quen trong nếp chăm sóc tóc Việt.</p></article>
            <article><span>02</span><h3 className="font-display">Dịu lành</h3><p>Chọn cách diễn đạt chân thật, tập trung vào trải nghiệm chăm sóc mỗi ngày.</p></article>
            <article><span>03</span><h3 className="font-display">Tử tế</h3><p>Để từng sản phẩm và lời hướng dẫn đều dễ hiểu, vừa vặn với bạn.</p></article>
          </div>
        </div>
      </section>
    </div>
  );
}