import { FaArrowLeftLong, FaArrowRightLong } from "react-icons/fa6";
import styles from "./buttons.module.css";
type BtnProps = {
  disabled?: boolean;
  onClick: () => void;
};

export const ArrowLeftBtn = (props: BtnProps) => {
  const { disabled, onClick } = props;
  return (
    <button
      className={`${styles.btn as string} ${styles.btnLeft as string}`}
      onClick={onClick}
      disabled={disabled}
    >
      <>
        <FaArrowLeftLong className={styles.slideOutLeft} />
        <FaArrowLeftLong className={styles.slideInLeft} />
      </>
    </button>
  );
};

export const ArrowRightBtn = (props: BtnProps) => {
  const { disabled, onClick } = props;
  return (
    <button
      className={`${styles.btn as string} ${styles.btnRight as string}`}
      onClick={onClick}
      disabled={disabled}
    >
      <>
        <FaArrowRightLong className={styles.slideInRight} />
        <FaArrowRightLong className={styles.slideOutRight} />
      </>
    </button>
  );
};
