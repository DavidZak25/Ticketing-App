import { useNavigate } from "react-router";
import { ArrowLeft } from "lucide-react";

interface BackButtonProps {
  variant?: "solid" | "glass";
  onClick?: () => void;
}

export function BackButton({ variant = "solid", onClick }: BackButtonProps) {
  const navigate = useNavigate();

  const styles =
    variant === "glass"
      ? "bg-black/30 backdrop-blur-md border-white/10"
      : "bg-[#151525] border-[#2a2a45]/50 hover:border-[#3d3d5c]";

  return (
    <button
      onClick={onClick || (() => navigate(-1))}
      className={`w-10 h-10 rounded-xl border flex items-center justify-center text-white transition-colors ${styles}`}
    >
      <ArrowLeft size={18} />
    </button>
  );
}
