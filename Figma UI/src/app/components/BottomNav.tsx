import { useNavigate, useLocation } from "react-router";
import { Search, Ticket, User, Compass } from "lucide-react";

const navItems = [
  { icon: Compass, label: "Explore", path: "/events" },
  { icon: Search, label: "Search", path: "/events?search=true" },
  { icon: Ticket, label: "Tickets", path: "/my-tickets" },
  { icon: User, label: "Profile", path: "/profile" },
];

export function BottomNav() {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path: string) => {
    if (path === "/events") return location.pathname === "/events" || location.pathname === "/";
    return location.pathname.startsWith(path.split("?")[0]);
  };

  return (
    <div className="sticky bottom-0 left-0 right-0 z-50">
      <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#0d0d14] via-[#0d0d14]/95 to-transparent pointer-events-none" />
      <div className="relative flex items-center justify-around py-3 pb-6 mx-3 mb-1 rounded-2xl bg-[#1a1a2e]/90 backdrop-blur-xl border border-[#2a2a45]/50">
        {navItems.map((item) => {
          const active = isActive(item.path);
          return (
            <button
              key={item.label}
              onClick={() => navigate(item.path)}
              className={`flex flex-col items-center gap-1 px-4 py-1 transition-all duration-200 ${
                active ? "text-[#a855f7]" : "text-[#6b6b8d]"
              }`}
            >
              <item.icon size={22} strokeWidth={active ? 2.5 : 1.8} />
              <span className="text-[10px] tracking-wide">{item.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
