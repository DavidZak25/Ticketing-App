import { Search } from "lucide-react";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export function SearchBar({ value, onChange, placeholder = "Search..." }: SearchBarProps) {
  return (
    <div className="relative flex-1">
      <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#6b6b8d]" />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full pl-11 pr-4 py-3 rounded-xl bg-[#151525] border border-[#2a2a45]/50 text-white placeholder:text-[#3d3d5c] focus:outline-none focus:border-[#a855f7]/50 transition-colors text-[14px]"
      />
    </div>
  );
}
