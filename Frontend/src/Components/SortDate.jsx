import React from "react";
const SortDate = ({ sortOrder, onSortChange, className }) => {
  return (
    <div className="sort-date">
      <select className={className} value={sortOrder} onChange={onSortChange}>
        <option value="desc">Senaste först</option>
        <option value="asc">Äldsta först</option>
      </select>
    </div>
  );
};

export default SortDate;