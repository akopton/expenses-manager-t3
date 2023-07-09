import Head from "next/head";
import { useRouter } from "next/router";
import { api } from "~/utils/api";

export default function BillPage() {
  const {
    query: { id },
  } = useRouter();
  const billId = id as string;

  const bill = api.bills.getBillWithId.useQuery({ id: billId });

  return (
    <>
      <Head>
        <title>{bill.data?.name}</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <div>{bill.data?.name}</div>
      </main>
    </>
  );
}