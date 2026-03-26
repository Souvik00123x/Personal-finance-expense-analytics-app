import { useContext } from "react";
import { FinanceContext } from "../context/FinanceContext";

function useBudget() {
  const context = useContext(FinanceContext);

  if (!context) {
    throw new Error("useBudget must be used inside FinanceProvider");
  }

  const totalSpent = context.analytics.totalExpenses;
  const remainingBudget = context.budget - totalSpent;
  const percentageUsed = context.budget ? (totalSpent / context.budget) * 100 : 0;

  return {
    budget: context.budget,
    totalSpent,
    remainingBudget,
    percentageUsed,
    setMonthlyBudget: context.setMonthlyBudget,
  };
}

export default useBudget;
