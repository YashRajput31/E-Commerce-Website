import { createContext, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { authApi, setToken } from "../services/api";

const AuthContext = createContext(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem("shopverse_user");
    return saved ? JSON.parse(saved) : null;
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) localStorage.setItem("shopverse_user", JSON.stringify(user));
    else localStorage.removeItem("shopverse_user");
  }, [user]);

  useEffect(() => {
    if (!localStorage.getItem("shopverse_token")) return;
    authApi.me()
      .then((data) => setUser(data.user))
      .catch(() => {
        setUser(null);
        setToken(null);
      });
  }, []);

  const login = async (email, password, otp) => {
    setLoading(true);
    try {
      const data = await authApi.login(email, password, otp);
      setToken(data.token);
      setUser(data.user);
      toast.success(`Welcome back, ${data.user.name}!`);
      return data.user;
    } catch (err) {
      toast.error(err.message || "Login failed");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const signup = async (userData) => {
    setLoading(true);
    try {
      const data = await authApi.signup(userData);
      setToken(data.token);
      setUser(data.user);
      toast.success("Account created successfully!");
      return data.user;
    } catch (err) {
      toast.error(err.message || "Signup failed");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    authApi.logout().catch(() => {});
    setToken(null);
    setUser(null);
    toast.success("Logged out successfully");
  };

  const isAdmin = user?.role === "admin";

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        signup,
        logout,
        isAdmin,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
