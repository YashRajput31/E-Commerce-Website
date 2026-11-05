import { createContext, useContext, useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
import { cartApi } from "../services/api";
import { useAuth } from "./AuthContext";

const CartContext = createContext(null);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within CartProvider");
  return context;
};

const emptySummary = {
  subtotal: 0,
  discount: 0,
  tax: 0,
  shipping: 0,
  total: 0,
  totalItems: 0,
  savings: 0,
};

export const CartProvider = ({ children }) => {
  const { isAuthenticated } = useAuth();
  const [cartItems, setCartItems] = useState([]);
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [summary, setSummary] = useState(emptySummary);

  const syncCart = async (couponCode = appliedCoupon?.code || "") => {
    if (!isAuthenticated) {
      setCartItems([]);
      setSummary(emptySummary);
      setAppliedCoupon(null);
      return null;
    }
    const data = await cartApi.get(couponCode);
    setCartItems(data.items || []);
    setSummary({
      subtotal: data.subtotal || 0,
      discount: data.discount || 0,
      tax: data.tax || 0,
      shipping: data.shipping || 0,
      total: data.total || 0,
      totalItems: data.totalItems || 0,
      savings: data.savings || 0,
    });
    setAppliedCoupon(data.appliedCoupon || null);
    return data;
  };

  useEffect(() => {
    syncCart().catch(() => {});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated]);

  const requireLogin = () => {
    if (isAuthenticated) return true;
    toast.error("Please login to use your cart");
    return false;
  };

  const addToCart = async (product, quantity = 1) => {
    if (!requireLogin()) return;
    try {
      await cartApi.add(product.id, quantity);
      await syncCart();
      toast.success(`${product.title} added to cart`);
    } catch (err) {
      toast.error(err.message || "Could not add to cart");
    }
  };

  const removeFromCart = async (productId) => {
    try {
      await cartApi.remove(productId);
      await syncCart();
      toast.success("Item removed from cart");
    } catch (err) {
      toast.error(err.message || "Could not remove item");
    }
  };

  const updateQuantity = async (productId, newQuantity) => {
    try {
      await cartApi.update(productId, newQuantity);
      await syncCart();
    } catch (err) {
      toast.error(err.message || "Could not update quantity");
    }
  };

  const clearCart = async () => {
    try {
      await cartApi.clear();
      await syncCart();
      toast.success("Cart cleared");
    } catch (err) {
      toast.error(err.message || "Could not clear cart");
    }
  };

  const applyCoupon = async (code) => {
    try {
      const data = await syncCart(code);
      if (data?.appliedCoupon) {
        toast.success(`Coupon "${data.appliedCoupon.code}" applied`);
        return true;
      }
      toast.error("Invalid coupon code");
      return false;
    } catch (err) {
      toast.error(err.message || "Could not apply coupon");
      return false;
    }
  };

  const removeCoupon = async () => {
    setAppliedCoupon(null);
    await syncCart("");
    toast.success("Coupon removed");
  };

  const value = useMemo(
    () => ({
      cartItems,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      applyCoupon,
      removeCoupon,
      appliedCoupon,
      ...summary,
    }),
    [cartItems, appliedCoupon, summary]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export default CartContext;
