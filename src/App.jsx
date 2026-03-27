import { NavLink, Navigate, Route, Routes } from "react-router-dom";
import { FiBarChart2, FiCreditCard, FiDollarSign, FiHome, FiPlusCircle } from "react-icons/fi";
import { motion } from "framer-motion";
import Dashboard from "./pages/Dashboard";
import Transactions from "./pages/Transactions";
import AddTransaction from "./pages/AddTransaction";
import Budget from "./pages/Budget";
import Analytics from "./pages/Analytics";

const navItems = [
  { to: "/dashboard", label: "Dashboard", icon: <FiHome /> },
  { to: "/transactions", label: "Transactions", icon: <FiCreditCard /> },
  { to: "/transactions/new", label: "Add", icon: <FiPlusCircle /> },
  { to: "/budget", label: "Budget", icon: <FiDollarSign /> },
  { to: "/analytics", label: "Analytics", icon: <FiBarChart2 /> },
];

function App() {
  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div>
          <p className="eyebrow">Sim Fin</p>
          <h1>Sim Fin</h1>
          <p className="sidebar-text">
            Track income, manage spending, follow budgets, and understand your money with simple visuals.
          </p>
        </div>

        <nav className="nav-links">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}
            >
              {item.icon}
              <span>{item.label}</span>
            </NavLink>
          ))}
        </nav>
      </aside>

      <main className="page-shell">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
        >
          <Routes>
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/transactions" element={<Transactions />} />
            <Route path="/transactions/new" element={<AddTransaction />} />
            <Route path="/transactions/:id/edit" element={<AddTransaction />} />
            <Route path="/budget" element={<Budget />} />
            <Route path="/analytics" element={<Analytics />} />
          </Routes>
        </motion.div>
      </main>
    </div>
  );
}

export default App;
