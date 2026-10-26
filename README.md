# mầm Natural Hair Care

Website bán hàng của thương hiệu chăm sóc tóc mầm, xây dựng bằng Next.js App Router, TypeScript và Tailwind CSS. Dữ liệu sản phẩm nằm trong mã nguồn; giỏ hàng lưu trên trình duyệt. Đơn hàng được gửi tới Google Sheets và Telegram khi đã cấu hình các biến môi trường.

## Chạy local

Yêu cầu Node.js 20 trở lên và npm.

```powershell
npm install
Copy-Item .env.example .env.local
npm run dev
```

Mở http://localhost:3000. Build production bằng `npm run build`, chạy bản build bằng `npm run start`.

Khi chưa cấu hình webhook và Telegram, website vẫn chạy và mua sắm được, nhưng API đặt hàng sẽ báo kênh nhận đơn chưa sẵn sàng. Không điền secret vào mã nguồn hoặc commit `.env.local`.

## Sản phẩm và hình ảnh

Chỉnh tên, slug, loại, giá bán, giá so sánh, dung tích, mô tả, lợi ích, thành phần, hướng dẫn và khối lượng trong `data/products.ts`. Mỗi sản phẩm cần có đúng 5 lợi ích. Ảnh đặt trong `public/images/`; dùng đường dẫn dạng `/images/ten-slug.jpg` trong trường `images`. Thêm sản phẩm combo bằng `category: "combo"` và cập nhật ảnh, giá, lợi ích theo bộ.

Phí vận chuyển và ngưỡng miễn phí nằm trong `data/store.ts`. Hiện phí dưới ngưỡng đang là 30.000đ, ngưỡng miễn phí là 249.000đ. Rà soát chính sách mẫu ở `app/chinh-sach-*` trước khi bán chính thức.

## Nhận đơn qua Google Sheets

1. Tạo Google Sheet mới, mở **Tiện ích mở rộng → Apps Script**, dán nội dung từ `scripts/google-sheets.gs`.
2. Trong **Project Settings → Script properties**, tạo `SPREADSHEET_ID` (ID trong URL Google Sheet) và `WEBHOOK_SECRET` (một chuỗi bí mật tự tạo).
3. Deploy Apps Script dưới dạng **Web app**, chạy với quyền của bạn và cho phép truy cập bằng URL web app. URL endpoint được xem như thông tin bí mật.
4. Tạo bot Telegram bằng BotFather, lấy bot token và chat ID nhận thông báo. Gửi `/start` cho bot trước khi kiểm tra gửi tin.
5. Điền `.env.local`:

```env
NEXT_PUBLIC_SITE_URL=http://localhost:3000
GOOGLE_SHEETS_WEBHOOK_URL=https://script.google.com/macros/s/DEPLOYMENT_ID/exec
GOOGLE_SHEETS_WEBHOOK_SECRET=chuoi_bi_mat_trung_voi_script_property
TELEGRAM_BOT_TOKEN=token_cua_bot
TELEGRAM_CHAT_ID=chat_id_nhan_thong_bao
```

Apps Script tạo tab **Đơn hàng** và các cột dữ liệu khi nhận đơn đầu tiên. Tra cứu đơn dùng cùng webhook, mã đơn và số điện thoại. Có thể cập nhật cột **Trạng thái** trực tiếp trong Sheet để website hiển thị trạng thái đó.

## Thanh toán và thông tin cửa hàng

- Phương thức chuyển khoản hiện là vị trí chờ; điền tên ngân hàng, số tài khoản và chủ tài khoản tại `components/CheckoutForm.tsx`, đồng thời thay khung QR bằng mã QR thật trước khi bật phương thức này.
- Cập nhật điện thoại, email, Zalo, Facebook, Instagram và TikTok tại `app/lien-he/page.tsx` và thông tin footer tại `components/SiteFooter.tsx`.
- Thay URL Shopee trong `components/HomePage.tsx` bằng gian hàng chính thức.
- Thay nội dung chính sách mẫu bằng điều khoản đã được cửa hàng phê duyệt.

## SEO

Metadata chung và Open Graph nằm trong `app/layout.tsx`. Metadata riêng được khai báo ở từng route. `app/sitemap.ts` tạo sitemap từ trang và danh sách sản phẩm; `app/robots.ts` tạo robots.txt. Khi dùng tên miền thật, đặt `NEXT_PUBLIC_SITE_URL` thành URL gốc, ví dụ `https://mam.vn`.

## Deploy lên Vercel

1. Đẩy repository lên GitHub/GitLab/Bitbucket và import project trong Vercel. Framework được nhận diện tự động; lệnh build mặc định là `npm run build`.
2. Trong **Project Settings → Environment Variables**, thêm `NEXT_PUBLIC_SITE_URL`, `GOOGLE_SHEETS_WEBHOOK_URL`, `GOOGLE_SHEETS_WEBHOOK_SECRET`, `TELEGRAM_BOT_TOKEN` và `TELEGRAM_CHAT_ID` cho môi trường Production (và Preview nếu cần).
3. Deploy lại sau khi thêm hoặc đổi biến môi trường.
4. Trong **Settings → Domains**, thêm tên miền riêng. Tại nhà cung cấp domain, cấu hình các bản ghi DNS mà Vercel hiển thị, rồi chờ trạng thái xác minh hoàn tất.
5. Cập nhật `NEXT_PUBLIC_SITE_URL` thành tên miền HTTPS chính thức và deploy lại để sitemap, robots và metadata dùng đúng URL.

## Ghi chú

Đơn đặt hàng không được lưu trong cơ sở dữ liệu của website; Google Sheets là nơi lưu đơn khi webhook hoạt động. Nếu một dịch vụ nhận đơn tạm thời gián đoạn, khách sẽ nhận thông báo lỗi để thử lại. Hãy kiểm tra Google Sheets và Telegram sau đơn thử trước khi mở bán.
