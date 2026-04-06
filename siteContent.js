export const pages = [
  { id: "overview", label: "Overview" },
  { id: "platform", label: "Platform" },
  { id: "ai-lab", label: "AI Lab" },
  { id: "pricing", label: "Pricing" },
  { id: "contact", label: "Contact" },
];

export const heroStats = [
  { value: "3 min", label: "to generate an executive readout" },
  { value: "24/7", label: "AI monitoring for risk and cash flow" },
  { value: "$100k-$5M", label: "ideal revenue band for target SMEs" },
  { value: "20%", label: "planned annual user growth" },
];

export const overviewHighlights = [
  {
    label: "AI Forecasting",
    title: "Forecast cash pressure before it becomes an operating issue.",
    text: "finEASY turns accounting inputs into practical signals for runway, margin health, and short-term decision support.",
  },
  {
    label: "Decision Layer",
    title: "Give non-finance teams a usable financial operating system.",
    text: "The product is positioned for founders and managers who need quick interpretation, not enterprise accounting complexity.",
  },
  {
    label: "Automation",
    title: "Sync existing tools instead of forcing a platform reset.",
    text: "The concept keeps QuickBooks and Xero as data sources while finEASY becomes the AI-driven insight layer on top.",
  },
];

export const segmentCards = [
  {
    name: "Growing Startups",
    summary: "Need cash flow control, visibility into burn, and lightweight forecasting they can act on every week.",
  },
  {
    name: "Established SMEs",
    summary: "Need cleaner reporting, stable monitoring, and more detailed decision support without hiring external analysts.",
  },
  {
    name: "Finance Managers",
    summary: "Need faster report generation, benchmark context, and a product that reduces repetitive interpretation work.",
  },
];

export const competitorCards = [
  {
    name: "QuickBooks",
    gap: "Great at bookkeeping, weaker at turning raw records into clear next-step recommendations for operators.",
  },
  {
    name: "Xero",
    gap: "Comprehensive, but broader and heavier than what insight-led SMEs usually want from a daily decision tool.",
  },
  {
    name: "LivePlan",
    gap: "Useful for planning, but less focused on ongoing monitoring and live operational finance visibility.",
  },
];

export const businessProfiles = [
  {
    id: "startup",
    label: "Startup",
    headline: "Cash-sensitive, growth-led team",
    kpis: [
      { name: "Runway", value: "7.8 mo" },
      { name: "Margin", value: "18.4%" },
      { name: "Risk", value: "Medium" },
    ],
    insight: "Model suggests preserving runway while keeping customer acquisition efficient.",
    recommendedPlan: "standard",
  },
  {
    id: "growing",
    label: "Growing SME",
    headline: "Scaling operations with tighter reporting needs",
    kpis: [
      { name: "Runway", value: "10.6 mo" },
      { name: "Margin", value: "24.9%" },
      { name: "Risk", value: "Low" },
    ],
    insight: "Model highlights stable liquidity and room for benchmark-driven optimization.",
    recommendedPlan: "premium",
  },
  {
    id: "established",
    label: "Established SME",
    headline: "Stable business looking for sharper intelligence",
    kpis: [
      { name: "Runway", value: "14.2 mo" },
      { name: "Margin", value: "29.6%" },
      { name: "Risk", value: "Low" },
    ],
    insight: "Model prioritizes benchmarking, board-ready reporting, and anomaly detection.",
    recommendedPlan: "premium",
  },
];

export const workflowSteps = [
  {
    step: "01",
    title: "Connect source systems",
    text: "Onboard the company, pull accounting data, and normalize the base financial model.",
  },
  {
    step: "02",
    title: "Generate an AI financial layer",
    text: "Turn transactions and reports into runway, liquidity, margin, and risk signals.",
  },
  {
    step: "03",
    title: "Deliver explainable actions",
    text: "Produce board-ready summaries, alerts, and suggested next moves for operators.",
  },
  {
    step: "04",
    title: "Benchmark and optimize",
    text: "Compare performance, detect drift early, and tighten decision-making over time.",
  },
];

export const pricingTiers = [
  {
    id: "basic",
    name: "Basic",
    price: 15,
    annualLtv: 540,
    cac: 120,
    audience: "Startups needing cash flow and margin basics",
    features: ["Cash flow monitoring", "Budget tracking", "Standard reports", "Template library"],
  },
  {
    id: "standard",
    name: "Standard",
    price: 29,
    annualLtv: 1044,
    cac: 190,
    audience: "SMEs adding forecasting and KPI governance",
    features: ["Advanced forecasting", "Custom reports", "KPI tracking", "Email and chat support"],
  },
  {
    id: "premium",
    name: "Premium",
    price: 49,
    annualLtv: 1764,
    cac: 260,
    audience: "Established businesses needing deeper AI insight",
    features: ["Industry benchmarking", "AI-driven insights", "Custom dashboards", "Priority support"],
  },
];

export const fundingSplit = [
  { label: "Salaries and wages", value: 40 },
  { label: "Technology development", value: 30 },
  { label: "Marketing and advertising", value: 20 },
  { label: "Operational reserves", value: 10 },
];

export const opsCosts = [
  { label: "Data acquisition", value: "$5,000 initial", text: "Model training and financial analysis inputs." },
  { label: "Cloud infrastructure", value: "$2,500 yearly", text: "Secure storage and scalable compute." },
  { label: "Salaries and wages", value: "$15,000 yearly", text: "Core product, support, and maintenance team." },
  { label: "Marketing", value: "$2,000 yearly", text: "Early acquisition via digital and partner channels." },
];

export const faqItems = [
  {
    question: "What does finEASY replace?",
    answer: "It does not replace bookkeeping. It sits on top of accounting tools and becomes the AI interpretation layer.",
  },
  {
    question: "Who is the primary buyer?",
    answer: "Small business owners, startup teams, and finance managers who need faster financial decisions without enterprise complexity.",
  },
  {
    question: "What is the first MVP promise?",
    answer: "Clear cash flow tracking, profit margin visibility, and customizable reports with an interface non-experts can use quickly.",
  },
];

export const launchTimeline = [
  { label: "Month 1", title: "Pilot onboarding", text: "Integrate core data sources and launch a baseline dashboard for early testers." },
  { label: "Month 2", title: "Signal tuning", text: "Refine alerts, summaries, and explainability based on startup and SME feedback." },
  { label: "Month 3", title: "Commercial rollout", text: "Open standard and premium plans with guided setup and demo-driven sales." },
];
