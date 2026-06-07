/**
 * ============================================
 * SearchBar — Reusable Search Input Component
 * ============================================
 * Features:
 *  - Debounced search input
 *  - Search icon with clear button
 *  - Glassmorphism styling
 */

import { useState, useEffect, useRef } from "react";
import { HiOutlineSearch, HiOutlineX } from "react-icons/hi";

const SearchBar = ({ value = "", onChange, placeholder = "Search products...", autoFocus = false }) => {
  const [localValue, setLocalValue] = useState(value);
  const inputRef = useRef(null);

  // Sync external value changes
  useEffect(() => {
    setLocalValue(value);
  }, [value]);

  // Debounce: emit onChange after 300ms of inactivity
  useEffect(() => {
    const timer = setTimeout(() => {
      if (onChange) onChange(localValue);
    }, 300);
    return () => clearTimeout(timer);
  }, [localValue]);

  const handleClear = () => {
    setLocalValue("");
    if (onChange) onChange("");
    inputRef.current?.focus();
  };

  return (
    <div className="relative w-full">
      {/* Search Icon */}
      <HiOutlineSearch className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted pointer-events-none" />

      {/* Input */}
      <input
        ref={inputRef}
        type="text"
        value={localValue}
        onChange={(e) => setLocalValue(e.target.value)}
        placeholder={placeholder}
        autoFocus={autoFocus}
        className="w-full pl-12 pr-10 py-3 bg-dark-card border border-dark-border/50 rounded-xl text-sm text-text-primary placeholder-text-muted focus:border-primary transition-colors duration-200"
      />

      {/* Clear Button */}
      {localValue && (
        <button
          onClick={handleClear}
          className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-md text-text-muted hover:text-text-primary hover:bg-dark-border transition-colors"
          aria-label="Clear search"
        >
          <HiOutlineX className="w-4 h-4" />
        </button>
      )}
    </div>
  );
};

export default SearchBar;
