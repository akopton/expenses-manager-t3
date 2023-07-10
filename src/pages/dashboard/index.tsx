import Head from "next/head";
import Link from "next/link";

export default function Dashboard() {
  return (
    <>
      <Head>
        <title>Tablica</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex flex-grow flex-col items-center justify-center">
        <div>Tablica</div>
        <Link href="/dashboard/add-bill">Nowy rachunek</Link>
      </main>
    </>
  );
}