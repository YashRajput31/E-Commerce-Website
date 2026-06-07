/**
 * ============================================
 * Signup Page
 * ============================================
 * Features:
 *  - Name, Email, Phone, Password, Confirm Password
 *  - Form validation
 *  - Store user in localStorage via AuthContext
 *  - Auto-login after signup
 *  - Link to login page
 */

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import {
  HiOutlineUser,
  HiOutlineMail,
  HiOutlinePhone,
  HiOutlineLockClosed,
  HiOutlineEye,
  HiOutlineEyeOff,
  HiOutlineArrowRight,
} from "react-icons/hi";

const Signup = () => {
  const navigate = useNavigate();
  const { signup, loading } = useAuth();

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validate = () => {
    const errs = {};
    if (!form.name.trim()) errs.name = "Name is required";
    if (!form.email.trim()) errs.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(form.email)) errs.email = "Invalid email";
    if (!form.phone.trim()) errs.phone = "Phone is required";
    else if (!/^\d{10}$/.test(form.phone)) errs.phone = "Enter 10-digit number";
    if (!form.password) errs.password = "Password is required";
    else if (form.password.length < 6) errs.password = "Min 6 characters";
    if (!form.confirmPassword) errs.confirmPassword = "Please confirm password";
    else if (form.password !== form.confirmPassword)
      errs.confirmPassword = "Passwords don't match";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      await signup({
        name: form.name,
        email: form.email,
        phone: form.phone,
        password: form.password,
      });
      navigate("/", { replace: true });
    } catch {
      // Error handled in AuthContext via toast
    }
  };

  // Reusable input row
  const InputRow = ({ label, name, type = "text", placeholder, icon: Icon }) => (
    <div>
      <label className="block text-sm font-medium text-text-primary mb-1.5">
        {label}
      </label>
      <div className="relative">
        <Icon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted" />
        <input
          type={
            (name === "password" || name === "confirmPassword")
              ? showPassword
                ? "text"
                : "password"
              : type
          }
          name={name}
          value={form[name]}
          onChange={handleChange}
          placeholder={placeholder}
          className={`w-full pl-12 pr-4 py-3 bg-dark-surface border rounded-xl text-sm text-text-primary placeholder-text-muted ${
            errors[name] ? "border-danger" : "border-dark-border/50"
          }`}
        />
        {(name === "password" || name === "confirmPassword") && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-text-muted hover:text-text-primary transition-colors"
          >
            {showPassword ? (
              <HiOutlineEyeOff className="w-5 h-5" />
            ) : (
              <HiOutlineEye className="w-5 h-5" />
            )}
          </button>
        )}
      </div>
      {errors[name] && (
        <p className="text-xs text-danger mt-1">{errors[name]}</p>
      )}
    </div>
  );

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md animate-fade-in-up">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-secondary to-primary mb-4">
            <span className="text-2xl font-bold text-white">S</span>
          </div>
          <h1 className="text-2xl font-bold text-text-primary">
            Create Account
          </h1>
          <p className="text-sm text-text-secondary mt-1">
            Join ShopVerse and start shopping
          </p>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="bg-dark-card border border-dark-border/50 rounded-2xl p-6 sm:p-8 space-y-4"
        >
          <InputRow label="Full Name" name="name" placeholder="John Doe" icon={HiOutlineUser} />
          <InputRow label="Email Address" name="email" type="email" placeholder="you@example.com" icon={HiOutlineMail} />
          <InputRow label="Phone Number" name="phone" placeholder="9876543210" icon={HiOutlinePhone} />
          <InputRow label="Password" name="password" placeholder="Min 6 characters" icon={HiOutlineLockClosed} />
          <InputRow label="Confirm Password" name="confirmPassword" placeholder="Re-enter password" icon={HiOutlineLockClosed} />

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 py-3.5 bg-gradient-to-r from-primary to-primary-dark text-white font-semibold rounded-xl hover:shadow-xl hover:shadow-primary/25 active:scale-[0.98] transition-all duration-300 disabled:opacity-60 mt-2"
          >
            {loading ? (
              <svg className="animate-spin w-5 h-5" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
            ) : (
              <>
                Create Account
                <HiOutlineArrowRight className="w-4 h-4" />
              </>
            )}
          </button>

          {/* Login link */}
          <p className="text-sm text-center text-text-secondary">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-primary hover:text-primary-light font-medium transition-colors"
            >
              Sign in
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Signup;
