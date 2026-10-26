"use client";

import { useState } from "react";
import Link from "next/link";
import { Leaf, Menu, ShoppingBag, X } from "lucide-react";
import { useCart } from "@/components/CartProvider";
import CartDrawer from "@/components/CartDrawer";

const links = [
  { href: "/san-pham", label: "Sản phẩm" },
  { href: "/ve-mam", label: "Câu chuyện mầm" },
  { href: "/lien-he", label: "Liên hệ" },
];

export default function SiteHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { itemCount } = useCart();

  return (
    <header className="site-header">
      <div className="announcement">
        <Leaf size={13} aria-hidden="true" />
        <span>Miễn phí vận chuyển cho đơn hàng từ 249.000đ</span>
      </div>
      <div className="header-inner page-shell">
        <button
          className="icon-button menu-toggle"
          type="button"
          aria-label={isMenuOpen ? "Đóng menu" : "Mở menu"}
          aria-expanded={isMenuOpen}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X size={21} /> : <Menu size={21} />}
        </button>
        <Link className="brand-lockup" href="/" aria-label="mầm, về trang chủ">
          <span className="brand-mark"><Leaf size={14} fill="currentColor" /></span>
          <span className="brand-name font-display">mầm</span>
          <span className="brand-tagline">NATURAL HAIR CARE</span>
        </Link>
        <nav className={`main-nav${isMenuOpen ? " is-open" : ""}`} aria-label="Điều hướng chính">
          {links.map((link) => (
            <Link key={link.href} href={link.href} onClick={() => setIsMenuOpen(false)}>
              {link.label}
            </Link>
          ))}
        </nav>
        <button className="cart-link cart-trigger" type="button" aria-label={`Mở giỏ hàng${itemCount ? `, ${itemCount} sản phẩm` : ""}`} onClick={() => setIsCartOpen(true)}>
          <ShoppingBag size={20} strokeWidth={1.7} />
          {itemCount > 0 && <span className="cart-count">{itemCount}</span>}
          <span className="cart-label">Giỏ hàng</span>
        </button>
      </div>
      {isCartOpen && <CartDrawer onClose={() => setIsCartOpen(false)} />}
    </header>
  );
}