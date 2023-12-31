import { useSession } from "next-auth/react";
import { Navbar } from "../Navbar/Navbar";
import { useRouter } from "next/router";
import { Roboto_Mono } from "next/font/google";

const roboto_mono = Roboto_Mono({
  weight: ["400"],
  style: "normal",
  subsets: ["latin"],
});

export const Layout = ({ children }: { children: React.ReactNode }) => {
  // const session = useSession();
  const router = useRouter();

  if (router.pathname === "/") {
    return children;
  }

  if (router.pathname !== "/") {
    return (
      <div
        className={`flex max-h-screen min-h-screen flex-col overflow-hidden ${roboto_mono.className}`}
      >
        <Navbar />
        {children}
      </div>
    );
  }

  // for tests purposes

  // if (router.pathname !== "/") {
  //   return (
  //     <div
  //       className={`flex max-h-screen min-h-screen flex-col overflow-hidden ${roboto_mono.className}`}
  //     >
  //       <Navbar />
  //       {children}
  //     </div>
  //   );
  // }

  // return children;
};
