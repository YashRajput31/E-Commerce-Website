/**
 * ============================================
 * AppRoutes — Application Routing Configuration
 * ============================================
 * Features:
 *  - Public routes (Home, Products, Search, Auth)
 *  - Protected routes (Orders, Checkout)
 *  - Admin routes (Admin Panel)
 *  - 404 Not Found page
 */

import { Routes, Route, Link } from "react-router-dom";

// Layouts & Guards
import MainLayout from "../layouts/MainLayout";
import ProtectedRoute from "../components/ProtectedRoute";

// Pages
import Home from "../pages/Home";
import ProductListing from "../pages/ProductListing";
import ProductDetails from "../pages/ProductDetails";
import SearchFilter from "../pages/SearchFilter";
import Cart from "../pages/Cart";
import Wishlist from "../pages/Wishlist";
import Checkout from "../pages/Checkout";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import OrderHistory from "../pages/OrderHistory";
import AdminPanel from "../pages/AdminPanel";

// 404 Page Component
const NotFound = () => (
  <div className="min-h-[60vh] flex flex-col items-center justify-center px-4 text-center">
    <h1 className="text-9xl font-black text-dark-border mb-4">404</h1>
    <h2 className="text-2xl font-bold text-text-primary mb-2">Page Not Found</h2>
    <p className="text-text-secondary mb-8 max-w-md mx-auto">
      The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
    </p>
    <Link
      to="/"
      className="px-8 py-3 bg-gradient-to-r from-primary to-primary-dark text-white font-semibold rounded-xl hover:shadow-xl hover:shadow-primary/25 transition-all duration-300"
    >
      Back to Home
    </Link>
  </div>
);

const AppRoutes = () => {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<ProductListing />} />
        <Route path="/products/:id" element={<ProductDetails />} />
        <Route path="/search" element={<SearchFilter />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/wishlist" element={<Wishlist />} />
        
        {/* Auth Routes (can be accessed without login, could add auth-reverse-guard if needed) */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Protected User Routes */}
        <Route
          path="/checkout"
          element={
            <ProtectedRoute>
              <Checkout />
            </ProtectedRoute>
          }
        />
        <Route
          path="/orders"
          element={
            <ProtectedRoute>
              <OrderHistory />
            </ProtectedRoute>
          }
        />

        {/* Protected Admin Routes */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute requireAdmin={true}>
              <AdminPanel />
            </ProtectedRoute>
          }
        />

        {/* 404 Catch All */}
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
