import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  Cell,
} from "recharts";
import { formatCurrency } from "../utils/currencyFormatter";

const chartColors = ["#0f766e", "#f59e0b", "#ef4444", "#3b82f6", "#7c3aed", "#14b8a6"];

function Charts({ categoryData, monthlyData }) {
  return (
    <div className="charts-grid">
      <div className="card chart-card">
        <h3>Spending by Category</h3>
        <ResponsiveContainer width="100%" height={280}>
          <PieChart>
            <Pie data={categoryData} dataKey="value" nameKey="name" outerRadius={90} label>
              {categoryData.map((entry, index) => (
                <Cell key={entry.name} fill={chartColors[index % chartColors.length]} />
              ))}
            </Pie>
            <Tooltip formatter={(value) => formatCurrency(value)} />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className="card chart-card">
        <h3>Monthly Spending Trend</h3>
        <ResponsiveContainer width="100%" height={280}>
          <LineChart data={monthlyData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip formatter={(value) => formatCurrency(value)} />
            <Legend />
            <Line type="monotone" dataKey="expense" stroke="#ef4444" strokeWidth={3} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="card chart-card full-span">
        <h3>Income vs Expense Comparison</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={monthlyData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip formatter={(value) => formatCurrency(value)} />
            <Legend />
            <Bar dataKey="income" fill="#0f766e" radius={[8, 8, 0, 0]} />
            <Bar dataKey="expense" fill="#f97316" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default Charts;
