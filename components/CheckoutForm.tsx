"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { ArrowLeft, CheckCircle2, LockKeyhole } from "lucide-react";
import { products, formatPrice } from "@/data/products";
import { FREE_SHIPPING_THRESHOLD, SHIPPING_FEE } from "@/data/store";
import { useCart } from "@/components/CartProvider";

type PaymentMethod = "cod" | "transfer";

export default function CheckoutForm() {
  const { items, clearCart } = useCart();
  const [payment, setPayment] = useState<PaymentMethod>("cod");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [orderId, setOrderId] = useState("");
  const lines = items.flatMap((line) => {
    const product = products.find((item) => item.id === line.productId);
    return product ? [{ ...line, product }] : [];
  });
  const subtotal = lines.reduce((sum, line) => sum + line.product.price * line.quantity, 0);
  const shipping = subtotal === 0 || subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_FEE;

  async function submitOrder(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    if (lines.length === 0) {
      setError("Giỏ hàng của bạn đang trống.");
      return;
    }

    const formData = new FormData(event.currentTarget);
    const phone = String(formData.get("phone") ?? "").trim();
    if (!/^(?:0|\+?84)(?:3|5|7|8|9)\d{8}$/.test(phone.replace(/[ .-]/g, ""))) {
      setError("Bạn kiểm tra lại số điện thoại giúp mầm nhé.");
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customer: {
            name: formData.get("name"),
            phone,
            province: formData.get("province"),
            district: formData.get("district"),
            ward: formData.get("ward"),
            address: formData.get("address"),
            note: formData.get("note"),
          },
          paymentMethod: payment,
          items: lines.map(({ product, quantity }) => ({ productId: product.id, quantity })),
          website: formData.get("website"),
        }),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error ?? "mầm chưa thể tiếp nhận đơn lúc này.");
      setOrderId(result.orderId);
      clearCart();
    } catch (submitError) {
      setError(submitError instanceof Error ? submitError.message : "Có lỗi xảy ra. Bạn thử lại giúp mầm nhé.");
    } finally {
      setIsSubmitting(false);
    }
  }

  if (orderId) {
    return (
      <section className="order-success">
        <CheckCircle2 size={44} strokeWidth={1.4} />
        <span className="eyebrow">Đơn hàng đã được gửi</span>
        <h1 className="font-display">Cảm ơn bạn đã chọn mầm.</h1>
        <p>Mã đơn hàng của bạn là <strong>{orderId}</strong>. mầm sẽ liên hệ để xác nhận thông tin sớm nhất.</p>
        {payment === "transfer" && <p>Thông tin chuyển khoản sẽ được mầm gửi cùng tin nhắn xác nhận đơn hàng.</p>}
        <Link href="/san-pham" className="button-primary">Tiếp tục dạo chơi</Link>
      </section>
    );
  }

  if (lines.length === 0) {
    return <div className="checkout-empty"><p>Giỏ hàng đang trống, mình chọn sản phẩm trước nhé.</p><Link className="button-primary" href="/san-pham">Xem sản phẩm</Link></div>;
  }

  return (
    <form className="checkout-layout" onSubmit={submitOrder}>
      <div className="checkout-form-column">
        <Link className="back-link" href="/gio-hang"><ArrowLeft size={15} /> Quay lại giỏ hàng</Link>
        <section className="checkout-section">
          <h2>Thông tin nhận hàng</h2>
          <div className="form-grid">
            <label className="form-field full-width">Họ và tên<input autoComplete="name" name="name" required maxLength={100} /></label>
            <label className="form-field">Số điện thoại<input autoComplete="tel" inputMode="tel" name="phone" type="tel" required maxLength={16} placeholder="09xx xxx xxx" /></label>
            <label className="form-field">Tỉnh / thành phố<input autoComplete="address-level1" name="province" required maxLength={100} /></label>
            <label className="form-field">Quận / huyện<input autoComplete="address-level2" name="district" required maxLength={100} /></label>
            <label className="form-field">Phường / xã<input name="ward" required maxLength={100} /></label>
            <label className="form-field full-width">Số nhà, tên đường<input autoComplete="street-address" name="address" required maxLength={250} /></label>
            <label className="form-field full-width">Ghi chú cho mầm<textarea name="note" rows={3} maxLength={500} /></label>
          </div>
          <label className="honeypot-field" aria-hidden="true">Không điền vào ô này<input name="website" tabIndex={-1} autoComplete="off" /></label>
        </section>

        <section className="checkout-section">
          <h2>Phương thức thanh toán</h2>
          <div className="payment-options">
            <label className={`payment-option${payment === "cod" ? " is-selected" : ""}`}>
              <input type="radio" name="payment" value="cod" checked={payment === "cod"} onChange={() => setPayment("cod")} />
              <span><strong>Thanh toán khi nhận hàng</strong><small>COD · Trả tiền khi mầm giao đến</small></span>
            </label>
            <label className={`payment-option${payment === "transfer" ? " is-selected" : ""}`}>
              <input type="radio" name="payment" value="transfer" checked={payment === "transfer"} onChange={() => setPayment("transfer")} />
              <span><strong>Chuyển khoản ngân hàng</strong><small>Thông tin chuyển khoản sẽ được xác nhận sau</small></span>
            </label>
          </div>
          {payment === "transfer" && <div className="bank-placeholder"><div className="qr-placeholder" aria-label="Vị trí mã QR chuyển khoản"><span>QR</span><small>mã thanh toán</small></div><div><h3>Thông tin chuyển khoản</h3><p>Ngân hàng: <strong>Đang cập nhật</strong></p><p>Số tài khoản: <strong>Đang cập nhật</strong></p><p>Chủ tài khoản: <strong>mầm Natural Hair Care</strong></p><small>mầm sẽ gửi thông tin chính thức khi xác nhận đơn.</small></div></div>}
        </section>
        {error && <p className="checkout-error" role="alert">{error}</p>}
        <button className="button-primary submit-order" type="submit" disabled={isSubmitting}><LockKeyhole size={16} />{isSubmitting ? "Đang gửi đơn…" : "Đặt hàng"}</button>
        <p className="checkout-privacy">Thông tin của bạn chỉ được dùng để xử lý đơn hàng.</p>
      </div>
      <aside className="order-summary checkout-summary">
        <h2>Đơn hàng của bạn</h2>
        {lines.map(({ product, quantity }) => <div className="checkout-line" key={product.id}><span>{product.name} × {quantity}</span><strong>{formatPrice(product.price * quantity)}</strong></div>)}
        <div><span>Tạm tính</span><strong>{formatPrice(subtotal)}</strong></div>
        <div><span>Vận chuyển</span><strong>{shipping === 0 ? "Miễn phí" : formatPrice(shipping)}</strong></div>
        <div className="summary-total"><span>Tổng cộng</span><strong>{formatPrice(subtotal + shipping)}</strong></div>
        {subtotal < FREE_SHIPPING_THRESHOLD && <small>Đơn từ 249.000đ được miễn phí vận chuyển.</small>}
      </aside>
    </form>
  );
}