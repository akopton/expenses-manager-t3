import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { type AppType } from "next/app";
import { api } from "~/utils/api";
import { ProtectedRoute } from "~/components/ProtectedRoute/ProtectedRoute";
import { Layout } from "~/components/LayoutProvider/Layout";
import { ThemeProvider } from "~/context/ThemeContext";
import "~/styles/globals.css";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <SessionProvider session={session}>
      <ProtectedRoute>
        <ThemeProvider>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </ThemeProvider>
      </ProtectedRoute>
    </SessionProvider>
  );
};

export default api.withTRPC(MyApp);
