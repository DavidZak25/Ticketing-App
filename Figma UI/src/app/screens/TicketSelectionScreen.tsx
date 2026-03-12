import { useState } from "react";
import { useParams, useNavigate } from "react-router";
import { MobileShell } from "../components/MobileShell";
import { PrimaryButton, BackButton, ErrorState } from "../components/ui-kit";
import { Minus, Plus, Ticket, Info } from "lucide-react";
import { motion } from "motion/react";
import { useApp } from "../hooks/useAppContext";

export function TicketSelectionScreen() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { events, addToCart } = useApp();
  const event = events.find((e) => e.id === id);
  const [quantities, setQuantities] = useState<Record<string, number>>({});

  if (!event) {
    return (
      <MobileShell>
        <div className="pt-4"><BackButton /></div>
        <ErrorState message="Event not found." onRetry={() => navigate("/events")} />
      </MobileShell>
    );
  }

  const updateQuantity = (ticketId: string, delta: number) => {
    setQuantities((prev) => {
      const current = prev[ticketId] || 0;
      const next = Math.max(0, Math.min(10, current + delta));
      return { ...prev, [ticketId]: next };
    });
  };

  const totalAmount = event.tickets.reduce(
    (sum, t) => sum + t.price * (quantities[t.id] || 0),
    0
  );
  const totalTickets = Object.values(quantities).reduce((sum, q) => sum + q, 0);

  const handleContinue = () => {
    // Add each ticket to cart
    event.tickets.forEach((ticket) => {
      const qty = quantities[ticket.id] || 0;
      if (qty > 0) {
        addToCart(event.id, ticket.id, ticket.name, ticket.price, qty);
      }
    });
    navigate(`/checkout`);
  };

  return (
    <MobileShell>
      <div className="flex flex-col min-h-screen pt-4 pb-32">
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <BackButton />
          <div>
            <h2 className="text-white text-[18px]">Select Tickets</h2>
            <p className="text-[#6b6b8d] text-[12px]">{event.title}</p>
          </div>
        </div>

        {/* Event summary */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex gap-3 p-3 rounded-2xl bg-[#151525] border border-[#2a2a45]/40 mb-6"
        >
          <img
            src={event.image}
            alt={event.title}
            className="w-16 h-16 rounded-xl object-cover"
          />
          <div className="flex-1">
            <h4 className="text-white text-[15px]">{event.title}</h4>
            <p className="text-[#6b6b8d] text-[12px] mt-0.5">{event.date} · {event.time}</p>
            <p className="text-[#6b6b8d] text-[12px]">{event.venue}</p>
          </div>
        </motion.div>

        {/* Ticket types */}
        <div className="space-y-3">
          {event.tickets.map((ticket, i) => {
            const qty = quantities[ticket.id] || 0;
            return (
              <motion.div
                key={ticket.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + i * 0.08 }}
                className={`p-4 rounded-2xl border transition-all duration-300 ${
                  qty > 0
                    ? "bg-[#1a1a30] border-[#a855f7]/40 shadow-lg shadow-[#a855f7]/5"
                    : "bg-[#151525] border-[#2a2a45]/40"
                }`}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-start gap-3">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${
                      qty > 0 ? "bg-[#a855f7]/20" : "bg-[#1e1e35]"
                    }`}>
                      <Ticket size={16} className={qty > 0 ? "text-[#a855f7]" : "text-[#6b6b8d]"} />
                    </div>
                    <div>
                      <h4 className="text-white text-[15px]">{ticket.name}</h4>
                      <p className="text-[#6b6b8d] text-[12px] mt-0.5 flex items-center gap-1">
                        <Info size={10} />
                        {ticket.description}
                      </p>
                    </div>
                  </div>
                  <p className="text-[#22c55e] text-[16px]">${ticket.price}</p>
                </div>

                <div className="flex items-center justify-between">
                  <p className="text-[#6b6b8d] text-[11px]">
                    {ticket.available} remaining
                  </p>
                  <div className="flex items-center gap-4">
                    <button
                      onClick={() => updateQuantity(ticket.id, -1)}
                      disabled={qty === 0}
                      className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all ${
                        qty === 0
                          ? "bg-[#1e1e35] text-[#3d3d5c]"
                          : "bg-[#a855f7]/20 text-[#a855f7] hover:bg-[#a855f7]/30"
                      }`}
                    >
                      <Minus size={14} />
                    </button>
                    <span className="text-white text-[16px] w-6 text-center">{qty}</span>
                    <button
                      onClick={() => updateQuantity(ticket.id, 1)}
                      className="w-8 h-8 rounded-lg bg-[#a855f7]/20 text-[#a855f7] flex items-center justify-center hover:bg-[#a855f7]/30 transition-all"
                    >
                      <Plus size={14} />
                    </button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        {totalTickets > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[430px] px-5 py-4 bg-[#0d0d14]/95 backdrop-blur-xl border-t border-[#2a2a45]/30"
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-[#6b6b8d] text-[13px]">{totalTickets} ticket{totalTickets !== 1 ? "s" : ""}</span>
              <span className="text-white text-[20px]">${totalAmount}</span>
            </div>
            <PrimaryButton onClick={handleContinue}>
              Continue to Checkout
            </PrimaryButton>
          </motion.div>
        )}
      </div>
    </MobileShell>
  );
}
