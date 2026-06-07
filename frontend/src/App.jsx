/**
 * ============================================
 * App — Root Component
 * ============================================
 * Features:
 *  - React Router DOM BrowserRouter setup
 *  - Context Providers (Auth, Cart)
 *  - Global Toast Notifications configuration
 */

import { BrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "./context/AuthContext";
import { CartProvider } from "./context/CartContext";
import AppRoutes from "./routes/AppRoutes";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <CartProvider>
          <AppRoutes />
          
          {/* Global Toast Configuration */}
          <Toaster
            position="top-right"
            toastOptions={{
              className: "bg-dark-surface border border-dark-border text-text-primary",
              style: {
                background: "#16213E",
                color: "#E8E8F0",
                border: "1px solid #2A2A4A",
              },
              success: {
                iconTheme: {
                  primary: "#00B894",
                  secondary: "#16213E",
                },
              },
              error: {
                iconTheme: {
                  primary: "#FF6B6B",
                  secondary: "#16213E",
                },
              },
            }}
          />
        </CartProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
