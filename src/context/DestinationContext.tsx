"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export interface Destination {
  id?: string;
  name: string;
  state?: string;
  country?: string;
  location?: { lat: number; lng: number };
}

interface DestinationContextType {
  destination: Destination | null;
  setDestination: (destination: Destination | null) => void;
}

const DestinationContext = createContext<DestinationContextType | undefined>(undefined);

export function DestinationProvider({ children }: { children: React.ReactNode }) {
  const [destination, setDestinationState] = useState<Destination | null>(null);

  // Persistence to localStorage
  useEffect(() => {
    const saved = localStorage.getItem("raahi_destination");
    if (saved) {
      try {
        setDestinationState(JSON.parse(saved));
      } catch (err) {}
    }
  }, []);

  const setDestination = (dest: Destination | null) => {
    setDestinationState(dest);
    if (dest) {
      localStorage.setItem("raahi_destination", JSON.stringify(dest));
    } else {
      localStorage.removeItem("raahi_destination");
    }
  };

  return (
    <DestinationContext.Provider value={{ destination, setDestination }}>
      {children}
    </DestinationContext.Provider>
  );
}

export function useDestination() {
  const context = useContext(DestinationContext);
  if (context === undefined) {
    throw new Error("useDestination must be used within a DestinationProvider");
  }
  return context;
}
