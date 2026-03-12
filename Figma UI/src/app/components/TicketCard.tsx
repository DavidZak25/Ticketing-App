import { useNavigate } from "react-router";
import { Calendar, MapPin, ChevronRight } from "lucide-react";
import type { UserTicket } from "../data";
import { StatusBadge } from "./ui-kit/StatusBadge";

interface TicketCardProps {
  ticket: UserTicket;
}

export function TicketCard({ ticket }: TicketCardProps) {
  const navigate = useNavigate();
  const isInactive = ticket.status === "used" || ticket.status === "cancelled" || ticket.status === "expired";

  return (
    <button
      onClick={() => navigate(`/ticket/${ticket.id}`)}
      className="w-full text-left group"
    >
      <div className={`relative rounded-3xl overflow-hidden bg-[#151525] border transition-all duration-300 ${
        isInactive
          ? "border-[#2a2a45]/30 opacity-75"
          : "border-[#2a2a45]/50 hover:border-[#a855f7]/30"
      }`}>
        {/* Top section with image */}
        <div className="relative h-[120px] overflow-hidden">
          <img
            src={ticket.eventImage}
            alt={ticket.eventTitle}
            className={`w-full h-full object-cover transition-transform duration-500 ${
              isInactive ? "grayscale-[40%]" : "group-hover:scale-105"
            }`}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#151525] via-transparent to-transparent" />
          <div className="absolute top-3 right-3">
            <StatusBadge status={ticket.status} />
          </div>
        </div>

        {/* Tear line */}
        <div className="relative flex items-center px-0">
          <div className="w-5 h-5 rounded-full bg-[#0d0d14] -ml-2.5 flex-shrink-0" />
          <div className="flex-1 border-t border-dashed border-[#2a2a45]/60 mx-1" />
          <div className="w-5 h-5 rounded-full bg-[#0d0d14] -mr-2.5 flex-shrink-0" />
        </div>

        {/* Bottom section with details */}
        <div className="px-5 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-white text-[16px]">{ticket.eventTitle}</h4>
              <p className="text-[#a855f7] text-[12px] mt-0.5">{ticket.ticketType}</p>
            </div>
            <ChevronRight size={18} className="text-[#6b6b8d] group-hover:text-[#a855f7] transition-colors" />
          </div>
          <div className="flex items-center gap-4 mt-3">
            <div className="flex items-center gap-1.5 text-[#6b6b8d] text-[12px]">
              <Calendar size={12} />
              {ticket.date}
            </div>
            <div className="flex items-center gap-1.5 text-[#6b6b8d] text-[12px]">
              <MapPin size={12} />
              {ticket.venue}
            </div>
          </div>
          {ticket.orderId && (
            <div className="mt-2 pt-2 border-t border-[#2a2a45]/30 flex items-center justify-between">
              <span className="text-[#3d3d5c] text-[10px] tracking-wider">ORDER {ticket.orderId}</span>
              {ticket.gate && <span className="text-[#3d3d5c] text-[10px] tracking-wider">{ticket.gate}</span>}
            </div>
          )}
        </div>
      </div>
    </button>
  );
}
