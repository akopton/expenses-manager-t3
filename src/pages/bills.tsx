import Head from "next/head";
import { api } from "~/utils/api";

export default function Dashboard() {
  const bills = api.bills.getBills.useQuery();
  const billsWithProducts = api.bills.getBillsWithProducts.useQuery();
  return (
    <>
      <Head>
        <title>Dashboard</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-center">
        <div>bills</div>
        <ul>
          {billsWithProducts &&
            billsWithProducts.data?.map((bill) => {
              return (
                <li key={bill.id}>
                  <span>{bill.name}</span>
                  <ul>
                    {bill.items.map((item) => {
                      return <li>{item.name}</li>;
                    })}
                  </ul>
                </li>
              );
            })}
        </ul>
      </main>
    </>
  );
}
