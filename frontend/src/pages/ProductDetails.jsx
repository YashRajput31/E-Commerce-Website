/**
 * ============================================
 * Product Details Page
 * ============================================
 * Features:
 *  - Large product image with thumbnail gallery
 *  - Full product info (title, category, rating, description)
 *  - Price with discount
 *  - Quantity selector
 *  - Add to Cart / Buy Now buttons
 *  - Related products section
 */

import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import products from "../data/products";
import { useCart } from "../context/CartContext";
import ProductCard from "../components/ProductCard";
import {
  HiStar,
  HiOutlineStar,
  HiOutlineShoppingCart,
  HiOutlineLightningBolt,
  HiOutlineTruck,
  HiOutlineShieldCheck,
  HiOutlineRefresh,
  HiOutlineHeart,
  HiOutlineShare,
  HiMinus,
  HiPlus,
  HiArrowLeft,
} from "react-icons/hi";

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  // Find the product
  const product = products.find((p) => p.id === parseInt(id));

  // Related products (same category, excluding current)
  const relatedProducts = product
    ? products
        .filter((p) => p.category === product.category && p.id !== product.id)
        .slice(0, 4)
    : [];

  // Simulate loading
  useEffect(() => {
    setIsLoaded(false);
    setQuantity(1);
    setSelectedImage(0);
    const timer = setTimeout(() => setIsLoaded(true), 400);
    return () => clearTimeout(timer);
  }, [id]);

  // 404 state
  if (!product) {
    return (
      <div className="w-full max-w-7xl mx-auto px-4 py-20 text-center">
        <p className="text-6xl mb-4">😕</p>
        <h2 className="text-2xl font-bold text-text-primary mb-2">
          Product Not Found
        </h2>
        <p className="text-text-secondary mb-6">
          The product you&apos;re looking for doesn&apos;t exist.
        </p>
        <Link
          to="/products"
          className="px-6 py-2.5 bg-primary text-white rounded-xl font-medium hover:bg-primary-dark transition-colors"
        >
          Browse Products
        </Link>
      </div>
    );
  }

  // Skeleton loading
  if (!isLoaded) {
    return (
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <div className="skeleton aspect-square rounded-2xl" />
          <div className="space-y-4">
            <div className="skeleton h-6 w-24 rounded" />
            <div className="skeleton h-10 w-3/4 rounded" />
            <div className="skeleton h-4 w-1/3 rounded" />
            <div className="skeleton h-8 w-1/4 rounded" />
            <div className="skeleton h-24 w-full rounded" />
            <div className="skeleton h-12 w-full rounded-xl" />
          </div>
        </div>
      </div>
    );
  }

  const discountPercent = product.originalPrice
    ? Math.round(
        ((product.originalPrice - product.price) / product.originalPrice) * 100
      )
    : 0;

  // Generate thumbnail variants (same image, simulating multiple views)
  const thumbnails = [product.image, product.image, product.image, product.image];

  const handleAddToCart = () => {
    addToCart(product, quantity);
  };

  const handleBuyNow = () => {
    addToCart(product, quantity);
    navigate("/checkout");
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-16">
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-sm text-text-secondary hover:text-text-primary transition-colors"
      >
        <HiArrowLeft className="w-4 h-4" />
        Back
      </button>

      {/* Product Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 animate-fade-in-up">
        {/* ===== Left: Images ===== */}
        <div className="space-y-4">
          {/* Main Image */}
          <div className="relative aspect-square overflow-hidden bg-dark-card border border-dark-border/50 rounded-2xl">
            {product.badge && (
              <div className="absolute top-4 left-4 z-10 px-3 py-1 bg-gradient-to-r from-accent to-accent-dark text-white text-xs font-semibold rounded-full">
                {product.badge}
              </div>
            )}
            <img
              src={thumbnails[selectedImage]}
              alt={product.title}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Thumbnails */}
          <div className="flex gap-3">
            {thumbnails.map((thumb, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedImage(idx)}
                className={`w-20 h-20 rounded-xl overflow-hidden border-2 transition-all duration-200 ${
                  selectedImage === idx
                    ? "border-primary shadow-lg shadow-primary/20"
                    : "border-dark-border/50 hover:border-dark-border"
                }`}
              >
                <img
                  src={thumb}
                  alt={`View ${idx + 1}`}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        {/* ===== Right: Product Info ===== */}
        <div className="space-y-5">
          {/* Category */}
          <span className="text-xs font-medium text-primary uppercase tracking-wider">
            {product.category}
          </span>

          {/* Title */}
          <h1 className="text-2xl sm:text-3xl font-bold text-text-primary leading-tight">
            {product.title}
          </h1>

          {/* Rating */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1">
              {Array.from({ length: 5 }, (_, i) =>
                i < Math.floor(product.rating) ? (
                  <HiStar key={i} className="w-5 h-5 text-gold" />
                ) : (
                  <HiOutlineStar key={i} className="w-5 h-5 text-gold/40" />
                )
              )}
            </div>
            <span className="text-sm text-text-secondary">
              {product.rating} ({product.reviewCount?.toLocaleString()} reviews)
            </span>
          </div>

          {/* Price */}
          <div className="flex items-baseline gap-3">
            <span className="text-3xl font-bold text-text-primary">
              ₹{product.price.toLocaleString()}
            </span>
            {product.originalPrice && (
              <>
                <span className="text-lg text-text-muted line-through">
                  ₹{product.originalPrice.toLocaleString()}
                </span>
                <span className="px-2 py-0.5 bg-success/10 text-success text-sm font-semibold rounded">
                  {discountPercent}% OFF
                </span>
              </>
            )}
          </div>

          {/* Description */}
          <p className="text-sm text-text-secondary leading-relaxed">
            {product.description}
          </p>

          {/* Stock status */}
          <div className="flex items-center gap-2">
            <div
              className={`w-2 h-2 rounded-full ${
                product.inStock ? "bg-success" : "bg-danger"
              }`}
            />
            <span
              className={`text-sm font-medium ${
                product.inStock ? "text-success" : "text-danger"
              }`}
            >
              {product.inStock ? "In Stock" : "Out of Stock"}
            </span>
          </div>

          {/* Quantity Selector */}
          <div className="flex items-center gap-4">
            <span className="text-sm font-medium text-text-primary">Qty:</span>
            <div className="flex items-center gap-1 bg-dark-card border border-dark-border/50 rounded-xl">
              <button
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="p-2.5 text-text-secondary hover:text-text-primary hover:bg-dark-border rounded-l-xl transition-colors"
              >
                <HiMinus className="w-4 h-4" />
              </button>
              <span className="w-12 text-center text-sm font-semibold text-text-primary">
                {quantity}
              </span>
              <button
                onClick={() => setQuantity((q) => q + 1)}
                className="p-2.5 text-text-secondary hover:text-text-primary hover:bg-dark-border rounded-r-xl transition-colors"
              >
                <HiPlus className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <button
              onClick={handleAddToCart}
              disabled={!product.inStock}
              className="flex-1 flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl border-2 border-primary text-primary font-semibold hover:bg-primary/10 active:scale-[0.98] transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <HiOutlineShoppingCart className="w-5 h-5" />
              Add to Cart
            </button>
            <button
              onClick={handleBuyNow}
              disabled={!product.inStock}
              className="flex-1 flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-primary to-primary-dark text-white font-semibold hover:shadow-xl hover:shadow-primary/25 active:scale-[0.98] transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <HiOutlineLightningBolt className="w-5 h-5" />
              Buy Now
            </button>
          </div>

          {/* Quick actions */}
          <div className="flex items-center gap-4 pt-2">
            <button className="flex items-center gap-1.5 text-sm text-text-secondary hover:text-accent transition-colors">
              <HiOutlineHeart className="w-4 h-4" />
              Wishlist
            </button>
            <button className="flex items-center gap-1.5 text-sm text-text-secondary hover:text-primary transition-colors">
              <HiOutlineShare className="w-4 h-4" />
              Share
            </button>
          </div>

          {/* Delivery Info */}
          <div className="border-t border-dark-border/30 pt-5 space-y-3">
            {[
              { icon: HiOutlineTruck, text: "Free delivery on orders above ₹999" },
              { icon: HiOutlineRefresh, text: "30-day easy returns & exchange" },
              { icon: HiOutlineShieldCheck, text: "1-year manufacturer warranty" },
            ].map((info, idx) => (
              <div key={idx} className="flex items-center gap-3">
                <info.icon className="w-5 h-5 text-primary shrink-0" />
                <span className="text-sm text-text-secondary">{info.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ===== Related Products ===== */}
      {relatedProducts.length > 0 && (
        <section>
          <h2 className="text-2xl font-bold text-text-primary mb-6">
            Related Products
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 stagger-children">
            {relatedProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default ProductDetails;
