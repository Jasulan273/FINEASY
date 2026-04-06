const currencyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

const percentFormatter = new Intl.NumberFormat("en-US", {
  style: "percent",
  maximumFractionDigits: 1,
});

function toDate(value) {
  return new Date(`${value}T00:00:00`);
}

function getLatestTransactionDate(transactions) {
  return transactions.reduce((latest, transaction) => {
    const candidate = toDate(transaction.date);
    return candidate > latest ? candidate : latest;
  }, toDate(transactions[0].date));
}

function monthKeyFromDate(date) {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;
}

function monthKeyFromValue(value) {
  return value.slice(0, 7);
}

function monthLabelFromKey(monthKey) {
  const [year, month] = monthKey.split("-").map(Number);
  const date = new Date(year, month - 1, 1);
  return date.toLocaleDateString("en-US", {
    month: "short",
    year: "2-digit",
  });
}

function getWindowMonthKeys(latestDate, count) {
  const keys = [];

  for (let index = count - 1; index >= 0; index -= 1) {
    const date = new Date(latestDate.getFullYear(), latestDate.getMonth() - index, 1);
    keys.push(monthKeyFromDate(date));
  }

  return keys;
}

function filterTransactionsByMonths(transactions, monthKeys) {
  const lookup = new Set(monthKeys);
  return transactions.filter((transaction) =>
    lookup.has(monthKeyFromValue(transaction.date)),
  );
}

function sumTransactions(transactions, type) {
  return transactions
    .filter((transaction) => transaction.type === type)
    .reduce((total, transaction) => total + transaction.amount, 0);
}

function groupByCategory(transactions, type) {
  const grouped = new Map();

  transactions
    .filter((transaction) => transaction.type === type)
    .forEach((transaction) => {
      grouped.set(
        transaction.category,
        (grouped.get(transaction.category) ?? 0) + transaction.amount,
      );
    });

  return [...grouped.entries()]
    .map(([category, amount]) => ({ category, amount }))
    .sort((left, right) => right.amount - left.amount);
}

function buildAlerts({ margin, runway, net }) {
  const alerts = [];

  if (runway < 6) {
    alerts.push({
      level: "high",
      title: "Runway is below target",
      text: "Current runway is below six months. Review spend velocity and protect cash-heavy initiatives.",
    });
  }

  if (margin < 0.22) {
    alerts.push({
      level: "medium",
      title: "Margin is under target",
      text: "Net margin is below the preferred operating range. Investigate payroll and acquisition costs.",
    });
  }

  if (net < 0) {
    alerts.push({
      level: "high",
      title: "Negative net cash for the selected period",
      text: "Outflows exceeded inflows. Push report exports to stakeholders and review monthly spend categories.",
    });
  }

  if (alerts.length === 0) {
    alerts.push({
      level: "positive",
      title: "Financial posture is stable",
      text: "No critical signal was triggered for the selected period. Continue monitoring forecast drift and cash reserve coverage.",
    });
  }

  return alerts;
}

export function formatCurrency(value) {
  return currencyFormatter.format(value);
}

export function formatPercent(value) {
  return percentFormatter.format(value);
}

export function getMonthlySeries(transactions, count = 6) {
  const latestDate = getLatestTransactionDate(transactions);
  const monthKeys = getWindowMonthKeys(latestDate, count);

  return monthKeys.map((monthKey) => {
    const monthlyTransactions = filterTransactionsByMonths(transactions, [monthKey]);
    const income = sumTransactions(monthlyTransactions, "income");
    const expense = sumTransactions(monthlyTransactions, "expense");

    return {
      key: monthKey,
      label: monthLabelFromKey(monthKey),
      income,
      expense,
      net: income - expense,
    };
  });
}

export function getDashboardMetrics(transactions, periodMonths, openingCashBalance) {
  const latestDate = getLatestTransactionDate(transactions);
  const monthKeys = getWindowMonthKeys(latestDate, periodMonths);
  const filteredTransactions = filterTransactionsByMonths(transactions, monthKeys);
  const income = sumTransactions(filteredTransactions, "income");
  const expense = sumTransactions(filteredTransactions, "expense");
  const net = income - expense;
  const margin = income > 0 ? net / income : 0;
  const averageExpense = periodMonths > 0 ? expense / periodMonths : 0;
  const closingCash = openingCashBalance + net;
  const runway = averageExpense > 0 ? closingCash / averageExpense : 0;
  const categoryBreakdown = groupByCategory(filteredTransactions, "expense");
  const recentTransactions = [...transactions]
    .sort((left, right) => toDate(right.date) - toDate(left.date))
    .slice(0, 8);

  return {
    monthKeys,
    filteredTransactions,
    income,
    expense,
    net,
    margin,
    closingCash,
    runway,
    series: getMonthlySeries(transactions, Math.max(periodMonths, 4)),
    categoryBreakdown,
    recentTransactions,
    alerts: buildAlerts({ margin, runway, net }),
  };
}

export function getForecastSeries(
  transactions,
  { growthRate, expenseDrift, riskMode, openingCashBalance },
) {
  const actualSeries = getMonthlySeries(transactions, 3);
  const averageIncome =
    actualSeries.reduce((total, month) => total + month.income, 0) / actualSeries.length;
  const averageExpense =
    actualSeries.reduce((total, month) => total + month.expense, 0) / actualSeries.length;

  const incomeMultiplier = {
    conservative: 0.98,
    balanced: 1,
    growth: 1.04,
  };

  const expenseMultiplier = {
    conservative: 0.99,
    balanced: 1.01,
    growth: 1.03,
  };

  let projectedCash =
    openingCashBalance + actualSeries.reduce((total, month) => total + month.net, 0);
  const latestDate = getLatestTransactionDate(transactions);

  return Array.from({ length: 6 }, (_, index) => {
    const monthIndex = index + 1;
    const date = new Date(latestDate.getFullYear(), latestDate.getMonth() + monthIndex, 1);
    const projectedIncome =
      averageIncome *
      Math.pow(1 + growthRate / 100, monthIndex) *
      incomeMultiplier[riskMode];
    const projectedExpense =
      averageExpense *
      Math.pow(1 + expenseDrift / 100, monthIndex) *
      expenseMultiplier[riskMode];
    const projectedNet = projectedIncome - projectedExpense;
    projectedCash += projectedNet;

    return {
      key: monthKeyFromDate(date),
      label: monthLabelFromKey(monthKeyFromDate(date)),
      income: Math.round(projectedIncome),
      expense: Math.round(projectedExpense),
      net: Math.round(projectedNet),
      cash: Math.round(projectedCash),
    };
  });
}

export function buildReport({
  transactions,
  periodMonths,
  reportType,
  includeForecast,
  forecastSeries,
  openingCashBalance,
}) {
  const metrics = getDashboardMetrics(transactions, periodMonths, openingCashBalance);
  const primaryExpense = metrics.categoryBreakdown[0];
  const latestForecast = forecastSeries.at(-1);

  const summaries = {
    executive: {
      title: "Executive summary",
      body:
        "Financial performance remains readable for leadership with direct visibility into liquidity, margin, and operational pressure.",
    },
    cashflow: {
      title: "Cash flow review",
      body:
        "Liquidity remains the main operating signal, with runway and spend control driving the next decisions.",
    },
    profitability: {
      title: "Profitability snapshot",
      body:
        "Profit quality is shaped by recurring subscription revenue, payroll discipline, and acquisition efficiency.",
    },
  };

  return {
    generatedAt: new Date().toLocaleString("en-US"),
    heading: summaries[reportType].title,
    body: summaries[reportType].body,
    highlights: [
      `Income for selected period: ${formatCurrency(metrics.income)}`,
      `Expenses for selected period: ${formatCurrency(metrics.expense)}`,
      `Net cash movement: ${formatCurrency(metrics.net)}`,
      `Net margin: ${formatPercent(metrics.margin)}`,
      primaryExpense
        ? `Largest expense category: ${primaryExpense.category} (${formatCurrency(primaryExpense.amount)})`
        : "Largest expense category: unavailable",
      includeForecast && latestForecast
        ? `Projected cash by ${latestForecast.label}: ${formatCurrency(latestForecast.cash)}`
        : "Forecast section excluded from this report",
    ],
  };
}
