import "../styles/globals.css";
import React from "react";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "@/context/auth";
import { DashboardAuthProvider } from "@/context/dashboardAuth";
import Private from "@/components/private";
import DashboardPrivate from "@/components/dashboardPrivate";
import { useRouter } from "next/router";
import nprogress from "nprogress";
import "../styles/nprogress.css";
import Router from "next/router";
import { DefaultSeo } from "next-seo";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { motion } from "framer-motion";
import DashboardDrawer from "@/components/dashboardDrawer";

// Create a client
const queryClient = new QueryClient();

function MyApp({ Component, pageProps, ...appProps }) {
  Router.events.on("routeChangeStart", nprogress.start);
  Router.events.on("routeChangeError", nprogress.done);
  Router.events.on("routeChangeComplete", nprogress.done);

  const [isSsr, setIsSsr] = React.useState(true);
  const router = useRouter();
  React.useEffect(() => {
    setIsSsr(false);
  }, []);

  // bagian dashboard untuk admin
  if (appProps.router.asPath.startsWith("/dashboard")) {
    return (
      <QueryClientProvider client={queryClient}>
        <DashboardAuthProvider>
          <DashboardPrivate>
            <DashboardDrawer>
              {!isSsr && <Toaster />}
              <Component {...pageProps} />
            </DashboardDrawer>
          </DashboardPrivate>
        </DashboardAuthProvider>
      </QueryClientProvider>
    );
  }

  // bagian user
  return (
    <>
      <DefaultSeo
        title={"Cahaya Abadi — Beranda"}
        description={
          "Menyediakan Jasa Persewaan Ambulance dan Peti Mati Dengan Harga Terjangkau"
        }
        canonical={`${process.env.NEXT_PUBLIC_URL}${appProps.router.asPath}`}
        openGraph={{
          title: "Cahaya Abadi — Beranda",
          description:
            "Menyediakan Jasa Persewaan Ambulance dan Peti Mati Dengan Harga Terjangkau",
          images: [
            {
              url: "https://res.cloudinary.com/dxfdywofj/image/upload/v1664877084/bukti_transfer/csopwwixxq4timtsrfol.webp",
              width: 1200,
              height: 630,
              alt: "Social",
              type: "image/jpeg",
            },
          ],
          site_name: "Cahaya Abadi — Beranda",
        }}
        twitter={{
          handle: "@handle",
          site: "@site",
          cardType: "summary_large_image",
        }}
      />
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <Private protectedRoutes={["/pesan/[slug]", "/status"]}>
            {!isSsr && <Toaster />}
            <motion.div
              initial="pageInitial"
              animate="pageAnimate"
              variants={{
                pageInitial: { opacity: 0 },
                pageAnimate: { opacity: 1 },
              }}
              transition={{ duration: 0.3, ease: "easeInOut", bounce: 0.2 }}
              key={router.pathname}
            >
              <Navbar />
              <Component {...pageProps} />
              <Footer />
            </motion.div>
          </Private>
        </AuthProvider>
      </QueryClientProvider>
    </>
  );
}

export default MyApp;
