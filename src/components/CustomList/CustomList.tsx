import styles from "./list.module.css";

const ListItem = (props: any) => {
  return <li className={styles.listItem}></li>;
};
export const CustomList = (data: any) => {
  return (
    <ul className={styles.list}>
      {data.map((el: any) => {
        return <ListItem {...el} key={el.id} />;
      })}
    </ul>
  );
};
