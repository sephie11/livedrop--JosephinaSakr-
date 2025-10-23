import { useState } from "react";
import { api } from "../lib/api";

type Props = {
  onAuthed: (customer: any) => void;
};

export default function UserLogin({ onAuthed }: Props) {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const customer: any = await api.getCustomerByEmail(email);
if (!customer || !customer._id) throw new Error("User not found");
      onAuthed(customer);
    } catch (err) {
      setError("User not found or backend offline.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      style={{ display: "flex", flexDirection: "column", gap: "10px", maxWidth: 300 }}
    >
      <label htmlFor="email">Enter your email:</label>
      <input
        id="email"
        type="email"
        placeholder="demo@example.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <button disabled={loading}>{loading ? "Checking..." : "Continue"}</button>
      {error && <small style={{ color: "crimson" }}>{error}</small>}
    </form>
  );
}
