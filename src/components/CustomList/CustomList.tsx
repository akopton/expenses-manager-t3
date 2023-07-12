import styles from "./list.module.css";

const ListItem = () => {
  return <li className={styles.listItem}></li>;
};
export const CustomList = () => {
  return (
    <ul className={styles.list}>
      <ListItem />
      <ListItem />
      <ListItem />
      <ListItem />
    </ul>
  );
};
