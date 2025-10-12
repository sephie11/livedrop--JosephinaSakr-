import React from "react"
import { Routes, Route, Link } from "react-router-dom"
import Catalog from "./pages/catalog"
import Product from "./pages/product"
import Cart from "./pages/cart"
import Checkout from "./pages/checkout"
import OrderStatus from "./pages/order-status"
import Orders from "./pages/orders"
import { useState } from "react"
import { SupportPanel } from "./components/organisms/SupportPanel"


export default function App() {
      const [openSupport, setOpenSupport] = useState(false)
  return (
    <div className="min-h-screen flex flex-col">
      <header className="flex items-center justify-between p-4 border-b">
        <Link to="/" className="font-semibold text-lg">
          🛍️ Storefront
        </Link>
  <nav className={"space-x-4 " + (openSupport ? 'pointer-events-none opacity-60' : '')}>
          <Link to="/" className="text-slate-600 hover:underline">
            Home
          </Link>
          <Link to="/cart" className="text-slate-600 hover:underline">
            Cart
          </Link>
          <Link to="/orders" className="text-slate-600 hover:underline">
            Orders
          </Link>
          <button
            type="button"
            onPointerDown={(e) => { e.preventDefault(); e.stopPropagation() }}
            onMouseDown={(e) => { e.preventDefault(); e.stopPropagation() }}
            onClick={(e) => { e.preventDefault(); e.stopPropagation(); console.log('[App] Ask Support clicked'); setOpenSupport(true) }}
            className="text-slate-600 hover:underline"
          >
            💬 Ask Support
          </button>
        </nav>
      </header>

      <main className="flex-1 p-4">
        <Routes>
          <Route path="/" element={<Catalog />} />
          <Route path="/p/:id" element={<Product />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/order/:id" element={<OrderStatus />} />
        </Routes>
      </main>

      <footer className="border-t p-4 text-center text-sm text-slate-500">
        © {new Date().getFullYear()} Storefront v1
      </footer>

<SupportPanel open={openSupport} onClose={() => setOpenSupport(false)} />

    </div>
  )
}
