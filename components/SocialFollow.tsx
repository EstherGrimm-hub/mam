import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import Reveal from "@/components/Reveal";
import { SocialIcon } from "@/components/SocialLinks";
import { socialLinks } from "@/data/site";

export default function SocialFollow() {
  const availableLinks = socialLinks.filter((social) => social.href);
  if (!availableLinks.length) return null;

  return (
    <section className="social-follow page-shell" aria-labelledby="social-follow-title">
      <div className="social-follow-intro">
        <div className="social-follow-mark"><Image src="/images/brand/logo-mark-light.png" alt="Biểu trưng mầm" fill sizes="84px" /></div>
        <span className="eyebrow eyebrow-light">Ghé khu vườn của mầm</span>
        <h2 className="font-display" id="social-follow-title">Theo dõi mầm,<br /><em>xanh thêm mỗi ngày.</em></h2>
        <p>Mẹo chăm tóc, ưu đãi sớm và những câu chuyện thảo mộc — mầm chia sẻ đều đặn trên các kênh này.</p>
      </div>
      <div className="social-follow-grid">
        {availableLinks.map(({ platform, label, handle, cta, href }, index) => (
          <Reveal key={platform} delay={index * 70}>
            <a className={`social-card social-card-${platform}`} href={href!} target="_blank" rel="noreferrer" aria-label={`${label} của mầm: ${handle}`}>
              <span className="social-card-icon"><SocialIcon platform={platform} /></span>
              <span className="social-card-text">
                <small>{label}</small>
                <strong>{handle}</strong>
                <em>{cta}</em>
              </span>
              <ArrowUpRight className="social-card-arrow" size={18} />
            </a>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
