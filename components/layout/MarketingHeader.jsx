import { scrollToSection } from "../../utils/navigation";

export default function MarketingHeader() {
  return (
    <header className="topbar topbar--marketing">
      <div>
        <a className="brand" href="#landing">
          <span className="brand__mark" />
          finEASY
        </a>
        <p className="topbar__subtitle">Automated financial analysis for SMEs</p>
      </div>

      <nav className="topbar__nav" aria-label="Marketing navigation">
        <button type="button" onClick={() => scrollToSection("landing-home")}>
          Home
        </button>
        <button type="button" onClick={() => scrollToSection("landing-about")}>
          About
        </button>
        <button type="button" onClick={() => scrollToSection("landing-services")}>
          Services
        </button>
        <button type="button" onClick={() => scrollToSection("landing-pricing")}>
          Pricing
        </button>
        <a href="#dashboard" className="is-cta">
          Open cabinet
        </a>
      </nav>
    </header>
  );
}
