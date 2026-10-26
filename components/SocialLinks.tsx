import { socialLinks, type SocialPlatform } from "@/data/site";

function SocialIcon({ platform }: { platform: SocialPlatform }) {
  switch (platform) {
    case "facebook":
      return <svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M13.5 21v-8h2.7l.4-3.1h-3.1V8c0-.9.3-1.5 1.6-1.5h1.7V3.7c-.3 0-1.3-.1-2.5-.1-2.5 0-4.2 1.5-4.2 4.3v2h-2.8V13h2.8v8h3.4Z" /></svg>;
    case "instagram":
      return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true"><rect x="3.1" y="3.1" width="17.8" height="17.8" rx="5" /><circle cx="12" cy="12" r="4.1" /><circle cx="17.7" cy="6.5" r="1" fill="currentColor" stroke="none" /></svg>;
    case "tiktok":
      return <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M15.8 3h-3.1v12.2a2.8 2.8 0 1 1-2.4-2.8v-3.2a6 6 0 1 0 5.5 6V9a8 8 0 0 0 4.5 1.4V7.2A4.9 4.9 0 0 1 15.8 3Z" /></svg>;
    case "zalo":
      return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true"><path d="M5 4.5h14a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-6l-5 3v-3H5a2 2 0 0 1-2-2v-9a2 2 0 0 1 2-2Z" /><path d="M8 9h5l-5 5h5m2-5v5m0-2.5h3" /></svg>;
    case "shopee":
      return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 8h14l1 13H4L5 8Z" /><path d="M9 8V6a3 3 0 0 1 6 0v2m1.2 4.4c-.6-.6-1.4-.9-2.2-.9-1.1 0-1.8.6-1.8 1.4 0 2 4.2 1 4.2 3.5 0 .9-.8 1.6-2.1 1.6-1 0-1.9-.4-2.6-1.1" /></svg>;
  }
}

export default function SocialLinks({ showLabels = false }: { showLabels?: boolean }) {
  const availableLinks = socialLinks.filter((social) => social.href);
  if (!availableLinks.length) return null;

  return (
    <div className={showLabels ? "social-links" : "footer-social-links"}>
      {availableLinks.map(({ platform, label, href }) => (
        <a
          className={showLabels ? "social-link social-link-labeled" : "social-link"}
          href={href!}
          key={platform}
          target="_blank"
          rel="noreferrer"
          aria-label={`${label} của mầm`}
          title={label}
        >
          <SocialIcon platform={platform} />
          {showLabels && <span>{label}</span>}
        </a>
      ))}
    </div>
  );
}