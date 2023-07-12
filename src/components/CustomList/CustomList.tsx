import type { BillWithProducts } from "~/types/types";
import styles from "./list.module.css";
import type { Bill, Product } from "@prisma/client";

type customType = BillWithProducts | Product | Bill;

type CustomListProps<T> = {
  data: T[];
};

const ListItem = <T extends customType>(props: T) => {
  const { name } = props;
  return (
    <li className={styles.listItem}>
      <span>{name}</span>
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
