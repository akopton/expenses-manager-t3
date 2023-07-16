import Link from "next/link";
import { usePagination } from "~/hooks/usePagination";
import { FaArrowLeftLong, FaArrowRightLong } from "react-icons/fa6";
import { User } from ".prisma/client";
import gridStyles from "./grid.module.css";
import itemStyles from "./item.module.css";

type GridListProps<T> = {
  data: T[];
  title?: string;
  itemType: string;
  rows: number;
  cols: number;
  route?: string;
};

type ItemProps = {
  id: string;
  name: string;
  value: number;
  _count?: { bills: number };
  updated_at: Date | null;
  owners?: User[];
  route?: string;
};

const Item = <T extends ItemProps>(props: T) => {
  const { route } = props;

  return (
    <li className={itemStyles.item}>
      <Link
        href={{
          pathname: `${route as string}/[name]`,
          query: { name: props.name, id: props.id },
        }}
        as={`${route as string}/${props.name as string}`}
        className={itemStyles.link}
      >
        <span className={itemStyles.itemName}>{props.name.toUpperCase()}</span>
        <span className={itemStyles.itemValue}>
          {props.value.toFixed(2).replace(".", ",")} zł
        </span>
        <span className={itemStyles.itemBillsCount}>
          Ilość rachunków: {props._count?.bills}
        </span>
        {props.updated_at && (
          <span className={itemStyles.lastUpdate}>
            Ostatnia aktualizacja: <br />
            {props.updated_at.toLocaleDateString()},
            {props.updated_at.toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </span>
        )}
      </Link>
    </li>
  );
};

export const GridList = <T extends ItemProps>(props: GridListProps<T>) => {
  const { data, rows, cols, route } = props;
  const itemsPerView = rows * cols;
  const { currentPage, currentItems, showPage } = usePagination<T>(
    itemsPerView,
    data
  );

  return (
    <div className={gridStyles.container}>
      <h2 className={gridStyles.title}>{props.title}</h2>
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
            return <Item<T> {...el} route={route} key={idx} />;
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
