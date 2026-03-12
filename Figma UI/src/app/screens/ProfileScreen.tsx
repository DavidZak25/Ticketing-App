import { useNavigate } from "react-router";
import { MobileShell } from "../components/MobileShell";
import { BottomNav } from "../components/BottomNav";
import {
  User, CreditCard, Bell, Shield, HelpCircle, LogOut,
  ChevronRight, Star, Ticket, Heart
} from "lucide-react";
import { motion } from "motion/react";
import { useApp } from "../hooks/useAppContext";

const menuSections = [
  {
    title: "Account",
    items: [
      { icon: User, label: "Personal Info", color: "#a855f7" },
      { icon: CreditCard, label: "Payment Methods", color: "#60a5fa" },
      { icon: Bell, label: "Notifications", color: "#f59e0b", badge: "3" },
    ],
  },
  {
    title: "Preferences",
    items: [
      { icon: Heart, label: "Favorites", color: "#ef4444" },
      { icon: Star, label: "Rewards", color: "#22c55e" },
      { icon: Shield, label: "Privacy & Security", color: "#6366f1" },
    ],
  },
  {
    title: "Support",
    items: [
      { icon: HelpCircle, label: "Help Center", color: "#8b5cf6" },
    ],
  },
];

export function ProfileScreen() {
  const navigate = useNavigate();
  const { user, logout } = useApp();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <MobileShell noPadding>
      <div className="flex flex-col min-h-screen pb-24">
        {/* Header */}
        <div className="px-5 pt-14 pb-6">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-4"
          >
            <div className="relative">
              {user?.avatar ? (
                <img
                  src={user.avatar}
                  alt="Profile"
                  className="w-16 h-16 rounded-2xl object-cover border-2 border-[#a855f7]/30"
                />
              ) : (
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#a855f7] to-[#7c3aed] flex items-center justify-center text-white text-[20px]">
                  {user ? `${user.firstName[0]}${user.lastName[0]}` : "AR"}
                </div>
              )}
              <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-[#22c55e] border-2 border-[#0d0d14]" />
            </div>
            <div className="flex-1">
              <h2 className="text-white text-[20px]">
                {user ? `${user.firstName} ${user.lastName}` : "Alex Rivera"}
              </h2>
              <p className="text-[#6b6b8d] text-[13px]">{user?.email || "alex.rivera@email.com"}</p>
              {user?.memberSince && (
                <p className="text-[#3d3d5c] text-[11px] mt-0.5">Member since {user.memberSince}</p>
              )}
            </div>
            <button className="text-[#a855f7] text-[13px]">Edit</button>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="grid grid-cols-3 gap-3 mt-6"
          >
            {[
              { value: String(user?.eventsAttended ?? 12), label: "Events", icon: Ticket },
              { value: String(user?.rating ?? 4.9), label: "Rating", icon: Star },
              { value: String(user?.favorites ?? 3), label: "Favorites", icon: Heart },
            ].map((stat) => (
              <div
                key={stat.label}
                className="flex flex-col items-center p-3 rounded-2xl bg-[#151525] border border-[#2a2a45]/40"
              >
                <stat.icon size={16} className="text-[#a855f7] mb-1.5" />
                <p className="text-white text-[17px]">{stat.value}</p>
                <p className="text-[#6b6b8d] text-[11px]">{stat.label}</p>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Menu sections */}
        <div className="px-5 space-y-6">
          {menuSections.map((section, si) => (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 + si * 0.08 }}
            >
              <h3 className="text-[#6b6b8d] text-[12px] tracking-wider mb-2 ml-1">
                {section.title.toUpperCase()}
              </h3>
              <div className="rounded-2xl bg-[#151525] border border-[#2a2a45]/40 overflow-hidden">
                {section.items.map((item, ii) => (
                  <button
                    key={item.label}
                    className={`w-full flex items-center gap-3 px-4 py-3.5 hover:bg-[#1a1a2e] transition-colors ${
                      ii < section.items.length - 1 ? "border-b border-[#2a2a45]/30" : ""
                    }`}
                  >
                    <div
                      className="w-9 h-9 rounded-xl flex items-center justify-center"
                      style={{ backgroundColor: `${item.color}15` }}
                    >
                      <item.icon size={16} style={{ color: item.color }} />
                    </div>
                    <span className="flex-1 text-left text-white text-[14px]">{item.label}</span>
                    {"badge" in item && item.badge && (
                      <span className="px-2 py-0.5 rounded-full bg-[#a855f7] text-white text-[10px]">
                        {item.badge}
                      </span>
                    )}
                    <ChevronRight size={16} className="text-[#3d3d5c]" />
                  </button>
                ))}
              </div>
            </motion.div>
          ))}

          {/* Logout */}
          <motion.button
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3.5 rounded-2xl bg-[#151525] border border-[#2a2a45]/40 hover:border-red-500/30 transition-colors"
          >
            <div className="w-9 h-9 rounded-xl bg-red-500/10 flex items-center justify-center">
              <LogOut size={16} className="text-red-500" />
            </div>
            <span className="text-red-400 text-[14px]">Sign Out</span>
          </motion.button>

          <p className="text-center text-[#3d3d5c] text-[11px] pb-4">Eventix v2.1.0</p>
        </div>
      </div>
      <BottomNav />
    </MobileShell>
  );
}
