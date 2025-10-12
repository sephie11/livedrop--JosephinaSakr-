import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

type Order = { orderId: string; createdAt: string; items: any[]; total: number }

export default function Orders() {
  const [orders, setOrders] = useState<Order[]>([])

  useEffect(() => {
    try {
      const raw = localStorage.getItem('sf-orders') || '[]'
      setOrders(JSON.parse(raw))
    } catch (e) {
      setOrders([])
    }
  }, [])

  if (orders.length === 0) return (
    <div>
      <h1 className="text-xl font-semibold">Orders</h1>
      <p>No orders yet.</p>
    </div>
  )

  return (
    <div>
      <h1 className="text-xl font-semibold">Orders</h1>
      <ul className="space-y-3 mt-4">
        {orders.map(o => (
          <li key={o.orderId} className="border rounded p-3">
            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium">Order {o.orderId.slice(-4).padStart(o.orderId.length, '•')}</div>
                <div className="text-sm text-slate-500">{new Date(o.createdAt).toLocaleString()}</div>
              </div>
              <div className="text-right">
                <div className="font-medium">{new Intl.NumberFormat(undefined, { style: 'currency', currency: 'USD' }).format(o.total)}</div>
                <Link to={`/order/${o.orderId}`} className="text-sm underline">View</Link>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
