import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import customersRouter from "./routes/customers.js";
import productsRouter from "./routes/products.js";
import ordersRouter from "./routes/orders.js";
import assistantRouter from "./routes/assistant.js";
import dashboardRouter from "./routes/dashboard.js";
import analyticsRouter from "./routes/analytics.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// ---- MongoDB Connection ----
mongoose
  .connect(process.env.MONGO_URI, {
    serverSelectionTimeoutMS: 10000,
    ssl: true,
    tlsAllowInvalidCertificates: true,
  })
  .then(() => console.log('✅ MongoDB connected'))
  .catch((err) => console.error('❌ MongoDB connection error:', err));

// ---- Base route ----
app.get('/', (req, res) => {
  res.json({ message: 'API is running successfully' });
});

// ---- Routes ----
app.use("/api/customers", customersRouter);
app.use("/api/products", productsRouter);
app.use("/api/orders", ordersRouter);
app.use("/api/assistant", assistantRouter);
app.use("/api/dashboard", dashboardRouter); 
app.use("/api/analytics", analyticsRouter);

// ---- Start server ----
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
