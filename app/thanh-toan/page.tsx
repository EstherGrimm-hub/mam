import type { Metadata } from "next";
import CheckoutForm from "@/components/CheckoutForm";

export const metadata: Metadata = { title: "Thanh toán", robots: { index: false, follow: false } };

export default function CheckoutPage() {
  return <div className="checkout-page page-shell"><div className="checkout-title"><span className="eyebrow">Chỉ còn một bước nhỏ</span><h1 className="font-display">Hoàn tất đơn hàng</h1></div><CheckoutForm /></div>;
}