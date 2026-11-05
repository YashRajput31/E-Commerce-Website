/**
 * ============================================
 * Login Page
 * ============================================
 * Features:
 *  - Email / Password form with validation
 *  - Show/hide password toggle
 *  - Fake authentication via AuthContext
 *  - Redirect to previous page after login
 *  - Link to signup page
 *  - Admin credentials hint
 */

import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import {
  HiOutlineMail,
  HiOutlineLockClosed,
  HiOutlineEye,
  HiOutlineEyeOff,
  HiOutlineArrowRight,
  HiOutlineShieldCheck,
} from "react-icons/hi";

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login, loading } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("111111");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});

  // Redirect destination (from protected routes)
  const from = location.state?.from?.pathname || "/";

  const validate = () => {
    const errs = {};
    if (!email.trim()) errs.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(email)) errs.email = "Invalid email address";
    if (!password.trim()) errs.password = "Password is required";
    else if (password.length < 4) errs.password = "Password too short";
    if (!otp.trim()) errs.otp = "OTP is required";
    else if (otp.trim() !== "111111") errs.otp = "Default OTP is 111111";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      await login(email, password, otp);
      navigate(from, { replace: true });
    } catch {
      // Error handled in AuthContext via toast
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md animate-fade-in-up">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-primary to-secondary mb-4">
            <span className="text-2xl font-bold text-white">S</span>
          </div>
          <h1 className="text-2xl font-bold text-text-primary">Welcome Back</h1>
          <p className="text-sm text-text-secondary mt-1">
            Sign in to your ShopVerse account
          </p>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="bg-dark-card border border-dark-border/50 rounded-2xl p-6 sm:p-8 space-y-5"
        >
          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-text-primary mb-1.5">
              Email Address
            </label>
            <div className="relative">
              <HiOutlineMail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted" />
              <input
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (errors.email) setErrors((p) => ({ ...p, email: "" }));
                }}
                placeholder="you@example.com"
                className={`w-full pl-12 pr-4 py-3 bg-dark-surface border rounded-xl text-sm text-text-primary placeholder-text-muted ${
                  errors.email ? "border-danger" : "border-dark-border/50"
                }`}
              />
            </div>
            {errors.email && (
              <p className="text-xs text-danger mt-1">{errors.email}</p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-text-primary mb-1.5">
              Password
            </label>
            <div className="relative">
              <HiOutlineLockClosed className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted" />
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (errors.password) setErrors((p) => ({ ...p, password: "" }));
                }}
                placeholder="••••••••"
                className={`w-full pl-12 pr-12 py-3 bg-dark-surface border rounded-xl text-sm text-text-primary placeholder-text-muted ${
                  errors.password ? "border-danger" : "border-dark-border/50"
                }`}
              />
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
            </div>
            {errors.password && (
              <p className="text-xs text-danger mt-1">{errors.password}</p>
            )}
          </div>

          {/* OTP */}
          <div>
            <label className="block text-sm font-medium text-text-primary mb-1.5">
              Verification OTP
            </label>
            <div className="relative">
              <HiOutlineShieldCheck className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted" />
              <input
                type="text"
                inputMode="numeric"
                maxLength={6}
                value={otp}
                onChange={(e) => {
                  setOtp(e.target.value);
                  if (errors.otp) setErrors((p) => ({ ...p, otp: "" }));
                }}
                placeholder="111111"
                className={`w-full pl-12 pr-4 py-3 bg-dark-surface border rounded-xl text-sm text-text-primary placeholder-text-muted ${
                  errors.otp ? "border-danger" : "border-dark-border/50"
                }`}
              />
            </div>
            {errors.otp && (
              <p className="text-xs text-danger mt-1">{errors.otp}</p>
            )}
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 py-3.5 bg-gradient-to-r from-primary to-primary-dark text-white font-semibold rounded-xl hover:shadow-xl hover:shadow-primary/25 active:scale-[0.98] transition-all duration-300 disabled:opacity-60"
          >
            {loading ? (
              <svg className="animate-spin w-5 h-5" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
            ) : (
              <>
                Sign In
                <HiOutlineArrowRight className="w-4 h-4" />
              </>
            )}
          </button>

          {/* Signup link */}
          <p className="text-sm text-center text-text-secondary">
            Don&apos;t have an account?{" "}
            <Link
              to="/signup"
              className="text-primary hover:text-primary-light font-medium transition-colors"
            >
              Create one
            </Link>
          </p>
        </form>

        {/* Admin hint */}
        <div className="mt-4 p-4 bg-dark-card/50 border border-dark-border/30 rounded-xl">
          <p className="text-xs text-text-muted text-center">
            <span className="font-semibold text-text-secondary">Admin access:</span>{" "}
            admin@shopverse.com / admin123
            <br />
            <span className="font-semibold text-text-secondary">OTP:</span> 111111
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
