import React, { useState } from "react";
import styles from "./form.module.css";

/* TYPES */

type TProduct = {
  id: number;
  name: string;
  count: number;
};

type ProductProps = TProduct & {
  updateProductsList: (product: TProduct) => void;
  addProduct: (type: "initial" | "next", product?: TProduct) => void;
  deleteProduct: () => void;
};

/* LIST ITEM COMPONENT */

const Product = (props: ProductProps) => {
  const [name, setName] = useState(props.name);
  const [count, setCount] = useState(props.count);
  const { id, addProduct, updateProductsList, deleteProduct } = props;

  const handleProductKeyDown = (e: React.KeyboardEvent) => {
    if (name !== "" && e.code === "Enter") {
      addProduct("next", { id: id + 1, name: "", count: 1 });
    }

    updateProductsList({ id, name, count });
  };

  const handleProductName = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newName = e.currentTarget.value;
    setName(newName);
    updateProductsList({ id, name: newName, count });
  };

  const handleProductCount = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newCount = parseInt(e.currentTarget.value);
    setCount(newCount);
    updateProductsList({ id, name, count: newCount });
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    if (e.currentTarget.value === "") deleteProduct();
  };

  return (
    <li className={styles.product}>
      <input
        type="text"
        id="name"
        className={styles.input}
        value={name}
        onChange={handleProductName}
        onKeyDown={handleProductKeyDown}
        onBlur={handleBlur}
        autoFocus
      />
      <input
        type="number"
        id="count"
        className={styles.input}
        value={count ? count : ""}
        onChange={handleProductCount}
        onKeyDown={handleProductKeyDown}
      />
    </li>
  );
};

/* FORM COMPONENT */

export const ShoppingListForm = () => {
  const [name, setName] = useState<string>("");
  const [products, setProducts] = useState<TProduct[]>([]);

  const handleName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.currentTarget.value);
  };

  const handleNameBlur = () => {
    if (name !== "" && products.length < 1) addProduct("initial");
  };

  const handleNameKeyDown = (e: React.KeyboardEvent) => {
    if (name !== "" && products.length < 1 && e.code === "Enter")
      addProduct("initial");
  };

  const addProduct = (type: "initial" | "next", product?: TProduct) => {
    if (type === "initial") {
      setProducts((prev) => [...prev, { id: 0, name: "", count: 1 }]);
    }

    if (type === "next" && product) {
      setProducts((prev) => [...prev, product]);
    }
  };

  const updateProductsList = (product: TProduct) => {
    setProducts((prev) => {
      return prev.map((el) => {
        if (el.id === product.id) {
          return product;
        }
        return el;
      });
    });
  };

  const deleteProduct = () => {
    setProducts((prev) => prev.filter((el) => el.name !== ""));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(products);
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <label htmlFor="list-name" className={styles.listName}>
        Nazwa
        <input
          type="text"
          id="list-name"
          className={styles.input}
          value={name}
          onChange={handleName}
          onBlur={handleNameBlur}
          onKeyDown={handleNameKeyDown}
        />
      </label>
      <ul className={styles.productsList}>
        {products.map((el, idx) => {
          return (
            <Product
              {...el}
              key={idx}
              updateProductsList={updateProductsList}
              addProduct={addProduct}
              deleteProduct={deleteProduct}
            />
          );
        })}
        <li>
          <button
            onClick={() =>
              addProduct("next", {
                id: products.length,
                name: "",
                count: 1,
              })
            }
          >
            Dodaj produkt
          </button>
        </li>
      </ul>

      <input type="submit" value="dodaj" />
    </form>
  );
};
