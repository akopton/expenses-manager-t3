import { usePagination } from "~/hooks/usePagination";
import { FaArrowLeftLong, FaArrowRightLong } from "react-icons/fa6";
import gridStyles from "./grid.module.css";
import itemStyles from "./item.module.css";
import Link from "next/link";
import { User } from ".prisma/client";
import { useRouter } from "next/router";

type GridListProps<T> = {
  data: T[];
  title?: string;
  itemType: string;
  rows: number;
  cols: number;
};

type ItemProps = {
  name: string;
  value: number;
  _count?: { bills: number };
  updated_at: Date | null;
  owners?: User[];
};

const Item = <T extends ItemProps>(props: T) => {
  const router = useRouter();
  return (
    <li className={itemStyles.item}>
      <Link href={`${router.asPath}/${props.name}`} className={itemStyles.link}>
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
        {/* <ul>
          {props.owners?.map((owner) => {
            return <li key={owner.id}>{owner.email}</li>;
          })}
        </ul> */}
      </Link>
    </li>
  );
};

export const GridList = <T extends ItemProps>(props: GridListProps<T>) => {
  const { data, rows, cols } = props;
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
