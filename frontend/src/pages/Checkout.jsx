/**
 * ============================================
 * Checkout Page
 * ============================================
 * Features:
 *  - Shipping form (name, email, phone, address, city, state, pincode)
 *  - Payment method selection (COD, UPI, Card)
 *  - Order summary with products
 *  - Form validation
 *  - Place order with confirmation
 */

import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { ordersApi } from "../services/api";
import toast from "react-hot-toast";
import {
  HiOutlineTruck,
  HiOutlineCreditCard,
  HiOutlineCash,
  HiOutlineDeviceMobile,
  HiOutlineCheck,
  HiOutlineShoppingCart,
  HiOutlineArrowRight,
} from "react-icons/hi";

const Checkout = () => {
  const navigate = useNavigate();
  const { cartItems, subtotal, discount, tax, shipping, total, clearCart } = useCart();
  const { user } = useAuth();

  // Shipping form state
  const [form, setForm] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: user?.phone || "",
    address: "",
    city: "",
    state: "",
    pincode: "",
  });

  const [paymentMethod, setPaymentMethod] = useState("cod");
  const [errors, setErrors] = useState({});
  const [isPlacing, setIsPlacing] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [placedOrder, setPlacedOrder] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    // Clear error on change
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  // Basic form validation
  const validate = () => {
    const errs = {};
    if (!form.name.trim()) errs.name = "Name is required";
    if (!form.email.trim()) errs.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(form.email)) errs.email = "Invalid email";
    if (!form.phone.trim()) errs.phone = "Phone is required";
    else if (!/^\d{10}$/.test(form.phone)) errs.phone = "Enter 10-digit number";
    if (!form.address.trim()) errs.address = "Address is required";
    if (!form.city.trim()) errs.city = "City is required";
    if (!form.state.trim()) errs.state = "State is required";
    if (!form.pincode.trim()) errs.pincode = "Pincode is required";
    else if (!/^\d{6}$/.test(form.pincode)) errs.pincode = "Enter 6-digit pincode";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handlePlaceOrder = async () => {
    if (!validate()) {
      toast.error("Please fix the form errors");
      return;
    }

    setIsPlacing(true);
    try {
      const data = await ordersApi.create({
        shipping: form,
        paymentMethod,
        couponCode: null,
      });
      setPlacedOrder(data.order);
      setIsPlacing(false);
      setOrderPlaced(true);
      clearCart();
      toast.success("Order placed successfully!");
    } catch (err) {
      setIsPlacing(false);
      toast.error(err.message || "Could not place order");
    }
  };

  // Empty cart redirect
  if (cartItems.length === 0 && !orderPlaced) {
    return (
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-dark-card mb-6">
          <HiOutlineShoppingCart className="w-12 h-12 text-text-muted" />
        </div>
        <h2 className="text-2xl font-bold text-text-primary mb-2">
          Your cart is empty
        </h2>
        <p className="text-text-secondary mb-8">Add some products before checkout.</p>
        <Link
          to="/products"
          className="inline-flex items-center gap-2 px-8 py-3.5 bg-gradient-to-r from-primary to-primary-dark text-white font-semibold rounded-xl"
        >
          Browse Products
        </Link>
      </div>
    );
  }

  // Order success state
  if (orderPlaced) {
    return (
      <div className="w-full max-w-lg mx-auto px-4 py-20 text-center animate-fade-in-up">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-success/10 mb-6">
          <HiOutlineCheck className="w-10 h-10 text-success" />
        </div>
        <h2 className="text-3xl font-bold text-text-primary mb-3">
          Order Placed! 🎉
        </h2>
        <p className="text-text-secondary mb-2">
          Thank you for shopping with ShopVerse.
        </p>
        <p className="text-sm text-text-muted mb-8">
          Order ID: <span className="font-mono text-text-secondary">{placedOrder?.id}</span>
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            to="/orders"
            className="px-6 py-3 bg-primary text-white font-medium rounded-xl hover:bg-primary-dark transition-colors"
          >
            View Orders
          </Link>
          <Link
            to="/products"
            className="px-6 py-3 border border-dark-border text-text-secondary font-medium rounded-xl hover:border-primary/30 hover:text-text-primary transition-colors"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  // Input field helper
  const InputField = ({ label, name, type = "text", placeholder }) => (
    <div>
      <label className="block text-sm font-medium text-text-primary mb-1.5">
        {label}
      </label>
      <input
        type={type}
        name={name}
        value={form[name]}
        onChange={handleChange}
        placeholder={placeholder}
        className={`w-full px-4 py-2.5 bg-dark-surface border rounded-xl text-sm text-text-primary placeholder-text-muted transition-colors ${
          errors[name] ? "border-danger" : "border-dark-border/50"
        }`}
      />
      {errors[name] && (
        <p className="text-xs text-danger mt-1">{errors[name]}</p>
      )}
    </div>
  );

  const paymentMethods = [
    {
      id: "cod",
      label: "Cash on Delivery",
      icon: HiOutlineCash,
      desc: "Pay when you receive",
    },
    {
      id: "upi",
      label: "UPI",
      icon: HiOutlineDeviceMobile,
      desc: "GPay, PhonePe, Paytm",
    },
    {
      id: "card",
      label: "Credit/Debit Card",
      icon: HiOutlineCreditCard,
      desc: "Visa, Mastercard, RuPay",
    },
  ];

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-text-primary mb-8">Checkout</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* ===== Left: Forms ===== */}
        <div className="lg:col-span-2 space-y-8">
          {/* Shipping Info */}
          <div className="bg-dark-card border border-dark-border/50 rounded-2xl p-6">
            <h2 className="text-lg font-semibold text-text-primary mb-5 flex items-center gap-2">
              <HiOutlineTruck className="w-5 h-5 text-primary" />
              Shipping Information
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <InputField label="Full Name" name="name" placeholder="John Doe" />
              <InputField label="Email" name="email" type="email" placeholder="john@example.com" />
              <InputField label="Phone" name="phone" placeholder="9876543210" />
              <InputField label="Pincode" name="pincode" placeholder="560001" />
              <div className="sm:col-span-2">
                <InputField label="Address" name="address" placeholder="House no, Street, Landmark" />
              </div>
              <InputField label="City" name="city" placeholder="Bangalore" />
              <InputField label="State" name="state" placeholder="Karnataka" />
            </div>
          </div>

          {/* Payment Method */}
          <div className="bg-dark-card border border-dark-border/50 rounded-2xl p-6">
            <h2 className="text-lg font-semibold text-text-primary mb-5 flex items-center gap-2">
              <HiOutlineCreditCard className="w-5 h-5 text-primary" />
              Payment Method
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {paymentMethods.map((method) => (
                <button
                  key={method.id}
                  onClick={() => setPaymentMethod(method.id)}
                  className={`flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all duration-200 ${
                    paymentMethod === method.id
                      ? "border-primary bg-primary/5"
                      : "border-dark-border/50 hover:border-dark-border"
                  }`}
                >
                  <method.icon
                    className={`w-6 h-6 ${
                      paymentMethod === method.id
                        ? "text-primary"
                        : "text-text-secondary"
                    }`}
                  />
                  <span
                    className={`text-sm font-medium ${
                      paymentMethod === method.id
                        ? "text-primary"
                        : "text-text-primary"
                    }`}
                  >
                    {method.label}
                  </span>
                  <span className="text-xs text-text-muted">{method.desc}</span>
                </button>
              ))}
            </div>

            {/* Card form placeholder (shown when card is selected) */}
            {paymentMethod === "card" && (
              <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2">
                  <label className="block text-sm font-medium text-text-primary mb-1.5">
                    Card Number
                  </label>
                  <input
                    type="text"
                    placeholder="1234 5678 9012 3456"
                    className="w-full px-4 py-2.5 bg-dark-surface border border-dark-border/50 rounded-xl text-sm text-text-primary placeholder-text-muted"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-text-primary mb-1.5">
                    Expiry
                  </label>
                  <input
                    type="text"
                    placeholder="MM/YY"
                    className="w-full px-4 py-2.5 bg-dark-surface border border-dark-border/50 rounded-xl text-sm text-text-primary placeholder-text-muted"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-text-primary mb-1.5">
                    CVV
                  </label>
                  <input
                    type="password"
                    placeholder="•••"
                    className="w-full px-4 py-2.5 bg-dark-surface border border-dark-border/50 rounded-xl text-sm text-text-primary placeholder-text-muted"
                  />
                </div>
              </div>
            )}

            {paymentMethod === "upi" && (
              <div className="mt-5">
                <label className="block text-sm font-medium text-text-primary mb-1.5">
                  UPI ID
                </label>
                <input
                  type="text"
                  placeholder="yourname@upi"
                  className="w-full px-4 py-2.5 bg-dark-surface border border-dark-border/50 rounded-xl text-sm text-text-primary placeholder-text-muted"
                />
              </div>
            )}
          </div>
        </div>

        {/* ===== Right: Order Summary ===== */}
        <div className="lg:col-span-1">
          <div className="sticky top-20 bg-dark-card border border-dark-border/50 rounded-2xl p-6 space-y-5">
            <h3 className="text-lg font-semibold text-text-primary">
              Order Summary
            </h3>

            {/* Product list */}
            <div className="space-y-3 max-h-60 overflow-y-auto">
              {cartItems.map((item) => (
                <div key={item.id} className="flex items-center gap-3">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-12 h-12 rounded-lg object-cover"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-text-primary truncate">
                      {item.title}
                    </p>
                    <p className="text-xs text-text-muted">
                      Qty: {item.quantity}
                    </p>
                  </div>
                  <span className="text-sm font-medium text-text-primary shrink-0">
                    ₹{(item.price * item.quantity).toLocaleString()}
                  </span>
                </div>
              ))}
            </div>

            {/* Price breakdown */}
            <div className="space-y-2 border-t border-dark-border/30 pt-4">
              <div className="flex justify-between text-sm">
                <span className="text-text-secondary">Subtotal</span>
                <span className="text-text-primary">₹{subtotal.toLocaleString()}</span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-sm">
                  <span className="text-success">Discount</span>
                  <span className="text-success">−₹{discount.toLocaleString()}</span>
                </div>
              )}
              <div className="flex justify-between text-sm">
                <span className="text-text-secondary">Tax (18% GST)</span>
                <span className="text-text-primary">₹{tax.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-text-secondary">Shipping</span>
                <span className={shipping === 0 ? "text-success" : "text-text-primary"}>
                  {shipping === 0 ? "FREE" : `₹${shipping}`}
                </span>
              </div>
            </div>

            {/* Grand Total */}
            <div className="flex justify-between border-t border-dark-border/30 pt-4">
              <span className="text-base font-semibold text-text-primary">
                Grand Total
              </span>
              <span className="text-xl font-bold gradient-text">
                ₹{total.toLocaleString()}
              </span>
            </div>

            {/* Place Order Button */}
            <button
              onClick={handlePlaceOrder}
              disabled={isPlacing}
              className="w-full flex items-center justify-center gap-2 py-3.5 bg-gradient-to-r from-primary to-primary-dark text-white font-semibold rounded-xl hover:shadow-xl hover:shadow-primary/25 active:scale-[0.98] transition-all duration-300 disabled:opacity-60"
            >
              {isPlacing ? (
                <>
                  <svg className="animate-spin w-5 h-5" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Placing Order...
                </>
              ) : (
                <>
                  Place Order
                  <HiOutlineArrowRight className="w-4 h-4" />
                </>
              )}
            </button>

            <p className="text-xs text-text-muted text-center">
              🔒 Your payment info is encrypted and secure
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
