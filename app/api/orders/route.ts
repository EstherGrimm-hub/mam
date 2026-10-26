import { NextResponse } from "next/server";
import { products } from "@/data/products";
import { FREE_SHIPPING_THRESHOLD, SHIPPING_FEE } from "@/data/store";

type OrderItemInput = { productId: string; quantity: number };

function cleanText(value: unknown, maxLength: number) {
  return typeof value === "string" ? value.trim().slice(0, maxLength) : "";
}

function normalizePhone(value: string) {
  const phone = value.replace(/[ .-]/g, "");
  if (phone.startsWith("+84")) return `0${phone.slice(3)}`;
  if (phone.startsWith("84")) return `0${phone.slice(2)}`;
  return phone;
}

export async function GET(request: Request) {
  const url = new URL(request.url);
  const orderId = cleanText(url.searchParams.get("orderId"), 32).toUpperCase();
  const phone = normalizePhone(cleanText(url.searchParams.get("phone"), 16));
  if (!/^(?:MẦM|MAM)-\d{8}-[A-F0-9]{8}$/.test(orderId) || !/^(?:0|\+?84)(?:3|5|7|8|9)\d{8}$/.test(phone)) {
    return NextResponse.json({ error: "Mã đơn hoặc số điện thoại chưa hợp lệ." }, { status: 400 });
  }

  const sheetsWebhook = process.env.GOOGLE_SHEETS_WEBHOOK_URL;
  const sheetsSecret = process.env.GOOGLE_SHEETS_WEBHOOK_SECRET;
  if (!sheetsWebhook || !sheetsSecret) {
    return NextResponse.json({ error: "Chức năng tra cứu đang được cập nhật." }, { status: 503 });
  }

  try {
    const response = await fetch(sheetsWebhook, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "lookupOrder", secret: sheetsSecret, orderId, phone }),
      signal: AbortSignal.timeout(10000),
    });
    if (!response.ok) throw new Error(`Sheets lookup failed: ${response.status}`);
    const result = await response.json();
    if (!result.found) return NextResponse.json({ error: "Chưa tìm thấy đơn hàng khớp với thông tin này." }, { status: 404 });
    return NextResponse.json({ orderId, status: cleanText(result.status, 100) || "Đã tiếp nhận" });
  } catch (error) {
    console.error("Order lookup failed", error);
    return NextResponse.json({ error: "mầm chưa tra cứu được lúc này. Bạn thử lại sau nhé." }, { status: 502 });
  }
}

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Dữ liệu đơn hàng chưa đúng định dạng." }, { status: 400 });
  }

  // Honeypot: trả lời thành công với bot nhưng không gửi dữ liệu đi đâu.
  if (cleanText(body.website, 200)) {
    return NextResponse.json({ success: true, orderId: "" });
  }

  const customerInput = body.customer && typeof body.customer === "object"
    ? body.customer as Record<string, unknown>
    : {};
  const customer = {
    name: cleanText(customerInput.name, 100),
    phone: normalizePhone(cleanText(customerInput.phone, 16)),
    province: cleanText(customerInput.province, 100),
    district: cleanText(customerInput.district, 100),
    ward: cleanText(customerInput.ward, 100),
    address: cleanText(customerInput.address, 250),
    note: cleanText(customerInput.note, 500),
  };

  if (!customer.name || !customer.province || !customer.district || !customer.ward || !customer.address) {
    return NextResponse.json({ error: "Vui lòng điền đầy đủ thông tin nhận hàng." }, { status: 400 });
  }
  if (!/^(?:0|\+?84)(?:3|5|7|8|9)\d{8}$/.test(customer.phone)) {
    return NextResponse.json({ error: "Số điện thoại Việt Nam chưa hợp lệ." }, { status: 400 });
  }
  if (body.paymentMethod !== "cod" && body.paymentMethod !== "transfer") {
    return NextResponse.json({ error: "Phương thức thanh toán chưa hợp lệ." }, { status: 400 });
  }
  if (!Array.isArray(body.items) || body.items.length < 1 || body.items.length > 30) {
    return NextResponse.json({ error: "Giỏ hàng không hợp lệ." }, { status: 400 });
  }

  const orderItems = body.items as OrderItemInput[];
  const normalizedItems = [];
  for (const item of orderItems) {
    if (!item || typeof item.productId !== "string" || !Number.isInteger(item.quantity) || item.quantity < 1 || item.quantity > 20) {
      return NextResponse.json({ error: "Sản phẩm hoặc số lượng chưa hợp lệ." }, { status: 400 });
    }
    const product = products.find((entry) => entry.id === item.productId);
    if (!product) return NextResponse.json({ error: "Có sản phẩm không còn trong cửa hàng." }, { status: 400 });
    normalizedItems.push({
      productId: product.id,
      name: product.name,
      volume: product.volume,
      quantity: item.quantity,
      unitPrice: product.price,
      lineTotal: product.price * item.quantity,
    });
  }

  const subtotal = normalizedItems.reduce((total, item) => total + item.lineTotal, 0);
  const shipping = subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_FEE;
  const orderId = `MẦM-${new Date().toISOString().slice(0, 10).replaceAll("-", "")}-${crypto.randomUUID().slice(0, 8).toUpperCase()}`;
  const order = {
    orderId,
    createdAt: new Date().toISOString(),
    customer,
    paymentMethod: body.paymentMethod,
    items: normalizedItems,
    subtotal,
    shipping,
    total: subtotal + shipping,
  };

  const sheetsWebhook = process.env.GOOGLE_SHEETS_WEBHOOK_URL;
  const sheetsSecret = process.env.GOOGLE_SHEETS_WEBHOOK_SECRET;
  const telegramToken = process.env.TELEGRAM_BOT_TOKEN;
  const telegramChatId = process.env.TELEGRAM_CHAT_ID;
  if (!sheetsWebhook || !sheetsSecret || !telegramToken || !telegramChatId) {
    return NextResponse.json({ error: "Kênh nhận đơn chưa được cấu hình. Bạn vui lòng liên hệ mầm qua mạng xã hội." }, { status: 503 });
  }

  const message = [
    `ĐƠN HÀNG MỚI ${order.orderId}`,
    `Khách: ${customer.name}`,
    `Điện thoại: ${customer.phone}`,
    `Địa chỉ: ${customer.address}, ${customer.ward}, ${customer.district}, ${customer.province}`,
    `Thanh toán: ${body.paymentMethod === "cod" ? "COD" : "Chuyển khoản"}`,
    ...normalizedItems.map((item) => `- ${item.name} × ${item.quantity}: ${item.lineTotal.toLocaleString("vi-VN")}đ`),
    `Tạm tính: ${subtotal.toLocaleString("vi-VN")}đ`,
    `Phí vận chuyển: ${shipping === 0 ? "Miễn phí" : `${shipping.toLocaleString("vi-VN")}đ`}`,
    `Tổng đơn: ${order.total.toLocaleString("vi-VN")}đ`,
    customer.note ? `Ghi chú: ${customer.note}` : "",
  ].filter(Boolean).join("\n");

  try {
    const [sheetsResponse, telegramResponse] = await Promise.all([
      fetch(sheetsWebhook, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...order, action: "createOrder", secret: sheetsSecret }),
        signal: AbortSignal.timeout(10000),
      }),
      fetch(`https://api.telegram.org/bot${telegramToken}/sendMessage`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ chat_id: telegramChatId, text: message }),
        signal: AbortSignal.timeout(10000),
      }),
    ]);
    const [sheetsResult, telegramResult] = await Promise.all([
      sheetsResponse.json(),
      telegramResponse.json(),
    ]);
    if (!sheetsResponse.ok || !sheetsResult.success || !telegramResponse.ok || !telegramResult.ok) {
      console.error("Order integration failed", { sheetsStatus: sheetsResponse.status, telegramStatus: telegramResponse.status });
      return NextResponse.json({ error: "mầm chưa gửi được đơn hàng. Bạn vui lòng thử lại sau ít phút." }, { status: 502 });
    }
    return NextResponse.json({ success: true, orderId });
  } catch (error) {
    console.error("Order integration request failed", error);
    return NextResponse.json({ error: "Kết nối nhận đơn đang gián đoạn. Bạn vui lòng thử lại sau ít phút." }, { status: 502 });
  }
}