import Head from "next/head";
import { SignInBtn } from "~/components/SignInBtn/SignInBtn";

export default function Home() {
  return (
    <>
      <Head>
        <title>Expenses Manager</title>
        <meta
          name="description"
          content="Application to track your expenses!"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-center">
        <SignInBtn />
      </main>
    </>
  );
}
