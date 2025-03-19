const DateFilter = ({ value, onChange }) => (
  <div className="filter-wrapper">
    <select 
      className="date-filter"
      value={value}
      onChange={onChange}
      aria-label="Sort by date"
    >
      <option value="newest">Senaste</option>
      <option value="oldest">Äldsta</option>
    </select>
  </div>
);

export default DateFilter; 