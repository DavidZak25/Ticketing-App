import type { TicketStatus } from "../../data";

interface StatusBadgeProps {
  status: TicketStatus;
  size?: "sm" | "md";
}

const statusConfig: Record<TicketStatus, { label: string; bg: string; text: string; dot: string }> = {
  valid: { label: "VALID", bg: "bg-[#22c55e]/15", text: "text-[#22c55e]", dot: "bg-[#22c55e]" },
  used: { label: "USED", bg: "bg-[#6b6b8d]/15", text: "text-[#6b6b8d]", dot: "bg-[#6b6b8d]" },
  cancelled: { label: "CANCELLED", bg: "bg-[#ef4444]/15", text: "text-[#ef4444]", dot: "bg-[#ef4444]" },
  expired: { label: "EXPIRED", bg: "bg-[#f59e0b]/15", text: "text-[#f59e0b]", dot: "bg-[#f59e0b]" },
};

export function StatusBadge({ status, size = "sm" }: StatusBadgeProps) {
  const config = statusConfig[status];

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full ${config.bg} ${config.text} ${
        size === "sm" ? "px-2.5 py-1 text-[10px]" : "px-3 py-1.5 text-[11px]"
      } tracking-wider`}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${config.dot}`} />
      {config.label}
    </span>
  );
}
