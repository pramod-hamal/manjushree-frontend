import { routes } from "@/constants/routesleanq_support_coordinator";
import { setCredentials } from "@/store/features/auth/authSliceleanq_support_coordinator";
import { stores } from "@/store/storeleanq_support_coordinator";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";

/**
 * @param WrappedComponent - The component to be wrapped with authentication.
 * @returns The wrapped component with authentication.
 */
const withAuth = (WrappedComponent: React.ComponentType<any>) => {
  const AuthWrapper: React.FC<any> = (props) => {
    const router = useRouter();
    const path = usePathname();

    const unauthorizedPath = path === routes.login || path === "/";
    useEffect(() => {
      // Check if the code is running in the browser environment
      if (typeof window !== "undefined") {
        const token = localStorage.getItem("token");
        stores.dispatch(setCredentials({token}))
        if (token === null) {
          router.replace(routes.login);
        } else {
          // Redirect to the appropriate path based on the current path
          router.push(unauthorizedPath ? routes.dashboard : path);
        }
      }
    }, [path, router]);

    return <WrappedComponent {...props} />;
  };

  return AuthWrapper;
};

export default withAuth;
