import { useState } from "react";
import { useNavigate } from "react-router";
import { MobileShell } from "../components/MobileShell";
import { InputField, PrimaryButton } from "../components/ui-kit";
import { Sparkles } from "lucide-react";
import { motion } from "motion/react";
import { useApp } from "../hooks/useAppContext";

export function LoginScreen() {
  const navigate = useNavigate();
  const { login, authStatus, authError } = useApp();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});

  const validate = () => {
    const errs: typeof errors = {};
    if (!email.trim()) errs.email = "Email is required";
    else if (!email.includes("@")) errs.email = "Enter a valid email";
    if (!password.trim()) errs.password = "Password is required";
    else if (password.length < 6) errs.password = "Min. 6 characters";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSignIn = async () => {
    if (!validate()) return;
    await login(email, password);
    navigate("/events");
  };

  return (
    <MobileShell>
      <div className="flex flex-col min-h-screen pt-16 pb-8">
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col items-center mb-12"
        >
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#a855f7] to-[#7c3aed] flex items-center justify-center mb-4 shadow-lg shadow-[#a855f7]/20">
            <Sparkles size={28} className="text-white" />
          </div>
          <h1 className="text-white text-[28px] tracking-tight">Eventix</h1>
          <p className="text-[#6b6b8d] text-[14px] mt-1">Premium event experiences</p>
        </motion.div>

        {/* Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="flex-1 flex flex-col"
        >
          {authError && (
            <div className="mb-4 p-3 rounded-xl bg-[#ef4444]/10 border border-[#ef4444]/20">
              <p className="text-[#ef4444] text-[13px] text-center">{authError}</p>
            </div>
          )}

          <div className="space-y-4">
            <InputField
              label="EMAIL"
              type="email"
              value={email}
              onChange={setEmail}
              placeholder="your@email.com"
              error={errors.email}
            />
            <InputField
              label="PASSWORD"
              type="password"
              value={password}
              onChange={setPassword}
              placeholder="Enter your password"
              error={errors.password}
            />
          </div>

          <button className="text-right text-[#a855f7] text-[13px] mt-3 self-end">
            Forgot password?
          </button>

          <PrimaryButton
            onClick={handleSignIn}
            loading={authStatus === "loading"}
            className="mt-8"
          >
            Sign In
          </PrimaryButton>

          {/* Divider */}
          <div className="flex items-center gap-4 my-8">
            <div className="flex-1 h-px bg-[#2a2a45]/50" />
            <span className="text-[#6b6b8d] text-[12px]">or continue with</span>
            <div className="flex-1 h-px bg-[#2a2a45]/50" />
          </div>

          {/* Social buttons */}
          <div className="flex gap-3">
            <button className="flex-1 py-3.5 rounded-xl bg-[#151525] border border-[#2a2a45]/50 text-white text-[14px] flex items-center justify-center gap-2 hover:border-[#3d3d5c] transition-colors">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
              Google
            </button>
            <button className="flex-1 py-3.5 rounded-xl bg-[#151525] border border-[#2a2a45]/50 text-white text-[14px] flex items-center justify-center gap-2 hover:border-[#3d3d5c] transition-colors">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="white"><path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/></svg>
              Apple
            </button>
          </div>
        </motion.div>

        {/* Bottom link */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-center mt-8"
        >
          <span className="text-[#6b6b8d] text-[14px]">Don't have an account? </span>
          <button
            onClick={() => navigate("/register")}
            className="text-[#a855f7] text-[14px]"
          >
            Sign Up
          </button>
        </motion.div>
      </div>
    </MobileShell>
  );
}
