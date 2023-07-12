import type { BillWithProducts } from "~/types/types";
import styles from "./list.module.css";
import { type Bill } from "@prisma/client";

type customType = BillWithProducts;

type CustomListProps<T> = {
  data: T[];
};

const ListItem = <T extends customType>(props: T) => {
  const { name, added_at, isPaid, paymentDate } = props;
  return (
    <li className={styles.billItem} style={{ display: "flex", gap: "10px" }}>
      <span>{name}</span>
      <span>
        {isPaid
          ? added_at.toLocaleDateString()
          : paymentDate.toLocaleDateString()}
      </span>
    </li>
  );
};

export const CustomList = <T extends customType>(props: CustomListProps<T>) => {
  const { data } = props;
  return (
    <ul className={styles.list}>
      {data.map((el: T) => {
        return <ListItem<T> {...el} key={el.id} />;
      })}
    </ul>
  );
};
