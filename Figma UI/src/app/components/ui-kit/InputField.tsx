import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

interface InputFieldProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange"> {
  label: string;
  error?: string;
  onChange?: (value: string) => void;
}

export function InputField({ label, error, type = "text", onChange, value, ...props }: InputFieldProps) {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === "password";

  return (
    <div>
      <label className="text-[#8b8ba7] text-[12px] tracking-wider mb-2 block">{label}</label>
      <div className="relative">
        <input
          type={isPassword && showPassword ? "text" : type}
          value={value}
          onChange={(e) => onChange?.(e.target.value)}
          className={`w-full px-4 py-3.5 rounded-xl bg-[#151525] border text-white placeholder:text-[#3d3d5c] focus:outline-none transition-colors text-[14px] ${
            isPassword ? "pr-12" : ""
          } ${error ? "border-red-500/50 focus:border-red-500/70" : "border-[#2a2a45]/50 focus:border-[#a855f7]/50"}`}
          {...props}
        />
        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-[#6b6b8d]"
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        )}
      </div>
      {error && <p className="text-red-400 text-[11px] mt-1.5 ml-1">{error}</p>}
    </div>
  );
}
