import { createContext, useEffect, useState } from "react";
import axios from "../axiosConfig";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true; 

    const fetchUser = async () => {
      try {
        const res = await axios.get(
          "https://tradeonix.onrender.com/api/me",
          { withCredentials: true }
        );

        if (mounted) {
          setUser(res.data);
          setLoading(false);
        }

      } catch (err) {
        if (mounted) {
          setLoading(false);
          setUser(null);
        }
      }
    };

    fetchUser();

    return () => {
      mounted = false;
    };
  }, []);

  

  if (loading) return <h2>Loading...</h2>;

  return (
    <AuthContext.Provider value={{ user }}>
      {children}
    </AuthContext.Provider>
  );
};