import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiFetch } from "../api/client";
import type { Event, CreateEventPayload } from "../types/event";

export default function CreateEvent() {
  const navigate = useNavigate();

  const [form, setForm] = useState<CreateEventPayload>({
    title: "",
    description: "",
    date: "",
    location: "",
    latitude: 0,
    longitude: 0,
  });

  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]:
        name === "latitude" || name === "longitude" ? Number(value) : value,
    }));
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");

    if (!form.title || !form.description || !form.date || !form.location) {
      setError("All fields are required.");
      return;
    }

    try {
      setLoading(true);

      const payload: CreateEventPayload = {
        ...form,
        date: new Date(form.date).toISOString(),
      };

      await apiFetch<Event>("/events", {
        method: "POST",
        body: JSON.stringify(payload),
      });

      navigate("/");
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Failed to create event.");
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="p-6 max-w-lg mx-auto">
      <form onSubmit={handleSubmit} className="space-y-4">
        <h1 className="text-2xl font-bold">Create Event</h1>

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <input
          name="title"
          value={form.title}
          onChange={handleChange}
          placeholder="Title"
          className="w-full border p-2 rounded"
        />

        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="Description"
          className="w-full border p-2 rounded"
        />

        <input
          name="date"
          type="date"
          value={form.date}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />

        <input
          name="location"
          value={form.location}
          onChange={handleChange}
          placeholder="Location"
          className="w-full border p-2 rounded"
        />

        <input
          name="latitude"
          type="number"
          step="any"
          value={form.latitude}
          onChange={handleChange}
          placeholder="Latitude"
          className="w-full border p-2 rounded"
        />

        <input
          name="longitude"
          type="number"
          step="any"
          value={form.longitude}
          onChange={handleChange}
          placeholder="Longitude"
          className="w-full border p-2 rounded"
        />

        <button
          disabled={loading}
          className="w-full bg-black text-white p-2 rounded disabled:opacity-50"
        >
          {loading ? "Creating..." : "Create"}
        </button>
      </form>
    </div>
  );
}
