import Head from "next/head";
import { ShoppingListForm } from "~/components/ShoppingListForm/ShoppingListForm";
import { SelectedUsersProvider } from "~/context/SelectedUsersContext";

export default function AddNewShoppingListPage() {
  return (
    <>
      <Head>
        <title>Dodaj listę zakupów</title>
      </Head>
      <main className="h-screen">
        <SelectedUsersProvider>
          <ShoppingListForm />
        </SelectedUsersProvider>
      </main>
    </>
  );
}
