import React from "react";
import type { LucideIcon } from "lucide-react";
import { motion } from "motion/react";

interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  description: string;
  action?: {
    label: string;
    onClick: () => void;
  };
}

export function EmptyState({ icon: Icon, title, description, action }: EmptyStateProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center justify-center py-20 px-6"
    >
      <div className="w-20 h-20 rounded-3xl bg-[#151525] border border-[#2a2a45]/40 flex items-center justify-center mb-5">
        <Icon size={32} className="text-[#3d3d5c]" />
      </div>
      <h3 className="text-white text-[16px] mb-1 text-center">{title}</h3>
      <p className="text-[#6b6b8d] text-[13px] text-center max-w-[240px]">{description}</p>
      {action && (
        <button
          onClick={action.onClick}
          className="mt-5 px-6 py-2.5 rounded-xl bg-[#a855f7]/15 text-[#a855f7] text-[13px] hover:bg-[#a855f7]/25 transition-colors"
        >
          {action.label}
        </button>
      )}
    </motion.div>
  );
}
