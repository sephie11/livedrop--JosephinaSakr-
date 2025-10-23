// Assistant endpoint tests
import fetch from "node-fetch";

const BASE = "http://localhost:4000/api";

describe("Assistant API", () => {
  test("Handles policy question", async () => {
    const res = await fetch(`${BASE}/assistant`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt: "What is your refund policy?" }),
    });
    expect(res.status).toBe(200);
    const data = await res.json();
    expect(data.intent).toBe("policy_question");
    expect(data.answer).toBeTruthy();
  });

  test("Handles greeting intent", async () => {
    const res = await fetch(`${BASE}/assistant`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt: "Hi there" }),
    });
    const data = await res.json();
    expect(["chitchat", "off_topic"]).toContain(data.intent);
  });
});
