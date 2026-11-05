/**
 * ============================================
 * Search & Filter Page
 * ============================================
 * Features:
 *  - Live search bar with debounce
 *  - Category filter chips
 *  - Price range filter
 *  - Search results grid
 *  - Empty search state
 */

import { useState, useMemo } from "react";
import { priceRanges } from "../data/products";
import { useProducts } from "../context/ProductContext";
import ProductCard from "../components/ProductCard";
import SearchBar from "../components/SearchBar";
import { HiOutlineSearch, HiOutlineX } from "react-icons/hi";

const SearchFilter = () => {
  const { products, categories } = useProducts();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedPriceRange, setSelectedPriceRange] = useState(null);

  // Toggle category chip
  const toggleCategory = (cat) => {
    setSelectedCategories((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]
    );
  };

  // Filtered results
  const results = useMemo(() => {
    let filtered = [...products];

    // Search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q)
      );
    }

    // Category filter
    if (selectedCategories.length > 0) {
      filtered = filtered.filter((p) =>
        selectedCategories.includes(p.category)
      );
    }

    // Price range filter
    if (selectedPriceRange !== null) {
      const range = priceRanges[selectedPriceRange];
      filtered = filtered.filter(
        (p) => p.price >= range.min && p.price <= range.max
      );
    }

    return filtered;
  }, [searchQuery, selectedCategories, selectedPriceRange]);

  const hasActiveFilters =
    searchQuery.trim() ||
    selectedCategories.length > 0 ||
    selectedPriceRange !== null;

  const clearAll = () => {
    setSearchQuery("");
    setSelectedCategories([]);
    setSelectedPriceRange(null);
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Page Header */}
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold text-text-primary">
          Search & Discover
        </h1>
        <p className="text-sm text-text-secondary">
          Find the perfect product from our curated collection
        </p>
      </div>

      {/* Search Bar */}
      <div className="w-full max-w-2xl mx-auto">
        <SearchBar
          value={searchQuery}
          onChange={setSearchQuery}
          placeholder="Search by name, category, or description..."
          autoFocus
        />
      </div>

      {/* Category Chips */}
      <div className="flex flex-wrap items-center justify-center gap-2">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => toggleCategory(cat)}
            className={`px-4 py-2 rounded-full text-sm font-medium border transition-all duration-200 ${
              selectedCategories.includes(cat)
                ? "bg-primary/20 border-primary/50 text-primary"
                : "bg-dark-card border-dark-border/50 text-text-secondary hover:border-primary/30 hover:text-text-primary"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Price Range Chips */}
      <div className="flex flex-wrap items-center justify-center gap-2">
        {priceRanges.map((range, idx) => (
          <button
            key={idx}
            onClick={() =>
              setSelectedPriceRange(selectedPriceRange === idx ? null : idx)
            }
            className={`px-4 py-2 rounded-full text-sm font-medium border transition-all duration-200 ${
              selectedPriceRange === idx
                ? "bg-secondary/20 border-secondary/50 text-secondary"
                : "bg-dark-card border-dark-border/50 text-text-secondary hover:border-secondary/30 hover:text-text-primary"
            }`}
          >
            {range.label}
          </button>
        ))}
      </div>

      {/* Active filters + Clear */}
      {hasActiveFilters && (
        <div className="flex items-center justify-center gap-3">
          <span className="text-sm text-text-muted">
            {results.length} result{results.length !== 1 ? "s" : ""}
          </span>
          <button
            onClick={clearAll}
            className="flex items-center gap-1 text-sm text-accent hover:text-accent-dark font-medium transition-colors"
          >
            <HiOutlineX className="w-4 h-4" />
            Clear All
          </button>
        </div>
      )}

      {/* Results Grid */}
      {results.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 stagger-children">
          {results.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        /* Empty State */
        <div className="text-center py-20">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-dark-card mb-6">
            <HiOutlineSearch className="w-10 h-10 text-text-muted" />
          </div>
          <h3 className="text-xl font-semibold text-text-primary mb-2">
            No results found
          </h3>
          <p className="text-sm text-text-secondary mb-6 w-full max-w-md mx-auto">
            We couldn&apos;t find any products matching your search. Try a
            different keyword or adjust your filters.
          </p>
          <button
            onClick={clearAll}
            className="px-6 py-2.5 bg-primary text-white text-sm font-medium rounded-xl hover:bg-primary-dark transition-colors"
          >
            Clear Filters
          </button>
        </div>
      )}
    </div>
  );
};

export default SearchFilter;
