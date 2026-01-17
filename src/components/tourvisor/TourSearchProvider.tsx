"use client";

import React, { createContext, useContext } from "react";
import { useTourSearch } from "@/components/tourvisor/useTourSearch";

type TourSearchContextValue = ReturnType<typeof useTourSearch>;

const TourSearchContext = createContext<TourSearchContextValue | null>(null);

export function TourSearchProvider({ children }: { children: React.ReactNode }) {
  const value = useTourSearch();
  return <TourSearchContext.Provider value={value}>{children}</TourSearchContext.Provider>;
}

export function useTourSearchContext() {
  const ctx = useContext(TourSearchContext);
  if (!ctx) throw new Error("useTourSearchContext must be used within TourSearchProvider");
  return ctx;
}


