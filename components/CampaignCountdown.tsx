"use client";

import { useSyncExternalStore } from "react";

type CampaignCountdownProps = {
  name: string;
  startsAt: string;
  endsAt: string;
};

function subscribe(onTick: () => void) {
  const timer = window.setInterval(onTick, 1000);
  return () => window.clearInterval(timer);
}

const getNowInSeconds = () => Math.floor(Date.now() / 1000);

export default function CampaignCountdown({ name, startsAt, endsAt }: CampaignCountdownProps) {
  const now = useSyncExternalStore(subscribe, getNowInSeconds, () => null);
  const start = Math.floor(new Date(startsAt).getTime() / 1000);
  const end = Math.floor(new Date(endsAt).getTime() / 1000);

  if (now !== null && now > end) {
    return <div className="campaign-countdown is-ended"><span className="campaign-countdown-label">{name} đã khép lại — hẹn bạn mùa sau</span></div>;
  }

  const isLive = now !== null && now >= start;
  const remaining = now === null ? null : Math.max(0, (isLive ? end : start) - now);
  const units = [
    ["Ngày", remaining === null ? null : Math.floor(remaining / 86400)],
    ["Giờ", remaining === null ? null : Math.floor((remaining % 86400) / 3600)],
    ["Phút", remaining === null ? null : Math.floor((remaining % 3600) / 60)],
    ["Giây", remaining === null ? null : remaining % 60],
  ] as const;

  return (
    <div className={`campaign-countdown${isLive ? " is-live" : ""}`} role="timer" aria-live="off">
      <span className="campaign-countdown-label">{isLive ? <><i aria-hidden="true" /> Đang diễn ra · kết thúc sau</> : "Mở màn sau"}</span>
      <div className="campaign-countdown-units">
        {units.map(([label, value]) => (
          <span key={label}>
            <strong>{value === null ? "--" : String(value).padStart(2, "0")}</strong>
            <small>{label}</small>
          </span>
        ))}
      </div>
    </div>
  );
}
