export default function KpiCard({ label, value, hint, tone = "default" }) {
  return (
    <article className={`kpi-card kpi-card--${tone}`}>
      <span className="micro-label">{label}</span>
      <strong>{value}</strong>
      <p>{hint}</p>
    </article>
  );
}
