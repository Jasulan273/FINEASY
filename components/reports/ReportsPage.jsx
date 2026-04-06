import { reportTemplates } from "../../mvpData";
import PageHeader from "../common/PageHeader";

export default function ReportsPage({
  reportType,
  setReportType,
  reportPeriod,
  setReportPeriod,
  includeForecast,
  setIncludeForecast,
  generatedReport,
  onGenerateReport,
}) {
  return (
    <div className="page-stack">
      <PageHeader
        eyebrow="Finance workspace"
        title="Reports"
        text="Build executive, cash flow, and profitability reports with configurable periods and forecast context."
        action={
          <button
            type="button"
            className="button button--primary"
            onClick={onGenerateReport}
          >
            Generate report
          </button>
        }
      />

      <section className="grid-section grid-section--main">
        <div className="panel-shell form-shell">
          <div className="panel-title">
            <div>
              <span className="micro-label">Report builder</span>
              <h2>Configuration</h2>
            </div>
          </div>

          <div className="stack-list">
            {reportTemplates.map((template) => (
              <button
                key={template.id}
                type="button"
                className={`template-card${
                  reportType === template.id ? " template-card--active" : ""
                }`}
                onClick={() => setReportType(template.id)}
              >
                <strong>{template.label}</strong>
                <span>{template.description}</span>
              </button>
            ))}
          </div>

          <div className="segmented-control segmented-control--wrap">
            {[3, 4].map((months) => (
              <button
                key={months}
                type="button"
                className={reportPeriod === months ? "is-active" : ""}
                onClick={() => setReportPeriod(months)}
              >
                {months}-month period
              </button>
            ))}
          </div>

          <label className="checkbox-row">
            <input
              type="checkbox"
              checked={includeForecast}
              onChange={(event) => setIncludeForecast(event.target.checked)}
            />
            Include six-month forecast section
          </label>
        </div>

        <div className="panel-shell">
          <div className="panel-title">
            <div>
              <span className="micro-label">Generated preview</span>
              <h2>{generatedReport.heading}</h2>
            </div>
            <span className="status-tag">Updated {generatedReport.generatedAt}</span>
          </div>

          <p className="report-body">{generatedReport.body}</p>

          <div className="report-highlights">
            {generatedReport.highlights.map((item) => (
              <article key={item} className="report-highlight">
                {item}
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
