import { createContext, useEffect, useMemo, useState } from "react";
import { format, isWithinInterval, parseISO, startOfDay } from "date-fns";
import { v4 as uuidv4 } from "uuid";
import { toast } from "react-toastify";

export const FinanceContext = createContext(null);

const defaultTransactions = [
  {
    id: uuidv4(),
    title: "Salary",
    amount: 45000,
    category: "Salary",
    type: "income",
    date: new Date().toISOString(),
    notes: "Monthly salary credited",
    recurring: true,
  },
  {
    id: uuidv4(),
    title: "House Rent",
    amount: 12000,
    category: "Rent",
    type: "expense",
    date: new Date().toISOString(),
    notes: "Rent for this month",
    recurring: true,
  },
  {
    id: uuidv4(),
    title: "Groceries",
    amount: 2500,
    category: "Food",
    type: "expense",
    date: new Date().toISOString(),
    notes: "Supermarket visit",
    recurring: false,
  },
];

const getStoredTransactions = () => {
  const saved = localStorage.getItem("finance_transactions");
  return saved ? JSON.parse(saved) : defaultTransactions;
};

const getStoredBudget = () => {
  const saved = localStorage.getItem("finance_budget");
  return saved ? Number(saved) : 50000;
};

export function FinanceProvider({ children }) {
  const [transactions, setTransactions] = useState(getStoredTransactions);
  const [budget, setBudget] = useState(getStoredBudget);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    localStorage.setItem("finance_transactions", JSON.stringify(transactions));
  }, [transactions]);

  useEffect(() => {
    localStorage.setItem("finance_budget", String(budget));
  }, [budget]);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 600);
    return () => clearTimeout(timer);
  }, []);

  const addTransaction = (transaction) => {
    const newTransaction = { ...transaction, id: uuidv4() };
    setTransactions((current) => [newTransaction, ...current]);
    toast.success("Transaction added");
  };

  const updateTransaction = (id, values) => {
    setTransactions((current) =>
      current.map((item) => (item.id === id ? { ...item, ...values } : item))
    );
    toast.success("Transaction updated");
  };

  const deleteTransaction = (id) => {
    setTransactions((current) => current.filter((item) => item.id !== id));
    toast.success("Transaction deleted");
  };

  const setMonthlyBudget = (value) => {
    setBudget(Number(value) || 0);
    toast.success("Budget updated");
  };

  const getTransactionById = (id) => transactions.find((item) => item.id === id);

  const analytics = useMemo(() => {
    const totalIncome = transactions
      .filter((item) => item.type === "income")
      .reduce((sum, item) => sum + Number(item.amount), 0);

    const totalExpenses = transactions
      .filter((item) => item.type === "expense")
      .reduce((sum, item) => sum + Number(item.amount), 0);

    const expensesByCategory = transactions
      .filter((item) => item.type === "expense")
      .reduce((acc, item) => {
        const current = acc[item.category] || 0;
        acc[item.category] = current + Number(item.amount);
        return acc;
      }, {});

    const topSpendingCategory =
      Object.entries(expensesByCategory).sort((a, b) => b[1] - a[1])[0]?.[0] || "No expenses";

    const monthlyTrendMap = transactions.reduce((acc, item) => {
      const month = format(parseISO(item.date), "MMM yyyy");
      if (!acc[month]) {
        acc[month] = { month, income: 0, expense: 0 };
      }

      acc[month][item.type] += Number(item.amount);
      return acc;
    }, {});

    const recurringExpenses = transactions.filter(
      (item) => item.type === "expense" && item.recurring
    );

    return {
      totalIncome,
      totalExpenses,
      netBalance: totalIncome - totalExpenses,
      topSpendingCategory,
      expensesByCategory: Object.entries(expensesByCategory).map(([name, value]) => ({
        name,
        value,
      })),
      monthlyTrend: Object.values(monthlyTrendMap),
      recurringExpenses,
    };
  }, [transactions]);

  const filterTransactions = ({ search = "", category = "all", type = "all", from, to, sortBy = "date" }) => {
    let filtered = [...transactions];

    if (search.trim()) {
      const query = search.toLowerCase();
      filtered = filtered.filter(
        (item) =>
          item.title.toLowerCase().includes(query) || item.notes.toLowerCase().includes(query)
      );
    }

    if (category !== "all") {
      filtered = filtered.filter((item) => item.category === category);
    }

    if (type !== "all") {
      filtered = filtered.filter((item) => item.type === type);
    }

    if (from || to) {
      filtered = filtered.filter((item) => {
        const itemDate = startOfDay(parseISO(item.date));
        const start = from ? startOfDay(new Date(from)) : new Date("2000-01-01");
        const end = to ? startOfDay(new Date(to)) : new Date("2100-12-31");
        return isWithinInterval(itemDate, { start, end });
      });
    }

    filtered.sort((a, b) => {
      if (sortBy === "amount") {
        return Number(b.amount) - Number(a.amount);
      }

      if (sortBy === "category") {
        return a.category.localeCompare(b.category);
      }

      return new Date(b.date) - new Date(a.date);
    });

    return filtered;
  };

  return (
    <FinanceContext.Provider
      value={{
        transactions,
        budget,
        loading,
        analytics,
        addTransaction,
        updateTransaction,
        deleteTransaction,
        setMonthlyBudget,
        getTransactionById,
        filterTransactions,
      }}
    >
      {children}
    </FinanceContext.Provider>
  );
}
