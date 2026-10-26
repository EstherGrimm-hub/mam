import type { Metadata } from "next";
import PolicyPage from "@/components/PolicyPage";

export const metadata: Metadata = { title: "Chính sách vận chuyển" };

export default function ShippingPage() {
  return <PolicyPage title="Chính sách vận chuyển" intro="mầm sẽ gói ghém đơn hàng cẩn thận và gửi đến địa chỉ bạn cung cấp. Nội dung dưới đây là mẫu để cửa hàng cập nhật theo đối tác vận chuyển thực tế." sections={[
    { title: "Phạm vi giao hàng", content: "mầm hiện tiếp nhận giao hàng tại các tỉnh, thành phố trên toàn quốc, tùy khả năng phục vụ của đơn vị vận chuyển." },
    { title: "Thời gian dự kiến", content: "Đơn hàng thường được xử lý trong 1–2 ngày làm việc sau khi xác nhận. Thời gian giao dự kiến từ 2–5 ngày làm việc tùy khu vực và có thể thay đổi trong dịp cao điểm." },
    { title: "Phí vận chuyển", content: "Đơn hàng từ 249.000đ được miễn phí vận chuyển. Đơn hàng dưới mức này tạm tính 30.000đ; mầm sẽ xác nhận lại nếu địa chỉ thuộc khu vực có phụ phí đặc biệt." },
    { title: "Theo dõi đơn hàng", content: "Sau khi đơn được gửi đi, bạn có thể tra cứu bằng mã đơn và số điện thoại trên trang Tra cứu đơn hàng hoặc liên hệ mầm để được hỗ trợ." },
  ]} />;
}