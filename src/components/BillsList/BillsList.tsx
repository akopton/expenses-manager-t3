import type { Prisma } from "@prisma/client";
import styles from "./list.module.css";
import Link from "next/link";
import { useRouter } from "next/router";

type BillWithProductsAndUser = Prisma.BillGetPayload<{
  include: { owner: true; items: true };
}>;

type ListProps<T> = {
  data: T[];
};

const BillItem = (props: BillWithProductsAndUser) => {
  const router = useRouter();
  const { id, name, items, owner } = props;
  return (
    <li>
      <Link
        className={styles.item}
        href={{ pathname: `${router.asPath}/${id}`, query: { id: id } }}
        as={`${router.asPath}/${id}`}
      >
        <span>{name}</span>
        <span>{owner.name}</span>
      </Link>
    </li>
  );
};

export const BillsList = (props: ListProps<BillWithProductsAndUser>) => {
  const { data } = props;
  return (
    <ul className={styles.list}>
      {data.map((item) => {
        return <BillItem {...item} key={item.id} />;
      })}
    </ul>
  );
};
