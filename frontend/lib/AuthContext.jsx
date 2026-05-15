"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { getUserById } from "./users";

const AuthContext = createContext(null);

const SESSION_KEY = "yatra_session_uid";

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  /* Restore session from localStorage on mount */
  useEffect(() => {
    try {
      const savedId = localStorage.getItem(SESSION_KEY);
      if (savedId) {
        const restored = getUserById(savedId);
        if (restored) setUser(restored);
      }
    } catch {
      /* localStorage unavailable (SSR guard) */
    } finally {
      setLoading(false);
    }
  }, []);

  const login = (userObj, remember = true) => {
    setUser(userObj);
    if (remember) {
      try { localStorage.setItem(SESSION_KEY, userObj.id); } catch {}
    }
  };

  const logout = () => {
    setUser(null);
    try { localStorage.removeItem(SESSION_KEY); } catch {}
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside <AuthProvider>");
  return ctx;
}
