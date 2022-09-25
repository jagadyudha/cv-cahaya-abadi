import "../styles/globals.css";
import React from "react";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "@/context/auth";
import Private from "@/components/private";

function MyApp({ Component, pageProps }) {
  const [isSsr, setIsSsr] = React.useState(true);
  React.useEffect(() => {
    setIsSsr(false);
  }, []);

  return (
    <>
      <AuthProvider>
        <Private protectedRoutes={["/pembayaran/[slug]"]}>
          {!isSsr && <Toaster />}
          <Navbar />
          <Component {...pageProps} />
          <Footer />
        </Private>
      </AuthProvider>
    </>
  );
}

export default MyApp;
