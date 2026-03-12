import { useParams, useNavigate } from "react-router";
import { MobileShell } from "../components/MobileShell";
import { BackButton, StatusBadge, ErrorState } from "../components/ui-kit";
import { Calendar, MapPin, Clock, Download, Hash, DoorOpen } from "lucide-react";
import { QRCodeSVG } from "qrcode.react";
import { motion } from "motion/react";
import { useApp } from "../hooks/useAppContext";

export function TicketQRScreen() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { userTickets } = useApp();
  const ticket = userTickets.find((t) => t.id === id);

  if (!ticket) {
    return (
      <MobileShell>
        <div className="pt-4"><BackButton /></div>
        <ErrorState
          message="Ticket not found. It may have been removed or the link is incorrect."
          onRetry={() => navigate("/my-tickets")}
        />
      </MobileShell>
    );
  }

  const isInactive = ticket.status === "used" || ticket.status === "cancelled" || ticket.status === "expired";

  return (
    <MobileShell>
      <div className="flex flex-col min-h-screen pt-4 pb-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <BackButton />
          <h2 className="text-white text-[18px]">Ticket</h2>
          <button className="w-10 h-10 rounded-xl bg-[#151525] border border-[#2a2a45]/50 flex items-center justify-center text-[#6b6b8d]">
            <Download size={18} />
          </button>
        </div>

        {/* Ticket */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex-1"
        >
          <div className={`rounded-3xl overflow-hidden bg-[#151525] border ${
            isInactive ? "border-[#2a2a45]/30" : "border-[#2a2a45]/40"
          }`}>
            {/* Event image */}
            <div className="relative h-[140px]">
              <img
                src={ticket.eventImage}
                alt={ticket.eventTitle}
                className={`w-full h-full object-cover ${isInactive ? "grayscale-[40%]" : ""}`}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#151525] via-transparent to-transparent" />
            </div>

            {/* Event info */}
            <div className="px-6 pt-2 pb-4">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h3 className="text-white text-[22px] tracking-tight">{ticket.eventTitle}</h3>
                  <span className="inline-block mt-1 px-3 py-0.5 rounded-full bg-[#a855f7]/15 text-[#a855f7] text-[12px]">
                    {ticket.ticketType}
                  </span>
                </div>
                <StatusBadge status={ticket.status} size="md" />
              </div>
            </div>

            {/* Tear line */}
            <div className="relative flex items-center px-0 my-1">
              <div className="w-6 h-6 rounded-full bg-[#0d0d14] -ml-3 flex-shrink-0" />
              <div className="flex-1 border-t border-dashed border-[#2a2a45]/60 mx-1" />
              <div className="w-6 h-6 rounded-full bg-[#0d0d14] -mr-3 flex-shrink-0" />
            </div>

            {/* QR Code */}
            <div className="px-6 py-6 flex flex-col items-center">
              {isInactive ? (
                <div className="relative">
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 0.3 }}
                    transition={{ delay: 0.2 }}
                    className="p-5 rounded-2xl bg-white/80"
                  >
                    <QRCodeSVG
                      value={ticket.qrCode}
                      size={180}
                      level="H"
                      fgColor="#0d0d14"
                      bgColor="transparent"
                    />
                  </motion.div>
                  {/* Overlay for inactive tickets */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className={`px-4 py-2 rounded-xl ${
                      ticket.status === "cancelled"
                        ? "bg-[#ef4444]/20 border border-[#ef4444]/30"
                        : ticket.status === "expired"
                        ? "bg-[#f59e0b]/20 border border-[#f59e0b]/30"
                        : "bg-[#6b6b8d]/20 border border-[#6b6b8d]/30"
                    }`}>
                      <p className={`text-[14px] ${
                        ticket.status === "cancelled"
                          ? "text-[#ef4444]"
                          : ticket.status === "expired"
                          ? "text-[#f59e0b]"
                          : "text-[#6b6b8d]"
                      }`}>
                        {ticket.status === "cancelled" ? "Ticket Cancelled" : ticket.status === "expired" ? "Ticket Expired" : "Already Used"}
                      </p>
                    </div>
                  </div>
                </div>
              ) : (
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.2, type: "spring", stiffness: 200, damping: 15 }}
                  className="p-5 rounded-2xl bg-white"
                >
                  <QRCodeSVG
                    value={ticket.qrCode}
                    size={180}
                    level="H"
                    fgColor="#0d0d14"
                    bgColor="#ffffff"
                  />
                </motion.div>
              )}
              <p className="text-[#6b6b8d] text-[12px] mt-4 tracking-widest">{ticket.qrCode}</p>
              {!isInactive && (
                <p className="text-[#3d3d5c] text-[11px] mt-1">Show this QR code at the entrance</p>
              )}
            </div>

            {/* Details */}
            <div className="px-6 pb-6">
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 rounded-xl bg-[#0d0d14]">
                  <div className="flex items-center gap-1.5 mb-1">
                    <Calendar size={12} className="text-[#a855f7]" />
                    <span className="text-[#6b6b8d] text-[10px] tracking-wider">DATE</span>
                  </div>
                  <p className="text-white text-[13px]">{ticket.date}</p>
                </div>
                <div className="p-3 rounded-xl bg-[#0d0d14]">
                  <div className="flex items-center gap-1.5 mb-1">
                    <Clock size={12} className="text-[#a855f7]" />
                    <span className="text-[#6b6b8d] text-[10px] tracking-wider">TIME</span>
                  </div>
                  <p className="text-white text-[13px]">{ticket.time}</p>
                </div>
                <div className="p-3 rounded-xl bg-[#0d0d14]">
                  <div className="flex items-center gap-1.5 mb-1">
                    <MapPin size={12} className="text-[#a855f7]" />
                    <span className="text-[#6b6b8d] text-[10px] tracking-wider">VENUE</span>
                  </div>
                  <p className="text-white text-[13px]">{ticket.venue}</p>
                </div>
                <div className="p-3 rounded-xl bg-[#0d0d14]">
                  <div className="flex items-center gap-1.5 mb-1">
                    <Hash size={12} className="text-[#a855f7]" />
                    <span className="text-[#6b6b8d] text-[10px] tracking-wider">ORDER</span>
                  </div>
                  <p className="text-white text-[13px]">{ticket.orderId}</p>
                </div>
                {ticket.gate && (
                  <div className="p-3 rounded-xl bg-[#0d0d14] col-span-2">
                    <div className="flex items-center gap-1.5 mb-1">
                      <DoorOpen size={12} className="text-[#a855f7]" />
                      <span className="text-[#6b6b8d] text-[10px] tracking-wider">GATE / SECTION</span>
                    </div>
                    <p className="text-white text-[13px]">{ticket.gate}{ticket.seat ? ` · ${ticket.seat}` : ""}</p>
                  </div>
                )}
              </div>

              {/* Purchase info */}
              <div className="mt-3 pt-3 border-t border-[#2a2a45]/30 flex items-center justify-between">
                <span className="text-[#3d3d5c] text-[10px] tracking-wider">PURCHASED {ticket.purchaseDate.toUpperCase()}</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </MobileShell>
  );
}
