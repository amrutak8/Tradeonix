import { createContext, useEffect, useState } from "react";
import axios from "../axiosConfig";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

  const [user, setUser] = useState(null);

  useEffect(() => {

    const token = localStorage.getItem("token");

    // NO TOKEN
    if (!token) {
      setUser(null);
      return;
    }

    // FETCH USER
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