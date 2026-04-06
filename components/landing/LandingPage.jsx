import {
  landingHighlights,
  landingServices,
  landingStats,
  pricingTiers,
} from "../../mvpData";
import { formatCurrency } from "../../mvpUtils";
import { scrollToSection } from "../../utils/navigation";

export default function LandingPage() {
  return (
    <div className="page-stack page-stack--marketing">
      <section className="landing-hero" id="landing-home">
        <div className="landing-hero__visual" />
        <div className="landing-hero__overlay">
          <div className="landing-hero__content">
            <div className="landing-hero__copy">
              <span className="eyebrow eyebrow--light">Welcome to finEASY</span>
              <h1>Automated financial analysis for SMEs.</h1>
              <p>
                Monitor cash flow, forecasts, and reporting from one connected
                finance workspace.
              </p>
              <div className="landing-hero__actions">
                <a href="#dashboard" className="button button--light">
                  Open cabinet
                </a>
                <button
                  type="button"
                  className="button button--ghost-light"
                  onClick={() => scrollToSection("landing-pricing")}
                >
                  View pricing
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="landing-stats panel-shell">
        {landingStats.map((item) => (
          <article key={item.label} className="landing-stat">
            <strong>{item.value}</strong>
            <span>{item.label}</span>
          </article>
        ))}
      </section>

      <section className="landing-banner" id="landing-about">
        <div>
          <span className="eyebrow">Try finEASY today</span>
          <h2>Move from planning to financial control in one workflow.</h2>
          <p>Connect your sources and start tracking performance in minutes.</p>
        </div>
        <div className="landing-banner__actions">
          <a href="#dashboard" className="button button--primary">
            Sign in
          </a>
          <button
            type="button"
            className="button button--secondary"
            onClick={() => scrollToSection("landing-services")}
          >
            Explore services
          </button>
        </div>
      </section>

      <section className="landing-services" id="landing-services">
        <div className="page-header">
          <div>
            <span className="eyebrow">Services</span>
            <h1>Core services for finance teams and founders.</h1>
            <p>
              Analysis, planning, reporting, and structured funding workflows.
            </p>
          </div>
        </div>

        <div className="grid-section grid-section--cards">
          {landingServices.map((service) => (
            <article key={service.title} className="service-card">
              <h2>{service.title}</h2>
              <p>{service.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="landing-highlight-strip panel-shell">
        {landingHighlights.map((item) => (
          <article key={item.title} className="landing-highlight-card">
            <span className="micro-label">{item.label}</span>
            <h3>{item.title}</h3>
          </article>
        ))}
      </section>

      <section className="landing-pricing" id="landing-pricing">
        <div className="page-header">
          <div>
            <span className="eyebrow">Pricing</span>
            <h1>Simple plans for startups and established SMEs.</h1>
            <p>Pick a plan and move straight into the operating workspace.</p>
          </div>
          <div className="page-header__action">
            <a href="#pricing" className="button button--primary">
              Open pricing
            </a>
          </div>
        </div>

        <div className="grid-section grid-section--cards">
          {pricingTiers.map((tier) => (
            <article
              key={tier.id}
              className="pricing-card pricing-card--marketing"
            >
              <span className="micro-label">{tier.name}</span>
              <h2>{formatCurrency(tier.price)}</h2>
              <p>Per company / month</p>
              <ul className="feature-list">
                {tier.features.map((feature) => (
                  <li key={feature}>{feature}</li>
                ))}
              </ul>
              <a href="#dashboard" className="button button--secondary">
                Go to cabinet
              </a>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
