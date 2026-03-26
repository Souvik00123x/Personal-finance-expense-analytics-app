import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import SectionHeader from "../components/SectionHeader";
import useTransactions from "../hooks/useTransactions";
import { expenseCategories, incomeCategories } from "../utils/constants";

const schema = yup.object({
  title: yup.string().required("Title is required"),
  amount: yup
    .number()
    .typeError("Amount must be a number")
    .positive("Amount must be greater than zero")
    .required("Amount is required"),
  category: yup.string().required("Category is required"),
  date: yup.string().required("Date is required"),
  type: yup.string().oneOf(["income", "expense"]).required("Type is required"),
  notes: yup.string().required("Notes are required"),
  recurring: yup.boolean().default(false),
});

function AddTransaction() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { addTransaction, updateTransaction, getTransactionById } = useTransactions();
  const existingTransaction = id ? getTransactionById(id) : null;
  const [selectedType, setSelectedType] = useState(existingTransaction?.type || "expense");

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      title: "",
      amount: "",
      category: "Food",
      date: new Date().toISOString().slice(0, 10),
      type: "expense",
      notes: "",
      recurring: false,
    },
  });

  useEffect(() => {
    if (existingTransaction) {
      reset({
        ...existingTransaction,
        date: existingTransaction.date.slice(0, 10),
      });
      setSelectedType(existingTransaction.type);
    }
  }, [existingTransaction, reset]);

  const watchedType = watch("type", selectedType);
  const categories = watchedType === "income" ? incomeCategories : expenseCategories;

  const onSubmit = (values) => {
    const formattedValues = {
      ...values,
      amount: Number(values.amount),
      date: new Date(values.date).toISOString(),
    };

    if (existingTransaction) {
      updateTransaction(existingTransaction.id, formattedValues);
    } else {
      addTransaction(formattedValues);
    }

    navigate("/transactions");
  };

  return (
    <div className="page-content">
      <SectionHeader
        title={existingTransaction ? "Edit Transaction" : "Add Transaction"}
        description="Record income and expenses with category, notes, date, and recurring status."
      />

      <form className="card form-card" onSubmit={handleSubmit(onSubmit)}>
        <div className="form-grid">
          <label>
            Title
            <input type="text" placeholder="e.g. Netflix Subscription" {...register("title")} />
            <span className="error-text">{errors.title?.message}</span>
          </label>

          <label>
            Amount
            <input type="number" placeholder="Enter amount" {...register("amount")} />
            <span className="error-text">{errors.amount?.message}</span>
          </label>

          <label>
            Transaction Type
            <select
              {...register("type", {
                onChange: (event) => setSelectedType(event.target.value),
              })}
            >
              <option value="expense">Expense</option>
              <option value="income">Income</option>
            </select>
            <span className="error-text">{errors.type?.message}</span>
          </label>

          <label>
            Category
            <select {...register("category")}>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
            <span className="error-text">{errors.category?.message}</span>
          </label>

          <label>
            Date
            <input type="date" {...register("date")} />
            <span className="error-text">{errors.date?.message}</span>
          </label>

          <label className="checkbox-label">
            <input type="checkbox" {...register("recurring")} />
            Mark as recurring expense/income
          </label>
        </div>

        <label>
          Notes
          <textarea rows="4" placeholder="Write a small note" {...register("notes")} />
          <span className="error-text">{errors.notes?.message}</span>
        </label>

        <div className="form-actions">
          <button className="secondary-button" type="button" onClick={() => navigate("/transactions")}>
            Cancel
          </button>
          <button className="primary-button" type="submit">
            {existingTransaction ? "Update Transaction" : "Save Transaction"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddTransaction;
