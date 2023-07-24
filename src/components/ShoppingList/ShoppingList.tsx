import { useState } from "react";
import styles from "./list.module.css";
import Link from "next/link";

type ListProps = {
  name: string;
  listId: string;
  isClosed: boolean;
  content: string;
};

export const ShoppingList = (props: ListProps) => {
  const { isClosed, listId, name, content } = props;

  if (isClosed) {
    return (
      <li className={styles.container}>
        <Link href={`/shopping-lists/${listId}`}>{name}</Link>
      </li>
    );
  }

  return (
    <li className={styles.container}>
      <Link className={styles.closeBtn} href={"/shopping-lists"}></Link>
      {/* <div }></div> */}
      <span>{name}</span>
      <span>{content}</span>
    </li>
  );
};
