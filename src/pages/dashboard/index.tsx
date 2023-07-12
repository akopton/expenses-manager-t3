import Head from "next/head";
import Link from "next/link";
import { CustomList } from "~/components/CustomList/CustomList";
import { BillWithProducts } from "~/types/types";
import { api } from "~/utils/api";

export default function Dashboard() {
  const billsByDate = api.bills.getBillsByAddedDate.useQuery(1);
  const billsToPay = api.bills.getNotPaidBills.useQuery(10);

  return (
    <>
      <Head>
        <title>Tablica</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="relative grid h-screen grid-cols-4 border-2">
        <Link href="/dashboard/add-bill" className="absolute right-0 top-0">
          Nowy rachunek
        </Link>
        <div className="span col-span-3 flex items-center justify-center">
          Tablica
        </div>
        <div className="flex flex-col items-center justify-center gap-4 border-l-2 p-5">
          {billsToPay.data && (
            <CustomList<BillWithProducts>
              data={billsToPay.data}
              title="Nadchodzące wydatki"
              itemsPerPage={4}
            />
          )}
          {billsByDate.data && (
            <CustomList<BillWithProducts>
              data={billsByDate.data}
              title="Ostatnio dodane"
              itemsPerPage={4}
            />
          )}
        </div>
      </main>
    </>
  );
}
