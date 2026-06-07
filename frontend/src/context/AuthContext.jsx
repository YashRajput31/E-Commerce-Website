/**
 * ============================================
 * AuthContext — Authentication State Management
 * ============================================
 * Provides fake authentication using localStorage.
 * Features:
 *  - Login/Logout/Signup
 *  - Persist auth state across page reloads
 *  - Admin role detection
 */

import { createContext, useContext, useState, useEffect } from "react";
import toast from "react-hot-toast";

const AuthContext = createContext(null);

// Custom hook to consume auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};

export const AuthProvider = ({ children }) => {
  // Initialize user state from localStorage
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem("shopverse_user");
    return saved ? JSON.parse(saved) : null;
  });

  const [loading, setLoading] = useState(false);

  // Persist user to localStorage whenever it changes
  useEffect(() => {
    if (user) {
      localStorage.setItem("shopverse_user", JSON.stringify(user));
    } else {
      localStorage.removeItem("shopverse_user");
    }
  }, [user]);

  /**
   * Fake login — checks against stored users in localStorage.
   * Default admin: admin@shopverse.com / admin123
   */
  const login = (email, password) => {
    setLoading(true);

    // Simulate network delay
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Check for admin credentials
        if (email === "admin@shopverse.com" && password === "admin123") {
          const adminUser = {
            id: "admin-001",
            name: "Admin",
            email: "admin@shopverse.com",
            phone: "9999999999",
            role: "admin",
          };
          setUser(adminUser);
          setLoading(false);
          toast.success("Welcome back, Admin!");
          resolve(adminUser);
          return;
        }

        // Check registered users in localStorage
        const users = JSON.parse(localStorage.getItem("shopverse_users") || "[]");
        const found = users.find(
          (u) => u.email === email && u.password === password
        );

        if (found) {
          const loggedInUser = {
            id: found.id,
            name: found.name,
            email: found.email,
            phone: found.phone,
            role: "user",
          };
          setUser(loggedInUser);
          setLoading(false);
          toast.success(`Welcome back, ${found.name}!`);
          resolve(loggedInUser);
        } else {
          setLoading(false);
          toast.error("Invalid email or password");
          reject(new Error("Invalid credentials"));
        }
      }, 800);
    });
  };

  /**
   * Signup — stores new user in localStorage users array
   */
  const signup = (userData) => {
    setLoading(true);

    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const users = JSON.parse(localStorage.getItem("shopverse_users") || "[]");

        // Check if email already exists
        if (users.find((u) => u.email === userData.email)) {
          setLoading(false);
          toast.error("Email already registered");
          reject(new Error("Email exists"));
          return;
        }

        const newUser = {
          id: `user-${Date.now()}`,
          ...userData,
        };

        users.push(newUser);
        localStorage.setItem("shopverse_users", JSON.stringify(users));

        // Auto-login after signup
        const loggedInUser = {
          id: newUser.id,
          name: newUser.name,
          email: newUser.email,
          phone: newUser.phone,
          role: "user",
        };
        setUser(loggedInUser);
        setLoading(false);
        toast.success("Account created successfully!");
        resolve(loggedInUser);
      }, 800);
    });
  };

  /** Logout — clears user state */
  const logout = () => {
    setUser(null);
    toast.success("Logged out successfully");
  };

  /** Check if current user is admin */
  const isAdmin = user?.role === "admin";

  const value = {
    user,
    loading,
    login,
    signup,
    logout,
    isAdmin,
    isAuthenticated: !!user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContext;
