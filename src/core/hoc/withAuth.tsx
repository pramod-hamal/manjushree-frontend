"use client";

import { useEffect, useState } from "react";

import { validateDomain } from "../lib/validateDomain/validate.api";
import { useToast } from "../lib/toast/useToast";
import { getSubDomain } from "../lib/getHeaders";

import InvalidSubdomainError from "@/components/error/InvalidSubDomainErrorleanq_support_coordinator";
import PageLoader from "@/components/loaders/PageLoaderleanq_support_coordinator";
import AccountStatusBlockedError from "@/components/error/AccountStatusBlockedErrorleanq_support_coordinator";

const withAuth = (WrappedComponent: React.ComponentType<any>) => {
  const AuthWrapper: React.FC<any> = (props) => {
    const [error, setError] = useState<"invalid" | "blocked" | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    const showToast = useToast();

    const checkDomain = async () => {
      const host = window.location.host;
      if (!host.includes("localhost")) {
        const subDomain: string | null = getSubDomain(host);
        const valid: boolean | "active" | "blocked" = await validateDomain(
          subDomain!
        );
        if (!valid) {
          showToast({ title: "Invalid SubDomain", type: "error" });
          setError("invalid");
        }
        if (valid === "blocked") {
          setError("blocked");
          showToast({ title: "Account Status Blocked", type: "error" });
        }
      }
      setLoading(false);
      return;
    }

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
