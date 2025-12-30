import React, { useState } from 'react';
import './FilterBar.css';

const FilterBar = ({ onFilterChange, totalResults }) => {
  const [activeFilters, setActiveFilters] = useState({
    platform: 'all',
    priceRange: 'all',
    sortBy: 'name'
  });

  const handleFilterChange = (filterType, value) => {
    const newFilters = { ...activeFilters, [filterType]: value };
    setActiveFilters(newFilters);
    onFilterChange(newFilters);
  };

  return (
    <div className="filter-bar">
      <div className="filter-section">
        <label className="filter-label">Platform:</label>
        <select 
          value={activeFilters.platform}
          onChange={(e) => handleFilterChange('platform', e.target.value)}
          className="filter-select"
        >
          <option value="all">All Platforms</option>
          <option value="PC">PC</option>
          <option value="PlayStation">PlayStation</option>
          <option value="Xbox">Xbox</option>
          <option value="Nintendo Switch">Nintendo Switch</option>
        </select>
      </div>

      <div className="filter-section">
        <label className="filter-label">Price Range:</label>
        <select 
          value={activeFilters.priceRange}
          onChange={(e) => handleFilterChange('priceRange', e.target.value)}
          className="filter-select"
        >
          <option value="all">All Prices</option>
          <option value="0-20">€0 - €20</option>
          <option value="20-40">€20 - €40</option>
          <option value="40+">€40+</option>
        </select>
      </div>

      <div className="filter-section">
        <label className="filter-label">Sort by:</label>
        <select 
          value={activeFilters.sortBy}
          onChange={(e) => handleFilterChange('sortBy', e.target.value)}
          className="filter-select"
        >
          <option value="name">Name A-Z</option>
          <option value="price-low">Price: Low to High</option>
          <option value="price-high">Price: High to Low</option>
          <option value="discount">Biggest Discount</option>
        </select>
      </div>

      <div className="results-summary">
        <span className="results-text">{totalResults} games found</span>
      </div>
    </div>
  );
};

export default FilterBar;