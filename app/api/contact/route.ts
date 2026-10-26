import { NextResponse } from "next/server";

function text(value: unknown, limit: number) {
  return typeof value === "string" ? value.trim().slice(0, limit) : "";
}

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Nội dung chưa đúng định dạng." }, { status: 400 });
  }
  if (text(body.website, 200)) return NextResponse.json({ success: true });

  const name = text(body.name, 100);
  const phone = text(body.phone, 16);
  const email = text(body.email, 150);
  const message = text(body.message, 1500);
  if (!name || !message) return NextResponse.json({ error: "Bạn điền tên và lời nhắn giúp mầm nhé." }, { status: 400 });
  if (phone && !/^(?:0|\+?84)(?:3|5|7|8|9)\d{8}$/.test(phone.replace(/[ .-]/g, ""))) {
    return NextResponse.json({ error: "Số điện thoại chưa hợp lệ." }, { status: 400 });
  }
  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "Địa chỉ email chưa hợp lệ." }, { status: 400 });
  }

  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;
  if (!token || !chatId) return NextResponse.json({ error: "Kênh liên hệ chưa được cấu hình." }, { status: 503 });

  try {
    const response = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chat_id: chatId, text: [`TIN NHẮN LIÊN HỆ`, `Tên: ${name}`, phone ? `Điện thoại: ${phone}` : "", email ? `Email: ${email}` : "", `Lời nhắn: ${message}`].filter(Boolean).join("\n") }),
      signal: AbortSignal.timeout(10000),
    });
    if (!response.ok) throw new Error(`Telegram returned ${response.status}`);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Contact message failed", error);
    return NextResponse.json({ error: "Tin nhắn chưa gửi được. Bạn thử lại hoặc liên hệ mầm qua mạng xã hội nhé." }, { status: 502 });
  }
}