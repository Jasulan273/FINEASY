import { formatCurrency } from "../../mvpUtils";
import KpiCard from "../common/KpiCard";
import PageHeader from "../common/PageHeader";
import {
  AlertsPanel,
  ExpenseMix,
  ManualEntryForm,
  MonthlyChart,
  TransactionsTable,
} from "./DashboardWidgets";

export default function DashboardPage({
  dashboard,
  periodMonths,
  setPeriodMonths,
  manualEntry,
  onEntryChange,
  onEntrySubmit,
}) {
  return (
    <div className="page-stack">
      <PageHeader
        eyebrow="Finance workspace"
        title="Dashboard"
        text="Track KPI movement, capture transactions, review alerts, and maintain operating visibility from one dashboard."
        action={
          <div className="segmented-control">
            {[3, 4].map((months) => (
              <button
                key={months}
                type="button"
                className={periodMonths === months ? "is-active" : ""}
                onClick={() => setPeriodMonths(months)}
              >
                Last {months} months
              </button>
            ))}
          </div>
        }
      />

      <section className="grid-section grid-section--kpis">
        <KpiCard
          label="Income"
          value={formatCurrency(dashboard.income)}
          hint="Recognized inflows in the selected period."
          tone="positive"
        />
        <KpiCard
          label="Expenses"
          value={formatCurrency(dashboard.expense)}
          hint="Operating spend captured from connected sources."
        />
        <KpiCard
          label="Net cash"
          value={formatCurrency(dashboard.net)}
          hint="Net movement after revenue and expense flows."
          tone={dashboard.net >= 0 ? "positive" : "warning"}
        />
        <KpiCard
          label="Runway"
          value={`${dashboard.runway.toFixed(1)} months`}
          hint="Estimated based on current expense velocity."
          tone={dashboard.runway < 6 ? "warning" : "default"}
        />
      </section>

      <section className="grid-section grid-section--main">
        <MonthlyChart series={dashboard.series} />
        <ExpenseMix items={dashboard.categoryBreakdown} />
      </section>

      <section className="grid-section grid-section--main">
        <AlertsPanel alerts={dashboard.alerts} />
        <ManualEntryForm
          entry={manualEntry}
          onChange={onEntryChange}
          onSubmit={onEntrySubmit}
        />
      </section>

      <TransactionsTable transactions={dashboard.recentTransactions} />
    </div>
  );
}
