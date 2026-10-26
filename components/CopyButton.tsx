"use client";

import { useEffect, useRef, useState } from "react";
import { Check, Copy } from "lucide-react";

export default function CopyButton({ value, label }: { value: string; label: string }) {
  const [copied, setCopied] = useState(false);
  const timer = useRef<number | null>(null);

  useEffect(() => () => {
    if (timer.current !== null) window.clearTimeout(timer.current);
  }, []);

  async function copyValue() {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      if (timer.current !== null) window.clearTimeout(timer.current);
      timer.current = window.setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  }

  return <button className="copy-button" type="button" onClick={copyValue} aria-label={`${copied ? "Đã sao chép" : `Sao chép ${label}`}: ${value}`}><span>{copied ? "Đã sao chép" : label}</span>{copied ? <Check size={15} /> : <Copy size={15} />}</button>;
}