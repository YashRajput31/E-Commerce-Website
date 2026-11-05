/**
 * ============================================
 * ProductCard — Reusable Product Card Component
 * ============================================
 * Features:
 *  - Hover animations with scale and glow
 *  - Badge display (Best Seller, New, etc.)
 *  - Star rating display
 *  - Price with discount percentage
 *  - Quick add-to-cart button
 *  - Click navigates to product details
 */

import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { HiOutlineShoppingCart, HiStar, HiOutlineStar } from "react-icons/hi";

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();

  // Calculate discount percentage
  const discountPercent = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  // Render star rating
  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => {
      if (i < Math.floor(rating)) {
        return <HiStar key={i} className="w-3.5 h-3.5 text-gold" />;
      }
      return <HiOutlineStar key={i} className="w-3.5 h-3.5 text-gold/40" />;
    });
  };

  return (
    <div className="group relative bg-dark-card border border-dark-border/50 rounded-2xl overflow-hidden hover:border-primary/30 hover:shadow-xl hover:shadow-primary/5 transition-all duration-300">
      {/* Badge */}
      {product.badge && (
        <div className="absolute top-3 left-3 z-10 px-2.5 py-1 bg-linear-to-r from-accent to-accent-dark text-white text-xs font-semibold rounded-full shadow-lg">
          {product.badge}
        </div>
      )}

      {/* Out of stock overlay */}
      {!product.inStock && (
        <div className="absolute inset-0 z-10 bg-dark/60 flex items-center justify-center">
          <span className="px-4 py-2 bg-dark-card border border-dark-border rounded-lg text-sm font-medium text-text-secondary">
            Out of Stock
          </span>
        </div>
      )}

      {/* Image */}
      <Link to={`/products/${product.id}`} className="block">
        <div className="relative overflow-hidden aspect-square bg-dark-surface">
          <img
            src={product.image}
            alt={product.title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            loading="lazy"
          />
          {/* Gradient overlay on hover */}
          <div className="absolute inset-0 bg-linear-to-t from-dark-card/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>
      </Link>

      {/* Content */}
      <div className="p-4 space-y-2.5">
        {/* Category */}
        <span className="text-xs font-medium text-primary/80 uppercase tracking-wider">
          {product.category}
        </span>

        {/* Title */}
        <Link to={`/products/${product.id}`}>
          <h3 className="text-sm font-semibold text-text-primary line-clamp-2 group-hover:text-primary transition-colors duration-200 leading-snug">
            {product.title}
          </h3>
        </Link>

        {/* Rating */}
        <div className="flex items-center gap-1.5">
          <div className="flex">{renderStars(product.rating)}</div>
          <span className="text-xs text-text-muted">
            {product.rating} ({product.reviewCount?.toLocaleString()})
          </span>
        </div>

        {/* Price */}
        <div className="flex items-center gap-2">
          <span className="text-lg font-bold text-text-primary">
            ₹{product.price.toLocaleString()}
          </span>
          {product.originalPrice && (
            <>
              <span className="text-sm text-text-muted line-through">
                ₹{product.originalPrice.toLocaleString()}
              </span>
              <span className="text-xs font-semibold text-success">
                {discountPercent}% off
              </span>
            </>
          )}
        </div>

        {/* Add to Cart */}
        <button
          onClick={(e) => {
            e.preventDefault();
            if (product.inStock) addToCart(product);
          }}
          disabled={!product.inStock}
          className="w-full mt-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-linear-to-r from-primary to-primary-dark text-white text-sm font-medium hover:shadow-lg hover:shadow-primary/25 active:scale-[0.98] transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed"
        >
          <HiOutlineShoppingCart className="w-4 h-4" />
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
