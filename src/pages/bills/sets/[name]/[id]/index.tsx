import Head from "next/head";
import { useRouter } from "next/router";
import { api } from "~/utils/api";

export default function BillPage() {
  const router = useRouter();
  const billId = router.query.id as string;

  //   console.log(billId);
  const bill = api.bills.getBillWithId.useQuery({ id: billId });

  return (
    <>
      <Head>
        <title>{bill.data?.name}</title>
      </Head>
      <main>
        <div>{bill.data && <span>{bill.data.name}</span>}</div>
      </main>
    </>
  );
}
