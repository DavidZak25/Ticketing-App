import { useNavigate } from "react-router";
import { MobileShell } from "../components/MobileShell";
import { PrimaryButton, SecondaryButton } from "../components/ui-kit";
import { CheckCircle, Ticket, ArrowRight } from "lucide-react";
import { motion } from "motion/react";
import { useApp } from "../hooks/useAppContext";

export function PaymentSuccessScreen() {
  const navigate = useNavigate();
  const { refreshTickets } = useApp();

  const handleViewTickets = async () => {
    await refreshTickets();
    navigate("/my-tickets");
  };

  return (
    <MobileShell>
      <div className="flex flex-col items-center justify-center min-h-screen py-8">
        {/* Success animation */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 15 }}
          className="relative mb-8"
        >
          <div className="w-28 h-28 rounded-full bg-[#22c55e]/10 flex items-center justify-center">
            <div className="w-20 h-20 rounded-full bg-[#22c55e]/20 flex items-center justify-center">
              <CheckCircle size={48} className="text-[#22c55e]" strokeWidth={1.5} />
            </div>
          </div>
          {/* Sparkle effects */}
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-[#a855f7]/30 flex items-center justify-center"
          >
            <div className="w-2 h-2 rounded-full bg-[#a855f7]" />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.45 }}
            className="absolute -bottom-1 -left-3 w-4 h-4 rounded-full bg-[#22c55e]/30 flex items-center justify-center"
          >
            <div className="w-1.5 h-1.5 rounded-full bg-[#22c55e]" />
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-center"
        >
          <h1 className="text-white text-[26px] tracking-tight">Payment Successful!</h1>
          <p className="text-[#8b8ba7] text-[14px] mt-2 max-w-[280px] mx-auto">
            Your tickets have been confirmed and added to your wallet.
          </p>
        </motion.div>

        {/* Ticket preview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
          className="w-full mt-10 p-5 rounded-2xl bg-[#151525] border border-[#2a2a45]/40"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-[#a855f7]/15 flex items-center justify-center">
              <Ticket size={18} className="text-[#a855f7]" />
            </div>
            <div>
              <p className="text-white text-[15px]">Neon Pulse</p>
              <p className="text-[#6b6b8d] text-[12px]">VIP · 1 ticket</p>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-3 p-3 rounded-xl bg-[#0d0d14]">
            <div>
              <p className="text-[#6b6b8d] text-[10px]">DATE</p>
              <p className="text-white text-[12px] mt-0.5">Mar 28</p>
            </div>
            <div>
              <p className="text-[#6b6b8d] text-[10px]">TIME</p>
              <p className="text-white text-[12px] mt-0.5">9:00 PM</p>
            </div>
            <div>
              <p className="text-[#6b6b8d] text-[10px]">ORDER</p>
              <p className="text-white text-[12px] mt-0.5">#A7X9</p>
            </div>
          </div>
        </motion.div>

        {/* Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="w-full mt-8 space-y-3"
        >
          <PrimaryButton onClick={handleViewTickets} icon={<ArrowRight size={16} />}>
            View My Tickets
          </PrimaryButton>
          <SecondaryButton onClick={() => navigate("/events")}>
            Back to Events
          </SecondaryButton>
        </motion.div>

        {/* Confirmation email */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="text-[#6b6b8d] text-[12px] mt-6 text-center"
        >
          A confirmation email has been sent to your inbox
        </motion.p>
      </div>
    </MobileShell>
  );
}
