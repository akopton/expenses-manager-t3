import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import type { ReactNode } from "react";

export const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const session = useSession();
  const router = useRouter();

  if (session.status === "unauthenticated" && router.pathname !== "/") {
    router.push("/");
  }

  if (session.status === "authenticated" && router.pathname === "/") {
    router.push("/dashboard");
  }

  return children;
};
