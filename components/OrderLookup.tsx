"use client";

import { useState, type FormEvent } from "react";
import { Search } from "lucide-react";

export default function OrderLookup() {
  const [isSearching, setIsSearching] = useState(false);
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("");

  async function lookupOrder(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage("");
    setStatus("");
    setIsSearching(true);
    const formData = new FormData(event.currentTarget);
    const query = new URLSearchParams({ orderId: String(formData.get("orderId")), phone: String(formData.get("phone")) });
    try {
      const response = await fetch(`/api/orders?${query}`);
      const result = await response.json();
      if (!response.ok) throw new Error(result.error ?? "Chưa tra cứu được đơn hàng.");
      setStatus(result.status);
      setMessage(`Đơn ${result.orderId}`);
    } catch (lookupError) {
      setMessage(lookupError instanceof Error ? lookupError.message : "Có lỗi xảy ra. Bạn thử lại nhé.");
    } finally {
      setIsSearching(false);
    }
  }

  return (
    <div className="lookup-panel">
      <form className="lookup-form" onSubmit={lookupOrder}>
        <label className="form-field">Mã đơn hàng<input name="orderId" required placeholder="MẦM-20261026-AB12CD34" /></label>
        <label className="form-field">Số điện thoại đặt hàng<input name="phone" inputMode="tel" type="tel" required placeholder="09xx xxx xxx" /></label>
        <button className="button-primary" type="submit" disabled={isSearching}><Search size={16} />{isSearching ? "Đang tra cứu…" : "Tra cứu đơn"}</button>
      </form>
      {message && <div className={`lookup-result${status ? " is-found" : ""}`} role="status"><span>{message}</span>{status && <strong>{status}</strong>}</div>}
      <p className="lookup-help">Mã đơn được gửi trong tin nhắn xác nhận. Nếu cần thêm hỗ trợ, mời bạn <a href="/lien-he">liên hệ mầm</a>.</p>
    </div>
  );
}