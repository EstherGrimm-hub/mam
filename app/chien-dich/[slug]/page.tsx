import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowDown, ArrowLeft, ArrowRight, ArrowUpRight, Sparkles } from "lucide-react";
import CampaignCountdown from "@/components/CampaignCountdown";
import MagneticLink from "@/components/MagneticLink";
import Reveal from "@/components/Reveal";
import SectionTitle from "@/components/SectionTitle";
import { campaigns, getCampaign } from "@/data/campaigns";

type CampaignPageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return campaigns.map((campaign) => ({ slug: campaign.slug }));
}

export async function generateMetadata({ params }: CampaignPageProps): Promise<Metadata> {
  const { slug } = await params;
  const campaign = getCampaign(slug);
  if (!campaign) return { title: "Không tìm thấy chiến dịch" };
  return {
    title: `${campaign.name} · ${campaign.period}`,
    description: campaign.description,
    openGraph: { title: campaign.name, description: campaign.description, images: [campaign.banner.image] },
  };
}

export default async function CampaignPage({ params }: CampaignPageProps) {
  const { slug } = await params;
  const campaign = getCampaign(slug);
  if (!campaign) notFound();

  const { rescue } = campaign;

  return (
    <div className="campaign-landing">
      <section className="campaign-spotlight campaign-landing-hero page-shell" aria-labelledby="campaign-landing-title">
        <Link href="/" className="back-link"><ArrowLeft size={15} /> Trang chủ</Link>
        <Reveal>
          <div className="campaign-spotlight-banner">
            <Image src={campaign.banner.image} alt={campaign.banner.alt} width={1500} height={750} sizes="(max-width: 1280px) 100vw, 1240px" priority />
            <span className="campaign-sheen" aria-hidden="true" />
          </div>
        </Reveal>
        <div className="campaign-spotlight-bar">
          <div className="campaign-spotlight-copy">
            <span className="campaign-badge"><Sparkles size={13} /> {campaign.name} · {campaign.period}</span>
            <h1 className="font-display" id="campaign-landing-title">{campaign.headline.lead} <em>{campaign.headline.accent}</em></h1>
          </div>
          <CampaignCountdown name={campaign.name} startsAt={campaign.startsAt} endsAt={campaign.endsAt} />
          <div className="campaign-spotlight-actions">
            <MagneticLink className="button-primary" href={campaign.primaryCta.href}>{campaign.primaryCta.label} <ArrowRight size={16} /></MagneticLink>
            <a className="text-link" href="#uu-dai">Xem mọi ưu đãi <ArrowDown size={15} /></a>
          </div>
        </div>
        <p className="campaign-landing-intro">{campaign.description}</p>
        <ul className="campaign-perks">
          {campaign.perks.map((perk, index) => (
            <Reveal key={perk.title} delay={index * 60}>
              <li><strong className="font-display">{perk.title}</strong><span>{perk.copy}</span></li>
            </Reveal>
          ))}
        </ul>
      </section>

      <section className="section-products page-shell" id="uu-dai">
        <SectionTitle eyebrow={`${campaign.name} · ${campaign.period}`} title={campaign.offersTitle} description="Chọn món chăm tóc yêu thích, hoặc gom cả bộ để tiết kiệm hơn." />
        <div className="product-grid">
          {campaign.offers.map((item, index) => (
            <Reveal key={item.href} delay={index * 60}>
              <Link href={item.href} className="campaign-card">
                <Image src={item.image} alt={item.alt} width={1080} height={1080} sizes="(max-width: 768px) 100vw, 33vw" />
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      {rescue && (
        <section className="rescue-campaign" aria-labelledby="rescue-campaign-title">
          <div className="page-shell">
            <div className="rescue-heading">
              <div>
                <span className="eyebrow eyebrow-light">{rescue.eyebrow}</span>
                <h2 className="font-display" id="rescue-campaign-title">{rescue.title.lead}<br /><em>{rescue.title.accent}</em></h2>
              </div>
              <div className="rescue-heading-side">
                <p>{rescue.copy}</p>
                <Link className="button-light" href={rescue.cta.href}>{rescue.cta.label} <ArrowRight size={16} /></Link>
              </div>
            </div>
            <Reveal>
              <Link href={rescue.cta.href} className="rescue-banner" aria-label={rescue.cta.label}>
                <Image src={rescue.banner.image} alt={rescue.banner.alt} width={1500} height={750} sizes="(max-width: 1280px) 100vw, 1240px" />
                <span className="campaign-sheen" aria-hidden="true" />
              </Link>
            </Reveal>
            <ol className="rescue-steps">
              {rescue.steps.map((step, index) => (
                <Reveal key={step.slug} delay={index * 60}>
                  <li>
                    <Link href={`/san-pham/${step.slug}`}>
                      <span className="rescue-step-number">0{index + 1}</span>
                      <strong>{step.name}</strong>
                      <small>{step.note}</small>
                      <ArrowUpRight className="rescue-step-arrow" size={15} />
                    </Link>
                  </li>
                </Reveal>
              ))}
            </ol>
          </div>
        </section>
      )}

      <section className="campaign-landing-cta page-shell">
        <h2 className="font-display">Chưa chọn được món nào?</h2>
        <p>Xem toàn bộ sản phẩm của mầm, hoặc nhắn mầm để được gợi ý theo tình trạng tóc của bạn.</p>
        <div className="hero-actions">
          <MagneticLink className="button-primary" href="/san-pham">Xem tất cả sản phẩm <ArrowRight size={16} /></MagneticLink>
          <Link className="text-link" href="/lien-he">Mình cần tư vấn <ArrowUpRight size={15} /></Link>
        </div>
      </section>
    </div>
  );
}
