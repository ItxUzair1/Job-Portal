import { createContext, useEffect, useState } from "react";
import {jwtDecode} from "jwt-decode"; // make sure you have this

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({ token: null, user: null });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        setAuth({
          token,
          user: {
            id: decodedToken.id,
            email: decodedToken.email,
            role: decodedToken.role,
          },
        });
      } catch (error) {
        localStorage.removeItem("token");
        console.error("Invalid token", error);
      }
    }
    setLoading(false);
  }, []);

  const Login = (token) => {
    localStorage.setItem("token", token);
    const decodedToken = jwtDecode(token);
    setAuth({
      token,
      user: {
        id: decodedToken.id,
        email: decodedToken.email,
        role: decodedToken.role,
      },
    });
  };

  const Logout = () => {
    localStorage.removeItem("token");
    setAuth({ token: null, user: null });
  };

  return (
    <AuthContext.Provider value={{ auth, Login, Logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
