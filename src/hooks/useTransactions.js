import { useContext } from "react";
import { FinanceContext } from "../context/FinanceContext";

function useTransactions() {
  const context = useContext(FinanceContext);

  if (!context) {
    throw new Error("useTransactions must be used inside FinanceProvider");
  }

  return {
    transactions: context.transactions,
    loading: context.loading,
    analytics: context.analytics,
    addTransaction: context.addTransaction,
    updateTransaction: context.updateTransaction,
    deleteTransaction: context.deleteTransaction,
    getTransactionById: context.getTransactionById,
    filterTransactions: context.filterTransactions,
  };
}

export default useTransactions;
