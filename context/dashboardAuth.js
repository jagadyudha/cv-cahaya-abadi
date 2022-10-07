import React, { useContext, useState, useEffect, createContext } from "react";
import { supabase } from "@/lib/database";
import toast from "react-hot-toast";

// membuat context untuk authentication
const AuthContext = createContext(null);

export const DashboardAuthProvider = ({ children }) => {
  // create state values for user data and loading
  const [admin, setAdmin] = useState(null);
  const [pesanan, setPesanan] = useState(null);
  const [loading, setLoading] = useState(true);
  const [role, setRole] = useState(null);

  useEffect(() => {
    const session = supabase.auth.session();
    setAdmin(session?.user ?? null);

    // listen for changes to auth
    const { data: listener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setAdmin(session?.user ?? null);
      }
    );

    // cleanup the useEffect hook
    return () => {
      listener?.unsubscribe();
    };
  }, []);

  useEffect(() => {
    // check bahwa user memiliki role admin
    const getAdmin = async () => {
      if (admin) {
        const { data, error } = await supabase
          .from("admin")
          .select("*")
          .eq("email", admin.email)
          .single();
        if (data) {
          setRole("admin");
        } else {
          setRole(null);
        }
        setLoading(false);
      }
    };
    getAdmin();
  }, [admin]);

  // create signUp, signIn, signOut functions
  const value = {
    role,
    signIn: (data) => supabase.auth.signIn(data),
    signOut: () => {
      supabase.auth.signOut();
      toast.success("Logout berhasil!");
    },
    admin,
    loading,
  };

  // use a provider to pass down the value
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// export the useAuth hook
export const useAuth = () => {
  return useContext(AuthContext);
};
