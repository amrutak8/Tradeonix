import { createContext, useEffect, useState } from "react";
import axios from "../axiosConfig";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {

    const token = localStorage.getItem("token");

    if (!token) {
      setUser(null);
      return;
    }

    axios.get("/api/me")
      .then((res) => {
        setUser(res.data);
      })
      .catch((err) => {
        console.log(err);
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        setUser(null);
      });

  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};