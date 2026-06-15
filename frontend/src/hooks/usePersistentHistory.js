import { useState, useEffect } from "react";

const STORAGE_KEY = "resumelens_history";

function loadHistory(uid) {
  try {
    const raw = localStorage.getItem(`${STORAGE_KEY}_${uid}`);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function saveHistory(uid, history) {
  try {
    localStorage.setItem(`${STORAGE_KEY}_${uid}`, JSON.stringify(history));
  } catch {
    // localStorage may be full or unavailable - fail silently
  }
}

/**
 * Persists resume analysis history to localStorage per-user so it
 * survives page reloads. Falls back to an "anon" bucket if no uid.
 */
export function usePersistentHistory(uid) {
  const key = uid || "anon";
  const [history, setHistory] = useState(() => loadHistory(key));

  // Reload history whenever the user changes (e.g. after login)
  useEffect(() => {
    setHistory(loadHistory(key));
  }, [key]);

  // Persist on every change
  useEffect(() => {
    saveHistory(key, history);
  }, [key, history]);

  const addEntry = (entry) => {
    setHistory(prev => [entry, ...prev]);
  };

  const clearHistory = () => {
    setHistory([]);
  };

  return { history, addEntry, clearHistory };
}
