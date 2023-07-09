import { useSession } from "next-auth/react";
import { Navbar } from "../Navbar/Navbar";
import { useRouter } from "next/router";

export const LayoutProvider = ({ children }: { children: React.ReactNode }) => {
  const session = useSession();
  const router = useRouter();

  if (session.status === "unauthenticated") {
    return children;
  }

  if (session.status === "authenticated" && router.pathname !== "/") {
    return (
      <>
        <Navbar />
        {children}
      </>
    );
  }
};
