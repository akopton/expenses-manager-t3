import { usePagination } from "~/hooks/usePagination";
import styles from "./grid.module.css";

type GridListProps<T> = {
  data: T[];
  rows: number;
  cols: number;
};

type ItemProps<T> = {
  name: string;
  value: number;
};

const Item = <T,>(props: ItemProps<T>) => {
  return (
    <li className={styles.item}>
      <span>{props.name}</span>
      <span>{props.value.toFixed(2)}</span>
    </li>
  );
};

export const GridList = <T extends ItemProps<T>>(props: GridListProps<T>) => {
  const { currentPage, currentItems, showPage } = usePagination<T>(
    3,
    props.data
  );

  return (
    <ul className={styles.grid}>
      {currentItems.map((el) => {
        return <Item<T> {...el} />;
      })}
    </ul>
  );
};
