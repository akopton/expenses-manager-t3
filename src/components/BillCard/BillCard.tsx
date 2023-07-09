import type { BillWithProducts } from "~/types/types";
import { type Product } from "@prisma/client";
import styles from "./billCard.module.css";

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
  return (
    <li key={bill.id} className={styles.billCard}>
      <span className={styles.billName}>{bill.name}</span>
      <ul className={styles.productList}>
        {bill.items.map((item) => {
          return <ProductItem {...item} key={item.id} />;
        })}
      </ul>
      <span>{bill.value.toFixed(2)} zł</span>
    </li>
  );
};
