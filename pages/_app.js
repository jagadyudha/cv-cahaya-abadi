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
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// Create a client
const queryClient = new QueryClient();

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
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <Private protectedRoutes={["/pesan/[slug]", "/status"]}>
            {!isSsr && <Toaster />}
            <div key={router.pathname}>
              <Navbar />
              <Component {...pageProps} />
              <Footer />
            </div>
          </Private>
        </AuthProvider>
      </QueryClientProvider>
    </>
  );
}

export default MyApp;
