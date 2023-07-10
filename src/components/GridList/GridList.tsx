import { usePagination } from "~/hooks/usePagination";
import styles from "./grid.module.css";

type GridListProps<T> = {
  data: T[];
  title?: string;
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
  const { data, rows, cols } = props;
  const itemsPerPage = rows * cols;
  const { currentPage, currentItems, showPage } = usePagination<T>(
    itemsPerPage,
    data
  );

  return (
    <div className={styles.container}>
      <div className={styles.topWrap}>
        <h2>{props.title}</h2>
        <button>+</button>
      </div>
      <ul
        className={styles.grid}
        style={{
          gridTemplateColumns: `repeat(${cols}, 1fr)`,
          gridTemplateRows: `repeat(${rows}, 1fr)`,
        }}
      >
        {currentItems.map((el) => {
          return <Item<T> {...el} />;
        })}
      </ul>
      <div className={styles.navBtns}>
        <button
          className={styles.btn}
          onClick={() => showPage(currentPage - 1)}
        >
          {"<"}
        </button>
        <button
          className={styles.btn}
          onClick={() => showPage(currentPage + 1)}
        >
          {">"}
        </button>
      </div>
    </div>
  );
};
