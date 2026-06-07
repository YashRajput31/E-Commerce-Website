/**
 * ============================================
 * Home Page — Landing Page
 * ============================================
 * Sections:
 *  1. Hero Banner with CTA
 *  2. Category Grid
 *  3. Featured Products Carousel
 *  4. Offers Banner (split gradient)
 *  5. Trending Products Grid
 *  6. Testimonials
 *  7. Trust/Feature Badges
 */

import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import products, { categories, testimonials } from "../data/products";
import ProductCard from "../components/ProductCard";
import {
  HiOutlineShoppingBag,
  HiOutlineLightningBolt,
  HiOutlineTruck,
  HiOutlineShieldCheck,
  HiOutlineRefresh,
  HiOutlineStar,
  HiStar,
  HiArrowRight,
} from "react-icons/hi";

// Category icons/emojis mapping
const categoryIcons = {
  Electronics: "🔌",
  Fashion: "👗",
  "Home & Living": "🏠",
  Sports: "⚽",
  Beauty: "💄",
  Books: "📚",
};

// Category gradient mapping
const categoryGradients = {
  Electronics: "from-blue-600/20 to-purple-600/20 border-blue-500/20",
  Fashion: "from-pink-600/20 to-orange-600/20 border-pink-500/20",
  "Home & Living": "from-emerald-600/20 to-teal-600/20 border-emerald-500/20",
  Sports: "from-orange-600/20 to-red-600/20 border-orange-500/20",
  Beauty: "from-pink-600/20 to-purple-600/20 border-pink-500/20",
  Books: "from-indigo-600/20 to-cyan-600/20 border-indigo-500/20",
};

const Home = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  // Simulate page loading
  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 300);
    return () => clearTimeout(timer);
  }, []);

  // Featured = first 8 products, Trending = products sorted by rating
  const featuredProducts = products.slice(0, 8);
  const trendingProducts = [...products]
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 4);

  // Loading skeleton
  if (!isLoaded) {
    return (
      <div className="space-y-8 p-6">
        <div className="skeleton h-96 rounded-2xl" />
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {Array.from({ length: 6 }, (_, i) => (
            <div key={i} className="skeleton h-32 rounded-xl" />
          ))}
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {Array.from({ length: 4 }, (_, i) => (
            <div key={i} className="skeleton h-72 rounded-2xl" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="w-full space-y-16 pb-16">
      {/* ===== HERO SECTION ===== */}
      <section className="relative overflow-hidden">
        {/* Background gradient orbs */}
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-72 h-72 bg-primary/20 rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-secondary/15 rounded-full blur-3xl" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-accent/10 rounded-full blur-3xl" />
        </div>

        <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
          <div className="w-full max-w-3xl mx-auto text-center space-y-6 animate-fade-in-up">
            {/* Tag */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium">
              <HiOutlineLightningBolt className="w-4 h-4" />
              Summer Sale — Up to 50% Off
            </div>

            {/* Heading */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black leading-tight tracking-tight">
              Discover{" "}
              <span className="gradient-text">Premium Products</span>
              <br />
              for Every Lifestyle
            </h1>

            {/* Subtext */}
            <p className="text-lg text-text-secondary w-full max-w-xl mx-auto">
              Shop the latest trends in electronics, fashion, home essentials, and more.
              Free shipping on orders above ₹999.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
              <Link
                to="/products"
                className="group flex items-center gap-2 px-8 py-3.5 bg-gradient-to-r from-primary to-primary-dark text-white font-semibold rounded-xl hover:shadow-2xl hover:shadow-primary/30 active:scale-[0.98] transition-all duration-300"
              >
                <HiOutlineShoppingBag className="w-5 h-5" />
                Shop Now
                <HiArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to="/search"
                className="px-8 py-3.5 border border-dark-border text-text-secondary font-medium rounded-xl hover:border-primary/50 hover:text-text-primary transition-all duration-200"
              >
                Explore Categories
              </Link>
            </div>

            {/* Stats */}
            <div className="flex items-center justify-center gap-8 pt-6">
              {[
                { value: "10K+", label: "Products" },
                { value: "50K+", label: "Customers" },
                { value: "4.8★", label: "Rating" },
              ].map((stat) => (
                <div key={stat.label} className="text-center">
                  <p className="text-2xl font-bold gradient-text">{stat.value}</p>
                  <p className="text-xs text-text-muted">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===== TRUST BADGES ===== */}
      <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { icon: HiOutlineTruck, title: "Free Shipping", desc: "On orders above ₹999" },
            { icon: HiOutlineShieldCheck, title: "Secure Payment", desc: "100% protected" },
            { icon: HiOutlineRefresh, title: "Easy Returns", desc: "30-day return policy" },
            { icon: HiOutlineStar, title: "Top Quality", desc: "Curated products only" },
          ].map((badge) => (
            <div
              key={badge.title}
              className="flex items-center gap-3 p-4 bg-dark-card border border-dark-border/50 rounded-xl hover:border-primary/20 transition-colors duration-200"
            >
              <div className="p-2.5 rounded-lg bg-primary/10">
                <badge.icon className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-sm font-semibold text-text-primary">{badge.title}</p>
                <p className="text-xs text-text-muted">{badge.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ===== CATEGORIES ===== */}
      <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold text-text-primary">
              Shop by Category
            </h2>
            <p className="text-sm text-text-secondary mt-1">
              Find exactly what you need
            </p>
          </div>
          <Link
            to="/products"
            className="text-sm text-primary hover:text-primary-light font-medium flex items-center gap-1 transition-colors"
          >
            View All <HiArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 stagger-children">
          {categories.map((cat) => (
            <Link
              key={cat}
              to={`/products?category=${encodeURIComponent(cat)}`}
              className={`group flex flex-col items-center gap-3 p-6 rounded-2xl bg-gradient-to-br ${
                categoryGradients[cat] || "from-gray-600/20 to-gray-400/20 border-gray-500/20"
              } border hover:scale-105 hover:shadow-xl transition-all duration-300`}
            >
              <span className="text-4xl group-hover:scale-110 transition-transform duration-300">
                {categoryIcons[cat] || "📦"}
              </span>
              <span className="text-sm font-semibold text-text-primary text-center">
                {cat}
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* ===== FEATURED PRODUCTS ===== */}
      <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold text-text-primary">
              Featured Products
            </h2>
            <p className="text-sm text-text-secondary mt-1">
              Handpicked just for you
            </p>
          </div>
          <Link
            to="/products"
            className="text-sm text-primary hover:text-primary-light font-medium flex items-center gap-1 transition-colors"
          >
            See All <HiArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 stagger-children">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* ===== OFFERS BANNER ===== */}
      <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-primary via-primary-dark to-secondary p-8 md:p-12">
          {/* Background decoration */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/3 translate-x-1/4" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-1/3 -translate-x-1/4" />

          <div className="relative flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-center md:text-left">
              <div className="inline-block px-3 py-1 bg-white/10 rounded-full text-white/80 text-xs font-medium mb-3">
                Limited Time Offer
              </div>
              <h2 className="text-3xl md:text-4xl font-black text-white mb-2">
                Mega Summer Sale
              </h2>
              <p className="text-white/70 text-lg">
                Up to <span className="text-white font-bold">50% OFF</span> on
                Electronics & Fashion
              </p>
              <p className="text-white/50 text-sm mt-1">
                Use code <span className="text-white font-mono font-bold bg-white/10 px-2 py-0.5 rounded">SAVE10</span> for extra 10% off
              </p>
            </div>
            <Link
              to="/products"
              className="px-8 py-3.5 bg-white text-primary-dark font-bold rounded-xl hover:bg-white/90 hover:shadow-2xl transition-all duration-300 whitespace-nowrap"
            >
              Shop the Sale →
            </Link>
          </div>
        </div>
      </section>

      {/* ===== TRENDING PRODUCTS ===== */}
      <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold text-text-primary flex items-center gap-2">
              🔥 Trending Now
            </h2>
            <p className="text-sm text-text-secondary mt-1">
              Top-rated products loved by our customers
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 stagger-children">
          {trendingProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* ===== TESTIMONIALS ===== */}
      <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="text-2xl font-bold text-text-primary">
            What Our Customers Say
          </h2>
          <p className="text-sm text-text-secondary mt-1">
            Real reviews from real people
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 stagger-children">
          {testimonials.map((t) => (
            <div
              key={t.id}
              className="p-6 bg-dark-card border border-dark-border/50 rounded-2xl hover:border-primary/20 transition-colors duration-200"
            >
              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {Array.from({ length: 5 }, (_, i) => (
                  <HiStar
                    key={i}
                    className={`w-4 h-4 ${
                      i < t.rating ? "text-gold" : "text-dark-border"
                    }`}
                  />
                ))}
              </div>

              {/* Review text */}
              <p className="text-sm text-text-secondary leading-relaxed mb-5">
                &ldquo;{t.text}&rdquo;
              </p>

              {/* Author */}
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white text-sm font-bold">
                  {t.avatar}
                </div>
                <div>
                  <p className="text-sm font-semibold text-text-primary">
                    {t.name}
                  </p>
                  <p className="text-xs text-text-muted">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
