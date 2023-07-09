import { useSession } from "next-auth/react";
import { Navbar } from "../Navbar/Navbar";

export const LayoutProvider = ({ children }: { children: React.ReactNode }) => {
  const session = useSession();

  if (session.status === "unauthenticated") {
    return children;
  }

  return (
    <>
      <Navbar />
      {children}
    </>
  );
};
