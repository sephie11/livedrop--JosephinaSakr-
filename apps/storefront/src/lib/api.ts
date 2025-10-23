// ===============================
// Week 5 – Real Backend API Layer
// ===============================

export const API_BASE =
  import.meta.env.VITE_API_BASE || "http://localhost:4000/api";

// Generic helper for GET / POST requests
async function http<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`, {
    headers: { "Content-Type": "application/json" },
    ...init,
  });
  if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);
  return res.json() as Promise<T>;
}

// Unified API object with all required Week 5 endpoints
export const api = {
  // ---- Customers ----
  getCustomerByEmail: (email: string) =>
    http(`/customers?email=${encodeURIComponent(email)}`),
  getCustomerById: (id: string) => http(`/customers/${id}`),

  // ---- Products ----
  listProducts: (q = "") =>
    http(`/products?search=${encodeURIComponent(q)}`),
  getProduct: (id: string) => http(`/products/${id}`),

  // ---- Orders ----
  createOrder: (payload: any) =>
    http(`/orders`, { method: "POST", body: JSON.stringify(payload) }),
  getOrderById: (id: string) => http(`/orders/${id}`),
  getOrderStatus: (id: string) => http(`/orders/${id}`),
  getOrdersByCustomer: (customerEmail: string) =>
    http(`/orders?customerEmail=${encodeURIComponent(customerEmail)}`),
  getOrderStream: (id: string) =>
    new EventSource(`${API_BASE}/orders/${id}/stream`),

  // ---- Analytics ----
  getAnalytics: (from: string, to: string) =>
    http(`/analytics/daily-revenue?from=${from}&to=${to}`),

  // ---- Dashboard ----
  getDashboardMetrics: () => http(`/dashboard/business-metrics`),

  // ---- Assistant ----
  askAssistant: (prompt: string) =>
    http(`/assistant`, {
      method: "POST",
      body: JSON.stringify({ prompt }),
    }),
};
