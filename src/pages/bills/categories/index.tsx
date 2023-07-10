import Head from "next/head";
import { GridList } from "~/components/GridList/GridList";

type TCategory = {
  id: string;
  name: string;
  bills: never[];
  value: number;
};

export default function CategoriesPage() {
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
        <title>Kategorie</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex h-screen items-center px-5 py-4">
        <GridList<TCategory>
          title={"Kategorie"}
          data={categories}
          itemType={"category"}
          rows={2}
          cols={4}
        />
      </main>
    </>
  );
}