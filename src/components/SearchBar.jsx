import { FiSearch } from "react-icons/fi";

function SearchBar({ value, onChange }) {
  return (
    <label className="search-bar">
      <FiSearch />
      <input
        type="text"
        placeholder="Search by title or notes"
        value={value}
        onChange={(event) => onChange(event.target.value)}
      />
    </label>
  );
}

export default SearchBar;
