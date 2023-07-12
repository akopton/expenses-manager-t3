import Link from "next/link";
import type { BillWithProducts } from "~/types/types";
import { usePagination } from "~/hooks/usePagination";
import { HiArrowNarrowUp, HiArrowNarrowDown } from "react-icons/hi";
import styles from "./list.module.css";

type customType = BillWithProducts;

type CustomListProps<T> = {
  data: T[];
  title?: string;
  itemsPerPage?: number;
};

const ListItem = <T extends customType>(props: T) => {
  const { id, name, added_at, isPaid, paymentDate } = props;
  return (
    <li>
      <Link href={`/bills/$${id}`} className={styles.listItem}>
        <span className={styles.itemName}>{name}</span>
        <span className={styles.itemDate}>
          {isPaid
            ? added_at.toLocaleDateString()
            : paymentDate.toLocaleDateString()}
        </span>
      </Link>
    </li>
  );
};

export const CustomList = <T extends customType>(props: CustomListProps<T>) => {
  const { data, title, itemsPerPage } = props;
  const { currentItems, currentPage, showPage } = usePagination<T>(
    itemsPerPage ? itemsPerPage : 10,
    data
  );

  const handleScroll = (e: React.WheelEvent<HTMLUListElement>) => {
    if (e.deltaY === -100) showPage(currentPage - 1);
    if (e.deltaY === 100) showPage(currentPage + 1);
  };

  return (
    <div className={styles.container}>
      {title && <span className={styles.title}>{title}</span>}
      <div className={styles.content}>
        <ul className={styles.list} onWheel={handleScroll}>
          {currentItems.map((el: T) => {
            return <ListItem<T> {...el} key={el.id} />;
          })}
        </ul>
        <div className={styles.scrollButtons}>
          <button
            className={styles.btn}
            onClick={() => showPage(currentPage - 1)}
          >
            <HiArrowNarrowUp />
          </button>
          <button
            className={styles.btn}
            onClick={() => showPage(currentPage - 1)}
          >
            <HiArrowNarrowDown />
          </button>
        </div>
      </div>
    </div>
  );
};
