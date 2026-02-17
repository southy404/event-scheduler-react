import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiFetch } from "../api/client";

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    try {
      await apiFetch("/users", {
        method: "POST",
        body: JSON.stringify({ email, password }),
      });

      navigate("/signin");
    } catch (err: any) {
      setError(err.message);
    }
  }

  return (
    <div className="p-6 max-w-md mx-auto">
      <form onSubmit={handleSubmit} className="space-y-4">
        <h1 className="text-xl font-bold">Sign Up</h1>

        {error && <p className="text-red-500">{error}</p>}

        <input
          className="w-full border p-2 rounded"
          type="email"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          className="w-full border p-2 rounded"
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="w-full bg-black text-white p-2 rounded">
          Register
        </button>
      </form>
    </div>
  );
}
