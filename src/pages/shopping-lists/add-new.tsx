import Head from "next/head";
import { ShoppingListForm } from "~/components/ShoppingListForm/ShoppingListForm";

export default function AddNewShoppingListPage() {
  return (
    <>
      <Head>
        <title>Dodaj listę zakupów</title>
      </Head>
      <main>
        <ShoppingListForm />
      </main>
    </>
  );
}
