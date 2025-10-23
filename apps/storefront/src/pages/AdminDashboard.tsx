import { useEffect, useState } from "react";
import { api } from "../lib/api";

export default function AdminDashboard() {
  const [metrics, setMetrics] = useState<any>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    api.getDashboardMetrics()
      .then(setMetrics)
      .catch((err) => setError(String(err)));
  }, []);

  if (error) return <div className="p-6 text-red-600">Error: {error}</div>;
  if (!metrics) return <div className="p-6">Loading metrics…</div>;

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-semibold">Admin Dashboard</h1>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        <Card label="Total Orders" value={metrics.totalOrders} />
        <Card label="Total Revenue" value={`$${metrics.totalRevenue}`} />
        <Card label="Average Order" value={`$${metrics.avgOrderValue}`} />
        <Card label="Products" value={metrics.totalProducts} />
        <Card label="Low Stock" value={metrics.lowStock} />
      </div>
    </div>
  );
}

function Card({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="border rounded p-4 text-center shadow-sm">
      <div className="text-sm text-slate-500">{label}</div>
      <div className="text-xl font-bold">{value}</div>
    </div>
  );
}
