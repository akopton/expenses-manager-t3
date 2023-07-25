import React, { useContext, useEffect, useMemo, useState } from "react";
import { BsTrash } from "react-icons/bs";
import styles from "./form.module.css";
import { api } from "~/utils/api";
import { redirect } from "next/navigation";
import { User } from "@prisma/client";
import { UsersList } from "../UsersList/UsersList";
import {
  SelectedUsersContext,
  SelectedUsersProvider,
} from "~/context/SelectedUsersContext";
import { router } from "@trpc/server";
import { useRouter } from "next/router";

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
  const { id, addProduct, updateProductsList, deleteProduct, newId } = props;

  useEffect(() => {
    setName(props.name);
  }, [props.name]);

  const handleProductKeyDown = (e: React.KeyboardEvent) => {
    if (name !== "" && e.code === "Enter") {
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
      {name !== "" && (
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
  const addShoppingList = api.shoppingLists.addNew.useMutation();
  const router = useRouter();
  const [name, setName] = useState<string>("");
  const [products, setProducts] = useState<TProduct[]>([]);
  const [showUsersList, setShowUsersList] = useState(false);
  const { selectedUsers, resetSelectedUsers } =
    useContext(SelectedUsersContext);
  const newId = Math.max(...products.map((el) => el.id)) + 1;

  const clearAll = () => {
    setName("");
    setProducts([]);
    resetSelectedUsers();
  };

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name) return;
    if (products.length < 1) return;
    const added = await addShoppingList.mutateAsync({
      name,
      products,
      users: selectedUsers,
    });
    router.push(`/shopping-lists/${added.id}`);
    clearAll();
  };

  const closeUsersList = () => {
    setShowUsersList(false);
  };

  const openUsersList = () => {
    setShowUsersList(true);
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div
        className={styles.wrapper}
        onClick={() => {
          if (showUsersList) {
            closeUsersList();
          }
        }}
      >
        <input
          type="text"
          placeholder="Nadaj mi nazwę..."
          className={styles.inputFormName}
          value={name}
          onChange={handleChange}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
          autoFocus
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
        <div className={styles.buttonsWrapper}>
          <div>
            <button
              type="button"
              className={styles.submitBtn}
              onClick={openUsersList}
            >
              Dodaj użytkownika
            </button>
            {selectedUsers.length > 0 && <span>{selectedUsers.length}</span>}
          </div>
          <button
            type="submit"
            className={styles.submitBtn}
            onClick={handleSubmit}
          >
            Zapisz
          </button>
        </div>
      </div>
      <UsersList closeList={closeUsersList} show={showUsersList} />
    </form>
  );
};
