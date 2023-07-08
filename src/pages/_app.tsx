import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { type AppType } from "next/app";
import { api } from "~/utils/api";
import "~/styles/globals.css";
import { ProtectedRoute } from "~/components/ProtectedRoute/ProtectedRoute";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <SessionProvider session={session}>
      <ProtectedRoute>
        <Component {...pageProps} />
      </ProtectedRoute>
    </SessionProvider>
  );
};

export default api.withTRPC(MyApp);
