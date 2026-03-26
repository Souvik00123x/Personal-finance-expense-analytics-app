import { useState } from "react";
import SectionHeader from "../components/SectionHeader";
import BudgetCard from "../components/BudgetCard";
import useBudget from "../hooks/useBudget";

function Budget() {
  const { budget, totalSpent, remainingBudget, percentageUsed, setMonthlyBudget } = useBudget();
  const [value, setValue] = useState(budget);

  const handleSubmit = (event) => {
    event.preventDefault();
    setMonthlyBudget(value);
  };

  return (
    <div className="page-content">
      <SectionHeader
        title="Budget"
        description="Set your monthly limit and keep an eye on how much of it has already been used."
      />

      <BudgetCard
        budget={budget}
        totalSpent={totalSpent}
        remainingBudget={remainingBudget}
        percentageUsed={percentageUsed}
      />

      <form className="card budget-form" onSubmit={handleSubmit}>
        <label>
          Monthly Budget Amount
          <input type="number" value={value} onChange={(event) => setValue(event.target.value)} />
        </label>
        <button className="primary-button" type="submit">
          Save Budget
        </button>
      </form>
    </div>
  );
}

export default Budget;
