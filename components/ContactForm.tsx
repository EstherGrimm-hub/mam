"use client";

import { useState, type FormEvent } from "react";
import { CheckCircle2, Send } from "lucide-react";

export default function ContactForm() {
  const [isSent, setIsSent] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [error, setError] = useState("");

  async function submitMessage(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setIsSending(true);
    const form = event.currentTarget;
    const formData = new FormData(form);
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(Object.fromEntries(formData.entries())),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error ?? "Tin nhắn chưa gửi được.");
      setIsSent(true);
      form.reset();
    } catch (submitError) {
      setError(submitError instanceof Error ? submitError.message : "Có lỗi xảy ra. Bạn thử lại nhé.");
    } finally {
      setIsSending(false);
    }
  }

  if (isSent) return <div className="contact-success"><CheckCircle2 size={24} /><p>mầm đã nhận được lời nhắn. Tụi mình sẽ sớm hồi âm bạn nhé.</p></div>;

  return (
    <form className="contact-form" onSubmit={submitMessage}>
      <label className="form-field">Tên của bạn<input name="name" required maxLength={100} autoComplete="name" /></label>
      <label className="form-field">Số điện thoại<input name="phone" type="tel" inputMode="tel" maxLength={16} autoComplete="tel" /></label>
      <label className="form-field">Email<input name="email" type="email" maxLength={150} autoComplete="email" /></label>
      <label className="form-field">Lời nhắn<textarea name="message" rows={5} required maxLength={1500} /></label>
      <label className="honeypot-field" aria-hidden="true">Không điền vào ô này<input name="website" tabIndex={-1} autoComplete="off" /></label>
      {error && <p className="checkout-error" role="alert">{error}</p>}
      <button className="button-primary" type="submit" disabled={isSending}><Send size={15} />{isSending ? "Đang gửi…" : "Gửi lời nhắn"}</button>
    </form>
  );
}