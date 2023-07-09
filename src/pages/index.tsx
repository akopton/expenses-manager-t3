import Head from "next/head";
import { SignInBtn } from "~/components/AuthButtons/SignInBtn";
import { ToggleThemeBtn } from "~/components/ToggleThemeBtn/ToggleThemeBtn";

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
      <main className="relative flex h-screen">
        <div className="absolute right-10 top-5">
          <ToggleThemeBtn />
        </div>
        <div
          className="flex h-full flex-grow flex-col items-center justify-center gap-10"
          style={{ boxShadow: "0 0 10px 2px var(--primary-color)" }}
        >
          <h2 className="text-3xl">Sign in now with your Google account!</h2>
          <SignInBtn />
        </div>
        <div
          className="flex h-full w-3/5 flex-col items-center justify-center gap-10"
          style={{ boxShadow: "0 0 10px 2px var(--primary-color)" }}
        >
          <h1 className="text-5xl">Expenses Tracker App</h1>
          <p className="text-center text-2xl">
            Best solution to store your bills,
            <br /> track and analyze your expenses!
          </p>
          <div>*example actions*</div>
        </div>
      </main>
    </>
  );
}
