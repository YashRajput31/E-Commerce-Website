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
import { WishlistProvider } from "./context/WishlistContext";
import { ProductProvider } from "./context/ProductContext";
import AppRoutes from "./routes/AppRoutes";
import ScrollToTop from "./components/ScrollToTop";

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <AuthProvider>
        <ProductProvider>
          <WishlistProvider>
            <CartProvider>
              <AppRoutes />
          
          {/* Global Toast Configuration */}
          <Toaster
            position="top-right"
            toastOptions={{
              className: "bg-dark-surface border border-dark-border text-text-primary shadow-lg",
              success: {
                iconTheme: {
                  primary: "var(--color-success)",
                  secondary: "var(--color-dark-surface)",
                },
              },
              error: {
                iconTheme: {
                  primary: "var(--color-danger)",
                  secondary: "var(--color-dark-surface)",
                },
              },
            }}
          />
            </CartProvider>
          </WishlistProvider>
        </ProductProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
