import { useState } from "react";
import AuthContext from "./AuthContext";

function AuthProvider({ children }) {
  const storedUser = localStorage.getItem("user");

  const [token, setToken] = useState(localStorage.getItem("token"));
  const [user, setUser] = useState(
    storedUser && storedUser !== "undefined" ? JSON.parse(storedUser) : null,
  );

  const login = (token, userData) => {
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(userData));
    setToken(token);
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ token, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
