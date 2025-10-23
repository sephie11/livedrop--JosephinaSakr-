// ============================================
// Function Registry for Assistant
// ============================================
// This is where we define backend functions the assistant can call.
// For example: getOrderStatus, fetchProductInfo, etc.

import fetch from "node-fetch";

// Base API URL — points to your same backend API
const API_BASE = process.env.API_BASE || "http://localhost:4000/api";

// Each function receives (prompt) and returns { text }
const functions = {
  // ---- Get Order Status ----
  async getOrderStatus(prompt) {
    try {
      const ORDER_RX = /[A-Z0-9]{10,}/i;
      const match = prompt.match(ORDER_RX);
      if (!match) {
        return { text: "I couldn’t find an order ID in your message." };
      }

      const orderId = match[0];
      const res = await fetch(`${API_BASE}/orders/${orderId}`);
      if (!res.ok) {
        return { text: `Order ${orderId}: not found.` };
      }

      const data = await res.json();
      return {
        text: `Order ${orderId}: currently ${data.status}. Total: $${data.total?.toFixed(
          2
        )}.`,
      };
    } catch (err) {
      console.error("Error in getOrderStatus:", err);
      return { text: "Sorry, I couldn’t fetch that order right now." };
    }
  },
};

// ============================================
// Dispatcher: call a registered function by name
// ============================================
export async function callFunction(name, prompt) {
  const fn = functions[name];
  if (!fn) throw new Error(`Unknown function: ${name}`);
  return await fn(prompt);
}
