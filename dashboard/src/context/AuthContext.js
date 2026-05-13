import { createContext, useEffect, useState } from "react";
import axios from "../axiosConfig";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

  const [user, setUser] = useState(null);

  useEffect(() => {

    // GET TOKEN FROM URL
    const params = new URLSearchParams(window.location.search);

    const urlToken = params.get("token");

    // SAVE TOKEN
    if (urlToken) {

      localStorage.setItem("token", urlToken);

      // REMOVE TOKEN FROM URL
      window.history.replaceState(
        {},
        document.title,
        window.location.pathname
      );
    }

    // GET TOKEN
    const token = localStorage.getItem("token");

    if (!token) {
      setUser(null);
      return;
    }

    axios.get(
      "https://tradeonix.onrender.com/api/me",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )

    .then((res) => {

      console.log("USER DATA:", res.data);

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