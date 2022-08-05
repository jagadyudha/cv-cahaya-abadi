import "../styles/globals.css";
import React from "react";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { Toaster } from "react-hot-toast";

function MyApp({ Component, pageProps }) {
  const [isSsr, setIsSsr] = React.useState(true);
  React.useEffect(() => {
    setIsSsr(false);
  }, []);

  return (
    <>
      {!isSsr && <Toaster />}
      <Navbar />
      <Component {...pageProps} />
      <Footer />
    </>
  );
}

export default MyApp;
