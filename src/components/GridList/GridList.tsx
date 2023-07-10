import { usePagination } from "~/hooks/usePagination";
import { RiAddFill } from "react-icons/ri";
import { FaArrowLeftLong, FaArrowRightLong } from "react-icons/fa6";
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
  const itemsPerView = rows * cols;
  const { currentPage, currentItems, showPage } = usePagination<T>(
    itemsPerView,
    data
  );

  return (
    <div className={styles.container}>
      <div className={styles.topWrap}>
        <h2 className={styles.title}>{props.title}</h2>
        <button className={styles.addBtn}>
          <RiAddFill />
        </button>
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
          disabled={data.length > itemsPerView ? false : true}
        >
          <FaArrowLeftLong className={styles.slideOutLeft} />
          <FaArrowLeftLong className={styles.slideInLeft} />
        </button>
        <button
          className={styles.btn}
          onClick={() => showPage(currentPage + 1)}
          disabled={data.length > itemsPerView ? false : true}
        >
          <FaArrowRightLong className={styles.slideInRight} />
          <FaArrowRightLong className={styles.slideOutRight} />
        </button>
      </div>
    </div>
  );
};
