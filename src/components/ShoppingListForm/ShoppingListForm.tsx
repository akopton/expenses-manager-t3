import React, { useContext, useEffect, useMemo, useState } from "react";
import { BsTrash } from "react-icons/bs";
import styles from "./form.module.css";
import { api } from "~/utils/api";
import { redirect } from "next/navigation";
import { User } from "@prisma/client";
import { UsersList } from "../UsersList/UsersList";
import { router } from "@trpc/server";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { ShoppingListContext, TProduct } from "~/context/ShoppingListContext";
import { randomUUID } from "crypto";

/* LIST ITEM COMPONENT */

const Product = (props: TProduct) => {
  const [name, setName] = useState("");
  const [count, setCount] = useState(1);
  const { id } = props;
  const { addProduct, deleteProduct, updateProductsList, newId } =
    useContext(ShoppingListContext);

  useEffect(() => {
    setName(props.name);
    setCount(props.count);
  }, [props.name, props.count]);

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
        className={`${styles.inputProductName as string} ${
          styles.input as string
        }`}
        value={props.name ? props.name : name}
        onChange={handleProductName}
        onKeyDown={handleProductKeyDown}
        onBlur={handleBlur}
        autoFocus
      />
      <input
        type="number"
        className={`${styles.inputProductCount as string} ${
          styles.input as string
        }`}
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

type FormProps = {
  type: "empty" | "filled";
};

export const ShoppingListForm = (props: FormProps) => {
  const router = useRouter();
  const session = useSession();

  const addShoppingList = api.shoppingLists.addNew.useMutation();
  const updateShoppingList = api.shoppingLists.updateWithId.useMutation();
  const { data: currentList, isLoading } =
    api.shoppingLists.getOneWithId.useQuery({
      id: router.query?.slug?.[0] as string,
    });

  const [name, setName] = useState<string>("");
  const [showUsersList, setShowUsersList] = useState(false);

  const { selectedUsers, addUser, products, addProduct, reset, newId } =
    useContext(ShoppingListContext);

  useEffect(() => {
    if (currentList) {
      clearAll();
      const { name, products, owners } = currentList;
      setName(name);
      products.forEach((product) => addProduct("next", product));
      owners.forEach((user) => {
        if (user.id !== session.data?.user.id) {
          addUser(user);
        }
      });
    }
  }, [currentList]);

  const clearAll = () => {
    setName("");
    reset();
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

  const createList = async () => {
    const added = await addShoppingList.mutateAsync({
      name,
      products,
      users: selectedUsers,
    });
    await router.replace(`/shopping-lists/${added.id}`);
  };

  const updateList = async () => {
    if (!currentList) return;
    await updateShoppingList.mutateAsync({
      id: currentList?.id,
      name,
      products,
      users: selectedUsers,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name) return;
    if (products.length < 1) return;
    if (currentList) {
      await updateList();
      return;
    }

    await createList();
  };

  const closeUsersList = () => {
    setShowUsersList(false);
  };

  const openUsersList = () => {
    setShowUsersList(true);
  };

  if (isLoading && props.type === "filled") {
    return <div>Loading...</div>;
  }

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
            return <Product {...el} key={idx} />;
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
