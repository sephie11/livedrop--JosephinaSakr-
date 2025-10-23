// ===============================
// Week 5 – Database Seeding Script
// ===============================

import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

// ---- Connect to MongoDB ----
await mongoose.connect(process.env.MONGO_URI);
console.log("Connected to MongoDB");

// ---- Define schemas ----
const Customer = mongoose.model(
  "Customer",
  new mongoose.Schema({
    name: String,
    email: String,
    phone: String,
    address: String,
    createdAt: Date,
  })
);

const Product = mongoose.model(
  "Product",
  new mongoose.Schema({
    title: String,
    description: String,
    price: Number,
    category: String,
    tags: [String],
    image: String,
    stockQty: Number,
    createdAt: Date,
  })
);

const Order = mongoose.model(
  "Order",
  new mongoose.Schema({
    customerEmail: String,
    items: Array,
    total: Number,
    status: String,
    carrier: String,
    estimatedDelivery: String,
    createdAt: Date,
  })
);

// ---- Generate sample data ----

// Customers (10–15 realistic)
const customers = [
  { name: "Demo User", email: "demo@example.com", phone: "+96170000001", address: "Beirut, Lebanon" },
  { name: "Josephina Sakr", email: "josephinasakr@gmail.com", phone: "+96170123456", address: "Tripoli, Lebanon" },
  { name: "Ali Mansour", email: "ali.mansour@example.com", phone: "+96171000022", address: "Saida, Lebanon" },
  { name: "Maya Khoury", email: "maya.khoury@example.com", phone: "+96171000033", address: "Beirut, Lebanon" },
  { name: "Omar Chami", email: "omar.chami@example.com", phone: "+96171000044", address: "Zahle, Lebanon" },
  { name: "Sara Abou Raad", email: "sara.raad@example.com", phone: "+96171000055", address: "Jounieh, Lebanon" },
  { name: "Karim Nassar", email: "karim.nassar@example.com", phone: "+96171000066", address: "Byblos, Lebanon" },
  { name: "Lina Farah", email: "lina.farah@example.com", phone: "+96171000077", address: "Tyre, Lebanon" },
  { name: "Rami Eid", email: "rami.eid@example.com", phone: "+96171000088", address: "Beirut, Lebanon" },
  { name: "Tarek Haddad", email: "tarek.haddad@example.com", phone: "+96171000099", address: "Aley, Lebanon" },
].map((c) => ({ ...c, createdAt: new Date() }));

// Products (20–25 realistic)
const products = [
  { title: "Basic White T-Shirt", price: 14.99, category: "Clothing", tags: ["shirt", "casual"], image: "https://via.placeholder.com/150", stockQty: 50, description: "Soft cotton t-shirt, everyday wear." },
  { title: "Blue Hoodie", price: 39.99, category: "Clothing", tags: ["hoodie", "winter"], image: "https://via.placeholder.com/150", stockQty: 30, description: "Warm fleece hoodie, comfortable fit." },
  { title: "Black Jeans", price: 59.99, category: "Clothing", tags: ["pants", "denim"], image: "https://via.placeholder.com/150", stockQty: 25, description: "Slim-fit black denim jeans." },
  { title: "Wireless Mouse", price: 24.99, category: "Electronics", tags: ["mouse", "wireless"], image: "https://via.placeholder.com/150", stockQty: 100, description: "Ergonomic wireless mouse with USB receiver." },
  { title: "Mechanical Keyboard", price: 79.99, category: "Electronics", tags: ["keyboard", "gaming"], image: "https://via.placeholder.com/150", stockQty: 60, description: "RGB backlit mechanical keyboard with blue switches." },
  { title: "Noise Cancelling Headphones", price: 129.99, category: "Electronics", tags: ["audio", "headphones"], image: "https://via.placeholder.com/150", stockQty: 40, description: "Wireless headphones with active noise cancelling." },
  { title: "Running Shoes", price: 89.99, category: "Footwear", tags: ["shoes", "sport"], image: "https://via.placeholder.com/150", stockQty: 45, description: "Lightweight running shoes for all terrains." },
  { title: "Leather Wallet", price: 34.99, category: "Accessories", tags: ["wallet", "leather"], image: "https://via.placeholder.com/150", stockQty: 80, description: "Premium brown leather wallet with multiple slots." },
  { title: "Sports Watch", price: 149.99, category: "Accessories", tags: ["watch", "fitness"], image: "https://via.placeholder.com/150", stockQty: 25, description: "Digital watch with heart-rate and GPS tracking." },
  { title: "Sunglasses", price: 29.99, category: "Accessories", tags: ["fashion", "summer"], image: "https://via.placeholder.com/150", stockQty: 75, description: "UV-protected sunglasses with modern design." },
];

// Orders (link to customers + products)
function randomItem(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

const orders = Array.from({ length: 15 }).map(() => {
  const customer = randomItem(customers);
  const numItems = Math.ceil(Math.random() * 3);
  const items = Array.from({ length: numItems }).map(() => {
    const product = randomItem(products);
    const qty = Math.ceil(Math.random() * 2);
    return { title: product.title, price: product.price, qty };
  });
  const total = items.reduce((s, i) => s + i.price * i.qty, 0);
  const statuses = ["Placed", "Packed", "Shipped", "Delivered"];
  const status = randomItem(statuses);
  return {
    customerEmail: customer.email,
    items,
    total,
    status,
    carrier: "DHL",
    estimatedDelivery: new Date(Date.now() + 5 * 24 * 3600 * 1000).toISOString(),
    createdAt: new Date(Date.now() - Math.random() * 10 * 24 * 3600 * 1000),
  };
});

// ---- Seed the database ----
await Customer.deleteMany({});
await Product.deleteMany({});
await Order.deleteMany({});

await Customer.insertMany(customers);
await Product.insertMany(products);
await Order.insertMany(orders);

console.log(`✅ Seeded ${customers.length} customers, ${products.length} products, ${orders.length} orders.`);

await mongoose.connection.close();
console.log("✅ Database seeding completed.");
process.exit(0);
