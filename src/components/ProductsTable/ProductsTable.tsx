import { type Product } from "@prisma/client";
import styles from "./table.module.css";

type ProductsTableProps<T> = {
  data: T[];
  updateProduct: (product: T) => void;
};

type SelectedProductProps<T> = {
  product: T;
  updateProduct: (product: T) => void;
};

const SelectedProduct = (props: SelectedProductProps<Product>) => {
  const {
    product: { id, value, count, name },
    updateProduct,
  } = props;

  const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    if (e.currentTarget.id.includes("count")) {
      const newCount = parseInt(e.currentTarget.value);
      if (newCount < 1) return;
      updateProduct({
        id,
        name,
        value,
        count: newCount,
      });
    } else {
      let newValue = parseFloat(e.currentTarget.value);
      if (newValue < 0) return;
      if (e.currentTarget.value === "") newValue = 0;
      updateProduct({ id, name, value: newValue, count });
    }
  };

  return (
    <li className={styles.row}>
      <span className={styles.column}>{name}</span>
      <label htmlFor={`${id}-value`} className={styles.column}>
        <input
          id={`${id}-value`}
          type="number"
          value={value ? value : ""}
          onChange={handleChange}
          placeholder="0"
          className={styles.input}
        />
        <span className={styles.inputLabel}>zł</span>
      </label>
      <label htmlFor={`${id}-count`} className={styles.column}>
        <input
          id={`${id}-count`}
          type="number"
          value={count}
          onChange={handleChange}
          className={styles.input}
        />
        <span className={styles.inputLabel}>szt</span>
      </label>
    </li>
  );
};

export const ProductsTable = (props: ProductsTableProps<Product>) => {
  const { updateProduct, data } = props;
  return (
    <div className={styles.tableWrapper}>
      <div className={`${styles.row} ${styles.tableHeader}`}>
        <span className={styles.column}>Nazwa</span>
        <span className={styles.column}>Wartość</span>
        <span className={styles.column}>Ilość</span>
      </div>
      <ul className={styles.table}>
        {data.map((el) => {
          return (
            <SelectedProduct
              product={el}
              updateProduct={updateProduct}
              key={el.id}
            />
          );
        })}
      </ul>
    </div>
  );
};
