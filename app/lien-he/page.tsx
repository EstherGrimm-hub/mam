import type { Metadata } from "next";
import ContactForm from "@/components/ContactForm";
import CopyButton from "@/components/CopyButton";
import SocialLinks from "@/components/SocialLinks";

export const metadata: Metadata = { title: "Liên hệ mầm", description: "Gửi lời nhắn và nhận tư vấn chăm sóc tóc từ mầm." };

export default function ContactPage() {
  return (
    <div className="contact-page page-shell">
      <div className="contact-intro"><span className="eyebrow">mầm luôn lắng nghe</span><h1 className="font-display">Mình cùng<br /><em>trò chuyện nhé.</em></h1><p>Cần mầm gợi ý sản phẩm hay muốn chia sẻ điều gì? Tụi mình ở đây để lắng nghe.</p>
        <div className="contact-details">
          <div className="contact-copy-row"><a href="tel:0900000000">0900 000 000</a><CopyButton value="0900000000" label="Sao chép số điện thoại" /></div>
          <div className="contact-copy-row"><span>Zalo · 0900 000 000</span><CopyButton value="0900000000" label="Sao chép Zalo" /></div>
          <div className="contact-copy-row"><a href="mailto:hello@mamnature.vn">hello@mamnature.vn</a><CopyButton value="hello@mamnature.vn" label="Sao chép email" /></div>
          <span>09:00 – 21:00 · Mỗi ngày</span>
        </div>
        <SocialLinks showLabels />
      </div>
      <div className="contact-form-wrap"><h2>Gửi lời nhắn cho mầm</h2><ContactForm /></div>
    </div>
  );
}