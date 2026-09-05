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

    // TODO: Connect to Supabase Auth. Simulating network request
    setTimeout(() => {
      console.log("Auth submitted:", { mode, email, password, name });
      setIsLoading(false);
      onClose();
      // Redirect to main app flow
      router.push("/trip-planner");
    }, 800);
  };

  const handleGuestLogin = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      onClose();
      router.push("/trip-planner");
    }, 600);
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
            className="fixed inset-0 bg-black/80 backdrop-blur-md z-50"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] max-w-md bg-slate-900 border border-white/10 rounded-3xl shadow-2xl z-50 overflow-hidden"
          >
            {/* Header */}
            <div className="bg-slate-800/50 p-6 relative border-b border-white/5">
              <button
                onClick={onClose}
                className="absolute right-5 top-5 w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-white/50 hover:text-white transition-colors"
              >
                <X size={18} weight="bold" />
              </button>
              <h2 className="text-2xl font-bold text-white mb-2">
                {mode === "login" ? "Welcome Back" : "Join Raahi"}
              </h2>
              <p className="text-sm text-white/50">
                {mode === "login"
                  ? "Sign in to access your saved itineraries and live radar."
                  : "Create an account to build personalized Bharat itineraries."}
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              {mode === "signup" && (
                <div>
                  <div className="relative">
                    <User
                      size={18}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40"
                    />
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Full Name"
                      className="w-full bg-slate-950/50 border border-white/10 text-white rounded-xl pl-11 pr-4 py-3.5 text-sm focus:outline-none focus:border-amber-400 focus:bg-slate-800 transition-colors"
                      required={mode === "signup"}
                    />
                  </div>
                </div>
              )}

              <div>
                <div className="relative">
                  <EnvelopeSimple
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40"
                  />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email Address"
                    className="w-full bg-slate-950/50 border border-white/10 text-white rounded-xl pl-11 pr-4 py-3.5 text-sm focus:outline-none focus:border-amber-400 focus:bg-slate-800 transition-colors"
                    required
                  />
                </div>
              </div>

              <div>
                <div className="relative">
                  <LockSimple
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40"
                  />
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    className="w-full bg-slate-950/50 border border-white/10 text-white rounded-xl pl-11 pr-4 py-3.5 text-sm focus:outline-none focus:border-amber-400 focus:bg-slate-800 transition-colors"
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-amber-400 hover:bg-amber-500 text-slate-900 font-bold py-3.5 rounded-xl transition-all mt-2 flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <Spinner size={18} className="animate-spin" />
                ) : (
                  mode === "login" ? "Sign In" : "Create Account"
                )}
              </button>

              <div className="relative flex py-4 items-center">
                <div className="flex-grow border-t border-white/10"></div>
                <span className="shrink-0 mx-4 text-white/30 text-xs">OR</span>
                <div className="flex-grow border-t border-white/10"></div>
              </div>

              <button
                type="button"
                onClick={handleGuestLogin}
                disabled={isLoading}
                className="w-full bg-white/5 hover:bg-white/10 text-white font-semibold py-3.5 rounded-xl transition-all flex items-center justify-center border border-white/10 text-sm"
              >
                Continue as Guest
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
