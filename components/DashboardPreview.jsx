function DashboardPreview() {
  const bars = [
    { label: "Jan", value: 58 },
    { label: "Feb", value: 74 },
    { label: "Mar", value: 82 },
    { label: "Apr", value: 65 },
    { label: "May", value: 88 },
    { label: "Jun", value: 94 },
  ];

  return (
    <div className="dashboard-preview" aria-label="finEASY dashboard preview">
      <div className="dashboard-preview__topline">
        <div>
          <p className="dashboard-preview__label">Live operating view</p>
          <strong>SME financial health</strong>
        </div>
        <span className="status-pill">AI forecast synced</span>
      </div>

      <div className="dashboard-preview__metrics">
        <article>
          <span>Cash runway</span>
          <strong>8.4 months</strong>
          <small>up 14% vs last month</small>
        </article>
        <article>
          <span>Profit margin</span>
          <strong>26.8%</strong>
          <small>healthy operating range</small>
        </article>
        <article>
          <span>Risk signal</span>
          <strong>Low</strong>
          <small>alerts calibrated weekly</small>
        </article>
      </div>

      <div className="dashboard-preview__chart">
        <div className="dashboard-preview__chart-copy">
          <p>Forecasted cash flow</p>
          <strong>$146K</strong>
        </div>
        <div className="dashboard-preview__bars">
          {bars.map((bar) => (
            <div key={bar.label} className="dashboard-preview__bar-group">
              <div
                className="dashboard-preview__bar"
                style={{ height: `${bar.value}%` }}
              />
              <span>{bar.label}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="dashboard-preview__bottomline">
        <div className="insight-chip">
          <span className="insight-chip__title">Alert</span>
          <p>Expense growth is outpacing revenue by 6.2% this month.</p>
        </div>
        <div className="insight-chip">
          <span className="insight-chip__title">Recommendation</span>
          <p>Review supplier spend and keep premium plan forecasts active.</p>
        </div>
      </div>
    </div>
  );
}

export default DashboardPreview;
