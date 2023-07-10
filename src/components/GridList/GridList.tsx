import { usePagination } from "~/hooks/usePagination";
import { RiAddFill } from "react-icons/ri";
import { FaArrowLeftLong, FaArrowRightLong } from "react-icons/fa6";
import styles from "./grid.module.css";
import Link from "next/link";

type GridListProps<T> = {
  data: T[];
  title?: string;
  rows: number;
  cols: number;
};

type ItemProps<T> = {
  id: string;
  name: string;
  value: number;
};

const Item = <T,>(props: ItemProps<T>) => {
  return (
    <li className={styles.item}>
      <Link href={`/bills/categories/${props.name}`} className={styles.link}>
        <span>{props.name}</span>
        <span>{props.value}</span>
      </Link>
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
        {currentItems.map((el, idx) => {
          return <Item<T> {...el} key={idx} />;
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
