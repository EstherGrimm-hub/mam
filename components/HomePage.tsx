import Image from "next/image";
import Link from "next/link";
import { ArrowDown, ArrowRight, ArrowUpRight, Check, Leaf, MoveUpRight, Sparkles } from "lucide-react";
import CampaignCountdown from "@/components/CampaignCountdown";
import SocialFollow from "@/components/SocialFollow";
import ProductCard from "@/components/ProductCard";
import PackageSelector from "@/components/PackageSelector";
import SectionTitle from "@/components/SectionTitle";
import Reveal from "@/components/Reveal";
import MagneticLink from "@/components/MagneticLink";
import HeroArtwork from "@/components/HeroArtwork";
import HerbMarquee from "@/components/HerbMarquee";
import StoryJourney from "@/components/StoryJourney";
import CountUpStats from "@/components/CountUpStats";
import ProductHotspots from "@/components/ProductHotspots";
import TestimonialsMarquee from "@/components/TestimonialsMarquee";
import { socialLinks } from "@/data/site";
import { products } from "@/data/products";
import { campaign1212 } from "@/data/homepage";

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

const rescueSteps = [
  ["Gội", "Dầu gội thảo mộc", "dau-goi-thao-moc"],
  ["Xả", "Dầu xả mềm mượt", "dau-xa-phuc-hoi-mem-muot"],
  ["Ủ", "Kem ủ tóc", "kem-u-toc"],
  ["Dưỡng", "Serum tóc", "serum-toc"],
  ["Giữ ẩm", "Xịt dưỡng tóc", "xit-duong-toc"],
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
        <HeroArtwork src="/images/5-product.png" alt="Chai dầu gội thảo mộc mầm giữa lá xanh, bưởi và bồ kết" />
        <div className="hero-shade" />
        <div className="page-shell hero-content">
          <span className="hero-kicker"><Leaf size={15} /> Natural Hair Care · Chăm tóc từ gốc</span>
          <Reveal className="hero-title-reveal">
            <h1 className="font-display" aria-label="Từ một mầm xanh, đến mái tóc khỏe.">
              <span className="headline-line"><span>Từ một mầm xanh,</span></span>
              <span className="headline-line"><em>đến mái tóc khỏe.</em></span>
            </h1>
          </Reveal>
          <p>Một nghi thức nhỏ từ bưởi, bồ kết và những thảo mộc thân quen, cho mái tóc được nâng niu mỗi ngày.</p>
          <div className="hero-actions">
            <MagneticLink className="button-light" href="/san-pham">Mua trên web <ArrowRight size={16} /></MagneticLink>
            <a className="hero-story-link" href={socialLinks.find((social) => social.platform === "shopee")?.href ?? "https://shopee.vn/bennphuc"} target="_blank" rel="noreferrer">Xem trên Shopee <MoveUpRight size={15} /></a>
          </div>
          <div className="hero-note"><span>01 / 05</span><span className="hero-note-line" /><span>Chăm sóc tóc từ thiên nhiên</span></div>
        </div>
        <a href="#san-pham-noi-bat" className="hero-scroll" aria-label="Cuộn đến sản phẩm nổi bật"><ArrowDown size={18} /></a>
        <div className="hero-stamp"><span>GIEO LÀNH</span><Leaf size={20} /><span>GẶT XANH</span></div>
      </section>

      <HerbMarquee />

      <section className="campaign-spotlight page-shell" aria-labelledby="campaign-spotlight-title">
        <Reveal>
          <Link href="#uu-dai-12-12" className="campaign-spotlight-banner" aria-label="Xem các ưu đãi Siêu Sale 12.12">
            <Image src="/images/banner/banner-uu-dai.png" alt="Siêu Sale 12.12 mầm – Cứu tóc 7 ngày, combo đủ bộ 5 món giảm 14%, voucher 12.12, freeship từ 249K" width={1500} height={750} sizes="(max-width: 1280px) 100vw, 1240px" />
            <span className="campaign-sheen" aria-hidden="true" />
          </Link>
        </Reveal>
        <div className="campaign-spotlight-bar">
          <div className="campaign-spotlight-copy">
            <span className="campaign-badge"><Sparkles size={13} /> Siêu Sale 12.12 · {campaign1212.period}</span>
            <h2 className="font-display" id="campaign-spotlight-title">Đủ bộ 5 món, <em>giảm ngay 14%.</em></h2>
          </div>
          <CampaignCountdown startsAt={campaign1212.startsAt} endsAt={campaign1212.endsAt} />
          <div className="campaign-spotlight-actions">
            <MagneticLink className="button-primary" href="/san-pham/combo-du-bo-5-mon">Săn combo <ArrowRight size={16} /></MagneticLink>
            <a className="text-link" href="#uu-dai-12-12">Xem mọi ưu đãi <ArrowDown size={15} /></a>
          </div>
        </div>
      </section>

      <section className="section-products page-shell" id="san-pham-noi-bat">
        <div className="products-heading">
          <SectionTitle eyebrow="Được nâng niu mỗi ngày" title="Những mầm xanh bán chạy" description="Chăm sóc tóc thật lành, bắt đầu từ những lựa chọn giản dị." />
          <Link className="text-link" href="/san-pham">Xem tất cả sản phẩm <ArrowUpRight size={16} /></Link>
        </div>
        <div className="product-grid">{bestsellers.map((product, index) => <Reveal key={product.id} delay={index * 70}><ProductCard product={product} /></Reveal>)}</div>
      </section>

      <section className="section-products page-shell" id="uu-dai-12-12">
        <SectionTitle eyebrow={`Ưu đãi 12.12 · ${campaign1212.period}`} title="Mầm ưu đãi 12.12" description="Chọn món chăm tóc yêu thích, hoặc gom cả bộ để tiết kiệm hơn." />
        <div className="product-grid">
          {campaign1212.items.map((item, index) => (
            <Reveal key={item.href} delay={index * 60}>
              <Link href={item.href} className="campaign-card">
                <Image src={item.image} alt={item.alt} width={1080} height={1080} sizes="(max-width: 768px) 100vw, 33vw" />
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="rescue-campaign" aria-labelledby="rescue-campaign-title">
        <div className="page-shell">
          <div className="rescue-heading">
            <div>
              <span className="eyebrow eyebrow-light">Chiến dịch · Cứu tóc 7 ngày</span>
              <h2 className="font-display" id="rescue-campaign-title">Chăm tóc sớm,<br /><em>tự tin đón Tết.</em></h2>
            </div>
            <div className="rescue-heading-side">
              <p>Một tuần nâng niu trọn vẹn với đủ 5 bước thảo mộc — để mái tóc sẵn sàng rạng rỡ cho những ngày sum vầy.</p>
              <Link className="button-light" href="/san-pham/combo-du-bo-5-mon">Nhận combo đủ bộ <ArrowRight size={16} /></Link>
            </div>
          </div>
          <Reveal>
            <Link href="/san-pham/combo-du-bo-5-mon" className="rescue-banner" aria-label="Xem combo đủ bộ 5 món – Cứu tóc 7 ngày">
              <Image src="/images/banner/banner-chien-dich.png" alt="Chiến dịch Cứu tóc 7 ngày của mầm: chăm tóc sớm, tự tin đón Tết, combo đủ bộ 5 món giảm 14% từ 06 đến 19/12/2026" width={1500} height={750} sizes="(max-width: 1280px) 100vw, 1240px" />
              <span className="campaign-sheen" aria-hidden="true" />
            </Link>
          </Reveal>
          <ol className="rescue-steps">
            {rescueSteps.map(([name, note, slug], index) => (
              <Reveal key={slug} delay={index * 60}>
                <li>
                  <Link href={`/san-pham/${slug}`}>
                    <span className="rescue-step-number">0{index + 1}</span>
                    <strong>{name}</strong>
                    <small>{note}</small>
                    <ArrowUpRight className="rescue-step-arrow" size={15} />
                  </Link>
                </li>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      <PackageSelector />

      {featuredCombo && (
        <section className="combo-feature">
          <div className="page-shell combo-layout">
            <div className="combo-photo">
              <Image src="/images/kem-u-toc.png" alt="Kem ủ tóc trong bộ chăm sóc thảo mộc" fill sizes="(max-width: 768px) 100vw, 50vw" />
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

      <StoryJourney />
      <CountUpStats />

      <section className="ingredient-section">
        <div className="page-shell">
          <Image className="ingredient-doodle" src="/images/botanical-branch.svg" alt="" width={112} height={190} aria-hidden="true" />
          <SectionTitle eyebrow="Từ vườn cây Việt" title="Thảo mộc thân quen, chăm tóc dịu lành" description="Chọn những nguyên liệu gần gũi, gìn giữ nét đẹp tự nhiên trong từng bước chăm sóc." align="center" />
          <div className="ingredient-grid">
            {ingredients.map(([name, copy], index) => (
              <Reveal key={name} delay={index * 65}>
                <article className="ingredient-item">
                  <span className={`ingredient-number ingredient-number-${index + 1}`}>0{index + 1}</span>
                  <div className="ingredient-leaf"><Leaf size={24} strokeWidth={1.4} /></div>
                  <h3 className="font-display">{name}</h3><p>{copy}</p>
                </article>
              </Reveal>
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
            <Reveal key={number} delay={Number(number) * 70}>
              <div className="promise-row">
                <span>{number}</span><div><h3>{title}</h3><p>{copy}</p></div><ArrowUpRight size={18} />
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <ProductHotspots />
      <TestimonialsMarquee />

      <SocialFollow />

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