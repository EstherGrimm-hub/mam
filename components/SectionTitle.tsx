type SectionTitleProps = {
  eyebrow: string;
  title: string;
  description?: string;
  align?: "left" | "center";
};

export default function SectionTitle({
  eyebrow,
  title,
  description,
  align = "left",
}: SectionTitleProps) {
  return (
    <div className={`section-title section-title-${align}`}>
      <span className="eyebrow">{eyebrow}</span>
      <h2 className="font-display">{title}</h2>
      {description && <p>{description}</p>}
    </div>
  );
}