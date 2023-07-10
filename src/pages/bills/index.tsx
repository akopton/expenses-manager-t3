import Head from "next/head";
import Link from "next/link";
import { GridList } from "~/components/GridList/GridList";

type TCategory = {
  id: string;
  name: string;
  bills: never[];
  value: number;
};

type TSet = {
  id: string;
  name: string;
  bills: never[];
  value: number;
};

export default function BillsPage() {
  const sets = [
    { id: "1", title: "something", name: "remont", bills: [], value: 250.49 },
    { id: "2", title: "something", name: "wyjazd", bills: [], value: 137.37 },
  ];
  const categories = [
    { id: "1", name: "budowlane", bills: [], value: 250.49 },
    { id: "2", name: "spożywcze", bills: [], value: 89.92 },
    { id: "3", name: "samochód", bills: [], value: 200 },
    { id: "4", name: "opłaty", bills: [], value: 137.37 },
    { id: "5", name: "gry", bills: [], value: 139.99 },
    { id: "6", name: "przejmności", bills: [], value: 150.89 },
  ];
  return (
    <>
      <Head>
        <title>Dashboard</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="grid h-screen grid-cols-2 grid-rows-2 items-center px-5 py-4">
        <Link href={"/bills/categories"}>Kategorie</Link>
        <Link href={"/bills/sets"}>Zestawy</Link>
        <Link href={"/bills/months"}>Miesiące</Link>
        <Link href={"/bills/years"}>Lata</Link>
      </main>
    </>
  );
}

{
  /*  */
}
