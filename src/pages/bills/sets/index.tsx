import { Bill, Prisma } from "@prisma/client";
import Head from "next/head";
import { AddSetForm } from "~/components/AddSetForm/AddSetForm";
import { GridList } from "~/components/GridList/GridList";
import { api } from "~/utils/api";
import { useState, useEffect } from "react";

type TSet = Prisma.BillSetGetPayload<{ include: { owners: true } }>;

export default function SetsPage() {
  const [billSets, setBillSets] = useState<TSet[]>();
  const initialBillSets = api.billSets.getAllSets.useQuery();
  const addNewSetGetAll = api.billSets.addNewSetReturnAll.useMutation();

  const submitForm = async (
    e: React.FormEvent,
    name: string,
    selectedBills: Bill[]
  ) => {
    e.preventDefault();
    if (!name) return;

    if (selectedBills.length > 0) {
      const newSets = await addNewSetGetAll.mutateAsync({
        name,
        bills: selectedBills,
      });
      setBillSets(newSets);
    } else {
      const newSets = await addNewSetGetAll.mutateAsync({
        name,
      });
      setBillSets(newSets);
    }
  };

  useEffect(() => {
    if (initialBillSets.data) setBillSets(initialBillSets.data);
  }, [initialBillSets]);

  return (
    <>
      <Head>
        <title>Kategorie</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="grid h-screen grid-cols-5 px-5 py-4">
        <div className="col-span-1 flex flex-col items-center">
          <AddSetForm onSubmit={submitForm} />
        </div>
        <div className="col-span-4 ">
          {billSets && (
            <GridList<TSet>
              title={"Zestawy"}
              data={billSets}
              itemType={"set"}
              rows={2}
              cols={3}
            />
          )}
        </div>
      </main>
    </>
  );
}
