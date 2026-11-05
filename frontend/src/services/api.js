const API_BASE = import.meta.env.VITE_API_BASE_URL || "http://127.0.0.1:8000/api";

export const getToken = () => localStorage.getItem("shopverse_token");

export const setToken = (token) => {
  if (token) localStorage.setItem("shopverse_token", token);
  else localStorage.removeItem("shopverse_token");
};

export const apiRequest = async (path, options = {}) => {
  const token = getToken();
  const headers = {
    "Content-Type": "application/json",
    ...(options.headers || {}),
  };
  if (token) headers.Authorization = `Token ${token}`;

  const response = await fetch(`${API_BASE}${path}`, {
    ...options,
    headers,
  });
  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(data.detail || "Request failed");
  }
  return data;
};

export const authApi = {
  login: (email, password, otp) =>
    apiRequest("/auth/login/", {
      method: "POST",
      body: JSON.stringify({ email, password, otp }),
    }),
  signup: (payload) =>
    apiRequest("/auth/signup/", {
      method: "POST",
      body: JSON.stringify(payload),
    }),
  me: () => apiRequest("/auth/me/"),
  logout: () => apiRequest("/auth/logout/", { method: "POST" }),
};

export const productsApi = {
  list: () => apiRequest("/products/"),
  detail: (id) => apiRequest(`/products/${id}/`),
  create: (payload) =>
    apiRequest("/products/", { method: "POST", body: JSON.stringify(payload) }),
  update: (id, payload) =>
    apiRequest(`/products/${id}/`, {
      method: "PATCH",
      body: JSON.stringify(payload),
    }),
  remove: (id) => apiRequest(`/products/${id}/`, { method: "DELETE" }),
};

export const cartApi = {
  get: (couponCode = "") =>
    apiRequest(`/cart/${couponCode ? `?coupon=${encodeURIComponent(couponCode)}` : ""}`),
  add: (productId, quantity = 1) =>
    apiRequest("/cart/", {
      method: "POST",
      body: JSON.stringify({ productId, quantity }),
    }),
  update: (productId, quantity) =>
    apiRequest(`/cart/${productId}/`, {
      method: "PATCH",
      body: JSON.stringify({ quantity }),
    }),
  remove: (productId) => apiRequest(`/cart/${productId}/`, { method: "DELETE" }),
  clear: () => apiRequest("/cart/", { method: "DELETE" }),
};

export const wishlistApi = {
  get: () => apiRequest("/wishlist/"),
  toggle: (productId) =>
    apiRequest("/wishlist/", {
      method: "POST",
      body: JSON.stringify({ productId }),
    }),
};

export const ordersApi = {
  list: () => apiRequest("/orders/"),
  create: (payload) =>
    apiRequest("/orders/", {
      method: "POST",
      body: JSON.stringify(payload),
    }),
};
