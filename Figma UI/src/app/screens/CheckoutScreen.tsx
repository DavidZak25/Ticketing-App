import { useNavigate } from "react-router";
import { MobileShell } from "../components/MobileShell";
import { PrimaryButton, BackButton, ErrorState, EmptyState } from "../components/ui-kit";
import { CreditCard, Shield, Lock, ShoppingCart } from "lucide-react";
import { motion } from "motion/react";
import { useApp } from "../hooks/useAppContext";

export function CheckoutScreen() {
  const navigate = useNavigate();
  const { cart, events, processCheckout, checkoutStatus, checkoutError, clearCart } = useApp();

  const event = events.find((e) => e.id === cart.eventId);

  if (!event || cart.items.length === 0) {
    return (
      <MobileShell>
        <div className="pt-4"><BackButton /></div>
        <EmptyState
          icon={ShoppingCart}
          title="Your cart is empty"
          description="Add some tickets to get started"
          action={{ label: "Browse Events", onClick: () => navigate("/events") }}
        />
      </MobileShell>
    );
  }

  const serviceFee = Math.round(cart.totalAmount * 0.05 * 100) / 100;
  const grandTotal = cart.totalAmount + serviceFee;

  const handlePay = async () => {
    await processCheckout();
    navigate("/payment-success");
  };

  return (
    <MobileShell>
      <div className="flex flex-col min-h-screen pt-4 pb-8">
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <BackButton />
          <h2 className="text-white text-[18px]">Checkout</h2>
        </div>

        {checkoutStatus === "error" && checkoutError && (
          <div className="mb-4">
            <ErrorState message={checkoutError} onRetry={handlePay} />
          </div>
        )}

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-4"
        >
          {/* Order Summary */}
          <div className="p-5 rounded-2xl bg-[#151525] border border-[#2a2a45]/40">
            <h3 className="text-white text-[15px] mb-4">Order Summary</h3>

            <div className="flex gap-3 pb-4 border-b border-[#2a2a45]/40">
              <img
                src={event.image}
                alt={event.title}
                className="w-14 h-14 rounded-xl object-cover"
              />
              <div>
                <p className="text-white text-[14px]">{event.title}</p>
                <p className="text-[#6b6b8d] text-[12px] mt-0.5">{event.date} · {event.time}</p>
              </div>
            </div>

            <div className="space-y-3 mt-4">
              {cart.items.map((item) => (
                <div key={item.ticketId} className="flex justify-between text-[13px]">
                  <span className="text-[#8b8ba7]">
                    {item.ticketName} x{item.quantity}
                  </span>
                  <span className="text-white">
                    ${item.price * item.quantity}
                  </span>
                </div>
              ))}
              <div className="flex justify-between text-[13px]">
                <span className="text-[#8b8ba7]">Service Fee</span>
                <span className="text-white">${serviceFee.toFixed(2)}</span>
              </div>
              <div className="border-t border-[#2a2a45]/40 pt-3 flex justify-between">
                <span className="text-white text-[15px]">Total</span>
                <span className="text-[#22c55e] text-[18px]">${grandTotal.toFixed(2)}</span>
              </div>
            </div>
          </div>

          {/* Payment Method */}
          <div className="p-5 rounded-2xl bg-[#151525] border border-[#2a2a45]/40">
            <h3 className="text-white text-[15px] mb-4">Payment Method</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3 p-3.5 rounded-xl bg-[#1a1a30] border border-[#a855f7]/30">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#1e3a5f] to-[#0d1b2a] flex items-center justify-center">
                  <CreditCard size={16} className="text-[#60a5fa]" />
                </div>
                <div className="flex-1">
                  <p className="text-white text-[14px]">**** 4829</p>
                  <p className="text-[#6b6b8d] text-[11px]">Visa · Exp 09/27</p>
                </div>
                <div className="w-5 h-5 rounded-full bg-[#a855f7] flex items-center justify-center">
                  <div className="w-2 h-2 rounded-full bg-white" />
                </div>
              </div>
              <div className="flex items-center gap-3 p-3.5 rounded-xl bg-[#151525] border border-[#2a2a45]/40">
                <div className="w-10 h-10 rounded-lg bg-[#1e1e35] flex items-center justify-center">
                  <CreditCard size={16} className="text-[#6b6b8d]" />
                </div>
                <div className="flex-1">
                  <p className="text-white text-[14px]">**** 7156</p>
                  <p className="text-[#6b6b8d] text-[11px]">Mastercard · Exp 03/28</p>
                </div>
                <div className="w-5 h-5 rounded-full border border-[#2a2a45] bg-[#151525]" />
              </div>
            </div>
          </div>

          {/* Promo */}
          <div className="p-4 rounded-2xl bg-[#151525] border border-[#2a2a45]/40 flex gap-3">
            <input
              type="text"
              placeholder="Promo code"
              className="flex-1 bg-transparent text-white placeholder:text-[#3d3d5c] focus:outline-none text-[14px]"
            />
            <button className="px-4 py-2 rounded-lg bg-[#1e1e35] text-[#a855f7] text-[13px] hover:bg-[#a855f7]/20 transition-colors">
              Apply
            </button>
          </div>

          {/* Security */}
          <div className="flex items-center justify-center gap-2 py-2">
            <Shield size={14} className="text-[#22c55e]" />
            <span className="text-[#6b6b8d] text-[12px]">256-bit SSL Encrypted</span>
            <Lock size={12} className="text-[#6b6b8d]" />
          </div>

          {/* Pay button */}
          <PrimaryButton
            onClick={handlePay}
            variant="green"
            loading={checkoutStatus === "loading"}
          >
            Pay ${grandTotal.toFixed(2)}
          </PrimaryButton>
        </motion.div>
      </div>
    </MobileShell>
  );
}
