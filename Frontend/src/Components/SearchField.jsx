const SearchField = ({ value, onChange }) => (
  <div className="search-wrapper">
    <input
      type="search"
      className="search-input"
      placeholder="Search discussions..."
      value={value}
      onChange={onChange}
      aria-label="Search threads"
    />
    <span className="search-icon">🔍</span>
  </div>
);

export default SearchField; 