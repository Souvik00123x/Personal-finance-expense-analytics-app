import { Link } from "react-router-dom";
import SectionHeader from "../components/SectionHeader";
import StatCard from "../components/StatCard";
import BudgetCard from "../components/BudgetCard";
import TransactionCard from "../components/TransactionCard";
import Loader from "../components/Loader";
import EmptyState from "../components/EmptyState";
import useTransactions from "../hooks/useTransactions";
import useBudget from "../hooks/useBudget";

function Dashboard() {
  const { transactions, loading, analytics, deleteTransaction } = useTransactions();
  const { budget, totalSpent, remainingBudget, percentageUsed } = useBudget();

  if (loading) {
    return <Loader />;
  }

  const recentTransactions = transactions.slice(0, 4);

  return (
    <div className="page-content">
      <SectionHeader
        title="Dashboard"
        description="Quick overview of your money flow, spending habits, and budget health."
        action={
          <Link className="primary-button" to="/transactions/new">
            Add Transaction
          </Link>
        }
      />

      <div className="stats-grid">
        <StatCard label="Total Income" value={analytics.totalIncome} tone="success" />
        <StatCard label="Total Expenses" value={analytics.totalExpenses} tone="danger" />
        <StatCard label="Net Balance" value={analytics.netBalance} />
        <StatCard label="Top Category" value={analytics.topSpendingCategory} tone="accent" />
      </div>

      <BudgetCard
        budget={budget}
        totalSpent={totalSpent}
        remainingBudget={remainingBudget}
        percentageUsed={percentageUsed}
      />

      <section>
        <SectionHeader
          title="Recent Transactions"
          description="Latest financial activity across income and expense entries."
        />

        {recentTransactions.length ? (
          <div className="transaction-list">
            {recentTransactions.map((item) => (
              <TransactionCard key={item.id} transaction={item} onDelete={deleteTransaction} />
            ))}
          </div>
        ) : (
          <EmptyState
            title="No transactions yet"
            description="Add your first transaction to start tracking spending."
          />
        )}
      </section>
    </div>
  );
}

export default Dashboard;
