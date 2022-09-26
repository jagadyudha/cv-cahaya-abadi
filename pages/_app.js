import "../styles/globals.css";
import React from "react";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "@/context/auth";
import Private from "@/components/private";
import { useRouter } from "next/router";
import nprogress from "nprogress";
import "../styles/nprogress.css";
import Router from "next/router";

function MyApp({ Component, pageProps }) {
  Router.events.on("routeChangeStart", nprogress.start);
  Router.events.on("routeChangeError", nprogress.done);
  Router.events.on("routeChangeComplete", nprogress.done);

  const [isSsr, setIsSsr] = React.useState(true);
  const router = useRouter();
  React.useEffect(() => {
    setIsSsr(false);
  }, []);

  return (
    <>
      <AuthProvider>
        <Private protectedRoutes={["/pembayaran/[slug]"]}>
          {!isSsr && <Toaster />}
          <div key={router.pathname}>
            <Navbar />
            <Component {...pageProps} />
            <Footer />
          </div>
        </Private>
      </AuthProvider>
    </>
  );
}

export default MyApp;
