// End-to-end: create an order and track it
import fetch from "node-fetch";

const BASE = "http://localhost:4000/api";

describe("Integration Flow", () => {
  test("Creates order and retrieves it", async () => {
    const payload = {
      customerEmail: "demo@example.com",
      items: [{ title: "Test Product", price: 50, qty: 1 }],
    };
    const create = await fetch(`${BASE}/orders`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    expect(create.status).toBe(201);
    const { orderId } = await create.json();

    const res = await fetch(`${BASE}/orders/${orderId}`);
    expect(res.status).toBe(200);
    const order = await res.json();
    expect(order.customerEmail).toBe("demo@example.com");
  });
});
