import React from "react";
import "./filterBar.css";

function FilterBar({ sort, setSort }) {
  return (
    <div className="filter-bar">
      <div className="filter-bar__sort">
        <label>Sort by:</label>
        <select value={sort} onChange={(e) => setSort(e.target.value)}>
          <option value="newest">Newest</option>
          <option value="oldest">Oldest</option>
        </select>
      </div>
      <div className="filter-bar__tags"></div>
    </div>
  );
}

export default FilterBar;