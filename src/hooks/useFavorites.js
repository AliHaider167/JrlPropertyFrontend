import { useCallback, useEffect, useState } from "react";

const STORAGE_KEY = "jrl_saved_properties";

const readStored = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
};

// Simple client-side "save for later" list, keyed by property slug.
// No login required — buyers can bookmark properties on any device without
// creating an account, which keeps that flow frictionless.
export const useFavorites = () => {
  const [favorites, setFavorites] = useState(readStored);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
  }, [favorites]);

  const isSaved = useCallback((slug) => favorites.includes(slug), [favorites]);

  const toggleSaved = useCallback((slug) => {
    setFavorites((prev) => (prev.includes(slug) ? prev.filter((s) => s !== slug) : [...prev, slug]));
  }, []);

  return { favorites, isSaved, toggleSaved };
};
