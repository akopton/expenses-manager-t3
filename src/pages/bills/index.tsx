import Head from "next/head";
import Link from "next/link";
import { api } from "~/utils/api";

export default function BillsPage() {
  const links = [
    { id: 1, name: "Kategorie", href: "/bills/categories" },
    { id: 2, name: "Zestawy", href: "/bills/sets" },
  ];

  const categoriesCount = api.categories.getCategoriesCount.useQuery();
  const setsCount = api.billSets.getSetsCount.useQuery();
  return (
    <>
      <Head>
        <title>Dashboard</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex h-screen flex-col items-center justify-center gap-10 overflow-hidden px-10 py-20 lg:flex-row">
        {links.map((link) => {
          return (
            <Link
              href={link.href}
              key={link.id}
              className="flex h-full w-full flex-col items-center justify-center gap-10 rounded-4xl border-2 text-center text-2xl shadow-primaryColor transition-all hover:scale-95 md:text-4xl lg:gap-20 xl:text-5xl"
            >
              <span>{link.name}</span>
              <div className="flex flex-col items-center gap-5">
                <span>Ilość pozycji:</span>
                <span>
                  {link.name === "Kategorie"
                    ? categoriesCount.data
                    : setsCount.data}
                </span>
              </div>
            </Link>
          );
        })}
      </main>
    </>
  );
}
