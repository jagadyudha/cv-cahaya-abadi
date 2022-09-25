import React from "react";
import { useAuth } from "@/context/auth";
import { useRouter } from "next/router";

const Private = ({ children, protectedRoutes }) => {
  const router = useRouter();
  const { user, loading: authLoading } = useAuth();
  const protectedPath = protectedRoutes.indexOf(router.pathname) !== -1;

  React.useEffect(() => {
    if (!authLoading && !user && protectedPath) {
      router.push("/auth?type=signin");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, authLoading, protectedPath]);

  if ((authLoading || !user) && protectedPath) {
    return <></>;
  }

  return children;
};

export default Private;
