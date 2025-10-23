import express from "express";
import mongoose from "mongoose";
import { streamOrderStatus } from "../sse/order-status.js";

const router = express.Router();

// ---- Order Schema ----
const orderSchema = new mongoose.Schema({
  customerEmail: { type: String, required: true },
  items: [
    {
      productId: String,
      title: String,
      price: Number,
      qty: Number,
    },
  ],
  total: Number,
  status: {
    type: String,
    enum: ["PENDING", "PROCESSING", "SHIPPED", "DELIVERED"],
    default: "PENDING",
  },
  carrier: { type: String, default: "DHL" },
  estimatedDelivery: { type: Date },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

// 🩹 Prevent model re-registration during dev
const Order = mongoose.models.Order || mongoose.model("Order", orderSchema);

// ---- POST /api/orders ----  (Create new order)
router.post("/", async (req, res) => {
  try {
    const { customerEmail, items } = req.body;

    if (!customerEmail || !items || !items.length) {
      return res
        .status(400)
        .json({ error: "customerEmail and items are required" });
    }

    // compute total price
    const total = items.reduce(
      (sum, i) => sum + (i.price || 0) * (i.qty || 1),
      0
    );

    // set an estimated delivery (+5 days)
    const eta = new Date(Date.now() + 5 * 24 * 60 * 60 * 1000);

    const order = await Order.create({
      customerEmail,
      items,
      total,
      estimatedDelivery: eta,
    });

    res.status(201).json({ orderId: order._id });
  } catch (err) {
    console.error("Error creating order:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// ---- GET /api/orders/:id ----  (Get single order)
router.get("/:id", async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ error: "Order not found" });
    res.json(order);
  } catch (err) {
    console.error("Error fetching order:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// ---- GET /api/orders?customerEmail=... ---- (All orders for a user)
router.get("/", async (req, res) => {
  try {
    const email = req.query.customerEmail;
    if (!email)
      return res.status(400).json({ error: "customerEmail is required" });

    const orders = await Order.find({ customerEmail: email }).sort({
      createdAt: -1,
    });

    res.json(orders);
  } catch (err) {
    console.error("Error fetching orders:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// ---- GET /api/orders/:id/stream ----  (Live order status via SSE)
router.get("/:id/stream", streamOrderStatus);

export default router;
