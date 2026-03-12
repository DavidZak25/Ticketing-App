import { useParams, useNavigate } from "react-router";
import { MobileShell } from "../components/MobileShell";
import { PrimaryButton, BackButton, ErrorState } from "../components/ui-kit";
import { Heart, Share2, MapPin, Calendar, Clock, Users } from "lucide-react";
import { motion } from "motion/react";
import { useApp } from "../hooks/useAppContext";

export function EventDetailScreen() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { events } = useApp();
  const event = events.find((e) => e.id === id);

  if (!event) {
    return (
      <MobileShell>
        <div className="pt-4">
          <BackButton />
        </div>
        <ErrorState
          message="This event could not be found. It may have been removed or the link is incorrect."
          onRetry={() => navigate("/events")}
        />
      </MobileShell>
    );
  }

  return (
    <MobileShell noPadding>
      <div className="flex flex-col min-h-screen pb-28">
        {/* Hero Image */}
        <div className="relative h-[320px]">
          <img
            src={event.image}
            alt={event.title}
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d14] via-[#0d0d14]/20 to-transparent" />

          {/* Top bar */}
          <div className="absolute top-12 left-5 right-5 flex items-center justify-between">
            <BackButton variant="glass" />
            <div className="flex gap-2">
              <button className="w-10 h-10 rounded-xl bg-black/30 backdrop-blur-md border border-white/10 flex items-center justify-center text-white">
                <Heart size={18} />
              </button>
              <button className="w-10 h-10 rounded-xl bg-black/30 backdrop-blur-md border border-white/10 flex items-center justify-center text-white">
                <Share2 size={18} />
              </button>
            </div>
          </div>

          {/* Category badge */}
          <div className="absolute bottom-6 left-5">
            <span className="px-3 py-1 rounded-full bg-[#a855f7]/90 text-white text-[11px] tracking-wide">
              {event.category}
            </span>
          </div>
        </div>

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="px-5 -mt-2"
        >
          <h1 className="text-white text-[26px] tracking-tight">{event.title}</h1>
          <p className="text-[#a855f7] text-[14px] mt-1">{event.subtitle}</p>

          {/* Info cards */}
          <div className="grid grid-cols-2 gap-3 mt-6">
            <div className="p-4 rounded-2xl bg-[#151525] border border-[#2a2a45]/40">
              <Calendar size={16} className="text-[#a855f7] mb-2" />
              <p className="text-[#6b6b8d] text-[11px]">Date</p>
              <p className="text-white text-[14px]">{event.date}</p>
            </div>
            <div className="p-4 rounded-2xl bg-[#151525] border border-[#2a2a45]/40">
              <Clock size={16} className="text-[#a855f7] mb-2" />
              <p className="text-[#6b6b8d] text-[11px]">Time</p>
              <p className="text-white text-[14px]">{event.time}</p>
            </div>
            <div className="p-4 rounded-2xl bg-[#151525] border border-[#2a2a45]/40">
              <MapPin size={16} className="text-[#a855f7] mb-2" />
              <p className="text-[#6b6b8d] text-[11px]">Venue</p>
              <p className="text-white text-[14px]">{event.venue}</p>
            </div>
            <div className="p-4 rounded-2xl bg-[#151525] border border-[#2a2a45]/40">
              <Users size={16} className="text-[#a855f7] mb-2" />
              <p className="text-[#6b6b8d] text-[11px]">Capacity</p>
              <p className="text-white text-[14px]">Limited</p>
            </div>
          </div>

          {/* About */}
          <div className="mt-6">
            <h3 className="text-white text-[16px] mb-2">About</h3>
            <p className="text-[#8b8ba7] text-[14px] leading-relaxed">{event.description}</p>
          </div>

          {/* Ticket tiers preview */}
          <div className="mt-6">
            <h3 className="text-white text-[16px] mb-3">Tickets</h3>
            <div className="space-y-2">
              {event.tickets.map((ticket) => (
                <div key={ticket.id} className="flex items-center justify-between p-3 rounded-xl bg-[#151525] border border-[#2a2a45]/40">
                  <div>
                    <p className="text-white text-[13px]">{ticket.name}</p>
                    <p className="text-[#6b6b8d] text-[11px] mt-0.5">{ticket.description}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-[#22c55e] text-[14px]">${ticket.price}</p>
                    <p className="text-[#3d3d5c] text-[10px]">{ticket.available} left</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Location */}
          <div className="mt-6">
            <h3 className="text-white text-[16px] mb-2">Location</h3>
            <div className="p-4 rounded-2xl bg-[#151525] border border-[#2a2a45]/40 flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-[#a855f7]/10 flex items-center justify-center flex-shrink-0">
                <MapPin size={20} className="text-[#a855f7]" />
              </div>
              <div>
                <p className="text-white text-[14px]">{event.venue}</p>
                <p className="text-[#6b6b8d] text-[13px]">{event.location}</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Bottom CTA */}
        <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[430px] px-5 py-4 bg-[#0d0d14]/95 backdrop-blur-xl border-t border-[#2a2a45]/30">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[#6b6b8d] text-[12px]">Starting from</p>
              <p className="text-white text-[22px]">
                ${event.price}
                <span className="text-[#6b6b8d] text-[13px]"> /person</span>
              </p>
            </div>
            <PrimaryButton
              fullWidth={false}
              onClick={() => navigate(`/event/${event.id}/tickets`)}
              className="px-8"
            >
              Get Tickets
            </PrimaryButton>
          </div>
        </div>
      </div>
    </MobileShell>
  );
}
