import { useSession } from "next-auth/react";
import { useRouter as useNavRouter } from "next/navigation";
import { useRouter as useRouteRouter } from "next/router";
import type { ReactNode } from "react";

export const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const session = useSession();
  const router = useNavRouter();
  const { pathname } = useRouteRouter();

  if (session.status === "unauthenticated" && pathname !== "/") {
    router.push("/");
  }

  if (session.status === "authenticated" && pathname === "/") {
    router.push("/dashboard");
  }

  return children;
};
