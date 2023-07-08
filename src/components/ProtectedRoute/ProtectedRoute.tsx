import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import type { ReactNode } from "react";

export const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const session = useSession();
  const router = useRouter();

  const pushHome = async () => {
    await router.push("/");
  };

  const pushDashboard = async () => {
    await router.push("/dashboard");
  };

  if (session.status === "unauthenticated" && router.pathname !== "/") {
    pushHome();
  }

  if (session.status === "authenticated" && router.pathname === "/") {
    pushDashboard();
  }

  return children;
};
