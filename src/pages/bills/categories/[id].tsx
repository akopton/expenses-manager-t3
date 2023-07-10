import { useRouter } from "next/router";

export default function CategoryPage() {
  const { query } = useRouter();
  const categoryId = query.id as string;
  return <div>{categoryId}</div>;
}
