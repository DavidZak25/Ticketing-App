import { useState } from "react";
import { useNavigate } from "react-router";
import { MobileShell } from "../components/MobileShell";
import { InputField, PrimaryButton, BackButton } from "../components/ui-kit";
import { Check } from "lucide-react";
import { motion } from "motion/react";
import { useApp } from "../hooks/useAppContext";

export function RegisterScreen() {
  const navigate = useNavigate();
  const { register, authStatus, authError } = useApp();
  const [form, setForm] = useState({ firstName: "", lastName: "", email: "", password: "", phone: "" });
  const [agreed, setAgreed] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const update = (field: string) => (value: string) => setForm((f) => ({ ...f, [field]: value }));

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!form.firstName.trim()) errs.firstName = "Required";
    if (!form.lastName.trim()) errs.lastName = "Required";
    if (!form.email.trim()) errs.email = "Required";
    else if (!form.email.includes("@")) errs.email = "Enter a valid email";
    if (!form.password.trim()) errs.password = "Required";
    else if (form.password.length < 8) errs.password = "Min. 8 characters";
    if (!agreed) errs.terms = "You must agree to continue";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleRegister = async () => {
    if (!validate()) return;
    await register(form);
    navigate("/events");
  };

  return (
    <MobileShell>
      <div className="flex flex-col min-h-screen pt-4 pb-8">
        {/* Header */}
        <div className="flex items-center gap-3 mb-8">
          <BackButton />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="mb-8">
            <h1 className="text-white text-[28px] tracking-tight">Create Account</h1>
            <p className="text-[#6b6b8d] text-[14px] mt-1">Join the Eventix community</p>
          </div>

          {authError && (
            <div className="mb-4 p-3 rounded-xl bg-[#ef4444]/10 border border-[#ef4444]/20">
              <p className="text-[#ef4444] text-[13px] text-center">{authError}</p>
            </div>
          )}

          {/* Form */}
          <div className="space-y-4">
            <div className="flex gap-3">
              <div className="flex-1">
                <InputField label="FIRST NAME" value={form.firstName} onChange={update("firstName")} placeholder="Alex" error={errors.firstName} />
              </div>
              <div className="flex-1">
                <InputField label="LAST NAME" value={form.lastName} onChange={update("lastName")} placeholder="Rivera" error={errors.lastName} />
              </div>
            </div>

            <InputField label="EMAIL" type="email" value={form.email} onChange={update("email")} placeholder="your@email.com" error={errors.email} />
            <InputField label="PASSWORD" type="password" value={form.password} onChange={update("password")} placeholder="Min. 8 characters" error={errors.password} />
            <InputField label="PHONE (OPTIONAL)" type="tel" value={form.phone} onChange={update("phone")} placeholder="+1 (555) 000-0000" />
          </div>

          {/* Terms */}
          <div className="flex items-start gap-3 mt-6">
            <button
              onClick={() => setAgreed(!agreed)}
              className={`w-5 h-5 rounded-md border flex items-center justify-center mt-0.5 flex-shrink-0 transition-colors ${
                agreed
                  ? "bg-[#a855f7] border-[#a855f7]"
                  : errors.terms
                  ? "border-red-500/50 bg-red-500/10"
                  : "border-[#a855f7]/50 bg-[#a855f7]/10"
              }`}
            >
              {agreed && <Check size={12} className="text-white" />}
            </button>
            <p className="text-[#6b6b8d] text-[12px]">
              I agree to the <span className="text-[#a855f7]">Terms of Service</span> and{" "}
              <span className="text-[#a855f7]">Privacy Policy</span>
            </p>
          </div>
          {errors.terms && <p className="text-red-400 text-[11px] mt-1.5 ml-8">{errors.terms}</p>}

          <PrimaryButton onClick={handleRegister} loading={authStatus === "loading"} className="mt-8">
            Create Account
          </PrimaryButton>

          <div className="text-center mt-6">
            <span className="text-[#6b6b8d] text-[14px]">Already have an account? </span>
            <button onClick={() => navigate("/login")} className="text-[#a855f7] text-[14px]">
              Sign In
            </button>
          </div>
        </motion.div>
      </div>
    </MobileShell>
  );
}
