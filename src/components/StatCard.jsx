import { formatCurrency } from "../utils/currencyFormatter";

function StatCard({ label, value, tone = "default" }) {
  return (
    <div className={`card stat-card ${tone}`}>
      <p>{label}</p>
      <h3>{typeof value === "number" ? formatCurrency(value) : value}</h3>
    </div>
  );
}

export default StatCard;
