import { usePagination } from "~/hooks/usePagination";
import { FaArrowLeftLong, FaArrowRightLong } from "react-icons/fa6";
import gridStyles from "./grid.module.css";
import itemStyles from "./item.module.css";
import Link from "next/link";
import { convertToPln } from "~/utils/convertToPln";
import { AddModelBtn } from "../AddModelBtn/AddModelBtn";

type GridListProps<T> = {
  data: T[];
  title?: string;
  itemType: string;
  rows: number;
  cols: number;
};

type ItemProps<T> = {
  id: string;
  name: string;
  bills: T[];
  value: number;
};

const Item = <T,>(props: ItemProps<T>) => {
  return (
    <li className={itemStyles.item}>
      <Link
        href={`/bills/categories/${props.name}`}
        className={itemStyles.link}
      >
        <span className={itemStyles.itemName}>{props.name}</span>
        <span className={itemStyles.itemValue}>
          {convertToPln(props.value)}
        </span>
        <span className={itemStyles.itemBillsCount}>{props.bills.length}</span>
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
    <div className={gridStyles.container}>
      <div className={gridStyles.topWrap}>
        <h2 className={gridStyles.title}>{props.title}</h2>
        <AddModelBtn model={props.itemType} />
      </div>
      <div className={gridStyles.gridWrapper}>
        <button
          className={gridStyles.slideBtn}
          onClick={() => showPage(currentPage - 1)}
          disabled={data.length > itemsPerView ? false : true}
        >
          {data.length > itemsPerView && (
            <>
              <FaArrowLeftLong className={gridStyles.slideOutLeft} />
              <FaArrowLeftLong className={gridStyles.slideInLeft} />
            </>
          )}
        </button>
        <ul
          className={gridStyles.grid}
          style={{
            gridTemplateColumns: `repeat(${cols}, 1fr)`,
            gridTemplateRows: `repeat(${rows}, 1fr)`,
          }}
        >
          {currentItems.map((el, idx) => {
            return <Item<T> {...el} key={idx} />;
          })}
        </ul>
        <button
          className={gridStyles.slideBtn}
          onClick={() => showPage(currentPage + 1)}
          disabled={data.length > itemsPerView ? false : true}
        >
          {data.length > itemsPerView && (
            <>
              <FaArrowRightLong className={gridStyles.slideInRight} />
              <FaArrowRightLong className={gridStyles.slideOutRight} />
            </>
          )}
        </button>
      </div>
    </div>
  );
};
