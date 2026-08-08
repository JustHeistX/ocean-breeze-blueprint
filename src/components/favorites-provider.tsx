import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import type { ReactNode } from "react";

const STORAGE_KEY = "rms:favorites";

type FavoritesContextValue = {
  favorites: string[];
  isFavorite: (id: string) => boolean;
  toggleFavorite: (id: string) => void;
  count: number;
  activeTab: "all" | "favorites";
  setActiveTab: (tab: "all" | "favorites") => void;
};

const FavoritesContext = createContext<FavoritesContextValue | null>(null);

export function FavoritesProvider({ children }: { children: ReactNode }) {
  const [favorites, setFavorites] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState<"all" | "favorites">("all");

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) setFavorites(parsed.filter((v) => typeof v === "string"));
      }
    } catch {
      // ignore malformed storage
    }
  }, []);

  const toggleFavorite = useCallback((id: string) => {
    setFavorites((prev) => {
      const next = prev.includes(id) ? prev.filter((v) => v !== id) : [...prev, id];
      try {
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      } catch {
        // ignore storage failures
      }
      return next;
    });
  }, []);

  const value = useMemo<FavoritesContextValue>(
    () => ({
      favorites,
      isFavorite: (id: string) => favorites.includes(id),
      toggleFavorite,
      count: favorites.length,
      activeTab,
      setActiveTab,
    }),
    [favorites, toggleFavorite, activeTab],
  );

  return <FavoritesContext.Provider value={value}>{children}</FavoritesContext.Provider>;
}

export function useFavorites() {
  const ctx = useContext(FavoritesContext);
  if (!ctx) throw new Error("useFavorites must be used within FavoritesProvider");
  return ctx;
}
