import React, { useEffect, useMemo, useState } from "react";
import { BsTrash } from "react-icons/bs";
import styles from "./form.module.css";

/* TYPES */

type TProduct = {
  id: number;
  name: string;
  count: number;
};

type ProductProps = TProduct & {
  newId: number;
  updateProductsList: (product: TProduct) => void;
  addProduct: (type: "initial" | "next", product?: TProduct) => void;
  deleteProduct: (product?: TProduct) => void;
};

/* LIST ITEM COMPONENT */

const Product = (props: ProductProps) => {
  const [name, setName] = useState("");
  const [count, setCount] = useState(1);
  const [hideTooltip, setHideTooltip] = useState(false);
  const { id, addProduct, updateProductsList, deleteProduct, newId } = props;

  useEffect(() => {
    setName(props.name);
  }, [props.name]);

  const handleProductKeyDown = (e: React.KeyboardEvent) => {
    if (name !== "" && e.code === "Enter") {
      setHideTooltip(true);
      e.preventDefault();
      addProduct("next", { id: newId, name: "", count: 1 });
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

  const handleClick = () => {
    deleteProduct({ id, name, count });
  };

  return (
    <li className={styles.product}>
      <input
        type="text"
        className={`${styles.inputProductName as string} ${styles.input}`}
        value={props.name ? props.name : name}
        onChange={handleProductName}
        onKeyDown={handleProductKeyDown}
        onBlur={handleBlur}
        autoFocus
      />
      <input
        type="number"
        className={`${styles.inputProductCount as string} ${styles.input}`}
        value={count ? count : ""}
        onChange={handleProductCount}
        onKeyDown={handleProductKeyDown}
      />
      {name !== "" && (
        <button
          type="button"
          className={styles.deleteProductBtn}
          onClick={handleClick}
        >
          <BsTrash />
        </button>
      )}
      {!hideTooltip && (
        <div className={styles.nameTooltip}>
          <div className={styles.tooltipArrow} />
          <span>{name}</span>
        </div>
      )}
    </li>
  );
};

/* FORM COMPONENT */

export const ShoppingListForm = () => {
  const [name, setName] = useState<string>("");
  const [products, setProducts] = useState<TProduct[]>([]);

  const newId = Math.max(...products.map((el) => el.id)) + 1;

  const handleClick = () => {
    if (products.length > 0) {
      addProduct("next", {
        id: newId,
        name: "",
        count: 1,
      });
    } else {
      addProduct("initial");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.currentTarget.value);
  };

  const handleBlur = () => {
    if (name !== "" && products.length < 1) addProduct("initial");
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (name !== "" && products.length < 1 && e.code === "Enter") {
      e.preventDefault();
      addProduct("initial");
    }
  };

  const addProduct = (type: "initial" | "next", product?: TProduct) => {
    if (type === "initial") {
      setProducts((prev) => [
        ...prev,
        { id: products.length, name: "", count: 1 },
      ]);
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

  const deleteProduct = (product?: TProduct) => {
    if (!product) setProducts((prev) => prev.filter((el) => el.name !== ""));
    else setProducts((prev) => prev.filter((el) => el.id !== product.id));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("nazwa: ", name);
    console.table(products);
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Nadaj mi nazwę..."
        className={styles.inputFormName}
        value={name}
        onChange={handleChange}
        onBlur={handleBlur}
        onKeyDown={handleKeyDown}
      />
      <ul className={styles.productsList}>
        {products.map((el, idx) => {
          return (
            <Product
              {...el}
              newId={newId}
              key={idx}
              updateProductsList={updateProductsList}
              addProduct={addProduct}
              deleteProduct={deleteProduct}
            />
          );
        })}
        {name !== "" && (
          <li className={styles.submitBtn}>
            <button type="button" onClick={handleClick}>
              Dodaj produkt
            </button>
          </li>
        )}
      </ul>
      <button type="submit" className={styles.submitBtn} onClick={handleSubmit}>
        Stwórz listę
      </button>
    </form>
  );
};
