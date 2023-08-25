"use client";

import { routes } from "@/constants/routesleanq_support_coordinator";
import { setCredentials } from "@/store/features/auth/authSliceleanq_support_coordinator";
import { stores } from "@/store/storeleanq_support_coordinator";
import { usePathname, useRouter } from "next/navigation";
import { useCallback, useEffect } from "react";
import { validateDomain } from "./validate-domain/validate.api";
import { useToast } from "./toast/useToast";

/**
 * @param WrappedComponent - The component to be wrapped with authentication.
 * @returns The wrapped component with authentication.
 */
const withAuth = (WrappedComponent: React.ComponentType<any>) => {
  const AuthWrapper: React.FC<any> = (props) => {
    const router = useRouter();
    const showToast = useToast();
    const path = usePathname();

    const unauthorizedPath = path === routes.login || path === "/";

    const checkDomain = useCallback(async () => {
      const host = window.location.host;
      const valid = await validateDomain(host);
      if (!valid) {
        showToast({ title: "Invalid SubDomain", type: "error" });
        window.location.href = "https://leancx.io";
      } else {
        const token = localStorage.getItem("token");
        stores.dispatch(setCredentials({ token }));
        if (token === null) {
          router.replace(routes.login);
        } else {
          // Redirect to the appropriate path based on the current path
          router.push(unauthorizedPath ? routes.dashboard : path);
        }
      }
    }, [path, router, showToast, unauthorizedPath]);

    useEffect(() => {
      if (typeof window !== "undefined") {
        checkDomain();
      }
    }, [checkDomain]);

    return <WrappedComponent {...props} />;
  };

  return AuthWrapper;
};

export default withAuth;
