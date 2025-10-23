// Basic API sanity check
import fetch from "node-fetch";

const BASE = "http://localhost:4000/api";

describe("API Routes", () => {
  test("Products endpoint returns 200", async () => {
    const res = await fetch(`${BASE}/products`);
    expect(res.status).toBe(200);
  });

  test("Analytics endpoint returns valid JSON", async () => {
    const res = await fetch(`${BASE}/analytics`);
    expect(res.status).toBe(200);
    const data = await res.json();
    expect(Array.isArray(data)).toBe(true);
  });
});
