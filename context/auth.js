import React, { useContext, useState, useEffect, createContext } from "react";
import { supabase } from "@/lib/database";
import toast from "react-hot-toast";

// membuat context untuk authentication
const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  // create state values for user data and loading
  const [user, setUser] = useState(null);
  const [pesanan, setPesanan] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const session = supabase.auth.session();
    setUser(session?.user ?? null);
    setLoading(false);
    // listen for changes to auth
    const { data: listener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setUser(session?.user ?? null);
        setLoading(false);
      }
    );

    // cleanup the useEffect hook
    return () => {
      listener?.unsubscribe();
    };
  }, []);

  // create signUp, signIn, signOut functions
  const value = {
    pesanan,
    setPesanan,
    signUp: (data) => supabase.auth.signUp(data),
    signIn: (data) => supabase.auth.signIn(data),
    signOut: () => {
      supabase.auth.signOut();
      toast.success("Logout berhasil!");
    },
    user,
    loading,
  };

  // use a provider to pass down the value
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// export the useAuth hook
export const useAuth = () => {
  return useContext(AuthContext);
};
