import Link from "next/link";
import type { BillWithProducts } from "~/types/types";
import { usePagination } from "~/hooks/usePagination";
import { HiArrowNarrowUp, HiArrowNarrowDown } from "react-icons/hi";
import styles from "./list.module.css";

type customType = BillWithProducts;

type ListItemProps<T> = {
  data: T;
  listType?: "to-pay" | "last-added";
};

type CustomListProps<T> = {
  data: T[];
  listType?: "to-pay" | "last-added";
  itemsPerPage?: number;
};

const ListItem = <T extends customType>(props: ListItemProps<T>) => {
  const {
    data: { id, name, added_at, paymentDate },
    listType,
  } = props;

  return (
    <li>
      <Link href={`/bills/${id}`} className={styles.listItem}>
        <span className={styles.itemName}>{name}</span>
        <span className={styles.itemDate}>
          {listType === "last-added"
            ? added_at.toLocaleDateString()
            : paymentDate.toLocaleDateString()}
        </span>
        <div className={styles.nameTooltip}>
          <span>{name}</span>
          <div className={styles.tooltipArrow} />
        </div>
      </Link>
    </li>
  );
};

export const CustomList = <T extends customType>(props: CustomListProps<T>) => {
  const { data, itemsPerPage, listType } = props;
  const { currentItems, currentPage, showPage, totalPages } = usePagination<T>(
    itemsPerPage ? itemsPerPage : 6,
    data
  );

  const handleScroll = (e: React.WheelEvent<HTMLUListElement>) => {
    if (e.deltaY === -100) showPage(currentPage - 1);
    if (e.deltaY === 100) showPage(currentPage + 1);
  };

  return (
    <div className={styles.container}>
      <ul
        className={styles.list}
        onWheel={handleScroll}
        style={{
          gridTemplateRows: `repeat(${itemsPerPage ? itemsPerPage : 6},1fr)`,
        }}
      >
        {currentItems.map((el: T) => {
          return <ListItem<T> data={el} listType={listType} key={el.id} />;
        })}
      </ul>
      {totalPages > 1 && (
        <div className={styles.bottomWrap}>
          <div className={styles.scrollBtns}>
            <button
              className={styles.btn}
              onClick={() => showPage(currentPage - 1)}
            >
              <HiArrowNarrowUp />
            </button>
            <button
              className={styles.btn}
              onClick={() => showPage(currentPage + 1)}
            >
              <HiArrowNarrowDown />
            </button>
          </div>
          <div className={styles.pageCount}>
            {currentPage}/{totalPages}
          </div>
        </div>
      )}
    </div>
  );
};
