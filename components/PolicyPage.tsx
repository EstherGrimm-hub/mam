type PolicySection = { title: string; content: string };

export default function PolicyPage({ title, intro, sections }: { title: string; intro: string; sections: PolicySection[] }) {
  return (
    <article className="policy-page page-shell">
      <span className="eyebrow">Thông tin dành cho bạn</span>
      <h1 className="font-display">{title}</h1>
      <p className="policy-intro">{intro}</p>
      <p className="policy-updated">Nội dung mẫu · Cập nhật tháng 10/2026</p>
      <div className="policy-content">
        {sections.map((section) => <section key={section.title}><h2>{section.title}</h2><p>{section.content}</p></section>)}
      </div>
    </article>
  );
}