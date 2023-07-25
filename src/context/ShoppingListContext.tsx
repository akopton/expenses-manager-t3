import { User } from "@prisma/client";
import { useEffect, useState } from "react";
import { createContext } from "react";

export type TProduct = {
  id: string;
  name: string;
  count: number;
};

type ContextProps = {
  selectedUsers: User[];
  products: TProduct[];
  addUser: (user: User) => void;
  removeUser: (user: User) => void;
  updateProductsList: (product: TProduct) => void;
  addProduct: (type: "initial" | "next", product?: TProduct) => void;
  deleteProduct: (product?: TProduct) => void;
  reset: () => void;
  newId: string;
};

const initialContext: ContextProps = {
  selectedUsers: [],
  products: [],
  addUser: (user: User) => {},
  removeUser: (user: User) => {},
  updateProductsList: (product: TProduct) => {},
  addProduct: (type: "initial" | "next", product?: TProduct) => {},
  deleteProduct: (product?: TProduct) => {},
  reset: () => {},
  newId: "",
};

export const ShoppingListContext = createContext(initialContext);

export const ShoppingListProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [selectedUsers, setSelectedUsers] = useState<User[]>([]);
  const [products, setProducts] = useState<TProduct[]>([]);
  const newId = self.crypto.randomUUID();

  const addUser = (user: User) => {
    setSelectedUsers((prev) => {
      if (prev.map((el) => el.id).includes(user.id)) {
        return prev;
      }
      return [...prev, user];
    });
  };

  const removeUser = (user: User) => {
    setSelectedUsers((prev) => prev.filter((el) => el.id !== user.id));
  };

  const addProduct = (type: "initial" | "next", product?: TProduct) => {
    if (type === "initial") {
      setProducts((prev) => [...prev, { id: newId, name: "", count: 1 }]);
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

  const reset = () => {
    setProducts([]);
    setSelectedUsers([]);
  };

  return (
    <ShoppingListContext.Provider
      value={{
        selectedUsers,
        addUser,
        removeUser,
        products,
        addProduct,
        deleteProduct,
        updateProductsList,
        reset,
        newId,
      }}
    >
      {children}
    </ShoppingListContext.Provider>
  );
};
