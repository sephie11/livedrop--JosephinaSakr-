import { useCart } from "../lib/store";
import { money } from "../lib/format";
import { api } from "../lib/api";
import { useNavigate } from "react-router-dom";


type OrderResponse = {
  _id?: string;
  orderId?: string;
  id?: string;
};

export default function Checkout() {
  const items = useCart((s) => s.items);
  const total = useCart((s) => s.total());
  const clear = useCart((s) => s.clear);
  const nav = useNavigate();

  async function onPlace() {
    try {
        const { _id, orderId, id } = (await api.createOrder(items)) as OrderResponse;
      clear();

      const orderID = orderId || _id || id;
      if (orderID) {
        nav(`/order/${orderID}`);
      } else {
        alert("Order created, but ID not returned by backend.");
      }
    } catch (err) {
      console.error("Order creation failed:", err);
      alert("Failed to place order (backend may be offline).");
    }
  }

  return (
    <div className="space-y-4">
      <h1 className="text-xl font-semibold">Checkout</h1>

      {/* Cart items list */}
      <ul className="space-y-1 text-sm">
        {items.map((i) => (
          <li key={i.id}>
            {i.qty}× {i.title} — {money(i.price * i.qty)}
          </li>
        ))}
      </ul>

      {/* Total */}
      <div className="font-medium">Total: {money(total)}</div>

      {/* Place Order Button */}
      <button
        className="px-4 py-2 rounded bg-slate-900 text-white"
        onClick={onPlace}
      >
        Place order
      </button>
    </div>
  );
}
