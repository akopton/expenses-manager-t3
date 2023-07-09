import { type Session } from "next-auth";
import { SessionProvider, useSession } from "next-auth/react";
import { type AppType } from "next/app";
import { api } from "~/utils/api";
import "~/styles/globals.css";
import { ProtectedRoute } from "~/components/ProtectedRoute/ProtectedRoute";
import { LayoutProvider } from "~/components/LayoutProvider/LayoutProvider";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <SessionProvider session={session}>
      <ProtectedRoute>
        <LayoutProvider>
          <Component {...pageProps} />
        </LayoutProvider>
      </ProtectedRoute>
    </SessionProvider>
  );
};

export default api.withTRPC(MyApp);
