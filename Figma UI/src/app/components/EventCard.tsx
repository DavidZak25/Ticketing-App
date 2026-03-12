import { useNavigate } from "react-router";
import { MapPin, Calendar } from "lucide-react";
import type { Event } from "../data";

interface EventCardProps {
  event: Event;
  variant?: "default" | "featured";
}

export function EventCard({ event, variant = "default" }: EventCardProps) {
  const navigate = useNavigate();

  if (variant === "featured") {
    return (
      <button
        onClick={() => navigate(`/event/${event.id}`)}
        className="relative w-full rounded-3xl overflow-hidden group text-left"
        style={{ aspectRatio: "16/10" }}
      >
        <img
          src={event.image}
          alt={event.title}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
        <div className="absolute top-4 left-4">
          <span className="px-3 py-1 rounded-full bg-[#a855f7]/90 text-white text-[11px] tracking-wide backdrop-blur-sm">
            {event.category}
          </span>
        </div>
        <div className="absolute bottom-0 left-0 right-0 p-5">
          <h3 className="text-white text-[20px] mb-1">{event.title}</h3>
          <p className="text-white/60 text-[13px] mb-3">{event.subtitle}</p>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5 text-white/50 text-[12px]">
                <Calendar size={13} />
                {event.date}
              </div>
              <div className="flex items-center gap-1.5 text-white/50 text-[12px]">
                <MapPin size={13} />
                {event.location}
              </div>
            </div>
            <span className="text-[#22c55e] text-[15px]">
              ${event.price}
            </span>
          </div>
        </div>
      </button>
    );
  }

  return (
    <button
      onClick={() => navigate(`/event/${event.id}`)}
      className="flex gap-4 w-full p-3 rounded-2xl bg-[#151525]/80 border border-[#2a2a45]/40 hover:border-[#a855f7]/30 transition-all duration-300 text-left group"
    >
      <div className="w-[88px] h-[88px] rounded-xl overflow-hidden flex-shrink-0">
        <img
          src={event.image}
          alt={event.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
      </div>
      <div className="flex-1 min-w-0 py-0.5">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <h4 className="text-white text-[15px] truncate">{event.title}</h4>
            <p className="text-[#6b6b8d] text-[12px] mt-0.5">{event.subtitle}</p>
          </div>
          <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#1e1e35] text-[#a855f7] flex-shrink-0 mt-0.5">
            {event.category}
          </span>
        </div>
        <div className="flex items-center justify-between mt-3">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1 text-[#6b6b8d] text-[11px]">
              <Calendar size={11} />
              {event.date}
            </div>
            <div className="flex items-center gap-1 text-[#6b6b8d] text-[11px]">
              <MapPin size={11} />
              {event.location}
            </div>
          </div>
          <span className="text-[#22c55e] text-[14px]">${event.price}</span>
        </div>
      </div>
    </button>
  );
}
