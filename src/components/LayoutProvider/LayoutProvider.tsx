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
      <div className="flex max-h-screen min-h-screen flex-col overflow-hidden overflow-hidden border-2">
        <Navbar />
        {children}
      </div>
    );
  }
};
