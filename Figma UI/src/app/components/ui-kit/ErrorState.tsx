import { AlertTriangle, RefreshCw } from "lucide-react";
import { motion } from "motion/react";

interface ErrorStateProps {
  message: string;
  onRetry?: () => void;
}

export function ErrorState({ message, onRetry }: ErrorStateProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center justify-center py-20 px-6"
    >
      <div className="w-20 h-20 rounded-3xl bg-[#ef4444]/10 border border-[#ef4444]/20 flex items-center justify-center mb-5">
        <AlertTriangle size={32} className="text-[#ef4444]" />
      </div>
      <h3 className="text-white text-[16px] mb-1 text-center">Something went wrong</h3>
      <p className="text-[#6b6b8d] text-[13px] text-center max-w-[260px]">{message}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="mt-5 px-6 py-2.5 rounded-xl bg-[#ef4444]/15 text-[#ef4444] text-[13px] hover:bg-[#ef4444]/25 transition-colors flex items-center gap-2"
        >
          <RefreshCw size={14} />
          Try Again
        </button>
      )}
    </motion.div>
  );
}
