import React from "react";
import { Loader2 } from "lucide-react";

interface PrimaryButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  loading?: boolean;
  variant?: "purple" | "green";
  icon?: React.ReactNode;
  fullWidth?: boolean;
}

export function PrimaryButton({
  children,
  loading = false,
  variant = "purple",
  icon,
  fullWidth = true,
  className = "",
  disabled,
  ...props
}: PrimaryButtonProps) {
  const gradients = {
    purple: "from-[#a855f7] to-[#7c3aed] shadow-[#a855f7]/25",
    green: "from-[#22c55e] to-[#16a34a] shadow-[#22c55e]/25",
  };

  return (
    <button
      disabled={loading || disabled}
      className={`${fullWidth ? "w-full" : ""} py-4 rounded-xl bg-gradient-to-r ${gradients[variant]} text-white text-[15px] hover:opacity-90 transition-all active:scale-[0.98] shadow-lg flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100 ${className}`}
      {...props}
    >
      {loading ? (
        <Loader2 size={18} className="animate-spin" />
      ) : (
        <>
          {children}
          {icon}
        </>
      )}
    </button>
  );
}
