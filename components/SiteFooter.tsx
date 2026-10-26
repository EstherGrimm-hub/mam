import Link from "next/link";
import Logo from "@/components/Logo";
import SocialLinks from "@/components/SocialLinks";
import WaterPlant from "@/components/WaterPlant";

export default function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="footer-watermark" aria-hidden="true">mầm</div>
      <div className="page-shell footer-main">
        <div className="footer-brand">
          <Logo variant="light" height={48} className="footer-logo" />
          <p>Từ thiên nhiên, nuôi dưỡng vẻ đẹp Việt.</p>
          <SocialLinks />
        </div>
        <div className="footer-column">
          <h2>Bản đồ trang</h2>
          <Link href="/">Trang chủ</Link>
          <Link href="/san-pham">Tất cả sản phẩm</Link>
          <Link href="/ve-mam">Câu chuyện mầm</Link>
          <Link href="/tra-cuu-don-hang">Tra cứu đơn hàng</Link>
        </div>
        <div className="footer-column">
          <h2>Hỗ trợ</h2>
          <Link href="/chinh-sach-doi-tra">Đổi trả</Link>
          <Link href="/chinh-sach-van-chuyen">Vận chuyển</Link>
          <Link href="/chinh-sach-bao-mat">Bảo mật</Link>
        </div>
        <div className="footer-column footer-contact">
          <h2>Ghé thăm khu vườn</h2>
          <p>Thứ Hai – Chủ Nhật<br />09:00 – 21:00</p>
          <a href="mailto:hello@mamnature.vn">hello@mamnature.vn</a>
          <a href="tel:0900000000">0900 000 000</a>
        </div>
      </div>
      <div className="page-shell footer-game-wrap"><WaterPlant /></div>
      <div className="page-shell footer-bottom">
        <span>© 2026 mầm Natural Hair Care</span>
        <span>Chăm sóc dịu lành, từ những điều lành.</span>
      </div>
    </footer>
  );
}