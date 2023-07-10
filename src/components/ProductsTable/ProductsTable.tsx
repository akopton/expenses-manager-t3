import { type Product } from "@prisma/client";
import styles from "./table.module.css";
import { useMemo, useState } from "react";

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
      </label>
      <label htmlFor={`${id}-count`} className={styles.column}>
        <input
          id={`${id}-count`}
          type="number"
          value={count}
          onChange={handleChange}
          className={styles.input}
        />
      </label>
    </li>
  );
};

type SortingProps = "name_down" | "name_up" | "value_down" | "value_up";

export const ProductsTable = (props: ProductsTableProps<Product>) => {
  const { updateProduct, data } = props;
  const [sortBy, setSortBy] = useState<SortingProps>();

  const handleSort = (type: "name" | "value") => {
    switch (type) {
      case "name": {
        if (sortBy === "name_down") setSortBy("name_up");
        else setSortBy("name_down");
        break;
      }
      case "value": {
        if (sortBy === "value_down") setSortBy("value_up");
        else setSortBy("value_down");
        break;
      }
      default:
        return;
    }
  };

  const sortedData = useMemo(() => {
    switch (sortBy) {
      case "name_down":
        return data.sort((a, b) => a.name.localeCompare(b.name));
      case "name_up":
        return data.sort((a, b) => b.name.localeCompare(a.name));
      case "value_down":
        return data.sort((a, b) => a.value - b.value);
      case "value_up":
        return data.sort((a, b) => b.value - a.value);
      default:
        return data;
    }
  }, [data, sortBy]);

  return (
    <div className={styles.tableWrapper}>
      <div className={`${styles.row} ${styles.tableHeader}`}>
        <button
          type="button"
          className={styles.column}
          onClick={() => handleSort("name")}
        >
          Nazwa
        </button>
        <button
          type="button"
          className={styles.column}
          onClick={() => handleSort("value")}
        >
          Wartość (zł)
        </button>
        <span className={styles.column}>Ilość (szt)</span>
      </div>
      <ul className={styles.table}>
        {sortedData.map((el) => {
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
