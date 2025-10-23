import express from "express";
import mongoose from "mongoose";

const router = express.Router();

const Order =
  mongoose.models.Order ||
  mongoose.model(
    "Order",
    new mongoose.Schema({
      customerEmail: String,
      items: Array,
      total: Number,
      status: String,
      createdAt: Date,
    })
  );

const Product =
  mongoose.models.Product ||
  mongoose.model(
    "Product",
    new mongoose.Schema({
      title: String,
      price: Number,
      stockQty: Number,
    })
  );

// ---- GET /api/dashboard/business-metrics ----
router.get("/business-metrics", async (req, res) => {
  try {
    const orders = await Order.find();
    const products = await Product.find();

    const totalOrders = orders.length;
    const totalRevenue = orders.reduce((sum, o) => sum + (o.total || 0), 0);
    const avgOrderValue =
      totalOrders > 0 ? totalRevenue / totalOrders : 0;

    const totalProducts = products.length;
    const lowStock = products.filter((p) => p.stockQty < 5).length;

    res.json({
      totalOrders,
      totalRevenue: totalRevenue.toFixed(2),
      avgOrderValue: avgOrderValue.toFixed(2),
      totalProducts,
      lowStock,
    });
  } catch (err) {
    console.error("Error fetching dashboard metrics:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
