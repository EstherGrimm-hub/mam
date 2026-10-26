"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Leaf, Menu, ShoppingBag, X } from "lucide-react";
import { useCart } from "@/components/CartProvider";
import CartDrawer from "@/components/CartDrawer";
import Logo from "@/components/Logo";

const links = [
  { href: "/san-pham", label: "Sản phẩm" },
  { href: "/ve-mam", label: "Câu chuyện mầm" },
  { href: "/lien-he", label: "Liên hệ" },
];

export default function SiteHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLElement>(null);
  const { itemCount } = useCart();

  useEffect(() => {
    if (!isMenuOpen) return;

    const menuButton = menuButtonRef.current;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    menuRef.current?.querySelector<HTMLElement>(".menu-close")?.focus();
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsMenuOpen(false);
      if (event.key !== "Tab") return;
      const focusable = menuRef.current?.querySelectorAll<HTMLElement>("a[href], button:not(:disabled)");
      if (!focusable?.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
      menuButton?.focus();
    };
  }, [isMenuOpen]);

  return (
    <header className="site-header">
      <div className="announcement">
        <Leaf size={13} aria-hidden="true" />
        <span>Miễn phí vận chuyển cho đơn hàng từ 249.000đ</span>
      </div>
      <div className="header-inner page-shell">
        <Logo variant="dark" height={34} className="header-logo" />
        <div className="header-actions">
          <nav ref={menuRef} id="primary-navigation" className={`main-nav${isMenuOpen ? " is-open" : ""}`} aria-label="Điều hướng chính">
            <div className="menu-fullscreen-top">
              <Logo variant="light" height={42} />
              <button className="menu-close" type="button" onClick={() => setIsMenuOpen(false)} aria-label="Đóng menu"><X size={22} /></button>
            </div>
            {links.map((link, index) => (
              <Link key={link.href} href={link.href} style={{ "--menu-index": index } as React.CSSProperties} onClick={() => setIsMenuOpen(false)}>
                <span>0{index + 1}</span>{link.label}
              </Link>
            ))}
            <p className="menu-caption">Natural Hair Care · Từ thiên nhiên, nuôi dưỡng vẻ đẹp Việt</p>
          </nav>
          <button className="cart-link cart-trigger" type="button" aria-label={`Mở giỏ hàng${itemCount ? `, ${itemCount} sản phẩm` : ""}`} onClick={() => setIsCartOpen(true)}>
            <ShoppingBag size={20} strokeWidth={1.7} />
            {itemCount > 0 && <span className="cart-count">{itemCount}</span>}
            <span className="cart-label">Giỏ hàng</span>
          </button>
          <button
            className="icon-button menu-toggle"
            type="button"
            ref={menuButtonRef}
            aria-label={isMenuOpen ? "Đóng menu" : "Mở menu"}
            aria-controls="primary-navigation"
            aria-expanded={isMenuOpen}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={21} /> : <Menu size={21} />}
          </button>
        </div>
      </div>
      {isCartOpen && <CartDrawer onClose={() => setIsCartOpen(false)} />}
    </header>
  );
}