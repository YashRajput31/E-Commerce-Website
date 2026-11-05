/**
 * ============================================
 * Product Listing Page
 * ============================================
 * Features:
 *  - Product grid with responsive layout
 *  - Filter sidebar (category, price, rating)
 *  - Sort dropdown (price, rating, name)
 *  - Pagination
 *  - URL query param for pre-selected category
 */

import { useState, useMemo, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { priceRanges } from "../data/products";
import { useProducts } from "../context/ProductContext";
import ProductCard from "../components/ProductCard";
import FilterSidebar from "../components/FilterSidebar";
import { HiOutlineSortDescending, HiOutlineViewGrid } from "react-icons/hi";

const ITEMS_PER_PAGE = 8;

const ProductListing = () => {
  const [searchParams] = useSearchParams();
  const { products, categories, loading } = useProducts();

  // Filter state
  const [selectedCategories, setSelectedCategories] = useState(() => {
    const cat = searchParams.get("category");
    return cat ? [cat] : [];
  });
  const [selectedPriceRange, setSelectedPriceRange] = useState(null);
  const [selectedRating, setSelectedRating] = useState(0);
  const [sortBy, setSortBy] = useState("default");
  const [currentPage, setCurrentPage] = useState(1);

  // Reset page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategories, selectedPriceRange, selectedRating, sortBy]);

  // Sync category from URL
  useEffect(() => {
    const cat = searchParams.get("category");
    if (cat) setSelectedCategories([cat]);
  }, [searchParams]);

  // Filtered + sorted products
  const filteredProducts = useMemo(() => {
    let result = [...products];

    // Category filter
    if (selectedCategories.length > 0) {
      result = result.filter((p) => selectedCategories.includes(p.category));
    }

    // Price range filter
    if (selectedPriceRange !== null) {
      const range = priceRanges[selectedPriceRange];
      result = result.filter(
        (p) => p.price >= range.min && p.price <= range.max
      );
    }

    // Rating filter
    if (selectedRating > 0) {
      result = result.filter((p) => p.rating >= selectedRating);
    }

    // Sorting
    switch (sortBy) {
      case "price-low":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        result.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        result.sort((a, b) => b.rating - a.rating);
        break;
      case "name":
        result.sort((a, b) => a.title.localeCompare(b.title));
        break;
      default:
        break;
    }

    return result;
  }, [selectedCategories, selectedPriceRange, selectedRating, sortBy]);

  // Pagination
  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const clearAllFilters = () => {
    setSelectedCategories([]);
    setSelectedPriceRange(null);
    setSelectedRating(0);
    setSortBy("default");
  };

  return (
    <div className="w-full max-w-full px-6 sm:px-10 lg:px-16 py-8">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-text-primary">All Products</h1>
        <p className="text-sm text-text-secondary mt-1">
          {loading ? "Loading products..." : `${filteredProducts.length} products found`}
        </p>
      </div>

      <div className="flex gap-8">
        {/* Filter Sidebar */}
        <FilterSidebar
          selectedCategories={selectedCategories}
          onCategoryChange={setSelectedCategories}
          selectedPriceRange={selectedPriceRange}
          onPriceChange={setSelectedPriceRange}
          selectedRating={selectedRating}
          onRatingChange={setSelectedRating}
          onClearAll={clearAllFilters}
          categories={categories}
        />

        {/* Main Content */}
        <div className="flex-1 min-w-0">
          {/* Toolbar */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
            {/* Mobile filter button rendered inside FilterSidebar */}
            <div className="flex items-center gap-3 lg:hidden">
              <FilterSidebar
                selectedCategories={selectedCategories}
                onCategoryChange={setSelectedCategories}
                selectedPriceRange={selectedPriceRange}
                onPriceChange={setSelectedPriceRange}
                selectedRating={selectedRating}
                onRatingChange={setSelectedRating}
                onClearAll={clearAllFilters}
                categories={categories}
              />
            </div>

            <div className="flex items-center gap-2 text-text-secondary">
              <HiOutlineViewGrid className="w-5 h-5" />
              <span className="text-sm">
                Showing {(currentPage - 1) * ITEMS_PER_PAGE + 1}–
                {Math.min(currentPage * ITEMS_PER_PAGE, filteredProducts.length)}{" "}
                of {filteredProducts.length}
              </span>
            </div>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-2">
              <HiOutlineSortDescending className="w-5 h-5 text-text-muted" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2 bg-dark-card border border-dark-border/50 rounded-lg text-sm text-text-primary focus:border-primary cursor-pointer"
              >
                <option value="default">Default</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Top Rated</option>
                <option value="name">Name: A to Z</option>
              </select>
            </div>
          </div>

          {/* Product Grid */}
          {paginatedProducts.length > 0 ? (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 stagger-children">
                {paginatedProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex items-center justify-center gap-2 mt-10">
                  <button
                    onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                    disabled={currentPage === 1}
                    className="px-4 py-2 text-sm font-medium bg-dark-card border border-dark-border/50 rounded-lg text-text-secondary hover:text-text-primary hover:border-primary/30 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                  >
                    Previous
                  </button>

                  {Array.from({ length: totalPages }, (_, i) => (
                    <button
                      key={i}
                      onClick={() => setCurrentPage(i + 1)}
                      className={`w-10 h-10 text-sm font-medium rounded-lg transition-all duration-200 ${
                        currentPage === i + 1
                          ? "bg-primary text-white shadow-lg shadow-primary/25"
                          : "bg-dark-card border border-dark-border/50 text-text-secondary hover:border-primary/30"
                      }`}
                    >
                      {i + 1}
                    </button>
                  ))}

                  <button
                    onClick={() =>
                      setCurrentPage((p) => Math.min(totalPages, p + 1))
                    }
                    disabled={currentPage === totalPages}
                    className="px-4 py-2 text-sm font-medium bg-dark-card border border-dark-border/50 rounded-lg text-text-secondary hover:text-text-primary hover:border-primary/30 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                  >
                    Next
                  </button>
                </div>
              )}
            </>
          ) : (
            /* Empty state */
            <div className="text-center py-20">
              <p className="text-6xl mb-4">🔍</p>
              <h3 className="text-xl font-semibold text-text-primary mb-2">
                No products found
              </h3>
              <p className="text-sm text-text-secondary mb-6">
                Try adjusting your filters to find what you&apos;re looking for.
              </p>
              <button
                onClick={clearAllFilters}
                className="px-6 py-2.5 bg-primary text-white text-sm font-medium rounded-xl hover:bg-primary-dark transition-colors"
              >
                Clear All Filters
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductListing;
