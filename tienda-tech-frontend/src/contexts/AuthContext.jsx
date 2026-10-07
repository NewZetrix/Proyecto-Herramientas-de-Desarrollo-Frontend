import { createContext, useContext, useEffect, useState, useCallback } from "react";
import insforge from "../services/insforgeClient";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchProfile = useCallback(async (userId) => {
    try {
      const { data, error } = await insforge.auth.getProfile(userId);
      if (!error && data) {
        const profileData = data.profile ?? data;
        setProfile(profileData);
        return profileData;
      }
    } catch {
      // profile may not exist yet
    }
    setProfile(null);
    return null;
  }, []);

  useEffect(() => {
    let cancelled = false;

    async function hydrate() {
      try {
        const { data, error } = await insforge.auth.getCurrentUser();
        if (cancelled) return;
        if (!error && data?.user) {
          setUser(data.user);
          await fetchProfile(data.user.id);
        } else {
          setUser(null);
          setProfile(null);
        }
      } catch {
        if (!cancelled) {
          setUser(null);
          setProfile(null);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    hydrate();
    return () => {
      cancelled = true;
    };
  }, [fetchProfile]);

  const value = {
    user,
    profile,
    loading,
    isAuthenticated: !!user,
    isAdmin: profile?.rol === "admin",
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth debe usarse dentro de un AuthProvider");
  }
  return context;
}