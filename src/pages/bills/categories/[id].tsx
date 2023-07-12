import { useRouter } from "next/router";
import { api } from "~/utils/api";

export default function CategoryPage() {
  const { query } = useRouter();
  const categoryName = query.id as string;

  const bills = api.bills.getBillsByCategory.useQuery({ name: categoryName });

  return (
    <ul>
      {bills &&
        bills.data?.map((el) => {
          return <li>{el.name}</li>;
        })}
    </ul>
  );
}
