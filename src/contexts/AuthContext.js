import React, { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const raw = localStorage.getItem("nd_user");
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  });

  useEffect(() => {
    if (user) localStorage.setItem("nd_user", JSON.stringify(user));
    else localStorage.removeItem("nd_user");
  }, [user]);

  // simple demo login (use admin/admin)
  function login(username, password) {
    // replaceable with API authentication
    if (username === "admin" && password === "admin") {
      const u = { username, displayName: "Admin" };
      setUser(u);
      return { ok: true };
    }
    return { ok: false, message: "Invalid credentials (try admin/admin)" };
  }

  function logout() {
    setUser(null);
    localStorage.removeItem("nd_user");
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
}
