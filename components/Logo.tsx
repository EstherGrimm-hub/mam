import Image from "next/image";
import Link from "next/link";

type LogoProps = {
  variant: "dark" | "light";
  height?: number;
  className?: string;
};

export default function Logo({ variant, height = 40, className = "" }: LogoProps) {
  const source = variant === "dark" ? "/images/brand/logo-dark.png" : "/images/brand/logo-light.png";

  return (
    <Link className={`brand-logo brand-logo-${variant} ${className}`.trim()} href="/" aria-label="mầm - Natural Hair Care">
      <Image
        src={source}
        alt="mầm - Natural Hair Care"
        width={1200}
        height={537}
        priority={variant === "dark"}
        style={{ width: "auto", height }}
      />
      <span className="brand-logo-tagline">Natural Hair Care</span>
    </Link>
  );
}