/**
 * ============================================
 * CartContext — Shopping Cart State Management
 * ============================================
 * Provides cart CRUD operations with localStorage persistence.
 * Features:
 *  - Add/Remove/Update quantity
 *  - Cart totals calculation (subtotal, tax, discount)
 *  - Coupon code support
 *  - Persist cart across page reloads
 */

import { createContext, useContext, useState, useEffect, useMemo } from "react";
import toast from "react-hot-toast";

const CartContext = createContext(null);

// Custom hook to consume cart context
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within CartProvider");
  return context;
};

// Available coupon codes
const COUPONS = {
  SAVE10: { discount: 10, type: "percent", label: "10% off" },
  FLAT200: { discount: 200, type: "flat", label: "₹200 off" },
  WELCOME: { discount: 15, type: "percent", label: "15% off (Welcome)" },
};

export const CartProvider = ({ children }) => {
  // Initialize cart from localStorage
  const [cartItems, setCartItems] = useState(() => {
    const saved = localStorage.getItem("shopverse_cart");
    return saved ? JSON.parse(saved) : [];
  });

  const [appliedCoupon, setAppliedCoupon] = useState(null);

  // Persist cart to localStorage on change
  useEffect(() => {
    localStorage.setItem("shopverse_cart", JSON.stringify(cartItems));
  }, [cartItems]);

  /** Add item to cart (or increment quantity if exists) */
  const addToCart = (product, quantity = 1) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        toast.success("Quantity updated in cart");
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      toast.success(`${product.title} added to cart`);
      return [...prev, { ...product, quantity }];
    });
  };

  /** Remove item from cart entirely */
  const removeFromCart = (productId) => {
    setCartItems((prev) => {
      const item = prev.find((i) => i.id === productId);
      if (item) toast.success(`${item.title} removed from cart`);
      return prev.filter((i) => i.id !== productId);
    });
  };

  /** Update quantity of a specific item */
  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity < 1) {
      removeFromCart(productId);
      return;
    }
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === productId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  /** Clear entire cart */
  const clearCart = () => {
    setCartItems([]);
    setAppliedCoupon(null);
    toast.success("Cart cleared");
  };

  /** Apply coupon code */
  const applyCoupon = (code) => {
    const coupon = COUPONS[code.toUpperCase()];
    if (coupon) {
      setAppliedCoupon({ code: code.toUpperCase(), ...coupon });
      toast.success(`Coupon "${code.toUpperCase()}" applied — ${coupon.label}`);
      return true;
    }
    toast.error("Invalid coupon code");
    return false;
  };

  /** Remove applied coupon */
  const removeCoupon = () => {
    setAppliedCoupon(null);
    toast.success("Coupon removed");
  };

  // Memoized cart calculations
  const cartSummary = useMemo(() => {
    const subtotal = cartItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );

    let discount = 0;
    if (appliedCoupon) {
      discount =
        appliedCoupon.type === "percent"
          ? Math.round(subtotal * (appliedCoupon.discount / 100))
          : appliedCoupon.discount;
    }

    const afterDiscount = subtotal - discount;
    const tax = Math.round(afterDiscount * 0.18); // 18% GST
    const shipping = subtotal > 999 ? 0 : 99;
    const total = afterDiscount + tax + shipping;
    const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
    const savings = cartItems.reduce(
      (sum, item) =>
        sum + (item.originalPrice - item.price) * item.quantity,
      0
    );

    return { subtotal, discount, tax, shipping, total, totalItems, savings };
  }, [cartItems, appliedCoupon]);

  const value = {
    cartItems,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    applyCoupon,
    removeCoupon,
    appliedCoupon,
    ...cartSummary,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export default CartContext;
