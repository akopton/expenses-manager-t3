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
      <main className="relative flex h-screen flex-col items-center px-2 py-10 md:flex-row">
        <div className="absolute right-10 top-5">
          <ToggleThemeBtn />
        </div>

        <div className="order-2 flex h-full flex-grow flex-col items-center justify-center gap-10 px-4 md:order-1">
          <h2 className="text-center text-3xl">
            Sign in now with your Google account!
          </h2>
          <SignInBtn />
        </div>

        <div className="order-1 flex h-full w-full flex-col items-center justify-center gap-10 px-4 md:order-2 md:w-3/5 md:border-l-4 md:border-primaryColor">
          <h1 className="text-center text-3xl md:text-5xl">
            Expenses Tracker App
          </h1>
          <p className="text-center text-xl md:text-2xl">
            Best solution to store your bills,
            <br /> track and analyze your expenses!
          </p>
          <div>*example actions*</div>
        </div>
      </main>
    </>
  );
}
