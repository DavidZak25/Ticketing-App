import React from "react";
import { Loader2 } from "lucide-react";

interface SecondaryButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  loading?: boolean;
  fullWidth?: boolean;
}

export function SecondaryButton({
  children,
  loading = false,
  fullWidth = true,
  className = "",
  disabled,
  ...props
}: SecondaryButtonProps) {
  return (
    <button
      disabled={loading || disabled}
      className={`${fullWidth ? "w-full" : ""} py-4 rounded-xl bg-[#151525] border border-[#2a2a45]/50 text-white text-[15px] hover:border-[#3d3d5c] transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
      {...props}
    >
      {loading ? <Loader2 size={18} className="animate-spin" /> : children}
    </button>
  );
}
