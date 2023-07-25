import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { CustomLink } from "~/components/CustomLink/CustomLink";
import { ShoppingList } from "~/components/ShoppingList/ShoppingList";
import { ShoppingListForm } from "~/components/ShoppingListForm/ShoppingListForm";
import { api } from "~/utils/api";

export default function ShoppingPage() {
  const shoppingLists = api.shoppingLists.getNamesAndIds.useQuery();
  const router = useRouter();

  if (router.asPath.includes("/add-new")) {
    return (
      <>
        <Head>
          <title>Listy zakupów</title>
        </Head>
        <main className="flex h-screen flex-col items-center py-20">
          <ShoppingListForm />
          <CustomLink href={"/shopping-lists/add-new"} text="Nowa lista" />
        </main>
      </>
    );
  }

  if (router.query.slug) {
    return (
      <>
        <Head>
          <title>Listy zakupów</title>
        </Head>
        <main className="flex h-screen flex-col items-center py-20">
          <ShoppingList id={router.query.slug[0]!} />
          <CustomLink href={"/shopping-lists/add-new"} text="Nowa lista" />
        </main>
      </>
    );
  }

  return (
    <>
      <Head>
        <title>Listy zakupów</title>
      </Head>
      <main className="flex h-screen flex-col items-center py-20">
        <ul className="flex w-full flex-col items-center gap-10">
          {shoppingLists.data &&
            shoppingLists.data.map((el) => {
              return (
                <li key={el.id}>
                  <Link href={`/shopping-lists/${el.id}`}>{el.name}</Link>
                </li>
              );
            })}
        </ul>
        <CustomLink href={"/shopping-lists/add-new"} text="Nowa lista" />
      </main>
    </>
  );
}
