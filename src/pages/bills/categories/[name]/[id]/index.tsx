import { useRouter } from "next/router";
import { api } from "~/utils/api";

export default function BillPage() {
  const { query } = useRouter();
  const billID = query.id as string;
  const bill = api.bills.getBillWithId.useQuery({ id: billID });

  return <div>{bill.data?.name}</div>;
}
