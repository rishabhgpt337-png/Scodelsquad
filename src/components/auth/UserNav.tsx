"use client";

import { useState, useRef, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { SignOut, User as UserIcon } from "@phosphor-icons/react";
import LoginModal from "@/components/auth/LoginModal";

export default function UserNav() {
  const { user, loading, logout } = useAuth();
  const [showLoginModal, setShowLoginModal] = useState(false);
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
    return <div className="w-20 h-8 rounded-full bg-white/5 animate-pulse" />;
  }

  if (!user) {
    return (
      <>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowLoginModal(true)}
            className="text-[11px] font-semibold uppercase tracking-[0.15em] text-white/80 hover:text-white transition-colors"
          >
            Sign In
          </button>
          <button
            onClick={() => setShowLoginModal(true)}
            className="border border-white/25 hover:bg-white hover:text-slate-900 text-white text-[11px] font-semibold uppercase tracking-[0.15em] px-5 py-2.5 rounded-full transition-all duration-200"
          >
            Get Started
          </button>
        </div>
        <LoginModal
          isOpen={showLoginModal}
          onClose={() => setShowLoginModal(false)}
        />
      </>
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
        className="flex items-center gap-2.5 p-1.5 pr-3 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 transition-colors"
      >
        {user.photoURL ? (
          <img
            src={user.photoURL}
            alt={user.displayName || "User"}
            className="w-7 h-7 rounded-full object-cover border border-amber-500/50"
          />
        ) : (
          <div className="w-7 h-7 rounded-full bg-amber-500 text-slate-950 font-bold text-xs flex items-center justify-center">
            {initial}
          </div>
        )}
        <span className="text-xs font-semibold text-white/90 max-w-[100px] truncate">
          {user.displayName || user.email?.split("@")[0] || "Traveler"}
        </span>
      </button>

      {dropdownOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-neutral-950 border border-white/10 rounded-xl shadow-2xl py-2 z-50 animate-in fade-in zoom-in-95 duration-150">
          <div className="px-4 py-2 border-b border-white/5">
            <p className="text-xs font-semibold text-white truncate">
              {user.displayName || "Raahi Traveler"}
            </p>
            <p className="text-[10px] text-white/40 truncate">{user.email}</p>
          </div>

          <button
            onClick={() => {
              setDropdownOpen(false);
              logout();
            }}
            className="w-full px-4 py-2.5 text-left text-xs text-red-400 hover:bg-white/5 flex items-center gap-2 transition-colors font-medium"
          >
            <SignOut size={14} />
            <span>Sign Out</span>
          </button>
        </div>
      )}
    </div>
  );
}
