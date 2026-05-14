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
 * РїСЂРѕРІР°Р№РґРµСЂ РєРѕРЅС‚РµРєСЃС‚Сѓ Р°РІС‚РµРЅС‚РёС„С–РєР°С†С–С—
 */
export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  /* РІС–РґРЅРѕРІР»СЋС”РјРѕ СЃРµСЃС–СЋ Р· localStorage РїСЂРё Р·Р°РІР°РЅС‚Р°Р¶РµРЅРЅС– */
  useEffect(() => {
    try {
      const savedId = localStorage.getItem(SESSION_KEY);
      if (savedId) {
        const restored = getUserById(savedId);
        if (restored) setUser(restored);
      }
    } catch {
      /* localStorage РЅРµРґРѕСЃС‚СѓРїРЅРёР№ (SSR) */
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
 * С…СѓРє РґР»СЏ РґРѕСЃС‚СѓРїСѓ РґРѕ РєРѕРЅС‚РµРєСЃС‚Сѓ Р°РІС‚РµРЅС‚РёС„С–РєР°С†С–С—
 */
export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside <AuthProvider>");
  return ctx;
}

