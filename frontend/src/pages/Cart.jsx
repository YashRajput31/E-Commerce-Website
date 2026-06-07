/**
 * ============================================
 * Cart Page
 * ============================================
 * Features:
 *  - Cart items list with quantity controls
 *  - Remove items
 *  - Coupon code input
 *  - Cart summary (subtotal, discount, tax, shipping, total)
 *  - Empty cart state
 *  - Continue shopping / Checkout CTAs
 */

import { useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import CartItem from "../components/CartItem";
import {
  HiOutlineShoppingCart,
  HiOutlineTag,
  HiOutlineX,
  HiOutlineArrowRight,
  HiOutlineTrash,
} from "react-icons/hi";

const Cart = () => {
  const {
    cartItems,
    clearCart,
    applyCoupon,
    removeCoupon,
    appliedCoupon,
    subtotal,
    discount,
    tax,
    shipping,
    total,
    savings,
  } = useCart();

  const [couponCode, setCouponCode] = useState("");

  const handleApplyCoupon = () => {
    if (couponCode.trim()) {
      const success = applyCoupon(couponCode.trim());
      if (success) setCouponCode("");
    }
  };

  // Empty cart state
  if (cartItems.length === 0) {
    return (
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-dark-card mb-6">
          <HiOutlineShoppingCart className="w-12 h-12 text-text-muted" />
        </div>
        <h2 className="text-2xl font-bold text-text-primary mb-2">
          Your cart is empty
        </h2>
        <p className="text-text-secondary mb-8 w-full max-w-md mx-auto">
          Looks like you haven&apos;t added anything yet. Browse our products
          and find something you love.
        </p>
        <Link
          to="/products"
          className="inline-flex items-center gap-2 px-8 py-3.5 bg-gradient-to-r from-primary to-primary-dark text-white font-semibold rounded-xl hover:shadow-xl hover:shadow-primary/25 transition-all duration-300"
        >
          Continue Shopping
          <HiOutlineArrowRight className="w-4 h-4" />
        </Link>
      </div>
    );
  }

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-text-primary">Shopping Cart</h1>
          <p className="text-sm text-text-secondary mt-1">
            {cartItems.length} item{cartItems.length !== 1 ? "s" : ""} in your cart
          </p>
        </div>
        <button
          onClick={clearCart}
          className="flex items-center gap-1.5 text-sm text-danger hover:text-danger/80 font-medium transition-colors"
        >
          <HiOutlineTrash className="w-4 h-4" />
          Clear Cart
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* ===== Cart Items ===== */}
        <div className="lg:col-span-2 space-y-4">
          {cartItems.map((item) => (
            <CartItem key={item.id} item={item} />
          ))}

          {/* Continue Shopping */}
          <Link
            to="/products"
            className="inline-flex items-center gap-2 text-sm text-primary hover:text-primary-light font-medium transition-colors pt-2"
          >
            ← Continue Shopping
          </Link>
        </div>

        {/* ===== Cart Summary ===== */}
        <div className="lg:col-span-1">
          <div className="sticky top-20 bg-dark-card border border-dark-border/50 rounded-2xl p-6 space-y-5">
            <h3 className="text-lg font-semibold text-text-primary">
              Order Summary
            </h3>

            {/* Coupon Code */}
            <div>
              {appliedCoupon ? (
                <div className="flex items-center justify-between p-3 bg-success/10 border border-success/20 rounded-xl">
                  <div className="flex items-center gap-2">
                    <HiOutlineTag className="w-4 h-4 text-success" />
                    <span className="text-sm font-medium text-success">
                      {appliedCoupon.code} — {appliedCoupon.label}
                    </span>
                  </div>
                  <button
                    onClick={removeCoupon}
                    className="p-1 text-success hover:text-success/70 transition-colors"
                  >
                    <HiOutlineX className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    placeholder="Coupon code"
                    className="flex-1 px-4 py-2.5 bg-dark-surface border border-dark-border/50 rounded-xl text-sm text-text-primary placeholder-text-muted"
                    onKeyDown={(e) => e.key === "Enter" && handleApplyCoupon()}
                  />
                  <button
                    onClick={handleApplyCoupon}
                    className="px-4 py-2.5 bg-primary/10 border border-primary/20 text-primary text-sm font-medium rounded-xl hover:bg-primary/20 transition-colors"
                  >
                    Apply
                  </button>
                </div>
              )}
              <p className="text-xs text-text-muted mt-2">
                Try: SAVE10, FLAT200, or WELCOME
              </p>
            </div>

            {/* Price Breakdown */}
            <div className="space-y-3 border-t border-dark-border/30 pt-4">
              <div className="flex justify-between text-sm">
                <span className="text-text-secondary">Subtotal</span>
                <span className="text-text-primary font-medium">
                  ₹{subtotal.toLocaleString()}
                </span>
              </div>

              {discount > 0 && (
                <div className="flex justify-between text-sm">
                  <span className="text-success">Coupon Discount</span>
                  <span className="text-success font-medium">
                    −₹{discount.toLocaleString()}
                  </span>
                </div>
              )}

              {savings > 0 && (
                <div className="flex justify-between text-sm">
                  <span className="text-success">Product Savings</span>
                  <span className="text-success font-medium">
                    −₹{savings.toLocaleString()}
                  </span>
                </div>
              )}

              <div className="flex justify-between text-sm">
                <span className="text-text-secondary">Tax (18% GST)</span>
                <span className="text-text-primary font-medium">
                  ₹{tax.toLocaleString()}
                </span>
              </div>

              <div className="flex justify-between text-sm">
                <span className="text-text-secondary">Shipping</span>
                <span
                  className={`font-medium ${
                    shipping === 0 ? "text-success" : "text-text-primary"
                  }`}
                >
                  {shipping === 0 ? "FREE" : `₹${shipping}`}
                </span>
              </div>
            </div>

            {/* Total */}
            <div className="flex justify-between border-t border-dark-border/30 pt-4">
              <span className="text-base font-semibold text-text-primary">
                Grand Total
              </span>
              <span className="text-xl font-bold gradient-text">
                ₹{total.toLocaleString()}
              </span>
            </div>

            {/* Checkout Button */}
            <Link
              to="/checkout"
              className="flex items-center justify-center gap-2 w-full py-3.5 bg-gradient-to-r from-primary to-primary-dark text-white font-semibold rounded-xl hover:shadow-xl hover:shadow-primary/25 active:scale-[0.98] transition-all duration-300"
            >
              Proceed to Checkout
              <HiOutlineArrowRight className="w-4 h-4" />
            </Link>

            {/* Security note */}
            <p className="text-xs text-text-muted text-center flex items-center justify-center gap-1">
              🔒 Secure checkout — your data is protected
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
