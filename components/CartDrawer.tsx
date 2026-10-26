"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Minus, Plus, Trash2, X } from "lucide-react";
import { formatPrice, products } from "@/data/products";
import { FREE_SHIPPING_THRESHOLD } from "@/data/store";
import { useCart } from "@/components/CartProvider";

export default function CartDrawer({ onClose }: { onClose: () => void }) {
  const { items, addItem, setQuantity, removeItem } = useCart();
  const lines = items.flatMap((line) => {
    const product = products.find((item) => item.id === line.productId);
    return product ? [{ ...line, product }] : [];
  });
  const subtotal = lines.reduce((sum, line) => sum + line.product.price * line.quantity, 0);
  const remainingForFreeShipping = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);
  const suggestions = products.filter((product) => !items.some((line) => line.productId === product.id)).slice(0, 2);

  return (
    <div className="drawer-backdrop" onMouseDown={(event) => event.target === event.currentTarget && onClose()}>
      <aside className="cart-drawer" role="dialog" aria-modal="true" aria-labelledby="cart-drawer-title">
        <div className="drawer-heading">
          <div><span className="eyebrow">Gói ghém điều lành</span><h2 id="cart-drawer-title">Giỏ hàng <small>({lines.reduce((count, line) => count + line.quantity, 0)})</small></h2></div>
          <button className="drawer-close" type="button" onClick={onClose} aria-label="Đóng giỏ hàng"><X size={20} /></button>
        </div>
        {lines.length ? <>
          <div className="drawer-shipping-progress" aria-live="polite">
            <p>{remainingForFreeShipping > 0 ? <>Còn thiếu <strong>{formatPrice(remainingForFreeShipping)}</strong> để được miễn phí vận chuyển</> : "Đơn hàng đã được miễn phí vận chuyển"}</p>
            <div className="shipping-progress-track" role="progressbar" aria-label="Tiến độ miễn phí vận chuyển" aria-valuemin={0} aria-valuemax={FREE_SHIPPING_THRESHOLD} aria-valuenow={Math.min(subtotal, FREE_SHIPPING_THRESHOLD)}><span style={{ width: `${Math.min(100, subtotal / FREE_SHIPPING_THRESHOLD * 100)}%` }} /></div>
          </div>
          <div className="drawer-items">
            {lines.map(({ product, quantity }) => <article className="drawer-item" key={product.id}>
              <Link className="drawer-item-image" href={`/san-pham/${product.slug}`} onClick={onClose}><Image src={product.images[0]} alt={product.name} fill sizes="76px" /></Link>
              <div className="drawer-item-copy">
                <Link href={`/san-pham/${product.slug}`} onClick={onClose}>{product.name}</Link>
                <span>{formatPrice(product.price)}</span>
                <div className="drawer-quantity"><button type="button" aria-label="Giảm số lượng" onClick={() => setQuantity(product.id, quantity - 1)}><Minus size={12} /></button><span>{quantity}</span><button type="button" aria-label="Tăng số lượng" onClick={() => setQuantity(product.id, quantity + 1)}><Plus size={12} /></button></div>
              </div>
              <button className="drawer-remove" type="button" aria-label={`Xóa ${product.name}`} onClick={() => removeItem(product.id)}><Trash2 size={15} /></button>
            </article>)}
            {suggestions.length > 0 && <div className="drawer-suggestions"><p>Thêm một chút chăm sóc</p>{suggestions.map((product) => <article className="drawer-suggestion" key={product.id}><Link href={`/san-pham/${product.slug}`} onClick={onClose}>{product.name}</Link><span>{formatPrice(product.price)}</span><button type="button" onClick={() => addItem(product.id)} aria-label={`Thêm ${product.name} vào giỏ`}>+</button></article>)}</div>}
          </div>
          <div className="drawer-footer">
            <div className="drawer-subtotal"><span>Tạm tính</span><strong>{formatPrice(subtotal)}</strong></div>
            <p>Phí vận chuyển được tính ở bước tiếp theo.</p>
            <Link href="/thanh-toan" className="button-primary" onClick={onClose}>Thanh toán <ArrowRight size={15} /></Link>
            <Link href="/gio-hang" className="drawer-view-cart" onClick={onClose}>Xem giỏ hàng</Link>
          </div>
        </> : <div className="drawer-empty"><p>Giỏ hàng còn trống, mình ghé khu vườn nhé.</p><Link href="/san-pham" className="button-primary" onClick={onClose}>Xem sản phẩm <ArrowRight size={15} /></Link></div>}
      </aside>
    </div>
  );
}