import { type Prisma } from "@prisma/client";
import Head from "next/head";
import { GridList } from "~/components/GridList/GridList";
import { api } from "~/utils/api";

export type CategoryWithBills = Prisma.CategoryGetPayload<{
  include: {
    bills: true;
  };
}>;

export default function CategoriesPage() {
  const categories = api.categories.getCategoriesWithBills.useQuery();

  return (
    <>
      <Head>
        <title>Kategorie</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex h-screen items-center px-5 py-4">
        {categories?.data && (
          <GridList<CategoryWithBills>
            title={"Kategorie"}
            data={categories.data}
            itemType={"category"}
            rows={2}
            cols={4}
          />
        )}
      </main>
    </>
  );
}
