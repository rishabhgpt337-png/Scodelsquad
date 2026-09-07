"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { X, EnvelopeSimple, LockSimple, User, Spinner } from "@phosphor-icons/react";
import { motion, AnimatePresence } from "motion/react";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AuthModal({ isOpen, onClose }: AuthModalProps) {
  const router = useRouter();
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      onClose();
      router.push("/trip-planner");
    }, 600);
  };

  const handleGuestLogin = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      onClose();
      router.push("/trip-planner");
    }, 400);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 z-50"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 12 }}
            transition={{ duration: 0.2 }}
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] max-w-md bg-slate-900 border border-white/[0.08] rounded-2xl shadow-xl z-50 overflow-hidden"
          >
            {/* Header */}
            <div className="bg-slate-950/80 p-6 relative border-b border-white/[0.08]">
              <button
                onClick={onClose}
                className="absolute right-5 top-5 w-7 h-7 rounded-lg bg-white/[0.05] hover:bg-white/[0.1] flex items-center justify-center text-white/50 hover:text-white transition-colors"
              >
                <X size={15} weight="bold" />
              </button>
              <div className="flex items-center gap-2 mb-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-emerald-400">
                  Raahi Identity
                </span>
              </div>
              <h2 className="text-xl font-bold text-white mb-1.5 tracking-tight">
                {mode === "login" ? "Sign In to Raahi" : "Create Traveler Account"}
              </h2>
              <p className="text-xs text-white/50">
                {mode === "login"
                  ? "Access your verified itinerary library and live radar telemetry."
                  : "Generate and store personalized Bharat tourism master plans."}
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              {mode === "signup" && (
                <div>
                  <label className="text-[11px] font-semibold text-white/60 uppercase tracking-wider block mb-1.5">
                    Full Name
                  </label>
                  <div className="relative">
                    <User
                      size={16}
                      className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/40"
                    />
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Aditi Sharma"
                      className="w-full bg-slate-950 border border-white/[0.1] text-white rounded-xl pl-10 pr-4 py-3 text-xs focus:outline-none focus:border-amber-400 transition-colors"
                      required={mode === "signup"}
                    />
                  </div>
                </div>
              )}

              <div>
                <label className="text-[11px] font-semibold text-white/60 uppercase tracking-wider block mb-1.5">
                  Official Email
                </label>
                <div className="relative">
                  <EnvelopeSimple
                    size={16}
                    className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/40"
                  />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@example.com"
                    className="w-full bg-slate-950 border border-white/[0.1] text-white rounded-xl pl-10 pr-4 py-3 text-xs focus:outline-none focus:border-amber-400 transition-colors"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="text-[11px] font-semibold text-white/60 uppercase tracking-wider block mb-1.5">
                  Password
                </label>
                <div className="relative">
                  <LockSimple
                    size={16}
                    className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/40"
                  />
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full bg-slate-950 border border-white/[0.1] text-white rounded-xl pl-10 pr-4 py-3 text-xs focus:outline-none focus:border-amber-400 transition-colors"
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold py-3.5 rounded-xl transition-colors mt-2 flex items-center justify-center gap-2 text-xs"
              >
                {isLoading ? (
                  <Spinner size={16} className="animate-spin" />
                ) : (
                  mode === "login" ? "Sign In Securely" : "Create Account"
                )}
              </button>

              <div className="relative flex py-2 items-center">
                <div className="flex-grow border-t border-white/[0.08]"></div>
                <span className="shrink-0 mx-3 text-white/30 text-[10px] uppercase font-bold tracking-widest">or</span>
                <div className="flex-grow border-t border-white/[0.08]"></div>
              </div>

              <button
                type="button"
                onClick={handleGuestLogin}
                disabled={isLoading}
                className="w-full bg-slate-950 hover:bg-slate-800 text-white/80 hover:text-white font-semibold py-3 rounded-xl transition-colors flex items-center justify-center border border-white/[0.08] text-xs"
              >
                Continue as Verified Guest
              </button>

              <div className="text-center pt-2">
                <button
                  type="button"
                  onClick={() => setMode(mode === "login" ? "signup" : "login")}
                  className="text-xs text-amber-400/80 hover:text-amber-400 transition-colors font-medium"
                >
                  {mode === "login"
                    ? "Don't have an account? Sign up"
                    : "Already have an account? Sign in"}
                </button>
              </div>
            </form>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
