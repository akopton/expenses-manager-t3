import { Product } from "@prisma/client";
import React, { createContext, useEffect, useState } from "react";
import { api } from "~/utils/api";

type ProductsContextProps<T> = {
  products: T[] | undefined;
  addNewProduct: (product: { name: string; value: number }) => Promise<void>;
};

const context: ProductsContextProps<Product> = {
  products: [],
  addNewProduct: async (product: { name: string; value: number }) => {
    await new Promise((resolve) => resolve(product));
  },
};

export const ProductsContext = createContext(context);
export const ProductsProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [products, setProducts] = useState<Product[]>();
  const { data } = api.products.getProducts.useQuery();
  const addNewReturnAll = api.products.addProductAndReturnAll.useMutation();

  useEffect(() => {
    setProducts(data);
  }, [data]);

  const addNewProduct = async (product: { name: string; value: number }) => {
    const result = await addNewReturnAll.mutateAsync(product);
    setProducts(result);
  };

  return (
    <ProductsContext.Provider value={{ products, addNewProduct }}>
      {children}
    </ProductsContext.Provider>
  );
};
