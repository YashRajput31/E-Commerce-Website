/**
 * ============================================
 * Order History Page
 * ============================================
 * Features:
 *  - List of demo orders with status badges
 *  - Order date, total, and item count
 *  - Expandable order details
 *  - Status color coding (Delivered, Shipped, Processing, Cancelled)
 */

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ordersApi } from "../services/api";
import {
  HiOutlineClipboardList,
  HiOutlineChevronDown,
  HiOutlineChevronUp,
  HiOutlineShoppingBag,
} from "react-icons/hi";

// Status color mapping
const statusStyles = {
  Delivered: "bg-success/10 text-success border-success/20",
  Shipped: "bg-blue-500/10 text-blue-400 border-blue-500/20",
  Processing: "bg-warning/10 text-warning border-warning/20",
  Cancelled: "bg-danger/10 text-danger border-danger/20",
};

const OrderHistory = () => {
  const [expandedOrder, setExpandedOrder] = useState(null);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    ordersApi
      .list()
      .then((data) => setOrders(data.orders || []))
      .catch(() => setOrders([]))
      .finally(() => setLoading(false));
  }, []);

  const toggleExpand = (orderId) => {
    setExpandedOrder((prev) => (prev === orderId ? null : orderId));
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="flex items-center gap-3 mb-8">
        <div className="p-2.5 rounded-xl bg-primary/10">
          <HiOutlineClipboardList className="w-6 h-6 text-primary" />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-text-primary">Order History</h1>
          <p className="text-sm text-text-secondary">
            Track and manage your orders
          </p>
        </div>
      </div>

      {/* Orders List */}
      <div className="space-y-4">
        {orders.map((order) => (
          <div
            key={order.id}
            className="bg-dark-card border border-dark-border/50 rounded-2xl overflow-hidden hover:border-dark-border transition-colors duration-200"
          >
            {/* Order Header */}
            <button
              onClick={() => toggleExpand(order.id)}
              className="w-full p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-left"
            >
              <div className="flex-1 space-y-1.5">
                <div className="flex items-center gap-3 flex-wrap">
                  <span className="text-sm font-semibold text-text-primary font-mono">
                    {order.id}
                  </span>
                  <span
                    className={`px-2.5 py-0.5 text-xs font-semibold rounded-full border ${
                      statusStyles[order.status]
                    }`}
                  >
                    {order.status}
                  </span>
                </div>
                <div className="flex items-center gap-4 text-xs text-text-muted">
                  <span>
                    {new Date(order.date).toLocaleDateString("en-IN", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </span>
                  <span>•</span>
                  <span>{order.items.length} item{order.items.length > 1 ? "s" : ""}</span>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <span className="text-lg font-bold text-text-primary">
                  ₹{order.total.toLocaleString()}
                </span>
                {expandedOrder === order.id ? (
                  <HiOutlineChevronUp className="w-5 h-5 text-text-muted" />
                ) : (
                  <HiOutlineChevronDown className="w-5 h-5 text-text-muted" />
                )}
              </div>
            </button>

            {/* Expanded Details */}
            {expandedOrder === order.id && (
              <div className="px-5 pb-5 border-t border-dark-border/30 pt-4 space-y-3 animate-fade-in-up">
                {order.items.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center gap-4 p-3 bg-dark-surface rounded-xl"
                  >
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-14 h-14 rounded-lg object-cover"
                    />
                    <div className="flex-1 min-w-0">
                      <Link
                        to={`/products/${item.id}`}
                        className="text-sm font-medium text-text-primary hover:text-primary transition-colors truncate block"
                      >
                        {item.title}
                      </Link>
                      <p className="text-xs text-text-muted">{item.category}</p>
                    </div>
                    <span className="text-sm font-semibold text-text-primary">
                      ₹{item.price.toLocaleString()}
                    </span>
                  </div>
                ))}

                {/* Order actions */}
                <div className="flex gap-3 pt-2">
                  {order.status === "Delivered" && (
                    <button className="px-4 py-2 text-sm font-medium bg-primary/10 text-primary rounded-lg hover:bg-primary/20 transition-colors">
                      Rate & Review
                    </button>
                  )}
                  <button className="px-4 py-2 text-sm font-medium bg-dark-surface text-text-secondary rounded-lg hover:text-text-primary hover:bg-dark-border transition-colors">
                    View Invoice
                  </button>
                  {(order.status === "Processing" || order.status === "Shipped") && (
                    <button className="px-4 py-2 text-sm font-medium text-danger hover:bg-danger/10 rounded-lg transition-colors">
                      Cancel Order
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* No orders fallback (if array were empty) */}
      {!loading && orders.length === 0 && (
        <div className="text-center py-20">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-dark-card mb-6">
            <HiOutlineShoppingBag className="w-10 h-10 text-text-muted" />
          </div>
          <h3 className="text-xl font-semibold text-text-primary mb-2">
            No orders yet
          </h3>
          <p className="text-sm text-text-secondary mb-6">
            Start shopping to see your orders here.
          </p>
          <Link
            to="/products"
            className="px-6 py-2.5 bg-primary text-white text-sm font-medium rounded-xl hover:bg-primary-dark transition-colors"
          >
            Browse Products
          </Link>
        </div>
      )}
    </div>
  );
};

export default OrderHistory;
