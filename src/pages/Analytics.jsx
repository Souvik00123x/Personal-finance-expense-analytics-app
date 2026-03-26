import { useEffect } from "react";
import SectionHeader from "../components/SectionHeader";
import StatCard from "../components/StatCard";
import Charts from "../components/Charts";
import EmptyState from "../components/EmptyState";
import Loader from "../components/Loader";
import useTransactions from "../hooks/useTransactions";
import useCurrency from "../hooks/useCurrency";

function Analytics() {
  const { loading, analytics } = useTransactions();
  const { rate, loading: currencyLoading, error, getRate } = useCurrency();

  useEffect(() => {
    getRate("INR", "USD");
  }, []);

  if (loading) {
    return <Loader />;
  }

  const hasExpenseData = analytics.expensesByCategory.length > 0;

  return (
    <div className="page-content">
      <SectionHeader
        title="Analytics"
        description="Use charts and summary cards to understand your financial behavior more clearly."
      />

      <div className="stats-grid">
        <StatCard label="Total Income" value={analytics.totalIncome} tone="success" />
        <StatCard label="Total Expenses" value={analytics.totalExpenses} tone="danger" />
        <StatCard label="Net Balance" value={analytics.netBalance} />
        <StatCard label="Top Spending Category" value={analytics.topSpendingCategory} tone="accent" />
      </div>

      <div className="card exchange-card">
        <h3>Currency Exchange Snapshot</h3>
        <p>
          1 INR = {currencyLoading ? "Loading..." : rate ? `${rate.toFixed(4)} USD` : "Unavailable"}
        </p>
        {error && <p className="error-text">{error}</p>}
      </div>

      {hasExpenseData ? (
        <Charts categoryData={analytics.expensesByCategory} monthlyData={analytics.monthlyTrend} />
      ) : (
        <EmptyState
          title="Not enough data for charts"
          description="Add a few expenses and income entries to unlock analytics."
        />
      )}
    </div>
  );
}

export default Analytics;
