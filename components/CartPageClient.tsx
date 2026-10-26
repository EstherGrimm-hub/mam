"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Minus, Plus, Trash2 } from "lucide-react";
import { products, formatPrice } from "@/data/products";
import { FREE_SHIPPING_THRESHOLD, SHIPPING_FEE } from "@/data/store";
import { useCart } from "@/components/CartProvider";

export default function CartPageClient() {
  const { items, setQuantity, removeItem } = useCart();
  const lines = items.flatMap((line) => {
    const product = products.find((item) => item.id === line.productId);
    return product ? [{ ...line, product }] : [];
  });
  const subtotal = lines.reduce((sum, line) => sum + line.product.price * line.quantity, 0);
  const shipping = subtotal === 0 || subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_FEE;

  if (lines.length === 0) {
    return (
      <div className="cart-empty page-shell">
        <span className="eyebrow">Chiếc giỏ đang đợi</span>
        <h1 className="font-display">Giỏ hàng còn trống.</h1>
        <p>Mời bạn dạo quanh khu vườn nhỏ của mầm và chọn điều lành cho mái tóc.</p>
        <Link className="button-primary" href="/san-pham">Khám phá sản phẩm <ArrowRight size={16} /></Link>
      </div>
    );
  }

  return (
    <div className="cart-page page-shell">
      <div className="cart-heading"><span className="eyebrow">Gói ghém điều lành</span><h1 className="font-display">Giỏ hàng của bạn</h1><p>{lines.length} món đang chờ bạn.</p></div>
      <div className="cart-layout">
        <div className="cart-lines">
          {lines.map(({ product, quantity }) => (
            <article className="cart-line" key={product.id}>
              <Link className="cart-product-image" href={`/san-pham/${product.slug}`}><Image src={product.images[0]} alt={product.name} fill sizes="120px" /></Link>
              <div className="cart-product-info">
                <Link className="cart-product-name" href={`/san-pham/${product.slug}`}>{product.name}</Link>
                <span>{product.volume}</span>
                <strong>{formatPrice(product.price)}</strong>
              </div>
              <div className="cart-line-actions">
                <div className="quantity-control compact" aria-label={`Số lượng ${product.name}`}>
                  <button type="button" aria-label="Giảm số lượng" onClick={() => setQuantity(product.id, quantity - 1)}><Minus size={13} /></button>
                  <span>{quantity}</span>
                  <button type="button" aria-label="Tăng số lượng" onClick={() => setQuantity(product.id, quantity + 1)}><Plus size={13} /></button>
                </div>
                <strong>{formatPrice(product.price * quantity)}</strong>
                <button className="remove-item" type="button" onClick={() => removeItem(product.id)} aria-label={`Xóa ${product.name}`}><Trash2 size={17} /></button>
              </div>
            </article>
          ))}
          <Link className="continue-shopping" href="/san-pham">← Tiếp tục chọn sản phẩm</Link>
        </div>
        <aside className="order-summary">
          <h2>Tóm tắt đơn hàng</h2>
          <div><span>Tạm tính</span><strong>{formatPrice(subtotal)}</strong></div>
          <div><span>Vận chuyển</span><strong>{shipping === 0 ? "Miễn phí" : formatPrice(shipping)}</strong></div>
          <p className="shipping-progress">{subtotal >= FREE_SHIPPING_THRESHOLD ? "Đơn hàng đã được miễn phí vận chuyển." : `Mua thêm ${formatPrice(FREE_SHIPPING_THRESHOLD - subtotal)} để được miễn phí vận chuyển.`}</p>
          <div className="summary-total"><span>Tổng cộng</span><strong>{formatPrice(subtotal + shipping)}</strong></div>
          <Link className="button-primary checkout-link" href="/thanh-toan">Tiến hành thanh toán <ArrowRight size={16} /></Link>
          <small>Phí vận chuyển sẽ được cập nhật theo chính sách giao hàng.</small>
        </aside>
      </div>
    </div>
  );
}