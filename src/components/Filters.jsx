import { expenseCategories, incomeCategories } from "../utils/constants";

function Filters({ filters, setFilters }) {
  const categories = [...expenseCategories, ...incomeCategories];

  const handleChange = (key, value) => {
    setFilters((current) => ({ ...current, [key]: value }));
  };

  return (
    <div className="card filters-grid">
      <select value={filters.category} onChange={(event) => handleChange("category", event.target.value)}>
        <option value="all">All Categories</option>
        {categories.map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>

      <select value={filters.type} onChange={(event) => handleChange("type", event.target.value)}>
        <option value="all">All Types</option>
        <option value="income">Income</option>
        <option value="expense">Expense</option>
      </select>

      <input type="date" value={filters.from} onChange={(event) => handleChange("from", event.target.value)} />
      <input type="date" value={filters.to} onChange={(event) => handleChange("to", event.target.value)} />

      <select value={filters.sortBy} onChange={(event) => handleChange("sortBy", event.target.value)}>
        <option value="date">Sort by Date</option>
        <option value="amount">Sort by Amount</option>
        <option value="category">Sort by Category</option>
      </select>
    </div>
  );
}

export default Filters;
