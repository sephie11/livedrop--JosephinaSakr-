import express from 'express';
import mongoose from 'mongoose';

const router = express.Router();

// ---- Customer Schema ----
const customerSchema = new mongoose.Schema({
  name: String,
  email: { type: String, required: true, unique: true },
  createdAt: { type: Date, default: Date.now },
});

const Customer = mongoose.model('Customer', customerSchema);

// ---- GET /api/customers?email=... ----
router.get('/', async (req, res) => {
  try {
    const email = req.query.email;
    if (!email) {
      return res.status(400).json({ error: 'Email is required' });
    }

    const customer = await Customer.findOne({ email });
    if (!customer) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json(customer);
  } catch (err) {
    console.error('Error fetching customer:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// ---- POST /api/customers ---- (optional, to create users)
router.post('/', async (req, res) => {
  try {
    const { name, email } = req.body;
    if (!email) return res.status(400).json({ error: 'Email is required' });

    const exists = await Customer.findOne({ email });
    if (exists) return res.status(400).json({ error: 'User already exists' });

    const customer = await Customer.create({ name, email });
    res.status(201).json(customer);
  } catch (err) {
    console.error('Error creating customer:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
