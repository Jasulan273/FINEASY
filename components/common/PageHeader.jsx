export default function PageHeader({ eyebrow, title, text, action }) {
  return (
    <section className="page-header">
      <div>
        <span className="eyebrow">{eyebrow}</span>
        <h1>{title}</h1>
        <p>{text}</p>
      </div>
      {action ? <div className="page-header__action">{action}</div> : null}
    </section>
  );
}
