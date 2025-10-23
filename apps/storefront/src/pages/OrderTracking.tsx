import React, { useEffect, useState } from "react";

const STATUS_FLOW = ["PENDING", "PROCESSING", "SHIPPED", "DELIVERED"] as const;

type OrderStatus = (typeof STATUS_FLOW)[number];

interface OrderUpdate {
  id: string;
  status: OrderStatus;
  carrier: string;
  eta?: string;
  updatedAt?: string;
}

export default function OrderTracking() {
  const [orderId, setOrderId] = useState("");
  const [status, setStatus] = useState<OrderStatus | null>(null);
  const [carrier, setCarrier] = useState("");
  const [eta, setEta] = useState<string | undefined>();
  const [isTracking, setIsTracking] = useState(false);

  const startTracking = () => {
    if (!orderId) return;
    setIsTracking(true);

    const evtSource = new EventSource(`/api/orders/${orderId}/stream`);

    evtSource.onmessage = (e) => {
      const data: OrderUpdate = JSON.parse(e.data);
      setStatus(data.status);
      setCarrier(data.carrier);
      setEta(data.eta);
    };

    evtSource.onerror = () => {
      console.error("Stream error or closed");
      evtSource.close();
      setIsTracking(false);
    };
  };

  useEffect(() => {
    return () => {
      if (isTracking) setIsTracking(false);
    };
  }, [isTracking]);

  // emoji instead of lucide icons
  const iconFor = (s: OrderStatus) => {
    switch (s) {
      case "PENDING":
        return "🛍️";
      case "PROCESSING":
        return "⚙️";
      case "SHIPPED":
        return "🚚";
      case "DELIVERED":
        return "✅";
      default:
        return "📦";
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-gray-50">
      <div className="max-w-md w-full bg-white shadow-lg rounded-2xl p-6">
        <h1 className="text-2xl font-bold mb-4 text-center">Order Tracking</h1>

        {!isTracking ? (
          <div className="flex flex-col space-y-3">
            <input
              type="text"
              placeholder="Enter your Order ID"
              className="border rounded-md p-2 text-sm"
              value={orderId}
              onChange={(e) => setOrderId(e.target.value)}
            />
            <button
              onClick={startTracking}
              className="bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
            >
              Track Order
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <p className="font-semibold">Order ID:</p>
              <p className="text-sm break-all">{orderId}</p>
            </div>
            {carrier && (
              <div className="flex items-center justify-between">
                <p className="font-semibold">Carrier:</p>
                <p>{carrier}</p>
              </div>
            )}
            {eta && (
              <div className="flex items-center justify-between">
                <p className="font-semibold">ETA:</p>
                <p>{new Date(eta).toLocaleDateString()}</p>
              </div>
            )}

            {/* Timeline */}
            <div className="flex flex-col items-start space-y-4 mt-6">
              {STATUS_FLOW.map((s) => {
                const reached =
                  status && STATUS_FLOW.indexOf(s) <= STATUS_FLOW.indexOf(status);
                return (
                  <div key={s} className="flex items-center space-x-3">
                    <div
                      className={`flex items-center justify-center w-10 h-10 rounded-full border-2 text-xl ${
                        reached
                          ? "border-green-500 bg-green-100"
                          : "border-gray-300 bg-gray-100"
                      }`}
                    >
                      {iconFor(s)}
                    </div>
                    <div>
                      <p
                        className={`font-semibold ${
                          reached ? "text-green-700" : "text-gray-500"
                        }`}
                      >
                        {s}
                      </p>
                      {status === s && reached && s !== "DELIVERED" && (
                        <p className="text-xs text-gray-400 animate-pulse">
                          In progress...
                        </p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {status === "DELIVERED" && (
              <div className="text-center mt-8">
                <p className="text-green-600 font-semibold text-lg">
                  🎉 Your order has been delivered!
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
