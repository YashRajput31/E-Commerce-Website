/**
 * ============================================
 * Navbar — Sticky Navigation Bar
 * ============================================
 * Features:
 *  - Glassmorphism design
 *  - Responsive mobile hamburger menu
 *  - Cart badge with item count
 *  - Auth-aware (shows user name / login link)
 *  - Active link highlighting
 */

import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import {
  HiOutlineShoppingCart,
  HiOutlineUser,
  HiOutlineMenu,
  HiOutlineX,
  HiOutlineSearch,
  HiOutlineLogout,
  HiOutlineShieldCheck,
  HiOutlineHeart,
} from "react-icons/hi";

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { user, isAuthenticated, isAdmin, logout } = useAuth();
  const { totalItems } = useCart();
  const { wishlistItems } = useWishlist();
  const navigate = useNavigate();

  // Navigation links
  const navLinks = [
    { to: "/", label: "Home" },
    { to: "/products", label: "Products" },
    { to: "/search", label: "Search & Filter" },
    { to: "/orders", label: "Orders" },
  ];

  const handleLogout = () => {
    logout();
    setMobileOpen(false);
    navigate("/");
  };

  // Shared link style with active indicator
  const linkClass = ({ isActive }) =>
    `relative px-3 py-2 text-sm font-medium transition-colors duration-200 ${
      isActive
        ? "text-primary"
        : "text-text-secondary hover:text-text-primary"
    }`;

  return (
    <nav className="sticky top-0 z-50 glass border-b border-dark-border/50">
      <div className="w-full px-6 sm:px-10 lg:px-16">
        <div className="flex items-center justify-between h-20">
          {/* ===== Logo ===== */}
          <Link to="/" className="flex items-center gap-2 shrink-0">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-bold text-lg">
              S
            </div>
            <span className="text-xl font-bold gradient-text hidden sm:block">
              ShopVerse
            </span>
          </Link>

          {/* ===== Desktop Navigation ===== */}
          <div className="hidden md:flex items-center gap-4 lg:gap-8">
            {navLinks.map((link) => (
              <NavLink key={link.to} to={link.to} className={linkClass}>
                {link.label}
              </NavLink>
            ))}
            {isAdmin && (
              <NavLink to="/admin" className={linkClass}>
                <span className="flex items-center gap-1">
                  <HiOutlineShieldCheck className="w-4 h-4" />
                  Admin
                </span>
              </NavLink>
            )}
          </div>

          {/* ===== Right Actions ===== */}
          <div className="flex items-center gap-4 lg:gap-6">
            {/* Search Icon (navigates to search page) */}
            <button
              onClick={() => navigate("/search")}
              className="hidden sm:flex p-2 rounded-lg text-text-secondary hover:text-text-primary hover:bg-dark-card transition-colors"
              aria-label="Search"
            >
              <HiOutlineSearch className="w-5 h-5" />
            </button>

            {/* Wishlist Button */}
            <Link
              to="/wishlist"
              className="relative p-2 rounded-lg text-text-secondary hover:text-accent hover:bg-dark-card transition-colors"
              aria-label="Wishlist"
            >
              <HiOutlineHeart className="w-5 h-5" />
              {wishlistItems.length > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-5 h-5 bg-accent text-white text-xs font-bold rounded-full flex items-center justify-center animate-pulse-glow">
                  {wishlistItems.length > 9 ? "9+" : wishlistItems.length}
                </span>
              )}
            </Link>

            {/* Cart Button */}
            <Link
              to="/cart"
              className="relative p-2 rounded-lg text-text-secondary hover:text-text-primary hover:bg-dark-card transition-colors"
              aria-label="Cart"
            >
              <HiOutlineShoppingCart className="w-5 h-5" />
              {totalItems > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-5 h-5 bg-accent text-white text-xs font-bold rounded-full flex items-center justify-center animate-pulse-glow">
                  {totalItems > 9 ? "9+" : totalItems}
                </span>
              )}
            </Link>

            {/* User / Auth */}
            {isAuthenticated ? (
              <div className="hidden sm:flex items-center gap-2">
                <Link
                  to="/orders"
                  className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-dark-card hover:bg-dark-border transition-colors"
                >
                  <div className="w-6 h-6 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white text-xs font-bold">
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                  <span className="text-sm text-text-primary font-medium max-w-[80px] truncate">
                    {user.name}
                  </span>
                </Link>
                <button
                  onClick={handleLogout}
                  className="p-2 rounded-lg text-text-secondary hover:text-danger hover:bg-dark-card transition-colors"
                  aria-label="Logout"
                >
                  <HiOutlineLogout className="w-5 h-5" />
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                className="hidden sm:flex items-center gap-1.5 px-4 py-1.5 rounded-lg bg-gradient-to-r from-primary to-primary-dark text-white text-sm font-medium hover:shadow-lg hover:shadow-primary/25 transition-all duration-300"
              >
                <HiOutlineUser className="w-4 h-4" />
                Login
              </Link>
            )}

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden p-2 rounded-lg text-text-secondary hover:text-text-primary hover:bg-dark-card transition-colors"
              aria-label="Toggle menu"
            >
              {mobileOpen ? (
                <HiOutlineX className="w-6 h-6" />
              ) : (
                <HiOutlineMenu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* ===== Mobile Menu ===== */}
      {mobileOpen && (
        <div className="md:hidden animate-slide-in-left border-t border-dark-border/50">
          <div className="px-4 py-4 space-y-1 bg-dark-card/90 backdrop-blur-lg">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                onClick={() => setMobileOpen(false)}
                className={({ isActive }) =>
                  `block px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                    isActive
                      ? "bg-primary/10 text-primary"
                      : "text-text-secondary hover:bg-dark-border hover:text-text-primary"
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
            {isAdmin && (
              <NavLink
                to="/admin"
                onClick={() => setMobileOpen(false)}
                className="block px-4 py-2.5 rounded-lg text-sm font-medium text-text-secondary hover:bg-dark-border hover:text-text-primary transition-colors"
              >
                ⚙️ Admin Panel
              </NavLink>
            )}

            <div className="border-t border-dark-border/50 pt-3 mt-3">
              {isAuthenticated ? (
                <div className="space-y-2">
                  <div className="flex items-center gap-3 px-4 py-2">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white text-sm font-bold">
                      {user.name.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-text-primary">{user.name}</p>
                      <p className="text-xs text-text-muted">{user.email}</p>
                    </div>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="w-full px-4 py-2.5 rounded-lg text-sm font-medium text-danger hover:bg-danger/10 transition-colors text-left"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <div className="flex gap-2">
                  <Link
                    to="/login"
                    onClick={() => setMobileOpen(false)}
                    className="flex-1 px-4 py-2.5 rounded-lg text-sm font-medium text-center bg-gradient-to-r from-primary to-primary-dark text-white"
                  >
                    Login
                  </Link>
                  <Link
                    to="/signup"
                    onClick={() => setMobileOpen(false)}
                    className="flex-1 px-4 py-2.5 rounded-lg text-sm font-medium text-center border border-dark-border text-text-secondary hover:text-text-primary"
                  >
                    Sign Up
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
