import { createContext, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { wishlistApi } from "../services/api";
import { useAuth } from "./AuthContext";

const WishlistContext = createContext(null);

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (!context) throw new Error("useWishlist must be used within WishlistProvider");
  return context;
};

export const WishlistProvider = ({ children }) => {
  const { isAuthenticated } = useAuth();
  const [wishlistItems, setWishlistItems] = useState([]);

  const refreshWishlist = async () => {
    if (!isAuthenticated) {
      setWishlistItems([]);
      return;
    }
    const data = await wishlistApi.get();
    setWishlistItems(data.items || []);
  };

  useEffect(() => {
    refreshWishlist().catch(() => {});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated]);

  const toggleWishlist = async (product) => {
    if (!isAuthenticated) {
      toast.error("Please login to use your wishlist");
      return;
    }
    try {
      const data = await wishlistApi.toggle(product.id);
      setWishlistItems(data.items || []);
      toast.success(`${product.title} ${data.added ? "added to" : "removed from"} wishlist`);
    } catch (err) {
      toast.error(err.message || "Could not update wishlist");
    }
  };

  const isInWishlist = (productId) => wishlistItems.some((item) => item.id === productId);

  return (
    <WishlistContext.Provider value={{ wishlistItems, toggleWishlist, isInWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
};

export default WishlistContext;
