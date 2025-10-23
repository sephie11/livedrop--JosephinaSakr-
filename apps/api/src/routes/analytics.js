import express from "express";
import mongoose from "mongoose";

const router = express.Router();

const Order =
  mongoose.models.Order ||
  mongoose.model(
    "Order",
    new mongoose.Schema({
      customerEmail: String,
      total: Number,
      status: String,
      createdAt: Date,
    })
  );

// ---- GET /api/analytics/daily-revenue?from=YYYY-MM-DD&to=YYYY-MM-DD ----
router.get("/daily-revenue", async (req, res) => {
  try {
    const from = new Date(req.query.from);
    const to = new Date(req.query.to);

    const pipeline = [
      {
        $match: {
          createdAt: { $gte: from, $lte: to },
       status: { $in: ["Placed", "Packed", "Shipped", "Delivered"] },

        },
      },
      {
        $group: {
          _id: {
            $dateToString: { format: "%Y-%m-%d", date: "$createdAt" },
          },
          revenue: { $sum: "$total" },
          orderCount: { $sum: 1 },
        },
      },
      { $sort: { _id: 1 } },
    ];

    const result = await Order.aggregate(pipeline);
    res.json(result);
  } catch (err) {
    console.error("Error fetching daily revenue:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
