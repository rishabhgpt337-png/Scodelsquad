"use client";

import { useState } from "react";
import { X, EnvelopeSimple, LockSimple, Spinner, GoogleLogo } from "@phosphor-icons/react";
import { motion, AnimatePresence } from "motion/react";
import { useAuth } from "@/context/AuthContext";

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function LoginModal({ isOpen, onClose }: LoginModalProps) {
  const { signInWithGoogle, signInWithEmail, signUpWithEmail } = useAuth();

  const [mode, setMode] = useState<"login" | "signup">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorText, setErrorText] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorText(null);

    try {
      if (mode === "login") {
        await signInWithEmail(email, password);
      } else {
        await signUpWithEmail(email, password);
      }
      onClose(); // Automatically close on success
    } catch (err: unknown) {
      if (err instanceof Error) {
        setErrorText(err.message.replace("Firebase: ", ""));
      } else {
        setErrorText("Authentication failed. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleAuth = async () => {
    setIsLoading(true);
    setErrorText(null);
    try {
      await signInWithGoogle();
      onClose();
    } catch (err: unknown) {
      if (err instanceof Error) {
        setErrorText(err.message.replace("Firebase: ", ""));
      } else {
        setErrorText("Google sign-in failed. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
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
            className="fixed inset-0 bg-black/70 backdrop-blur-md z-50"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 12 }}
            transition={{ duration: 0.2 }}
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] max-w-md bg-neutral-950 border border-white/10 rounded-2xl p-8 shadow-xl z-50 overflow-hidden"
          >
            {/* Header */}
            <div className="relative mb-6">
              <button
                onClick={onClose}
                className="absolute -right-2 -top-2 w-7 h-7 rounded-lg bg-white/[0.05] hover:bg-white/[0.1] flex items-center justify-center text-white/50 hover:text-white transition-colors"
                title="Close"
              >
                <X size={15} weight="bold" />
              </button>
              <h2 className="text-xl font-bold text-white mb-1.5 tracking-tight">
                {mode === "login" ? "Sign In to Raahi" : "Create Account"}
              </h2>
              <p className="text-xs text-white/50">
                {mode === "login"
                  ? "Welcome back to your travel platform."
                  : "Join to start planning better trips."}
              </p>
            </div>

            {/* Google Auth Button */}
            <button
              onClick={handleGoogleAuth}
              disabled={isLoading}
              className="w-full flex items-center justify-center gap-2 border border-white/20 hover:bg-white/5 text-white py-3 rounded-xl transition-colors text-sm font-semibold mb-6"
            >
              <GoogleLogo size={20} weight="bold" />
              Continue with Google
            </button>

            {/* Divider */}
            <div className="relative flex items-center mb-6">
              <div className="flex-grow border-t border-white/10"></div>
              <span className="shrink-0 mx-3 text-white/40 text-[10px] uppercase font-bold tracking-widest">
                or
              </span>
              <div className="flex-grow border-t border-white/10"></div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-[11px] font-semibold text-white/60 uppercase tracking-wider block mb-1.5">
                  Email
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
                    className="w-full bg-neutral-900 border border-white/10 text-white rounded-xl pl-10 pr-4 py-3 text-xs focus:outline-none focus:border-amber-500/50 transition-colors"
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
                    className="w-full bg-neutral-900 border border-white/10 text-white rounded-xl pl-10 pr-4 py-3 text-xs focus:outline-none focus:border-amber-500/50 transition-colors"
                    required
                  />
                </div>
              </div>

              {/* Error Message */}
              <AnimatePresence>
                {errorText && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="text-red-400 text-xs font-semibold"
                  >
                    {errorText}
                  </motion.div>
                )}
              </AnimatePresence>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-amber-500 hover:bg-amber-400 text-black font-bold py-3.5 rounded-xl transition-colors mt-2 flex items-center justify-center gap-2 text-xs"
              >
                {isLoading ? (
                  <Spinner size={16} className="animate-spin" />
                ) : mode === "login" ? (
                  "Sign In"
                ) : (
                  "Sign Up"
                )}
              </button>

              <div className="text-center pt-2">
                <button
                  type="button"
                  onClick={() => {
                    setMode(mode === "login" ? "signup" : "login");
                    setErrorText(null);
                  }}
                  className="text-xs text-amber-500/80 hover:text-amber-500 transition-colors font-medium"
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
