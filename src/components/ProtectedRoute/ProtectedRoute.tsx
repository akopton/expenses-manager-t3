import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import type { ReactNode } from "react";

export const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const session = useSession();
  const router = useRouter();

  if (session.status === "unauthenticated" && router.pathname !== "/") {
    try {
      router.push("/");
    } catch (err) {
      console.error(err);
    }
  }

  if (session.status === "authenticated" && router.pathname === "/") {
    try {
      router.push("/dashboard");
    } catch (err) {
      console.error(err);
    }
  }

  return children;
};
