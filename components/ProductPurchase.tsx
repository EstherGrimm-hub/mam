"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Minus, Plus, ShoppingBag } from "lucide-react";
import { formatPrice, type Product } from "@/data/products";
import { useCart } from "@/components/CartProvider";

export default function ProductPurchase({ product }: { product: Product }) {
  const [quantity, setQuantity] = useState(1);
  const [isStickyVisible, setIsStickyVisible] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const toastTimer = useRef<number | null>(null);
  const { addItem } = useCart();
  const router = useRouter();

  useEffect(() => {
    const panel = panelRef.current;
    if (!panel || !("IntersectionObserver" in window)) return;
    const observer = new IntersectionObserver(([entry]) => setIsStickyVisible(!entry.isIntersecting), { threshold: 0.1 });
    observer.observe(panel);
    return () => observer.disconnect();
  }, []);

  useEffect(() => () => {
    if (toastTimer.current !== null) window.clearTimeout(toastTimer.current);
  }, []);

  function addToCart() {
    addItem(product.id, quantity);
    setShowToast(true);
    if (toastTimer.current !== null) window.clearTimeout(toastTimer.current);
    toastTimer.current = window.setTimeout(() => setShowToast(false), 1800);
  }

  function buyNow() {
    addItem(product.id, quantity);
    router.push("/thanh-toan");
  }

  return (
    <>
    <div className="purchase-panel" ref={panelRef}>
      <div className="quantity-control" aria-label="Số lượng">
        <button type="button" aria-label="Giảm số lượng" onClick={() => setQuantity((value) => Math.max(1, value - 1))}><Minus size={15} /></button>
        <span aria-live="polite">{quantity}</span>
        <button type="button" aria-label="Tăng số lượng" onClick={() => setQuantity((value) => value + 1)}><Plus size={15} /></button>
      </div>
      <div className="purchase-buttons">
        <button className="button-outline purchase-add" type="button" onClick={addToCart}><ShoppingBag size={17} /> Thêm vào giỏ</button>
        <button className="button-primary purchase-buy" type="button" onClick={buyNow}>Mua ngay</button>
      </div>
    </div>
    {isStickyVisible && <div className="mobile-sticky-buy"><div><strong>{formatPrice(product.price)}</strong><span>{product.name}</span></div><button type="button" onClick={addToCart}><ShoppingBag size={16} /> Thêm vào giỏ</button></div>}
    {showToast && <p className="cart-toast" role="status">Đã thêm vào giỏ</p>}
    </>
  );
}