import { riskModes } from "../../mvpData";
import { formatCurrency } from "../../mvpUtils";
import KpiCard from "../common/KpiCard";
import PageHeader from "../common/PageHeader";

export default function ForecastPage({
  forecastSeries,
  growthRate,
  setGrowthRate,
  expenseDrift,
  setExpenseDrift,
  riskMode,
  setRiskMode,
}) {
  const bestMonth = forecastSeries.reduce((best, month) =>
    month.net > best.net ? month : best,
  );
  const worstMonth = forecastSeries.reduce((worst, month) =>
    month.cash < worst.cash ? month : worst,
  );
  const averageProjectedNet =
    forecastSeries.reduce((sum, month) => sum + month.net, 0) /
    forecastSeries.length;
  const maxCash = Math.max(...forecastSeries.map((month) => month.cash), 1);

  return (
    <div className="page-stack">
      <PageHeader
        eyebrow="Finance workspace"
        title="Forecast"
        text="Adjust revenue growth, expense pressure, and risk scenario assumptions to see six-month cash implications."
      />

      <section className="grid-section grid-section--main">
        <div className="panel-shell form-shell">
          <div className="panel-title">
            <div>
              <span className="micro-label">Scenario controls</span>
              <h2>Forecast assumptions</h2>
            </div>
          </div>

          <label className="slider-field">
            Monthly revenue growth
            <strong>{growthRate}%</strong>
            <input
              type="range"
              min="0"
              max="18"
              step="1"
              value={growthRate}
              onChange={(event) => setGrowthRate(Number(event.target.value))}
            />
          </label>

          <label className="slider-field">
            Monthly expense drift
            <strong>{expenseDrift}%</strong>
            <input
              type="range"
              min="0"
              max="12"
              step="1"
              value={expenseDrift}
              onChange={(event) => setExpenseDrift(Number(event.target.value))}
            />
          </label>

          <div className="segmented-control segmented-control--wrap">
            {riskModes.map((mode) => (
              <button
                key={mode.id}
                type="button"
                className={riskMode === mode.id ? "is-active" : ""}
                onClick={() => setRiskMode(mode.id)}
              >
                {mode.label}
              </button>
            ))}
          </div>
        </div>

        <div className="panel-shell">
          <div className="panel-title">
            <div>
              <span className="micro-label">Projected outcomes</span>
              <h2>Forecast summary</h2>
            </div>
          </div>

          <div className="grid-section grid-section--kpis grid-section--inner">
            <KpiCard
              label="Average projected net"
              value={formatCurrency(Math.round(averageProjectedNet))}
              hint="Expected monthly net movement across the next six months."
              tone={averageProjectedNet >= 0 ? "positive" : "warning"}
            />
            <KpiCard
              label="Best forecast month"
              value={`${bestMonth.label} / ${formatCurrency(bestMonth.net)}`}
              hint="Month with the strongest projected net performance."
              tone="positive"
            />
            <KpiCard
              label="Lowest projected cash"
              value={formatCurrency(worstMonth.cash)}
              hint={`Cash balance floor currently expected in ${worstMonth.label}.`}
              tone={worstMonth.cash < 25000 ? "warning" : "default"}
            />
          </div>

          <div className="forecast-chart">
            {forecastSeries.map((month) => (
              <article key={month.key} className="forecast-chart__group">
                <div className="forecast-chart__bars">
                  <span
                    className="forecast-chart__bar forecast-chart__bar--cash"
                    style={{ height: `${(month.cash / maxCash) * 100}%` }}
                  />
                  <span
                    className="forecast-chart__bar forecast-chart__bar--net"
                    style={{
                      height: `${(Math.abs(month.net) / maxCash) * 100}%`,
                    }}
                  />
                </div>
                <strong>{month.label}</strong>
                <span>{formatCurrency(month.cash)}</span>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
