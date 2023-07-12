import Link from "next/link";
import type { BillWithProducts } from "~/types/types";
import { usePagination } from "~/hooks/usePagination";
import { HiArrowNarrowUp, HiArrowNarrowDown } from "react-icons/hi";
import { useState } from "react";
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
      <Link href={`/bills/${id}`} className={styles.listItem}>
        <span className={styles.itemName}>{name}</span>
        <span className={styles.itemDate}>
          {isPaid
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
  const { data, title, itemsPerPage } = props;
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
      {title && <span className={styles.title}>{title}</span>}
      <ul
        className={styles.list}
        onWheel={handleScroll}
        style={{
          gridTemplateRows: `repeat(${itemsPerPage ? itemsPerPage : 6},1fr)`,
        }}
      >
        {currentItems.map((el: T) => {
          return <ListItem<T> {...el} key={el.id} />;
        })}
      </ul>
      <div className={styles.bottomWrap}>
        {totalPages > 1 && (
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
        )}
        <div className={styles.pageCount}>
          {currentPage}/{totalPages}
        </div>
      </div>
    </div>
  );
};
