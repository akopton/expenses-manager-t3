import type { Prisma } from "@prisma/client";
import styles from "./list.module.css";

type BillWithProductsAndUser = Prisma.BillGetPayload<{
  include: { owner: true; items: true };
}>;

type ListProps<T> = {
  data: T[];
};

const BillItem = (props: BillWithProductsAndUser) => {
  const { name, items, owner } = props;
  return (
    <li className={styles.item}>
      <span>{name}</span>
      <span>{owner.name}</span>
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
