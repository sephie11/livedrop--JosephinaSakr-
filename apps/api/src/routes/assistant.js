import express from "express";
import axios from "axios";
import mongoose from "mongoose";
import fs from "fs";
import path from "path";

const router = express.Router();

// ======================================================
//  Model: Order  (used by assistant functions)
// ======================================================
const Order =
  mongoose.models.Order ||
  mongoose.model(
    "Order",
    new mongoose.Schema({
      customerEmail: String,
      items: Array,
      total: Number,
      status: {
        type: String,
        enum: ["PENDING", "PROCESSING", "SHIPPED", "DELIVERED"],
        default: "PENDING",
      },
      carrier: String,
      estimatedDelivery: Date,
      updatedAt: Date,
    })
  );

// ======================================================
//  Intent detection
// ======================================================
function detectIntent(text) {
  const t = text.toLowerCase();
  if (t.includes("track") || t.includes("status")) return "order_status";
  if (t.includes("order") && t.includes("email")) return "get_customer_orders";
  if (t.includes("product") || t.includes("buy") || t.includes("available"))
    return "product_search";
  if (t.includes("return") || t.includes("refund") || t.includes("policy"))
    return "policy_question";
  if (t.includes("complain") || t.includes("bad") || t.includes("issue"))
    return "complaint";
  if (t.includes("hello") || t.includes("hi") || t.includes("hey"))
    return "chitchat";
  return "off_topic";
}

// ======================================================
//  Function registry
// ======================================================
const functions = {
  async getOrderStatus({ orderId }) {
    if (!orderId) return { error: "Missing orderId" };
    const order = await Order.findById(orderId);
    if (!order) return { error: "Order not found" };
    return {
      orderId: order._id,
      status: order.status,
      carrier: order.carrier,
      eta: order.estimatedDelivery,
      updatedAt: order.updatedAt,
    };
  },

  async getCustomerOrders({ email }) {
    if (!email) return { error: "Missing email" };
    const orders = await Order.find({ customerEmail: email });
    if (!orders.length) return { message: "No orders found for this email." };
    return {
      data: orders.map((o) => ({
        id: o._id,
        total: o.total,
        status: o.status,
        updatedAt: o.updatedAt,
      })),
    };
  },

  async searchProducts({ query }) {
    const catalog = [
      { id: 1, name: "Wireless Earbuds", price: 59 },
      { id: 2, name: "Smart Watch", price: 99 },
      { id: 3, name: "Bluetooth Speaker", price: 79 },
    ];
    if (!query) return { data: catalog };
    return {
      data: catalog.filter((p) =>
        p.name.toLowerCase().includes(query.toLowerCase())
      ),
    };
  },
};

// ======================================================
//  Grounding database (policies / FAQs)
// ======================================================
const GROUND_TRUTH_PATH = path.resolve("docs/ground-truth.json");
let groundTruth = [];

if (fs.existsSync(GROUND_TRUTH_PATH)) {
  try {
    groundTruth = JSON.parse(fs.readFileSync(GROUND_TRUTH_PATH, "utf8"));
  } catch (e) {
    console.warn("⚠️ Could not parse ground-truth.json:", e.message);
    groundTruth = [];
  }
}

function findPolicyAnswer(question) {
  const q = question.toLowerCase();
  const hit = groundTruth.find((p) =>
    q.includes(p.question.toLowerCase().split(" ")[0])
  );
  if (hit)
    return `${hit.answer} [${hit.id}] (last updated ${hit.lastUpdated})`;
  return null;
}

// ======================================================
//  Simple in-memory analytics tracker
// ======================================================
const intentCounts = {};
function recordIntent(intent) {
  intentCounts[intent] = (intentCounts[intent] || 0) + 1;
}

// ======================================================
//  POST /api/assistant
// ======================================================
router.post("/", async (req, res) => {
  try {
    const { prompt, orderId, email } = req.body;
    if (!prompt)
      return res.status(400).json({ error: "Missing 'prompt' in body" });

    const intent = detectIntent(prompt);
    recordIntent(intent);

    let answer = "";
    let functionUsed = null;

    switch (intent) {
      case "order_status":
        functionUsed = "getOrderStatus";
        answer = await functions.getOrderStatus({ orderId });
        break;

      case "get_customer_orders":
        functionUsed = "getCustomerOrders";
        answer = await functions.getCustomerOrders({ email });
        break;

      case "product_search":
        functionUsed = "searchProducts";
        answer = await functions.searchProducts({
          query: prompt.split(" ").slice(-1)[0],
        });
        break;

      case "policy_question":
        answer = findPolicyAnswer(prompt);
        if (!answer)
          answer =
            "I couldn’t find a matching policy in my knowledge base right now.";
        break;

      case "complaint":
        answer =
          "I'm sorry to hear that 😔. Your feedback has been noted for review by our team.";
        break;

      case "chitchat":
        answer = "Hi there 👋! I'm Phina, your LiveDrop assistant. How can I help today?";
        break;

      case "off_topic":
        answer =
          "Sorry, I can only help with LiveDrop orders, products, and store policies.";
        break;

      default:
        answer = "I'm not sure how to help with that yet, sorry!";
    }

    // ======================================================
    //  Optional LLM call (Week 3 backend endpoint)
    // ======================================================
    if (
      ["policy_question", "complaint", "chitchat"].includes(intent) &&
      process.env.LLM_API_URL
    ) {
      try {
        const llmResp = await axios.post(process.env.LLM_API_URL, {
          prompt,
          context: JSON.stringify(answer),
        });
        if (llmResp.data?.text) answer = llmResp.data.text;
      } catch (e) {
        console.warn("⚠️ LLM endpoint unavailable:", e.message);
      }
    }

    res.json({
      assistant: "Phina",
      intent,
      functionUsed,
      answer,
      stats: intentCounts,
    });
  } catch (err) {
    console.error("Assistant error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
