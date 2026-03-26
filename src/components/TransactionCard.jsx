import { format, parseISO } from "date-fns";
import { FiEdit2, FiRepeat, FiTrash2 } from "react-icons/fi";
import { Link } from "react-router-dom";
import { formatCurrency } from "../utils/currencyFormatter";

function TransactionCard({ transaction, onDelete }) {
  return (
    <div className="card transaction-card">
      <div className="transaction-main">
        <div>
          <div className="transaction-title-row">
            <h3>{transaction.title}</h3>
            {transaction.recurring && (
              <span className="badge recurring">
                <FiRepeat />
                Recurring
              </span>
            )}
          </div>
          <p>{transaction.category}</p>
          <small>{format(parseISO(transaction.date), "dd MMM yyyy")}</small>
          {transaction.notes && <p className="note-text">{transaction.notes}</p>}
        </div>

        <div className="transaction-side">
          <span className={`badge ${transaction.type}`}>
            {transaction.type === "income" ? "Income" : "Expense"}
          </span>
          <strong className={transaction.type === "income" ? "income-text" : "expense-text"}>
            {transaction.type === "income" ? "+" : "-"}
            {formatCurrency(transaction.amount)}
          </strong>
          <div className="action-row">
            <Link className="icon-button" to={`/transactions/${transaction.id}/edit`}>
              <FiEdit2 />
            </Link>
            <button className="icon-button danger" onClick={() => onDelete(transaction.id)}>
              <FiTrash2 />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TransactionCard;
