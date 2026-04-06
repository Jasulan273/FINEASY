import { pricingTiers } from "../../mvpData";
import { formatCurrency } from "../../mvpUtils";
import KpiCard from "../common/KpiCard";
import PageHeader from "../common/PageHeader";

export default function PricingPage({
  selectedTierId,
  setSelectedTierId,
  customerCount,
  setCustomerCount,
}) {
  const selectedTier =
    pricingTiers.find((tier) => tier.id === selectedTierId) ?? pricingTiers[1];
  const monthlyRevenue = selectedTier.price * customerCount;
  const annualRevenue = monthlyRevenue * 12;
  const ltvCac = (selectedTier.ltv / selectedTier.cac).toFixed(1);

  return (
    <div className="page-stack">
      <PageHeader
        eyebrow="Finance workspace"
        title="Pricing"
        text="Model plan selection, customer volume, and unit economics to understand revenue potential and upgrade paths."
      />

      <section className="grid-section grid-section--cards">
        {pricingTiers.map((tier) => (
          <article
            key={tier.id}
            className={`pricing-card${tier.id === selectedTierId ? " pricing-card--active" : ""}`}
          >
            <span className="micro-label">{tier.name}</span>
            <h2>{formatCurrency(tier.price)}</h2>
            <p>Per company / month</p>
            <ul className="feature-list">
              {tier.features.map((feature) => (
                <li key={feature}>{feature}</li>
              ))}
            </ul>
            <button
              type="button"
              className="button button--secondary"
              onClick={() => setSelectedTierId(tier.id)}
            >
              Select plan
            </button>
          </article>
        ))}
      </section>

      <section className="grid-section grid-section--main">
        <div className="panel-shell form-shell">
          <div className="panel-title">
            <div>
              <span className="micro-label">Commercial calculator</span>
              <h2>Revenue model</h2>
            </div>
          </div>

          <label className="slider-field">
            Active customers
            <strong>{customerCount}</strong>
            <input
              type="range"
              min="12"
              max="180"
              step="6"
              value={customerCount}
              onChange={(event) => setCustomerCount(Number(event.target.value))}
            />
          </label>
        </div>

        <div className="grid-section grid-section--kpis grid-section--inner">
          <KpiCard
            label="MRR"
            value={formatCurrency(monthlyRevenue)}
            hint="Monthly recurring revenue from current selected scenario."
            tone="positive"
          />
          <KpiCard
            label="ARR"
            value={formatCurrency(annualRevenue)}
            hint="Annual recurring revenue at the current customer count."
            tone="positive"
          />
          <KpiCard
            label="LTV / CAC"
            value={`${ltvCac}x`}
            hint="Illustrative unit economics from the selected plan."
          />
        </div>
      </section>
    </div>
  );
}
