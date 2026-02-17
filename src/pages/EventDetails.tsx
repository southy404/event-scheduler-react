import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { apiFetch } from "../api/client";
import type { Event } from "../types/event";

export default function EventDetails() {
  const { id } = useParams<{ id: string }>();

  const [event, setEvent] = useState<Event | null>(null);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    if (!id) return;

    apiFetch<Event>(`/events/${id}`)
      .then(setEvent)
      .catch((err: Error) => setError(err.message));
  }, [id]);

  if (error) return <p className="p-6 text-red-500">{error}</p>;
  if (!event) return <p className="p-6">Loading...</p>;

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold">{event.title}</h1>
      <p className="text-gray-500">{event.date}</p>
      <p className="mt-4">{event.description}</p>
    </div>
  );
}
