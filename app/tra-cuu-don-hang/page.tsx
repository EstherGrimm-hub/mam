import type { Metadata } from "next";
import OrderLookup from "@/components/OrderLookup";

export const metadata: Metadata = { title: "Tra cứu đơn hàng", description: "Kiểm tra trạng thái đơn hàng mầm bằng mã đơn và số điện thoại.", robots: { index: false, follow: false } };

export default function OrderLookupPage() {
  return <div className="lookup-page page-shell"><span className="eyebrow">Hành trình của đơn hàng</span><h1 className="font-display">Đơn hàng đang ở đâu?</h1><p>Nhập mã đơn và số điện thoại bạn đã dùng khi đặt hàng nhé.</p><OrderLookup /></div>;
}