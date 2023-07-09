import { useRouter } from "next/router";
import { api } from "~/utils/api";

export default function Page() {
  const {
    query: { id },
  } = useRouter();
  const billId = id as string;

  const bill = api.bills.getBillWithId.useQuery({ id: billId });

  return <div>{bill.data?.name}</div>;
}
