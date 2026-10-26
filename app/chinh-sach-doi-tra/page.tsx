import type { Metadata } from "next";
import PolicyPage from "@/components/PolicyPage";

export const metadata: Metadata = { title: "Chính sách đổi trả" };

export default function ReturnsPage() {
  return <PolicyPage title="Chính sách đổi trả" intro="mầm mong bạn luôn an tâm khi chọn sản phẩm. Dưới đây là nội dung mẫu để cửa hàng cập nhật theo chính sách vận hành chính thức." sections={[
    { title: "Điều kiện tiếp nhận", content: "Bạn vui lòng liên hệ mầm trong vòng 7 ngày kể từ khi nhận hàng nếu sản phẩm bị lỗi do vận chuyển, giao sai sản phẩm hoặc có vấn đề từ phía cửa hàng. Sản phẩm cần còn nguyên tem, nhãn và chưa qua sử dụng, trừ trường hợp lỗi được xác nhận." },
    { title: "Cách gửi yêu cầu", content: "Gửi mã đơn hàng, số điện thoại đặt hàng và hình ảnh/video tình trạng sản phẩm qua trang Liên hệ hoặc kênh mạng xã hội chính thức. mầm sẽ phản hồi và hướng dẫn các bước tiếp theo." },
    { title: "Chi phí và thời gian xử lý", content: "Sau khi xác nhận điều kiện, mầm sẽ trao đổi phương án đổi sản phẩm hoặc hoàn tiền phù hợp. Chi phí vận chuyển phát sinh được thông báo trước khi xử lý." },
    { title: "Trường hợp không áp dụng", content: "Yêu cầu có thể không được tiếp nhận nếu sản phẩm đã qua sử dụng, hư hỏng do bảo quản không phù hợp hoặc quá thời hạn tiếp nhận nêu trên." },
  ]} />;
}