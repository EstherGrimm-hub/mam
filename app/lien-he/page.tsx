import type { Metadata } from "next";
import { AtSign, MessagesSquare, Music2, MessageCircle } from "lucide-react";
import ContactForm from "@/components/ContactForm";

export const metadata: Metadata = { title: "Liên hệ mầm", description: "Gửi lời nhắn và nhận tư vấn chăm sóc tóc từ mầm." };

export default function ContactPage() {
  return (
    <div className="contact-page page-shell">
      <div className="contact-intro"><span className="eyebrow">mầm luôn lắng nghe</span><h1 className="font-display">Mình cùng<br /><em>trò chuyện nhé.</em></h1><p>Cần mầm gợi ý sản phẩm hay muốn chia sẻ điều gì? Tụi mình ở đây để lắng nghe.</p>
        <div className="contact-details"><a href="tel:0900000000">0900 000 000</a><a href="mailto:hello@mamnature.vn">hello@mamnature.vn</a><span>09:00 – 21:00 · Mỗi ngày</span></div>
        <div className="social-links">
          <a href="https://zalo.me/0900000000" target="_blank" rel="noreferrer"><MessageCircle size={17} /> Zalo</a>
          <a href="https://facebook.com" target="_blank" rel="noreferrer"><MessagesSquare size={17} /> Facebook</a>
          <a href="https://instagram.com" target="_blank" rel="noreferrer"><AtSign size={17} /> Instagram</a>
          <a href="https://tiktok.com" target="_blank" rel="noreferrer"><Music2 size={17} /> TikTok</a>
        </div>
      </div>
      <div className="contact-form-wrap"><h2>Gửi lời nhắn cho mầm</h2><ContactForm /></div>
    </div>
  );
}