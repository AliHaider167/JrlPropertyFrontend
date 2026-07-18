import { createContext, useContext, useState } from "react";
import api from "../api/axios.js";

const AuthContext = createContext(null);

// A single account system for the whole site. Everyone signs in through the
// same form; whether someone can reach the admin dashboard is decided by
// their `role` (checked both here for UI and on the backend for real
// enforcement) — there's no separate admin login anymore.
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem("jrl_user");
    return stored ? JSON.parse(stored) : null;
  });

  const persist = (data) => {
    localStorage.setItem("jrl_token", data.token);
    localStorage.setItem("jrl_user", JSON.stringify(data));
    setUser(data);
  };

  const login = async (email, password) => {
    const { data } = await api.post("/users/login", { email, password });
    persist(data);
    return data;
  };

  const register = async (name, email, password, phone) => {
    const { data } = await api.post("/users/register", { name, email, password, phone });
    persist(data);
    return data;
  };

  const logout = () => {
    localStorage.removeItem("jrl_token");
    localStorage.removeItem("jrl_user");
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        register,
        logout,
        isAuthenticated: !!user,
        isAdmin: user?.role === "admin",
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
