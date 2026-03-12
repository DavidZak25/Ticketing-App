import React from "react";

interface MobileShellProps {
  children: React.ReactNode;
  className?: string;
  noPadding?: boolean;
}

export function MobileShell({ children, className = "", noPadding = false }: MobileShellProps) {
  return (
    <div className="flex items-center justify-center min-h-screen bg-[#0a0a0f] font-['Inter',sans-serif]">
      <div
        className={`relative w-full max-w-[430px] min-h-screen bg-[#0d0d14] overflow-y-auto overflow-x-hidden ${
          noPadding ? "" : "px-5"
        } ${className}`}
        style={{ WebkitOverflowScrolling: "touch" }}
      >
        {children}
      </div>
    </div>
  );
}
