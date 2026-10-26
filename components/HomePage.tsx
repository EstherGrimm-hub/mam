import Image from "next/image";
import Link from "next/link";
import { ArrowDown, ArrowRight, ArrowUpRight, Check, Leaf, MoveUpRight, Sparkles } from "lucide-react";
import ProductCard from "@/components/ProductCard";
import SectionTitle from "@/components/SectionTitle";
import FadeUp from "@/components/FadeUp";
import { socialLinks } from "@/data/site";
import { products } from "@/data/products";

const ingredients = [
  ["Bưởi", "Hương thơm tươi mát, quen thuộc trong nếp chăm tóc Việt."],
  ["Bồ kết", "Nguyên liệu gội đầu mộc mạc được lưu truyền qua nhiều thế hệ."],
  ["Hương nhu", "Nốt hương thảo mộc dịu nhẹ trong sản phẩm chăm sóc tóc."],
  ["Hà thủ ô", "Thảo mộc truyền thống, góp mặt trong công thức xịt dưỡng."],
  ["Lô hội", "Thành phần giàu độ ẩm, dịu dàng chăm sóc thân tóc."],
];

const promises = [
  ["01", "Cảm hứng từ thảo mộc Việt", "Chắt lọc từ những nguyên liệu quen thuộc trong nếp chăm tóc của người Việt."],
  ["02", "Chăm sóc dịu nhẹ mỗi ngày", "Công thức hướng đến cảm giác dễ chịu, phù hợp với nhịp sống thường ngày."],
  ["03", "Nâng niu từng mái tóc", "Hướng dẫn dùng rõ ràng, để bạn hiểu mái tóc mình hơn qua mỗi lần chăm sóc."],
];

const reviews = [
  ["“Mùi bưởi thoang thoảng rất dễ chịu, tóc sạch mà không có cảm giác khô căng.”", "Minh Anh", "Dầu gội thảo mộc"],
  ["“Tóc mình dễ rối, dùng dầu xả xong chải nhẹ nhàng hơn hẳn. Bao bì cũng xinh.”", "Thu Hà", "Dầu xả phục hồi & mềm mượt"],
  ["“Mình thích cách mầm hướng dẫn dùng rất rõ, bộ gội xả ủ hợp với routine của mình.”", "Ngọc Linh", "Combo Gội, Xả & Ủ"],
];

const faqs = [
  ["Sản phẩm mầm phù hợp với loại tóc nào?", "Mỗi mái tóc có nhu cầu khác nhau. Bạn có thể xem mô tả và hướng dẫn của từng sản phẩm, hoặc nhắn mầm để được gợi ý theo tình trạng tóc hiện tại."],
  ["Dùng dầu gội và dầu xả như thế nào?", "Làm sạch tóc với dầu gội trước, sau đó thoa dầu xả ở thân và ngọn tóc trong 2–3 phút rồi xả sạch."],
  ["Đơn hàng bao lâu thì được giao?", "Thời gian giao hàng phụ thuộc vào khu vực nhận hàng. mầm sẽ cập nhật thông tin vận chuyển sau khi xác nhận đơn."],
  ["Đơn hàng bao nhiêu thì được miễn phí vận chuyển?", "mầm miễn phí vận chuyển cho đơn hàng từ 249.000đ."],
];

export default function HomePage() {
  const bestsellers = products.slice(0, 4);
  const featuredCombo = products.find((product) => product.slug === "combo-goi-xa-u");

  return (
    <div className="home-page">
      <section className="home-hero">
        <Image className="hero-image" src="/images/dau-goi-thao-moc.png" alt="Dầu gội thảo mộc mầm giữa tán lá xanh" fill priority sizes="100vw" />
        <div className="hero-shade" />
        <div className="page-shell hero-content">
          <span className="hero-kicker"><Leaf size={15} /> Vẻ đẹp Việt, từ những điều lành</span>
          <h1 className="font-display">Sạch tóc.<br />Mềm mượt.<br /><em>Hỗ trợ giảm gãy rụng.</em></h1>
          <p>Chăm sóc mái tóc bằng sự dịu dàng của thảo mộc Việt, để mỗi ngày bắt đầu thật nhẹ tênh.</p>
          <div className="hero-actions">
            <Link className="button-light" href="/san-pham">Khám phá sản phẩm <ArrowRight size={16} /></Link>
            <Link className="hero-story-link" href="/ve-mam">Chuyện của mầm <MoveUpRight size={15} /></Link>
          </div>
          <div className="hero-note"><span>01 / 05</span><span className="hero-note-line" /><span>Chăm sóc tóc từ thiên nhiên</span></div>
        </div>
        <a href="#san-pham-noi-bat" className="hero-scroll" aria-label="Cuộn đến sản phẩm nổi bật"><ArrowDown size={18} /></a>
        <div className="hero-stamp"><span>GIEO LÀNH</span><Leaf size={20} /><span>GẶT XANH</span></div>
      </section>

      <section className="section-products page-shell" id="san-pham-noi-bat">
        <div className="products-heading">
          <SectionTitle eyebrow="Được nâng niu mỗi ngày" title="Những mầm xanh bán chạy" description="Chăm sóc tóc thật lành, bắt đầu từ những lựa chọn giản dị." />
          <Link className="text-link" href="/san-pham">Xem tất cả sản phẩm <ArrowUpRight size={16} /></Link>
        </div>
        <div className="product-grid">{bestsellers.map((product, index) => <FadeUp key={product.id} delay={index * 70}><ProductCard product={product} /></FadeUp>)}</div>
      </section>

      {featuredCombo && (
        <section className="combo-feature">
          <div className="page-shell combo-layout">
            <div className="combo-photo">
              <Image src="/images/kem-u-toc.jpg" alt="Kem ủ tóc trong bộ chăm sóc thảo mộc" fill sizes="(max-width: 768px) 100vw, 50vw" />
              <span className="combo-photo-label">Bộ chăm sóc 3 bước</span>
            </div>
            <div className="combo-copy">
              <span className="eyebrow eyebrow-light">Chăm tóc đủ đầy</span>
              <p className="combo-overline">BỘ BA THẢO MỘC · ƯU ĐÃI 27%</p>
              <h2 className="font-display">Một chút dịu dàng,<br /><em>cho cả mái tóc.</em></h2>
              <p>{featuredCombo.shortDesc} Gội sạch, dưỡng mềm, rồi dành cho tóc một khoảng nghỉ với kem ủ.</p>
              <ul>
                <li><Check size={16} /> Dầu gội thảo mộc 300ml</li>
                <li><Check size={16} /> Dầu xả mềm mượt 200ml</li>
                <li><Check size={16} /> Kem ủ tóc 200ml</li>
              </ul>
              <div className="combo-price"><strong>429.000đ</strong><del>587.000đ</del></div>
              <Link className="button-light" href={`/san-pham/${featuredCombo.slug}`}>Xem combo <ArrowRight size={16} /></Link>
            </div>
          </div>
        </section>
      )}

      <section className="ingredient-section">
        <div className="page-shell">
          <Image className="ingredient-doodle" src="/images/botanical-branch.svg" alt="" width={112} height={190} aria-hidden="true" />
          <SectionTitle eyebrow="Từ vườn cây Việt" title="Thảo mộc thân quen, chăm tóc dịu lành" description="Chọn những nguyên liệu gần gũi, gìn giữ nét đẹp tự nhiên trong từng bước chăm sóc." align="center" />
          <div className="ingredient-grid">
            {ingredients.map(([name, copy], index) => (
              <FadeUp key={name} delay={index * 65}>
                <article className="ingredient-item">
                  <span className={`ingredient-number ingredient-number-${index + 1}`}>0{index + 1}</span>
                  <div className="ingredient-leaf"><Leaf size={24} strokeWidth={1.4} /></div>
                  <h3 className="font-display">{name}</h3><p>{copy}</p>
                </article>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      <section className="promise-section page-shell">
        <div className="promise-intro">
          <span className="eyebrow">Lời hứa của mầm</span>
          <h2 className="font-display">Dịu dàng với tóc.<br /><em>Tử tế với thiên nhiên.</em></h2>
          <p>mầm tin rằng chăm sóc tóc không cần cầu kỳ. Chỉ cần bắt đầu bằng những điều gần gũi và sự nâng niu vừa đủ.</p>
          <Link className="text-link" href="/ve-mam">Tìm hiểu về mầm <ArrowUpRight size={16} /></Link>
        </div>
        <div className="promise-list">
          {promises.map(([number, title, copy]) => (
            <FadeUp key={number} delay={Number(number) * 70}>
              <div className="promise-row">
                <span>{number}</span><div><h3>{title}</h3><p>{copy}</p></div><ArrowUpRight size={18} />
              </div>
            </FadeUp>
          ))}
        </div>
      </section>

      <section className="review-section">
        <div className="page-shell">
          <SectionTitle eyebrow="Lời thương gửi mầm" title="Một chút vui từ mái tóc" description="Những chia sẻ giản dị trong hành trình chăm sóc tóc mỗi ngày." align="center" />
          <div className="review-grid">
            {reviews.map(([quote, name, product]) => (
              <FadeUp key={name} delay={reviews.indexOf(reviews.find((review) => review[1] === name)!) * 80}>
                <figure className="review-card">
                  <div className="review-stars" aria-label="5 trên 5 sao">★★★★★</div>
                  <blockquote>{quote}</blockquote>
                  <figcaption><span className="review-avatar">{name.charAt(0)}</span><span><strong>{name}</strong><small>{product}</small></span><Sparkles size={17} /></figcaption>
                </figure>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      <section className="shopee-banner page-shell">
        <div className="shopee-mark"><Image src="/images/brand/logo-mark-light.png" alt="Biểu trưng mầm" fill sizes="96px" /></div>
        <div><span className="eyebrow eyebrow-light">Ghé khu vườn của mầm</span><h2 className="font-display">Gặp mầm trên Shopee</h2><p>Chọn món thương bạn, mầm gói ghém gửi đến tận nhà.</p></div>
        <a className="button-light" href={socialLinks.find((social) => social.platform === "shopee")?.href ?? "https://shopee.vn/bennphuc"} target="_blank" rel="noreferrer">Ghé gian hàng <ArrowUpRight size={16} /></a>
      </section>

      <section className="faq-section page-shell">
        <div className="faq-heading"><SectionTitle eyebrow="Bạn hỏi, mầm thưa" title="Một vài điều bạn muốn biết" description="Cùng tìm hiểu kỹ hơn trước khi chọn sản phẩm cho mái tóc." /><Link className="text-link" href="/lien-he">Mình cần tư vấn <ArrowRight size={15} /></Link></div>
        <div className="faq-list">
          {faqs.map(([question, answer]) => (
            <details className="faq-item" key={question}><summary>{question}<span><ArrowDown size={17} /></span></summary><p>{answer}</p></details>
          ))}
        </div>
      </section>
    </div>
  );
}