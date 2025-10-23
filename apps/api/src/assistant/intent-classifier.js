// ============================================
// Intent Classifier for Assistant
// ============================================
// This determines what kind of question the user asked,
// e.g., order status, product info, or general question.

export function classifyIntent(prompt = "") {
  const lower = prompt.toLowerCase();

  // ---- detect order-related questions ----
  if (
    lower.includes("order") ||
    lower.includes("status") ||
    lower.includes("tracking") ||
    lower.match(/[A-Z0-9]{10,}/)
  ) {
    return { intent: "order_status", function: "getOrderStatus" };
  }

  // ---- detect product-related queries ----
  if (
    lower.includes("product") ||
    lower.includes("price") ||
    lower.includes("available") ||
    lower.includes("stock")
  ) {
    return { intent: "product_info", function: null };
  }

  // ---- detect general help or greeting ----
  if (
    lower.includes("hello") ||
    lower.includes("hi") ||
    lower.includes("help") ||
    lower.includes("support")
  ) {
    return { intent: "greeting", function: null };
  }

  // ---- default ----
  return { intent: "unknown", function: null };
}
