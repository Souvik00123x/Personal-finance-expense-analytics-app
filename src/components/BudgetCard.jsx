import { formatCurrency } from "../utils/currencyFormatter";

function BudgetCard({ budget, totalSpent, remainingBudget, percentageUsed }) {
  const progress = Math.min(percentageUsed, 100);

  return (
    <div className="card budget-card">
      <div className="budget-row">
        <div>
          <p>Monthly Budget</p>
          <h3>{formatCurrency(budget)}</h3>
        </div>
        <div>
          <p>Total Spending</p>
          <h3>{formatCurrency(totalSpent)}</h3>
        </div>
        <div>
          <p>Remaining</p>
          <h3 className={remainingBudget < 0 ? "expense-text" : "income-text"}>
            {formatCurrency(remainingBudget)}
          </h3>
        </div>
      </div>

      <div className="progress-track">
        <div className="progress-fill" style={{ width: `${progress}%` }} />
      </div>

      <p className="progress-label">{percentageUsed.toFixed(1)}% of budget used</p>
    </div>
  );
}

export default BudgetCard;
