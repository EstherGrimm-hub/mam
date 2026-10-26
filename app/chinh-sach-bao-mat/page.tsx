import type { Metadata } from "next";
import PolicyPage from "@/components/PolicyPage";

export const metadata: Metadata = { title: "Chính sách bảo mật" };

export default function PrivacyPage() {
  return <PolicyPage title="Chính sách bảo mật" intro="mầm trân trọng sự riêng tư của bạn. Nội dung mẫu này cần được cửa hàng rà soát và cập nhật trước khi áp dụng chính thức." sections={[
    { title: "Thông tin được thu thập", content: "Khi bạn đặt hàng hoặc gửi tin nhắn, mầm tiếp nhận các thông tin cần thiết như họ tên, số điện thoại, địa chỉ giao hàng, email (nếu có) và nội dung ghi chú." },
    { title: "Mục đích sử dụng", content: "Thông tin được dùng để xác nhận, giao hàng, hỗ trợ sau mua và phản hồi yêu cầu của bạn. mầm không dùng thông tin để gửi nội dung tiếp thị khi chưa có sự đồng ý phù hợp." },
    { title: "Chia sẻ và lưu trữ", content: "Thông tin đơn hàng có thể được chuyển cho đơn vị vận chuyển và lưu trong hệ thống Google Sheets của cửa hàng để xử lý đơn. mầm giới hạn quyền truy cập cho người phụ trách." },
    { title: "Quyền của bạn", content: "Bạn có thể liên hệ mầm để yêu cầu kiểm tra, chỉnh sửa hoặc xóa thông tin cá nhân khi yêu cầu đó không ảnh hưởng đến nghĩa vụ lưu trữ theo quy định hiện hành." },
  ]} />;
}