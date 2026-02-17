import { Link } from "react-router-dom";
import type { Event } from "../../types/event";

interface Props {
  event: Event;
}

export default function EventCard({ event }: Props) {
  return (
    <Link
      to={`/events/${event.id}`}
      className="border rounded-xl p-4 shadow hover:shadow-lg transition"
    >
      <h2 className="font-semibold text-lg">{event.title}</h2>
      <p className="text-sm text-gray-500">{event.date}</p>
      <p className="mt-2 text-sm">{event.description}</p>
    </Link>
  );
}
