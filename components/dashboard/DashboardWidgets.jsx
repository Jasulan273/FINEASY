import { formatCurrency } from "../../mvpUtils";

export function MonthlyChart({ series }) {
  const maxValue = Math.max(
    ...series.flatMap((month) => [month.income, month.expense, Math.abs(month.net)]),
    1,
  );

  return (
    <div className="chart-panel">
      <div className="panel-title">
        <div>
          <span className="micro-label">Cash flow trend</span>
          <h2>Monthly operating movement</h2>
        </div>
      </div>

      <div className="bar-chart" aria-label="Monthly income and expense chart">
        {series.map((month) => (
          <div key={month.key} className="bar-chart__group">
            <div className="bar-chart__bars">
              <span
                className="bar-chart__bar bar-chart__bar--income"
                style={{ height: `${(month.income / maxValue) * 100}%` }}
              />
              <span
                className="bar-chart__bar bar-chart__bar--expense"
                style={{ height: `${(month.expense / maxValue) * 100}%` }}
              />
            </div>
            <div className="bar-chart__meta">
              <strong>{month.label}</strong>
              <span>{formatCurrency(month.net)}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function ExpenseMix({ items }) {
  const topItems = items.slice(0, 4);
  const total = topItems.reduce((sum, item) => sum + item.amount, 0) || 1;

  return (
    <div className="panel-shell">
      <div className="panel-title">
        <div>
          <span className="micro-label">Expense mix</span>
          <h2>Largest spend categories</h2>
        </div>
      </div>

      <div className="stack-list">
        {topItems.map((item) => (
          <article key={item.category} className="progress-row">
            <div className="progress-row__head">
              <span>{item.category}</span>
              <strong>{formatCurrency(item.amount)}</strong>
            </div>
            <div className="progress-row__track">
              <div style={{ width: `${(item.amount / total) * 100}%` }} />
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

export function AlertsPanel({ alerts }) {
  return (
    <div className="panel-shell">
      <div className="panel-title">
        <div>
          <span className="micro-label">Alerts</span>
          <h2>Current financial signals</h2>
        </div>
      </div>

      <div className="stack-list">
        {alerts.map((alert) => (
          <article key={alert.title} className={`alert-card alert-card--${alert.level}`}>
            <h3>{alert.title}</h3>
            <p>{alert.text}</p>
          </article>
        ))}
      </div>
    </div>
  );
}

export function TransactionsTable({ transactions }) {
  return (
    <div className="panel-shell">
      <div className="panel-title">
        <div>
          <span className="micro-label">Recent activity</span>
          <h2>Latest transactions</h2>
        </div>
      </div>

      <div className="table-shell">
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Description</th>
              <th>Category</th>
              <th>Source</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((transaction) => (
              <tr key={transaction.id}>
                <td>{transaction.date}</td>
                <td>{transaction.description}</td>
                <td>{transaction.category}</td>
                <td>{transaction.source}</td>
                <td
                  className={
                    transaction.type === "income"
                      ? "amount-cell amount-cell--positive"
                      : "amount-cell amount-cell--negative"
                  }
                >
                  {transaction.type === "income" ? "+" : "-"}
                  {formatCurrency(transaction.amount)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export function ManualEntryForm({ entry, onChange, onSubmit }) {
  return (
    <form className="panel-shell form-shell" onSubmit={onSubmit}>
      <div className="panel-title">
        <div>
          <span className="micro-label">Manual input</span>
          <h2>Add transaction</h2>
        </div>
      </div>

      <div className="form-grid">
        <label>
          Date
          <input
            type="date"
            value={entry.date}
            onChange={(event) => onChange("date", event.target.value)}
          />
        </label>
        <label>
          Type
          <select
            value={entry.type}
            onChange={(event) => onChange("type", event.target.value)}
          >
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>
        </label>
        <label className="form-grid__wide">
          Description
          <input
            type="text"
            value={entry.description}
            onChange={(event) => onChange("description", event.target.value)}
            placeholder="Quarterly advisory package"
          />
        </label>
        <label>
          Category
          <input
            type="text"
            value={entry.category}
            onChange={(event) => onChange("category", event.target.value)}
          />
        </label>
        <label>
          Amount
          <input
            type="number"
            min="1"
            value={entry.amount}
            onChange={(event) => onChange("amount", event.target.value)}
          />
        </label>
        <label>
          Source
          <input
            type="text"
            value={entry.source}
            onChange={(event) => onChange("source", event.target.value)}
          />
        </label>
      </div>

      <button type="submit" className="button button--primary">
        Save transaction
      </button>
    </form>
  );
}
