import Link from "next/link";
import { BillSet, Prisma } from "@prisma/client";
import { useTouch } from "~/hooks/useTouch";
import styles from "./carousel.module.css";
import { api } from "~/utils/api";
import { useMemo, useState } from "react";
import { usePagination } from "~/hooks/usePagination";
import { ArrowLeftBtn, ArrowRightBtn } from "../ArrowButtons/ArrowButtons";
import { CustomLink } from "../CustomLink/CustomLink";

type TSet = Prisma.BillSetGetPayload<{ include: { owners: true } }>;

type CustomType = TSet & {
  idx: number;
  transformValue: number;
};

type CarouselProps<T> = {
  data: T[];
  centerBtn?: React.ReactNode;
};

const Item = (props: CustomType) => {
  const { idx, transformValue } = props;
  const updatedBy = api.users.getById.useQuery(props.updatedById!);
  const windowWidth = window.innerWidth;

  return (
    <li
      className={styles.itemWrapper}
      style={{
        transform:
          windowWidth < 640
            ? `translate(${idx * 100 - 50 + transformValue}%, -50%)`
            : `translate(${idx * 100 - 100 + transformValue}%, -50%)`,
      }}
    >
      <div className={styles.item}>
        <Link href={`/bills/sets/${props.id}`} className={styles.link}>
          <span className={styles.itemName}>{props.name}</span>
          <div className={styles.itemPerson}>
            <span>Zaktualizowane przez:</span>
            <span className={styles.itemPerson}>{updatedBy?.data?.name}</span>
          </div>

          <div className={styles.itemDate}>
            {props.updated_at === null ? (
              <>
                <span>Data utworzenia:</span>
                <span>{props.added_at.toLocaleDateString()}</span>
              </>
            ) : (
              <>
                <span>Ostatnia aktualizacja:</span>
                <span>
                  {props.updated_at.toLocaleDateString()},{" "}
                  {props.updated_at.toLocaleTimeString()}
                </span>
              </>
            )}
          </div>
        </Link>
      </div>
    </li>
  );
};

export const Carousel = <T extends TSet>(props: CarouselProps<T>) => {
  const { handleTouchEnd, handleTouchMove, handleTouchStart } = useTouch();
  const [transformValue, setTransformValue] = useState<number>(0);
  const windowWidth = window.innerWidth;
  const itemsPerPage = windowWidth < 640 ? 1 : 2;
  const { totalPages } = usePagination(itemsPerPage, props.data);
  const swipeLeft = () => {
    setTransformValue((prev) => {
      const max = windowWidth < 640 ? totalPages - 1 : totalPages;
      const absValue = Math.abs(prev - 100) / 100;
      if (absValue > max) return 0;
      return prev - 100;
    });
  };

  const swipeRight = () => {
    setTransformValue((prev) => {
      const max = windowWidth < 640 ? totalPages - 1 : totalPages;
      const absValue = prev / 100;
      if (absValue >= 0) return -100 * max;
      return prev + 100;
    });
  };

  const swipe = () => {
    const result = handleTouchEnd();
    if (result === "left") {
      swipeLeft();
    }
    if (result === "right") {
      swipeRight();
    }
  };

  return (
    <div className={styles.container}>
      <ul
        className={styles.carousel}
        onTouchMove={handleTouchMove}
        onTouchEnd={swipe}
        onTouchStart={handleTouchStart}
      >
        <HelperItem />
        {props.data.map((el, idx) => (
          <Item {...el} idx={idx} transformValue={transformValue} key={el.id} />
        ))}
      </ul>
      <div className={styles.btns}>
        <ArrowLeftBtn onClick={() => swipeRight()} />
        {props.centerBtn && props.centerBtn}
        <ArrowRightBtn onClick={() => swipeLeft()} />
      </div>
    </div>
  );
};

const HelperItem = () => {
  return (
    <li
      className={`${styles.itemWrapper as string}`}
      style={{ visibility: "hidden", position: "inherit" }}
    >
      <div className={styles.item}>
        <div className={styles.link}>
          <span className={styles.itemName}>test</span>
          <div className={styles.itemPerson}>
            <span>test</span>
            <span>test</span>
          </div>
          <div className={styles.itemDate}>
            <span>test</span>
            <span>test</span>
          </div>
        </div>
      </div>
    </li>
  );
};
