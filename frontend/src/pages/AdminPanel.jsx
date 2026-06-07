/**
 * ============================================
 * Admin Panel Page
 * ============================================
 * Features:
 *  - Dashboard Cards (Products, Orders, Revenue, Users)
 *  - Product Management Table
 *  - Add Product Form
 *  - Edit / Delete Product (local state only)
 *  - No backend — fully client-side
 */

import { useState } from "react";
import products from "../data/products";
import toast from "react-hot-toast";
import {
  HiOutlineCube,
  HiOutlineShoppingCart,
  HiOutlineCurrencyRupee,
  HiOutlineUsers,
  HiOutlinePlus,
  HiOutlinePencil,
  HiOutlineTrash,
  HiOutlineX,
  HiOutlineSearch,
} from "react-icons/hi";

const AdminPanel = () => {
  // Local product state (initialized from demo data)
  const [productList, setProductList] = useState([...products]);
  const [searchQuery, setSearchQuery] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  // Form state
  const emptyForm = {
    title: "",
    category: "Electronics",
    price: "",
    originalPrice: "",
    rating: "4.5",
    description: "",
    inStock: true,
  };
  const [form, setForm] = useState(emptyForm);

  // Dashboard stats
  const stats = [
    {
      label: "Total Products",
      value: productList.length,
      icon: HiOutlineCube,
      color: "from-blue-500/20 to-purple-500/20 border-blue-500/20",
      iconColor: "text-blue-400",
    },
    {
      label: "Total Orders",
      value: "1,284",
      icon: HiOutlineShoppingCart,
      color: "from-emerald-500/20 to-teal-500/20 border-emerald-500/20",
      iconColor: "text-emerald-400",
    },
    {
      label: "Revenue",
      value: "₹12.4L",
      icon: HiOutlineCurrencyRupee,
      color: "from-amber-500/20 to-orange-500/20 border-amber-500/20",
      iconColor: "text-amber-400",
    },
    {
      label: "Users",
      value: "3,542",
      icon: HiOutlineUsers,
      color: "from-pink-500/20 to-rose-500/20 border-pink-500/20",
      iconColor: "text-pink-400",
    },
  ];

  // Filtered products
  const filteredProducts = productList.filter((p) =>
    p.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleFormChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // Add or update product
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.title.trim() || !form.price) {
      toast.error("Title and Price are required");
      return;
    }

    if (editingProduct) {
      // Update
      setProductList((prev) =>
        prev.map((p) =>
          p.id === editingProduct.id
            ? {
                ...p,
                title: form.title,
                category: form.category,
                price: Number(form.price),
                originalPrice: Number(form.originalPrice) || Number(form.price),
                rating: Number(form.rating),
                description: form.description,
                inStock: form.inStock,
              }
            : p
        )
      );
      toast.success("Product updated successfully");
    } else {
      // Add new
      const newProduct = {
        id: Date.now(),
        title: form.title,
        category: form.category,
        price: Number(form.price),
        originalPrice: Number(form.originalPrice) || Number(form.price),
        rating: Number(form.rating),
        reviewCount: 0,
        image: products[0].image, // use first product's placeholder
        description: form.description,
        badge: "New",
        inStock: form.inStock,
      };
      setProductList((prev) => [newProduct, ...prev]);
      toast.success("Product added successfully");
    }

    setForm(emptyForm);
    setShowForm(false);
    setEditingProduct(null);
  };

  // Edit product
  const handleEdit = (product) => {
    setEditingProduct(product);
    setForm({
      title: product.title,
      category: product.category,
      price: product.price.toString(),
      originalPrice: product.originalPrice?.toString() || "",
      rating: product.rating.toString(),
      description: product.description,
      inStock: product.inStock,
    });
    setShowForm(true);
  };

  // Delete product
  const handleDelete = (id) => {
    setProductList((prev) => prev.filter((p) => p.id !== id));
    toast.success("Product deleted");
  };

  const cancelForm = () => {
    setShowForm(false);
    setEditingProduct(null);
    setForm(emptyForm);
  };

  const categoryOptions = [
    "Electronics",
    "Fashion",
    "Home & Living",
    "Sports",
    "Beauty",
    "Books",
  ];

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-text-primary">Admin Dashboard</h1>
        <p className="text-sm text-text-secondary mt-1">
          Manage your store products, orders, and analytics
        </p>
      </div>

      {/* ===== Dashboard Cards ===== */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className={`bg-gradient-to-br ${stat.color} border rounded-2xl p-5 hover:scale-[1.02] transition-transform duration-200`}
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-medium text-text-secondary">
                {stat.label}
              </span>
              <stat.icon className={`w-6 h-6 ${stat.iconColor}`} />
            </div>
            <p className="text-2xl font-bold text-text-primary">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* ===== Product Management ===== */}
      <div className="bg-dark-card border border-dark-border/50 rounded-2xl overflow-hidden">
        {/* Toolbar */}
        <div className="p-5 border-b border-dark-border/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <h2 className="text-lg font-semibold text-text-primary">
            Product Management
          </h2>
          <div className="flex items-center gap-3 w-full sm:w-auto">
            {/* Search */}
            <div className="relative flex-1 sm:flex-initial">
              <HiOutlineSearch className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search products..."
                className="w-full sm:w-56 pl-9 pr-4 py-2 bg-dark-surface border border-dark-border/50 rounded-lg text-sm text-text-primary placeholder-text-muted"
              />
            </div>
            {/* Add Product */}
            <button
              onClick={() => {
                setEditingProduct(null);
                setForm(emptyForm);
                setShowForm(true);
              }}
              className="flex items-center gap-1.5 px-4 py-2 bg-primary text-white text-sm font-medium rounded-lg hover:bg-primary-dark transition-colors whitespace-nowrap"
            >
              <HiOutlinePlus className="w-4 h-4" />
              Add Product
            </button>
          </div>
        </div>

        {/* Add/Edit Form */}
        {showForm && (
          <div className="p-5 border-b border-dark-border/30 bg-dark-surface/50 animate-fade-in-up">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-semibold text-text-primary">
                {editingProduct ? "Edit Product" : "Add New Product"}
              </h3>
              <button
                onClick={cancelForm}
                className="p-1 text-text-muted hover:text-text-primary transition-colors"
              >
                <HiOutlineX className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-medium text-text-secondary mb-1">
                  Product Title *
                </label>
                <input
                  name="title"
                  value={form.title}
                  onChange={handleFormChange}
                  placeholder="Product name"
                  className="w-full px-3 py-2 bg-dark-card border border-dark-border/50 rounded-lg text-sm text-text-primary placeholder-text-muted"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-text-secondary mb-1">
                  Category
                </label>
                <select
                  name="category"
                  value={form.category}
                  onChange={handleFormChange}
                  className="w-full px-3 py-2 bg-dark-card border border-dark-border/50 rounded-lg text-sm text-text-primary cursor-pointer"
                >
                  {categoryOptions.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium text-text-secondary mb-1">
                  Price (₹) *
                </label>
                <input
                  name="price"
                  type="number"
                  value={form.price}
                  onChange={handleFormChange}
                  placeholder="999"
                  className="w-full px-3 py-2 bg-dark-card border border-dark-border/50 rounded-lg text-sm text-text-primary placeholder-text-muted"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-text-secondary mb-1">
                  Original Price (₹)
                </label>
                <input
                  name="originalPrice"
                  type="number"
                  value={form.originalPrice}
                  onChange={handleFormChange}
                  placeholder="1999"
                  className="w-full px-3 py-2 bg-dark-card border border-dark-border/50 rounded-lg text-sm text-text-primary placeholder-text-muted"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-text-secondary mb-1">
                  Rating (1–5)
                </label>
                <input
                  name="rating"
                  type="number"
                  step="0.1"
                  min="1"
                  max="5"
                  value={form.rating}
                  onChange={handleFormChange}
                  className="w-full px-3 py-2 bg-dark-card border border-dark-border/50 rounded-lg text-sm text-text-primary"
                />
              </div>
              <div className="flex items-end">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    name="inStock"
                    checked={form.inStock}
                    onChange={handleFormChange}
                    className="w-4 h-4 rounded accent-[var(--color-primary)]"
                  />
                  <span className="text-sm text-text-primary">In Stock</span>
                </label>
              </div>
              <div className="sm:col-span-2 lg:col-span-3">
                <label className="block text-xs font-medium text-text-secondary mb-1">
                  Description
                </label>
                <textarea
                  name="description"
                  value={form.description}
                  onChange={handleFormChange}
                  rows={2}
                  placeholder="Product description..."
                  className="w-full px-3 py-2 bg-dark-card border border-dark-border/50 rounded-lg text-sm text-text-primary placeholder-text-muted resize-none"
                />
              </div>
              <div className="sm:col-span-2 lg:col-span-3 flex gap-3">
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-primary text-white text-sm font-medium rounded-lg hover:bg-primary-dark transition-colors"
                >
                  {editingProduct ? "Update Product" : "Add Product"}
                </button>
                <button
                  type="button"
                  onClick={cancelForm}
                  className="px-6 py-2.5 bg-dark-card border border-dark-border/50 text-text-secondary text-sm font-medium rounded-lg hover:text-text-primary transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Products Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-dark-border/30">
                <th className="px-5 py-3 text-left text-xs font-semibold text-text-muted uppercase tracking-wider">
                  Product
                </th>
                <th className="px-5 py-3 text-left text-xs font-semibold text-text-muted uppercase tracking-wider hidden sm:table-cell">
                  Category
                </th>
                <th className="px-5 py-3 text-left text-xs font-semibold text-text-muted uppercase tracking-wider">
                  Price
                </th>
                <th className="px-5 py-3 text-left text-xs font-semibold text-text-muted uppercase tracking-wider hidden md:table-cell">
                  Rating
                </th>
                <th className="px-5 py-3 text-left text-xs font-semibold text-text-muted uppercase tracking-wider hidden md:table-cell">
                  Status
                </th>
                <th className="px-5 py-3 text-right text-xs font-semibold text-text-muted uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-dark-border/20">
              {filteredProducts.map((product) => (
                <tr
                  key={product.id}
                  className="hover:bg-dark-surface/50 transition-colors"
                >
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-3">
                      <img
                        src={product.image}
                        alt={product.title}
                        className="w-10 h-10 rounded-lg object-cover"
                      />
                      <span className="text-sm font-medium text-text-primary truncate max-w-[200px]">
                        {product.title}
                      </span>
                    </div>
                  </td>
                  <td className="px-5 py-3 hidden sm:table-cell">
                    <span className="text-xs font-medium text-text-secondary px-2 py-1 bg-dark-surface rounded-md">
                      {product.category}
                    </span>
                  </td>
                  <td className="px-5 py-3">
                    <span className="text-sm font-semibold text-text-primary">
                      ₹{product.price.toLocaleString()}
                    </span>
                  </td>
                  <td className="px-5 py-3 hidden md:table-cell">
                    <span className="text-sm text-text-secondary">
                      ⭐ {product.rating}
                    </span>
                  </td>
                  <td className="px-5 py-3 hidden md:table-cell">
                    <span
                      className={`text-xs font-medium px-2 py-1 rounded-full ${
                        product.inStock
                          ? "bg-success/10 text-success"
                          : "bg-danger/10 text-danger"
                      }`}
                    >
                      {product.inStock ? "In Stock" : "Out of Stock"}
                    </span>
                  </td>
                  <td className="px-5 py-3">
                    <div className="flex items-center justify-end gap-1">
                      <button
                        onClick={() => handleEdit(product)}
                        className="p-2 text-text-muted hover:text-primary hover:bg-primary/10 rounded-lg transition-colors"
                        aria-label="Edit"
                      >
                        <HiOutlinePencil className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(product.id)}
                        className="p-2 text-text-muted hover:text-danger hover:bg-danger/10 rounded-lg transition-colors"
                        aria-label="Delete"
                      >
                        <HiOutlineTrash className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Empty table state */}
        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-text-muted">No products found.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPanel;
