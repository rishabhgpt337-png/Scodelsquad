"use client";

import { useState, useRef, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { SignOut, GoogleLogo, Spinner } from "@phosphor-icons/react";

export default function UserNav() {
  const { user, loading, signInWithGoogle, logout } = useAuth();
  const [isSigningIn, setIsSigningIn] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (loading) {
    return <div className="w-20 h-8 rounded-full bg-white/[0.05] animate-pulse" />;
  }

  const handleSignIn = async () => {
    try {
      setIsSigningIn(true);
      await signInWithGoogle();
    } catch (err) {
      console.error("Sign in failed:", err);
    } finally {
      setIsSigningIn(false);
    }
  };

  if (!user) {
    return (
      <div className="flex items-center">
        <button
          onClick={handleSignIn}
          disabled={isSigningIn}
          className="flex items-center gap-2 border border-[#C8B79F]/40 hover:bg-[#C8B79F] hover:text-[#0D0C0A] text-[#F3EDE3] text-[11px] font-semibold uppercase tracking-[0.15em] px-5 py-2.5 rounded-full transition-all duration-200 disabled:opacity-70"
        >
          {isSigningIn ? (
            <>
              <Spinner size={14} className="animate-spin" />
              Processing
            </>
          ) : (
            <>
              <GoogleLogo size={14} weight="bold" />
              Sign In
            </>
          )}
        </button>
      </div>
    );
  }

  const initial = user.displayName
    ? user.displayName.charAt(0).toUpperCase()
    : user.email
    ? user.email.charAt(0).toUpperCase()
    : "U";

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setDropdownOpen(!dropdownOpen)}
        className="flex items-center gap-2.5 p-1.5 pr-3 rounded-full bg-[#151310] hover:bg-white/[0.05] border border-white/[0.08] transition-colors"
      >
        {user.photoURL ? (
          <img
            src={user.photoURL}
            alt={user.displayName || "User"}
            className="w-7 h-7 rounded-full object-cover border border-[#C8B79F]/30"
          />
        ) : (
          <div className="w-7 h-7 rounded-full bg-[#C8B79F] text-[#0D0C0A] font-bold text-xs flex items-center justify-center">
            {initial}
          </div>
        )}
        <span className="text-xs font-semibold text-[#F3EDE3] max-w-[100px] truncate">
          {user.displayName || user.email?.split("@")[0] || "Traveler"}
        </span>
      </button>

      {dropdownOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-[#151310] border border-white/[0.08] rounded-xl shadow-2xl py-2 z-50 animate-in fade-in zoom-in-95 duration-150">
          <div className="px-4 py-2 border-b border-white/[0.05]">
            <p className="text-xs font-semibold text-[#F3EDE3] truncate">
              {user.displayName || "Raahi Traveler"}
            </p>
            <p className="text-[10px] text-[#A9A096] truncate">{user.email}</p>
          </div>

          <button
            onClick={() => {
              setDropdownOpen(false);
              logout();
            }}
            className="w-full px-4 py-2.5 text-left text-xs text-red-400 hover:bg-white/[0.03] flex items-center gap-2 transition-colors font-medium"
          >
            <SignOut size={14} />
            <span>Sign Out</span>
          </button>
        </div>
      )}
    </div>
  );
}
