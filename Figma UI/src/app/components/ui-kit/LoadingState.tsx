import { motion } from "motion/react";

interface LoadingStateProps {
  message?: string;
}

export function LoadingState({ message = "Loading..." }: LoadingStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-20 px-6">
      <div className="relative w-12 h-12 mb-5">
        <motion.div
          className="absolute inset-0 rounded-full border-2 border-[#a855f7]/20"
        />
        <motion.div
          className="absolute inset-0 rounded-full border-2 border-transparent border-t-[#a855f7]"
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        />
      </div>
      <p className="text-[#6b6b8d] text-[13px]">{message}</p>
    </div>
  );
}
