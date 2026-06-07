/**
 * ============================================
 * FilterSidebar — Product Filtering Controls
 * ============================================
 * Features:
 *  - Category checkboxes
 *  - Price range radio buttons
 *  - Rating filter
 *  - Clear all filters button
 *  - Collapsible sections on mobile
 */

import { useState } from "react";
import { categories, priceRanges } from "../data/products";
import { HiStar, HiOutlineX, HiOutlineAdjustments } from "react-icons/hi";

const FilterSidebar = ({
  selectedCategories = [],
  onCategoryChange,
  selectedPriceRange = null,
  onPriceChange,
  selectedRating = 0,
  onRatingChange,
  onClearAll,
}) => {
  const [mobileOpen, setMobileOpen] = useState(false);

  // Count active filters
  const activeCount =
    selectedCategories.length +
    (selectedPriceRange ? 1 : 0) +
    (selectedRating > 0 ? 1 : 0);

  const handleCategoryToggle = (category) => {
    if (selectedCategories.includes(category)) {
      onCategoryChange(selectedCategories.filter((c) => c !== category));
    } else {
      onCategoryChange([...selectedCategories, category]);
    }
  };

  const filterContent = (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-base font-semibold text-text-primary flex items-center gap-2">
          <HiOutlineAdjustments className="w-5 h-5 text-primary" />
          Filters
          {activeCount > 0 && (
            <span className="px-2 py-0.5 bg-primary/20 text-primary text-xs font-bold rounded-full">
              {activeCount}
            </span>
          )}
        </h3>
        {activeCount > 0 && (
          <button
            onClick={() => {
              onClearAll();
              setMobileOpen(false);
            }}
            className="text-xs text-accent hover:text-accent-dark font-medium transition-colors"
          >
            Clear All
          </button>
        )}
      </div>

      {/* ===== Category Filter ===== */}
      <div>
        <h4 className="text-sm font-semibold text-text-primary mb-3 uppercase tracking-wider">
          Category
        </h4>
        <div className="space-y-2">
          {categories.map((cat) => (
            <label
              key={cat}
              className="flex items-center gap-3 cursor-pointer group"
            >
              <input
                type="checkbox"
                checked={selectedCategories.includes(cat)}
                onChange={() => handleCategoryToggle(cat)}
                className="w-4 h-4 rounded border-dark-border bg-dark-surface text-primary focus:ring-primary/30 accent-[var(--color-primary)]"
              />
              <span className="text-sm text-text-secondary group-hover:text-text-primary transition-colors">
                {cat}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* ===== Price Range Filter ===== */}
      <div className="border-t border-dark-border/30 pt-5">
        <h4 className="text-sm font-semibold text-text-primary mb-3 uppercase tracking-wider">
          Price Range
        </h4>
        <div className="space-y-2">
          {priceRanges.map((range, idx) => (
            <label
              key={idx}
              className="flex items-center gap-3 cursor-pointer group"
            >
              <input
                type="radio"
                name="priceRange"
                checked={selectedPriceRange === idx}
                onChange={() => onPriceChange(idx)}
                className="w-4 h-4 border-dark-border bg-dark-surface text-primary focus:ring-primary/30 accent-[var(--color-primary)]"
              />
              <span className="text-sm text-text-secondary group-hover:text-text-primary transition-colors">
                {range.label}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* ===== Rating Filter ===== */}
      <div className="border-t border-dark-border/30 pt-5">
        <h4 className="text-sm font-semibold text-text-primary mb-3 uppercase tracking-wider">
          Minimum Rating
        </h4>
        <div className="space-y-2">
          {[4, 3, 2, 1].map((star) => (
            <label
              key={star}
              className="flex items-center gap-3 cursor-pointer group"
            >
              <input
                type="radio"
                name="rating"
                checked={selectedRating === star}
                onChange={() => onRatingChange(star)}
                className="w-4 h-4 border-dark-border bg-dark-surface text-primary focus:ring-primary/30 accent-[var(--color-primary)]"
              />
              <span className="flex items-center gap-1">
                {Array.from({ length: 5 }, (_, i) => (
                  <HiStar
                    key={i}
                    className={`w-4 h-4 ${
                      i < star ? "text-gold" : "text-dark-border"
                    }`}
                  />
                ))}
                <span className="text-xs text-text-muted ml-1">& up</span>
              </span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile Filter Toggle */}
      <button
        onClick={() => setMobileOpen(true)}
        className="lg:hidden flex items-center gap-2 px-4 py-2.5 bg-dark-card border border-dark-border/50 rounded-xl text-sm font-medium text-text-secondary hover:text-text-primary transition-colors"
      >
        <HiOutlineAdjustments className="w-5 h-5" />
        Filters
        {activeCount > 0 && (
          <span className="px-2 py-0.5 bg-primary/20 text-primary text-xs font-bold rounded-full">
            {activeCount}
          </span>
        )}
      </button>

      {/* Desktop Sidebar */}
      <aside className="hidden lg:block w-64 shrink-0">
        <div className="sticky top-20 bg-dark-card border border-dark-border/50 rounded-2xl p-5">
          {filterContent}
        </div>
      </aside>

      {/* Mobile Overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-black/60"
            onClick={() => setMobileOpen(false)}
          />
          <div className="absolute left-0 top-0 bottom-0 w-80 max-w-[85vw] bg-dark-card p-5 overflow-y-auto animate-slide-in-left">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-text-primary">Filters</h3>
              <button
                onClick={() => setMobileOpen(false)}
                className="p-2 rounded-lg text-text-secondary hover:text-text-primary hover:bg-dark-border transition-colors"
              >
                <HiOutlineX className="w-5 h-5" />
              </button>
            </div>
            {filterContent}
          </div>
        </div>
      )}
    </>
  );
};

export default FilterSidebar;
