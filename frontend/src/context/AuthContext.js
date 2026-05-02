"use client";

import { createContext, useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { api } from "@/lib/api";

export const AuthContext = createContext(null);
const STORAGE_KEY = "devarena_user";
const ACCESS_TOKEN_KEY = "devarena_access_token";
const REFRESH_TOKEN_KEY = "devarena_refresh_token";

function getStoredUser() {
  if (typeof window === "undefined") {
    return null;
  }

  const raw = window.localStorage.getItem(STORAGE_KEY);
  if (!raw) {
    return null;
  }

  try {
    return JSON.parse(raw);
  } catch (_) {
    window.localStorage.removeItem(STORAGE_KEY);
    return null;
  }
}

export function AuthProvider({ children }) {
  const router = useRouter();
  const [user, setUser] = useState(() => getStoredUser());
  const [loading, setLoading] = useState(() => !getStoredUser());

  const login = useCallback((nextUser, tokens = {}) => {
    setUser(nextUser || null);
    if (typeof window !== "undefined") {
      if (nextUser) {
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(nextUser));
        if (tokens.accessToken) {
          window.localStorage.setItem(ACCESS_TOKEN_KEY, tokens.accessToken);
        }
        if (tokens.refreshToken) {
          window.localStorage.setItem(REFRESH_TOKEN_KEY, tokens.refreshToken);
        }
      } else {
        window.localStorage.removeItem(STORAGE_KEY);
        window.localStorage.removeItem(ACCESS_TOKEN_KEY);
        window.localStorage.removeItem(REFRESH_TOKEN_KEY);
      }
    }
  }, []);

  useEffect(() => {
    let cancelled = false;
    const cachedUser = getStoredUser();

    api
      .get("/auth/me")
      .then((res) => {
        if (cancelled) return;
        const remoteUser = res?.data?.data;
        if (remoteUser) {
          login(remoteUser);
          return;
        }
        if (!cachedUser) {
          login(null);
        }
      })
      .catch((err) => {
        if (cancelled) return;
        const status = err?.response?.status;
        if (!cachedUser || status === 401 || status === 403) {
          login(null);
        }
      })
      .finally(() => {
        if (!cancelled) {
          setLoading(false);
        }
      });

    return () => {
      cancelled = true;
    };
  }, [login]);

  const logout = async () => {
    try {
      await api.post("/auth/logout");
    } catch (_) {}
    login(null);
    router.push("/login");
  };

  return (
    <AuthContext.Provider
      value={{ user, loading, isAuthenticated: !!user, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}
