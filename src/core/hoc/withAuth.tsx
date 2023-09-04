"use client";

import { routes } from "@/constants/routesleanq_support_coordinator";
import { setCredentials } from "@/store/features/auth/authSliceleanq_support_coordinator";
import { stores } from "@/store/storeleanq_support_coordinator";
import { usePathname, useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { validateDomain } from "../lib/validateDomain/validate.api";
import { useToast } from "../lib/toast/useToast";
import InvalidSubdomainError from "@/components/error/InvalidSubDomainErrorleanq_support_coordinator";
import { getSubDomain } from "../lib/getHeaders";
import PageLoader from "@/components/loaders/PageLoaderleanq_support_coordinator";
import AccountStatusBlockedError from "@/components/error/AccountStatusBlockedErrorleanq_support_coordinator";

/**
 * @param WrappedComponent - The component to be wrapped with authentication.
 * @returns The wrapped component with authentication.
 */
const withAuth = (WrappedComponent: React.ComponentType<any>) => {
  const AuthWrapper: React.FC<any> = (props) => {
    const [error, setError] = useState<"invalid" | "blocked" | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    const router = useRouter();
    const path = usePathname();

    const showToast = useToast();

    const isLoginPage = path === routes.login;
    const isRootPath = path === "/";
    const unauthorizedPath = isLoginPage || isRootPath;

    const checkSession = () => {
      const token = localStorage.getItem("token");
      stores.dispatch(setCredentials({ token }));
      if (token === null) {
        router.replace(routes.login);
        setLoading(false);
      } else {
        if (unauthorizedPath) {
          router.push(routes.dashboard);
        } else {
          router.push(path);
        }
        setLoading(false);
      }
    };

    const checkDomain = useCallback(async () => {
      const host = window.location.host;
      // if (!host.includes("localhost")) {
      const subDomain: string | null = getSubDomain(host);
      const valid: boolean | "active" | "blocked" = await validateDomain(
        subDomain!
      );
      if (!valid) {
        showToast({ title: "Invalid SubDomain", type: "error" });
        setError("invalid");
        setLoading(false);
        return;
      }
      if (valid === "blocked") {
        setError("blocked");
        showToast({ title: "Account Status Blocked", type: "error" });
        setLoading(false);
        return;
      }
      // }
      checkSession();
    }, [path, router]);

    useEffect(() => {
      if (typeof window !== "undefined") {
        checkDomain();
      }
    }, []);

    if (loading) {
      return <PageLoader />;
    }

    if (error !== null && error === "invalid") {
      return <InvalidSubdomainError error={"Invalid Sub Domain"} />;
    }

    if (error !== null && error === "blocked") {
      return <AccountStatusBlockedError />;
    }

    return <WrappedComponent {...props} />;
  };

  return AuthWrapper;
};

export default withAuth;
