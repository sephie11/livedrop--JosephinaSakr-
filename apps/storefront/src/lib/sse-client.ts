// ===============================
// Week 5 – SSE Client (Real-Time Order Tracking)
// ===============================

export function connectOrderStream(
  orderId: string,
  onMessage: (data: any) => void,
  onError?: (err: any) => void
) {
  // Build the correct backend URL (remove /api at end for SSE route)
  const base =
    process.env.NEXT_PUBLIC_API_BASE?.replace(/\/api$/, "") ||
    "http://localhost:4000";

  const url = `${base}/api/orders/${orderId}/stream`;
  const es = new EventSource(url, { withCredentials: false });

  es.onmessage = (evt) => {
    try {
      const parsed = JSON.parse(evt.data);
      onMessage(parsed);
    } catch {
      /* ignore bad data */
    }
  };

  es.onerror = (e) => {
    es.close();
    onError?.(e);
  };

  // Return cleanup function
  return () => es.close();
}
