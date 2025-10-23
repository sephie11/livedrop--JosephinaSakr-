import express from 'express';
import mongoose from 'mongoose';

const router = express.Router();

// ---- Product Schema ----
const productSchema = new mongoose.Schema({
  title: { type: String, required: true },
  price: { type: Number, required: true },
  image: String,
  tags: [String],
  stockQty: { type: Number, default: 10 },
  description: String,
});

const Product = mongoose.model('Product', productSchema);

// ---- GET /api/products ----
// Optionally supports ?search= query
router.get('/', async (req, res) => {
  try {
    const search = req.query.search?.toLowerCase() || '';
    let products;

    if (search) {
      products = await Product.find({
        $or: [
          { title: { $regex: search, $options: 'i' } },
          { tags: { $in: [search] } },
        ],
      });
    } else {
      products = await Product.find();
    }

    res.json(products);
  } catch (err) {
    console.error('Error fetching products:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// ---- POST /api/products ---- (optional: add sample products)
router.post('/', async (req, res) => {
  try {
    const { title, price, image, tags, stockQty, description } = req.body;
    const product = await Product.create({
      title,
      price,
      image,
      tags,
      stockQty,
      description,
    });
    res.status(201).json(product);
  } catch (err) {
    console.error('Error creating product:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
