import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import SectionHeader from "../components/SectionHeader";
import SearchBar from "../components/SearchBar";
import Filters from "../components/Filters";
import TransactionCard from "../components/TransactionCard";
import Loader from "../components/Loader";
import EmptyState from "../components/EmptyState";
import useTransactions from "../hooks/useTransactions";
import useDebounce from "../hooks/useDebounce";

function Transactions() {
  const { loading, filterTransactions, deleteTransaction } = useTransactions();
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState({
    category: "all",
    type: "all",
    from: "",
    to: "",
    sortBy: "date",
  });

  const debouncedSearch = useDebounce(search, 300);

  const filteredTransactions = useMemo(
    () =>
      filterTransactions({
        search: debouncedSearch,
        ...filters,
      }),
    [debouncedSearch, filters, filterTransactions]
  );

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="page-content">
      <SectionHeader
        title="Transactions"
        description="Search, filter, sort, edit, and manage every income or expense entry."
        action={
          <Link className="primary-button" to="/transactions/new">
            Add New
          </Link>
        }
      />

      <SearchBar value={search} onChange={setSearch} />
      <Filters filters={filters} setFilters={setFilters} />

      {filteredTransactions.length ? (
        <div className="transaction-list">
          {filteredTransactions.map((item) => (
            <TransactionCard key={item.id} transaction={item} onDelete={deleteTransaction} />
          ))}
        </div>
      ) : (
        <EmptyState
          title="No matching transactions"
          description="Try a different search word or adjust your filters."
        />
      )}
    </div>
  );
}

export default Transactions;
