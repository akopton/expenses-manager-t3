import Head from "next/head";
import { useRouter } from "next/router";
import { CustomLink } from "~/components/CustomLink/CustomLink";
import { ShoppingList } from "~/components/ShoppingList/ShoppingList";

export default function ShoppingPage() {
  const { query } = useRouter();
  const lists = [
    { id: "some-id-1", name: "link 1", content: "some content" },
    { id: "some-id-2", name: "link 2", content: "some content2" },
    { id: "some-id-3", name: "link 3", content: "some content3" },
    { id: "some-id-4", name: "link 4", content: "some content4" },
  ];

  return (
    <>
      <Head>
        <title>Listy zakupów</title>
      </Head>
      <main className="flex h-screen flex-col items-center">
        <ul className="flex w-full flex-col items-center gap-10">
          {lists.map((el) => {
            return (
              <ShoppingList
                name={el.name}
                listId={el.id}
                isClosed={query.id && query.id[0] === el.id ? false : true}
                key={el.id}
                content={el.content}
              />
            );
          })}
        </ul>
        <CustomLink href={"/shopping-lists/add-new"} text="Nowa lista" />
      </main>
    </>
  );
}
