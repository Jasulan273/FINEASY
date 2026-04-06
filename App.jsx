import { useEffect, useState } from "react";
import {
  initialIntegrations,
  initialTransactions,
  openingCashBalance,
} from "./mvpData";
import { buildReport, getDashboardMetrics, getForecastSeries } from "./mvpUtils";
import DashboardPage from "./components/dashboard/DashboardPage";
import ForecastPage from "./components/forecast/ForecastPage";
import IntegrationsPage from "./components/integrations/IntegrationsPage";
import LandingPage from "./components/landing/LandingPage";
import AppFooter from "./components/layout/AppFooter";
import AppShellHeader from "./components/layout/AppShellHeader";
import MarketingHeader from "./components/layout/MarketingHeader";
import PricingPage from "./components/pricing/PricingPage";
import ReportsPage from "./components/reports/ReportsPage";
import { getRouteFromHash } from "./utils/navigation";

function buildInitialReport() {
  return buildReport({
    transactions: initialTransactions,
    periodMonths: 3,
    reportType: "executive",
    includeForecast: true,
    forecastSeries: getForecastSeries(initialTransactions, {
      growthRate: 6,
      expenseDrift: 3,
      riskMode: "balanced",
      openingCashBalance,
    }),
    openingCashBalance,
  });
}

export default function App() {
  const [route, setRoute] = useState(getRouteFromHash);
  const [transactions, setTransactions] = useState(initialTransactions);
  const [integrations, setIntegrations] = useState(initialIntegrations);
  const [periodMonths, setPeriodMonths] = useState(3);
  const [growthRate, setGrowthRate] = useState(6);
  const [expenseDrift, setExpenseDrift] = useState(3);
  const [riskMode, setRiskMode] = useState("balanced");
  const [reportType, setReportType] = useState("executive");
  const [reportPeriod, setReportPeriod] = useState(3);
  const [includeForecast, setIncludeForecast] = useState(true);
  const [selectedTierId, setSelectedTierId] = useState("standard");
  const [customerCount, setCustomerCount] = useState(48);
  const [syncMessage, setSyncMessage] = useState(
    "QuickBooks and Bank Feed are connected. You can refresh sync or add additional sources from this page.",
  );
  const [manualEntry, setManualEntry] = useState({
    date: "2026-05-01",
    description: "",
    category: "Operations",
    type: "expense",
    amount: "",
    source: "Manual",
  });
  const [generatedReport, setGeneratedReport] = useState(buildInitialReport);

  useEffect(() => {
    const handleHashChange = () => {
      setRoute(getRouteFromHash());
    };

    window.addEventListener("hashchange", handleHashChange);

    if (!window.location.hash) {
      window.location.hash = "landing";
    }

    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  const dashboard = getDashboardMetrics(
    transactions,
    periodMonths,
    openingCashBalance,
  );
  const forecastSeries = getForecastSeries(transactions, {
    growthRate,
    expenseDrift,
    riskMode,
    openingCashBalance,
  });
  const isLanding = route === "landing";

  function handleManualEntryChange(field, value) {
    setManualEntry((current) => ({
      ...current,
      [field]: value,
    }));
  }

  function handleManualEntrySubmit(event) {
    event.preventDefault();

    if (!manualEntry.description || !manualEntry.amount) {
      return;
    }

    const nextTransaction = {
      id: `txn-manual-${Date.now()}`,
      date: manualEntry.date,
      description: manualEntry.description,
      category: manualEntry.category,
      type: manualEntry.type,
      amount: Number(manualEntry.amount),
      source: manualEntry.source,
    };

    setTransactions((current) => [...current, nextTransaction]);
    setManualEntry({
      date: manualEntry.date,
      description: "",
      category: manualEntry.category,
      type: manualEntry.type,
      amount: "",
      source: manualEntry.source,
    });
  }

  function handleGenerateReport() {
    setGeneratedReport(
      buildReport({
        transactions,
        periodMonths: reportPeriod,
        reportType,
        includeForecast,
        forecastSeries,
        openingCashBalance,
      }),
    );
  }

  function handleSyncIntegration(integrationId) {
    const now = new Date().toLocaleString("en-US");

    setIntegrations((current) =>
      current.map((integration) => {
        if (integration.id !== integrationId) {
          return integration;
        }

        if (integration.status === "available") {
          return {
            ...integration,
            status: "connected",
            lastSync: now,
          };
        }

        return {
          ...integration,
          lastSync: now,
        };
      }),
    );

    const integration = integrations.find((item) => item.id === integrationId);
    if (integration) {
      setSyncMessage(
        `${integration.name} updated at ${now}. Financial data is ready for dashboard and report refresh.`,
      );
    }
  }

  return (
    <div className="app-shell">
      <div className="app-shell__grid" />
      {isLanding ? <MarketingHeader /> : <AppShellHeader route={route} />}

      <main className="app-main">
        {isLanding && <LandingPage />}
        {route === "dashboard" && (
          <DashboardPage
            dashboard={dashboard}
            periodMonths={periodMonths}
            setPeriodMonths={setPeriodMonths}
            manualEntry={manualEntry}
            onEntryChange={handleManualEntryChange}
            onEntrySubmit={handleManualEntrySubmit}
          />
        )}
        {route === "forecast" && (
          <ForecastPage
            forecastSeries={forecastSeries}
            growthRate={growthRate}
            setGrowthRate={setGrowthRate}
            expenseDrift={expenseDrift}
            setExpenseDrift={setExpenseDrift}
            riskMode={riskMode}
            setRiskMode={setRiskMode}
          />
        )}
        {route === "reports" && (
          <ReportsPage
            reportType={reportType}
            setReportType={setReportType}
            reportPeriod={reportPeriod}
            setReportPeriod={setReportPeriod}
            includeForecast={includeForecast}
            setIncludeForecast={setIncludeForecast}
            generatedReport={generatedReport}
            onGenerateReport={handleGenerateReport}
          />
        )}
        {route === "integrations" && (
          <IntegrationsPage
            integrations={integrations}
            onSync={handleSyncIntegration}
            syncMessage={syncMessage}
          />
        )}
        {route === "pricing" && (
          <PricingPage
            selectedTierId={selectedTierId}
            setSelectedTierId={setSelectedTierId}
            customerCount={customerCount}
            setCustomerCount={setCustomerCount}
          />
        )}
      </main>

      <AppFooter isLanding={isLanding} />
    </div>
  );
}
