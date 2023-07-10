import { RiAddFill } from "react-icons/ri";
import styles from "./btn.module.css";

export const AddModelBtn = ({ model }: { model: string }) => {
  return (
    <button className={styles.btn}>
      <RiAddFill />
    </button>
  );
};
