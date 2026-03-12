import { useState } from "react";
import { useNavigate } from "react-router";
import { MobileShell } from "../components/MobileShell";
import { BottomNav } from "../components/BottomNav";
import { TicketCard } from "../components/TicketCard";
import { LoadingState, ErrorState, EmptyState } from "../components/ui-kit";
import { Ticket, CalendarX } from "lucide-react";
import { motion } from "motion/react";
import { useApp } from "../hooks/useAppContext";
import type { TicketStatus } from "../data";

type TabKey = "active" | "past";

export function MyTicketsScreen() {
  const navigate = useNavigate();
  const { userTickets, ticketsStatus, ticketsError, refreshTickets } = useApp();
  const [activeTab, setActiveTab] = useState<TabKey>("active");

  const activeStatuses: TicketStatus[] = ["valid"];
  const pastStatuses: TicketStatus[] = ["used", "cancelled", "expired"];

  const filtered = userTickets.filter((t) =>
    activeTab === "active" ? activeStatuses.includes(t.status) : pastStatuses.includes(t.status)
  );

  return (
    <MobileShell noPadding>
      <div className="flex flex-col min-h-screen pb-24">
        {/* Header */}
        <div className="px-5 pt-14 pb-2">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-3 mb-6"
          >
            <div className="w-10 h-10 rounded-xl bg-[#a855f7]/15 flex items-center justify-center">
              <Ticket size={18} className="text-[#a855f7]" />
            </div>
            <div>
              <h1 className="text-white text-[22px] tracking-tight">My Tickets</h1>
              <p className="text-[#6b6b8d] text-[12px]">{userTickets.length} ticket{userTickets.length !== 1 ? "s" : ""} total</p>
            </div>
          </motion.div>

          {/* Tabs */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="flex p-1 rounded-xl bg-[#151525] border border-[#2a2a45]/40 mb-6"
          >
            {([
              { key: "active" as TabKey, label: "Active" },
              { key: "past" as TabKey, label: "Past" },
            ]).map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`flex-1 py-2.5 rounded-lg text-[14px] transition-all duration-200 ${
                  activeTab === tab.key
                    ? "bg-[#a855f7] text-white shadow-lg shadow-[#a855f7]/20"
                    : "text-[#6b6b8d] hover:text-white"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </motion.div>
        </div>

        {/* Content states */}
        {ticketsStatus === "loading" && <LoadingState message="Loading tickets..." />}

        {ticketsStatus === "error" && (
          <div className="px-5">
            <ErrorState message={ticketsError || "Failed to load tickets"} onRetry={refreshTickets} />
          </div>
        )}

        {ticketsStatus === "success" && (
          <div className="px-5 space-y-4">
            {filtered.map((ticket, i) => (
              <motion.div
                key={ticket.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 + i * 0.1 }}
              >
                <TicketCard ticket={ticket} />
              </motion.div>
            ))}
            {filtered.length === 0 && (
              <EmptyState
                icon={activeTab === "active" ? Ticket : CalendarX}
                title={activeTab === "active" ? "No active tickets" : "No past tickets"}
                description={
                  activeTab === "active"
                    ? "Browse events and get tickets to your next experience"
                    : "Your attended and expired tickets will appear here"
                }
                action={activeTab === "active" ? { label: "Explore Events", onClick: () => navigate("/events") } : undefined}
              />
            )}
          </div>
        )}
      </div>
      <BottomNav />
    </MobileShell>
  );
}
