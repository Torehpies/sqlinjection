import { useState } from "react";
import { AuthContext } from "./AuthContext";

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });
  const [role, setRole] = useState(() => {
    return localStorage.getItem("role") || null;
  });

  // Login helper
  const login = (userData) => {
    setUser(userData);
    setRole(userData.role);
    localStorage.setItem("user", JSON.stringify(userData));
    localStorage.setItem("role", userData.role);
  };

  // Logout helper
  const logout = () => {
    setUser(null);
    setRole(null);
    localStorage.removeItem("user");
    localStorage.removeItem("role");
  };

  return (
    <AuthContext.Provider value={{ user, role, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
