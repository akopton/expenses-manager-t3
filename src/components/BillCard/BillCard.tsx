import type { BillWithProducts } from "~/types/types";
import { type Product } from "@prisma/client";
import styles from "./billCard.module.css";
import { useContext } from "react";
import { ThemeContext } from "~/context/ThemeContext";
import Link from "next/link";

const ProductItem = (product: Product) => {
  return (
    <li key={product.id} className={styles.product}>
      <span className={styles.productName}>{product.name}</span>
      <span className={styles.productCount}>{product.count}</span>
      <span className={styles.productValue}>{product.value.toFixed(2)}</span>
    </li>
  );
};

export const BillCard = (bill: BillWithProducts) => {
  const { theme } = useContext(ThemeContext);

  return (
    <li key={bill.id} className={`${styles.billCard} ${styles[`${theme}`]}`}>
      <Link href={`/bills/${bill.id}`}>
        <span className={styles.billName}>{bill.name}</span>

        <div className={styles.bottomWrap}>
          <span className={styles.date}>
            {bill.isPaid ? "Zapłacony" : `Data płatności: ${bill.added_at}`}
          </span>
          <span className={styles.billValue}>{bill.value.toFixed(2)} zł</span>
        </div>
      </Link>
    </li>
  );
};
