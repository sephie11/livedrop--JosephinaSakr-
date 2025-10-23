import React, { useState } from "react";
import { Routes, Route, Link } from "react-router-dom";

// ===== Pages =====
import Catalog from "./pages/catalog";
import Product from "./pages/product";
import Cart from "./pages/cart";
import Checkout from "./pages/checkout";
import OrderStatus from "./pages/order-status";
import Orders from "./pages/orders";
import AdminDashboard from "./pages/AdminDashboard"; 

// ===== Components =====
import { SupportPanel } from "./components/organisms/SupportPanel";
import UserLogin from "./components/UserLogin"; 

export default function App() {
  const [openSupport, setOpenSupport] = useState(false);

  return (
    <div className="min-h-screen flex flex-col">
      {/* ===== HEADER ===== */}
      <header className="flex items-center justify-between p-4 border-b">
        <Link to="/" className="font-semibold text-lg">
          🛍️ Storefront
        </Link>

        <nav
          className={
            "space-x-4 " +
            (openSupport ? "pointer-events-none opacity-60" : "")
          }
        >
          <Link to="/" className="text-slate-600 hover:underline">
            Home
          </Link>
          <Link to="/cart" className="text-slate-600 hover:underline">
            Cart
          </Link>
          <Link to="/orders" className="text-slate-600 hover:underline">
            Orders
          </Link>
          <Link to="/dashboard" className="text-slate-600 hover:underline">
            Dashboard
          </Link>
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setOpenSupport(true);
            }}
            className="text-slate-600 hover:underline"
          >
            💬 Ask Support
          </button>
        </nav>
      </header>

      {/* ===== MAIN ROUTES ===== */}
      <main className="flex-1 p-4">
        <Routes>
          {/* Home with login */}
          <Route path="/" element={<HomeWrapper />} />

          {/* Other pages */}
          <Route path="/p/:id" element={<Product />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/order/:id" element={<OrderStatus />} />
          <Route path="/dashboard" element={<AdminDashboard />} /> {}
        </Routes>
      </main>

      {/* ===== FOOTER ===== */}
      <footer className="border-t p-4 text-center text-sm text-slate-500">
        © {new Date().getFullYear()} Storefront v1
      </footer>

      {/* ===== SUPPORT PANEL ===== */}
      <SupportPanel open={openSupport} onClose={() => setOpenSupport(false)} />
    </div>
  );
}

/* ============================================================
   HOME WRAPPER – shows login first, then catalog once user found
   ============================================================ */
function HomeWrapper() {
  const [user, setUser] = useState<any>(() => {
    // Check if user email was saved earlier
    const saved = localStorage.getItem("userEmail");
    return saved ? { email: saved } : null;
  });

  if (!user) {
    return (
      <div className="p-4 max-w-md mx-auto">
        <h1 className="text-xl font-semibold mb-4 text-center">
          Welcome to Storefront
        </h1>
        {}
       <UserLogin onAuthed={(customer) => setUser(customer)} />
      </div>
    );
  }

 
  return <Catalog />;
}
