import PageHeader from "../common/PageHeader";

export default function IntegrationsPage({ integrations, onSync, syncMessage }) {
  const connectedCount = integrations.filter(
    (integration) => integration.status === "connected",
  ).length;

  return (
    <div className="page-stack">
      <PageHeader
        eyebrow="Finance workspace"
        title="Integrations"
        text="Connect accounting sources, refresh sync states, and keep transaction data flowing into the platform."
        action={<span className="status-tag">{connectedCount} connected sources</span>}
      />

      <section className="grid-section grid-section--cards">
        {integrations.map((integration) => (
          <article key={integration.id} className="integration-card">
            <div className="integration-card__top">
              <div>
                <span className="micro-label">{integration.category}</span>
                <h2>{integration.name}</h2>
              </div>
              <span className={`status-tag status-tag--${integration.status}`}>
                {integration.status}
              </span>
            </div>
            <p>{integration.description}</p>
            <div className="integration-card__meta">
              <span>Last sync</span>
              <strong>{integration.lastSync}</strong>
            </div>
            <button
              type="button"
              className="button button--secondary"
              onClick={() => onSync(integration.id)}
            >
              {integration.status === "connected" ? "Sync now" : "Connect source"}
            </button>
          </article>
        ))}
      </section>

      <section className="panel-shell">
        <div className="panel-title">
          <div>
            <span className="micro-label">Latest integration event</span>
            <h2>Sync log</h2>
          </div>
        </div>
        <p className="report-body">{syncMessage}</p>
      </section>
    </div>
  );
}
