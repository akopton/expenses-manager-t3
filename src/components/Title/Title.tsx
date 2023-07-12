import styles from "./title.module.css";

export const Title = ({ text }: { text: string }) => {
  return <h2 className={styles.title}>{text}</h2>;
};
