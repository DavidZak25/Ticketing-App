import { useState } from "react";
import { MobileShell } from "../components/MobileShell";
import { BottomNav } from "../components/BottomNav";
import { EventCard } from "../components/EventCard";
import { SearchBar, SectionHeader, LoadingState, ErrorState, EmptyState } from "../components/ui-kit";
import { CATEGORIES } from "../data";
import { SlidersHorizontal, Sparkles, CalendarX } from "lucide-react";
import { motion } from "motion/react";
import { useApp } from "../hooks/useAppContext";

export function EventsListScreen() {
  const { events, eventsStatus, eventsError, refreshEvents, user } = useApp();
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredEvents = events.filter((event) => {
    const matchesCategory = activeCategory === "All" || event.category === activeCategory;
    const matchesSearch =
      !searchQuery ||
      event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.location.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const featuredEvents = filteredEvents.filter((e) => e.isFeatured);
  const otherEvents = filteredEvents.filter((e) => !e.isFeatured);

  return (
    <MobileShell noPadding>
      <div className="flex flex-col min-h-screen pb-24">
        {/* Header */}
        <div className="px-5 pt-14 pb-2">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-between mb-6"
          >
            <div>
              <p className="text-[#6b6b8d] text-[13px]">Welcome back{user ? `, ${user.firstName}` : ""}</p>
              <h1 className="text-white text-[24px] tracking-tight flex items-center gap-2">
                Discover
                <Sparkles size={18} className="text-[#a855f7]" />
              </h1>
            </div>
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#a855f7] to-[#7c3aed] flex items-center justify-center text-white text-[14px]">
              {user ? `${user.firstName[0]}${user.lastName[0]}` : "AR"}
            </div>
          </motion.div>

          {/* Search */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="flex gap-3 mb-5"
          >
            <SearchBar
              value={searchQuery}
              onChange={setSearchQuery}
              placeholder="Search events, venues..."
            />
            <button className="w-12 h-12 rounded-xl bg-[#151525] border border-[#2a2a45]/50 flex items-center justify-center text-[#6b6b8d] hover:text-[#a855f7] hover:border-[#a855f7]/30 transition-colors flex-shrink-0">
              <SlidersHorizontal size={18} />
            </button>
          </motion.div>

          {/* Categories */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="flex gap-2 overflow-x-auto no-scrollbar pb-1"
          >
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-full text-[13px] whitespace-nowrap transition-all duration-200 ${
                  activeCategory === cat
                    ? "bg-[#a855f7] text-white shadow-lg shadow-[#a855f7]/20"
                    : "bg-[#151525] text-[#6b6b8d] border border-[#2a2a45]/50 hover:border-[#3d3d5c]"
                }`}
              >
                {cat}
              </button>
            ))}
          </motion.div>
        </div>

        {/* Content states */}
        {eventsStatus === "loading" && <LoadingState message="Loading events..." />}

        {eventsStatus === "error" && (
          <ErrorState message={eventsError || "Failed to load events"} onRetry={refreshEvents} />
        )}

        {eventsStatus === "success" && filteredEvents.length === 0 && (
          <EmptyState
            icon={CalendarX}
            title="No events found"
            description={searchQuery ? `No results for "${searchQuery}"` : "No events in this category yet"}
            action={searchQuery ? { label: "Clear Search", onClick: () => setSearchQuery("") } : undefined}
          />
        )}

        {eventsStatus === "success" && filteredEvents.length > 0 && (
          <>
            {/* Featured */}
            {featuredEvents.length > 0 && (
              <div className="px-5 mt-6">
                <SectionHeader title="Featured Events" />
                <div className="space-y-4">
                  {featuredEvents.map((event, i) => (
                    <motion.div
                      key={event.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 + i * 0.1 }}
                    >
                      <EventCard event={event} variant="featured" />
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {/* All Events */}
            {otherEvents.length > 0 && (
              <div className="px-5 mt-6">
                <SectionHeader title={activeCategory === "All" ? "All Events" : activeCategory} />
                <div className="space-y-3">
                  {otherEvents.map((event, i) => (
                    <motion.div
                      key={event.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 + i * 0.08 }}
                    >
                      <EventCard event={event} />
                    </motion.div>
                  ))}
                </div>
              </div>
            )}
          </>
        )}
      </div>

      <BottomNav />
    </MobileShell>
  );
}
