import mongoose from "mongoose";

// --- Get or define Order model (avoid re-registration during dev) ---
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
      createdAt: { type: Date, default: Date.now },
      updatedAt: { type: Date, default: Date.now },
    })
  );

// --- Status flow sequence ---
const STATUS_FLOW = ["PENDING", "PROCESSING", "SHIPPED", "DELIVERED"];

/**
 * Stream live order status updates using Server-Sent Events (SSE)
 * Route: GET /api/orders/:id/stream
 */
export async function streamOrderStatus(req, res) {
  const { id } = req.params;

  // --- Set SSE headers ---
  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");
  res.flushHeaders?.(); // Express 4+ only

  // --- Find order ---
  let order = await Order.findById(id);
  if (!order) {
    res.write(`event: error\ndata: ${JSON.stringify({ error: "Order not found" })}\n\n`);
    return res.end();
  }

  // --- Helper to send events ---
  const send = (data) => res.write(`data: ${JSON.stringify(data)}\n\n`);

  // --- Send current status immediately ---
  send({
    id: order._id,
    status: order.status,
    carrier: order.carrier,
    eta: order.estimatedDelivery,
    updatedAt: order.updatedAt,
  });

  // --- If already delivered, close ---
  if (order.status === "DELIVERED") return res.end();

  // --- Function to progress through statuses ---
  let timer = null;
  const rand = (min, max) =>
    Math.floor(Math.random() * (max - min + 1)) + min;

  async function advance() {
    order = await Order.findById(id);
    if (!order) return cleanup();

    const currentIndex = STATUS_FLOW.indexOf(order.status);
    if (currentIndex === -1 || currentIndex === STATUS_FLOW.length - 1) {
      return cleanup(); // done
    }

    const nextStatus = STATUS_FLOW[currentIndex + 1];

    // random delay 3–7 s per spec
    const delay =
      nextStatus === "PROCESSING"
        ? rand(3000, 5000)
        : nextStatus === "SHIPPED"
        ? rand(5000, 7000)
        : rand(5000, 7000);

    timer = setTimeout(async () => {
      try {
        const updated = await Order.findByIdAndUpdate(
          id,
          { status: nextStatus, updatedAt: new Date() },
          { new: true }
        );

        if (!updated) return cleanup();

        send({
          id: updated._id,
          status: updated.status,
          carrier: updated.carrier,
          eta: updated.estimatedDelivery,
          updatedAt: updated.updatedAt,
        });

        if (nextStatus === "DELIVERED") {
          cleanup(); // stream ends
        } else {
          advance(); // continue to next status
        }
      } catch (err) {
        console.error("SSE update error:", err);
        cleanup();
      }
    }, delay);
  }

  function cleanup() {
    if (timer) clearTimeout(timer);
    res.end();
  }

  // --- Start progression ---
  advance();

  // --- Clean up if client disconnects ---
  req.on("close", cleanup);
}
