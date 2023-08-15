import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";

const withAuth = (WrappedComponent: any) => {
  const AuthWrapper = (props: any) => {
    const router = useRouter();
    const path = usePathname();

    useEffect(() => {
      if (typeof window !== "undefined" || typeof window !== undefined) {
        const token = localStorage.getItem("token");
        if (token === null) {
          router.replace("/auth/login");
        } else {
          router.push(path === "/auth/login" ? "/app/dashboard" : path);
        }
      }
    }, [path, router]);
    return <WrappedComponent {...props} />;
  };

  return AuthWrapper;
};

export default withAuth;
