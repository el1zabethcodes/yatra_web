"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { getUserById, User } from "./users";

interface AuthContextType {
  user: User | null;
  login: (userObj: User, remember?: boolean) => void;
  logout: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

const SESSION_KEY = "yatra_session_uid";

/**
 * провайдер контексту автентифікації
 */
export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  /* відновлюємо сесію з localStorage при завантаженні */
  useEffect(() => {
    try {
      const savedId = localStorage.getItem(SESSION_KEY);
      if (savedId) {
        const restored = getUserById(savedId);
        if (restored) setUser(restored);
      }
    } catch {
      /* localStorage недоступний (SSR) */
    } finally {
      setLoading(false);
    }
  }, []);

  const login = (userObj: User, remember = true) => {
    setUser(userObj);
    if (remember) {
      try {
        localStorage.setItem(SESSION_KEY, userObj.id);
      } catch {}
    }
  };

  const logout = () => {
    setUser(null);
    try {
      localStorage.removeItem(SESSION_KEY);
    } catch {}
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

/**
 * хук для доступу до контексту автентифікації
 */
export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside <AuthProvider>");
  return ctx;
}

