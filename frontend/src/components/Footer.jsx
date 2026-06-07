/**
 * ============================================
 * Footer — Site-wide Footer
 * ============================================
 * Features:
 *  - 4-column responsive layout
 *  - Brand section with description
 *  - Quick links, categories, and support columns
 *  - Social media icons
 *  - Newsletter subscription form
 *  - Bottom bar with copyright
 */

import { Link } from "react-router-dom";
import {
  HiOutlineMail,
  HiOutlinePhone,
  HiOutlineLocationMarker,
} from "react-icons/hi";
import { FaFacebookF, FaTwitter, FaInstagram, FaYoutube } from "react-icons/fa";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { to: "/", label: "Home" },
    { to: "/products", label: "All Products" },
    { to: "/search", label: "Search & Filter" },
    { to: "/cart", label: "Cart" },
    { to: "/orders", label: "Order History" },
  ];

  const categoryLinks = [
    "Electronics",
    "Fashion",
    "Home & Living",
    "Sports",
    "Beauty",
    "Books",
  ];

  const socialLinks = [
    { icon: FaFacebookF, href: "#", label: "Facebook" },
    { icon: FaTwitter, href: "#", label: "Twitter" },
    { icon: FaInstagram, href: "#", label: "Instagram" },
    { icon: FaYoutube, href: "#", label: "YouTube" },
  ];

  return (
    <footer className="bg-dark-card border-t border-dark-border/50">
      {/* Newsletter Banner */}
      <div className="bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10 border-b border-dark-border/30">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div>
              <h3 className="text-lg font-bold text-text-primary">
                Get 15% off your first order
              </h3>
              <p className="text-sm text-text-secondary">
                Subscribe to our newsletter for exclusive deals and new arrivals.
              </p>
            </div>
            <div className="flex w-full md:w-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 md:w-64 px-4 py-2.5 bg-dark-surface border border-dark-border rounded-l-lg text-sm text-text-primary placeholder-text-muted focus:border-primary"
              />
              <button className="px-6 py-2.5 bg-gradient-to-r from-primary to-primary-dark text-white text-sm font-medium rounded-r-lg hover:shadow-lg hover:shadow-primary/25 transition-all duration-300 whitespace-nowrap">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Column */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-bold text-lg">
                S
              </div>
              <span className="text-xl font-bold gradient-text">ShopVerse</span>
            </Link>
            <p className="text-sm text-text-secondary leading-relaxed">
              Your premium destination for curated products across electronics,
              fashion, home & more. Quality guaranteed, delivered fast.
            </p>
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="w-9 h-9 rounded-lg bg-dark-surface border border-dark-border flex items-center justify-center text-text-secondary hover:text-primary hover:border-primary/50 transition-all duration-200"
                >
                  <social.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-semibold text-text-primary uppercase tracking-wider mb-4">
              Quick Links
            </h4>
            <ul className="space-y-2.5">
              {quickLinks.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-sm text-text-secondary hover:text-primary transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="text-sm font-semibold text-text-primary uppercase tracking-wider mb-4">
              Categories
            </h4>
            <ul className="space-y-2.5">
              {categoryLinks.map((cat) => (
                <li key={cat}>
                  <Link
                    to={`/products?category=${encodeURIComponent(cat)}`}
                    className="text-sm text-text-secondary hover:text-primary transition-colors duration-200"
                  >
                    {cat}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-sm font-semibold text-text-primary uppercase tracking-wider mb-4">
              Get in Touch
            </h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <HiOutlineLocationMarker className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                <span className="text-sm text-text-secondary">
                  123 Commerce Street, Tech Park,
                  <br />
                  Bangalore, India — 560001
                </span>
              </li>
              <li className="flex items-center gap-3">
                <HiOutlinePhone className="w-5 h-5 text-primary shrink-0" />
                <span className="text-sm text-text-secondary">+91 98765 43210</span>
              </li>
              <li className="flex items-center gap-3">
                <HiOutlineMail className="w-5 h-5 text-primary shrink-0" />
                <span className="text-sm text-text-secondary">
                  support@shopverse.com
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-dark-border/50">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-xs text-text-muted">
            © {currentYear} ShopVerse. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <a href="#" className="text-xs text-text-muted hover:text-text-secondary transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="text-xs text-text-muted hover:text-text-secondary transition-colors">
              Terms of Service
            </a>
            <a href="#" className="text-xs text-text-muted hover:text-text-secondary transition-colors">
              Refund Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
