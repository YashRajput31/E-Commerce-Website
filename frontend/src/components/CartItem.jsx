/**
 * ============================================
 * CartItem — Single Cart Item Row
 * ============================================
 * Features:
 *  - Product image, title, category
 *  - Quantity increment/decrement controls
 *  - Remove button
 *  - Line total calculation
 *  - Responsive layout
 */

import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { HiOutlineTrash, HiPlus, HiMinus } from "react-icons/hi";

const CartItem = ({ item }) => {
  const { updateQuantity, removeFromCart } = useCart();

  const lineTotal = item.price * item.quantity;

  return (
    <div className="flex flex-col sm:flex-row gap-4 p-4 bg-dark-card border border-dark-border/50 rounded-2xl hover:border-dark-border transition-colors duration-200">
      {/* Product Image */}
      <Link to={`/products/${item.id}`} className="shrink-0">
        <img
          src={item.image}
          alt={item.title}
          className="w-full sm:w-24 h-32 sm:h-24 object-cover rounded-xl"
        />
      </Link>

      {/* Product Info */}
      <div className="flex-1 min-w-0 flex flex-col justify-between">
        <div>
          <span className="text-xs font-medium text-primary/80 uppercase tracking-wider">
            {item.category}
          </span>
          <Link to={`/products/${item.id}`}>
            <h3 className="text-sm font-semibold text-text-primary hover:text-primary transition-colors line-clamp-1 mt-0.5">
              {item.title}
            </h3>
          </Link>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-sm font-bold text-text-primary">
              ₹{item.price.toLocaleString()}
            </span>
            {item.originalPrice && (
              <span className="text-xs text-text-muted line-through">
                ₹{item.originalPrice.toLocaleString()}
              </span>
            )}
          </div>
        </div>

        {/* Quantity + Actions */}
        <div className="flex items-center justify-between mt-3 sm:mt-0">
          {/* Quantity Controls */}
          <div className="flex items-center gap-1 bg-dark-surface border border-dark-border/50 rounded-lg">
            <button
              onClick={() => updateQuantity(item.id, item.quantity - 1)}
              className="p-2 text-text-secondary hover:text-text-primary hover:bg-dark-border rounded-l-lg transition-colors"
              aria-label="Decrease quantity"
            >
              <HiMinus className="w-3.5 h-3.5" />
            </button>
            <span className="w-10 text-center text-sm font-medium text-text-primary">
              {item.quantity}
            </span>
            <button
              onClick={() => updateQuantity(item.id, item.quantity + 1)}
              className="p-2 text-text-secondary hover:text-text-primary hover:bg-dark-border rounded-r-lg transition-colors"
              aria-label="Increase quantity"
            >
              <HiPlus className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Line Total & Remove */}
          <div className="flex items-center gap-3">
            <span className="text-base font-bold text-text-primary">
              ₹{lineTotal.toLocaleString()}
            </span>
            <button
              onClick={() => removeFromCart(item.id)}
              className="p-2 rounded-lg text-text-muted hover:text-danger hover:bg-danger/10 transition-colors"
              aria-label={`Remove ${item.title}`}
            >
              <HiOutlineTrash className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
