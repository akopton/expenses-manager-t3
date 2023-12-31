import { type Prisma } from "@prisma/client";
import Head from "next/head";
import { GridList } from "~/components/GridList/GridList";
import { api } from "~/utils/api";

export type CategoryWithBills = Prisma.CategoryGetPayload<{
  include: {
    _count: true;
  };
}>;

export default function CategoriesPage() {
  const categories = api.categories.getCategoriesWithBillsCount.useQuery();

  return (
    <>
      <Head>
        <title>Kategorie</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex h-screen flex-col items-center px-5 py-4">
        <h1 className="text-5xl">Kategorie</h1>
        {categories?.data && (
          <GridList<CategoryWithBills>
            data={categories.data}
            itemType={"category"}
            route="/bills/categories"
            rows={2}
            cols={4}
          />
        )}
      </main>
    </>
  );
}
