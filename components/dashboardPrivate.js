import React from "react";
import { useAuth } from "@/context/dashboardAuth";
import { useRouter } from "next/router";

const DashboardPrivate = ({ children }) => {
  const router = useRouter();
  const { admin, role, loading: authLoading } = useAuth();

  console.log(authLoading);

  React.useEffect(() => {
    if (!authLoading && !role) {
      router.push("/dashboard");
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [admin, authLoading, role]);

  if ((authLoading || !admin || !role) && router.asPath != "/dashboard") {
    return <></>;
  }

  return <>{children}</>;
};

export default DashboardPrivate;
