import { AiOutlineCheckCircle } from "react-icons/ai";
import styles from "./modal.module.css";

type StatusProps = {
  status: string;
  message?: string;
  closeModal: () => void;
};

const Loader = () => {
  return (
    <div className={styles.loader}>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
};
const Error = () => {
  return <div></div>;
};
const Success = () => {
  return <AiOutlineCheckCircle className={styles.success} />;
};

export const LoadingStatusModal = (props: StatusProps) => {
  const { status, message, closeModal } = props;

  if (status === "loading") {
    return (
      <>
        <div className={styles.statusModal}>
          <span className={styles.modalMessage}>{message}</span>
          <Loader />
        </div>
        <div className={styles.blur} onClick={closeModal} />
      </>
    );
  }

  if (status === "error") {
    return (
      <>
        <div className={styles.statusModal}>
          <span className={styles.modalMessage}>{message}</span>
          <div>
            <Error />
          </div>
        </div>
        <div className={styles.blur} onClick={closeModal} />
      </>
    );
  }

  if (status === "success") {
    return (
      <>
        <div className={styles.statusModal}>
          <span className={styles.modalMessage}>{message}</span>
          <div>
            <Success />
          </div>
        </div>
        <div className={styles.blur} onClick={closeModal} />
      </>
    );
  }
};
