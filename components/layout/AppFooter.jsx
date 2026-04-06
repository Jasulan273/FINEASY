import { scrollToSection } from "../../utils/navigation";

export default function AppFooter({ isLanding }) {
  if (isLanding) {
    return (
      <footer className="footer-shell footer-shell--marketing">
        <div className="footer-bar">
          <div>
            <span className="micro-label">finEASY platform</span>
            <p>
              Automated analysis, forecasting, reporting, and connected finance
              workflows for SMEs.
            </p>
          </div>
          <div className="footer-bar__links">
            <button type="button" onClick={() => scrollToSection("landing-services")}>
              Services
            </button>
            <button type="button" onClick={() => scrollToSection("landing-pricing")}>
              Pricing
            </button>
            <a href="#dashboard">Cabinet</a>
          </div>
        </div>
      </footer>
    );
  }

  return (
    <footer className="footer-shell">
      <div className="footer-bar">
        <div>
          <span className="micro-label">Finance workspace</span>
          <p>
            Dashboard, forecasting, reports, integrations, and pricing in one
            operating system.
          </p>
        </div>
        <div className="footer-bar__links">
          <a href="#dashboard">Dashboard</a>
          <a href="#reports">Reports</a>
          <a href="#integrations">Integrations</a>
        </div>
      </div>
    </footer>
  );
}
