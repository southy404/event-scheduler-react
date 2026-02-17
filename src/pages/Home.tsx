import { useEffect, useState } from "react";
import { apiFetch } from "../api/client";
import type { Event, EventsPaginatedResponse } from "../types/event";
import { Link } from "react-router-dom";

export default function Home() {
  const [events, setEvents] = useState<Event[]>([]);
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function loadEvents() {
      try {
        const res = await apiFetch<EventsPaginatedResponse>("/events");

        if (!Array.isArray(res.results)) {
          throw new Error("Invalid API response.");
        }

        const sorted = [...res.results].sort(
          (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
        );

        setEvents(sorted);
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("Failed to load events.");
        }
      } finally {
        setLoading(false);
      }
    }

    loadEvents();
  }, []);

  if (loading) return <p className="p-6">Loading events...</p>;

  if (error) return <p className="p-6 text-red-500">{error}</p>;

  if (events.length === 0) return <p className="p-6">No events found.</p>;

  return (
    <div className="p-6 grid gap-6 md:grid-cols-3">
      {events.map((event) => (
        <Link
          key={event.id}
          to={`/events/${event.id}`}
          className="border rounded-xl p-4 shadow hover:shadow-lg transition"
        >
          <h2 className="font-bold text-lg">{event.title}</h2>
          <p className="text-sm text-gray-500">
            {new Date(event.date).toLocaleDateString()}
          </p>
          <p className="mt-2 text-sm">{event.description}</p>
        </Link>
      ))}
    </div>
  );
}
