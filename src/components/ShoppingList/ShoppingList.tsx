import { useState } from "react";
import styles from "./list.module.css";
import Link from "next/link";
import { ShoppingList as TShoppingList } from "@prisma/client";
import { api } from "~/utils/api";

type ListProps = {
  id: string;
};

export const ShoppingList = (props: ListProps) => {
  const { id } = props;
  const { data } = api.shoppingLists.getOneWithId.useQuery({ id: id });

  return (
    <div className={styles.container}>
      <span>{data && data.name}</span>
      <ul>
        {data &&
          data.owners.map((el) => {
            return <li key={el.id}>{el.name}</li>;
          })}
      </ul>
    </div>
  );
};
