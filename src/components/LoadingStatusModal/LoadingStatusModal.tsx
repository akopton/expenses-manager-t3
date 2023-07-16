import Link from "next/link";
import { AiOutlineCheckCircle } from "react-icons/ai";
import { MdErrorOutline } from "react-icons/md";
import { useRouter } from "next/router";
import styles from "./modal.module.css";

type StatusProps = {
  status: "error" | "loading" | "success";
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
  return <MdErrorOutline className={styles.error} />;
};

const Success = () => {
  return <AiOutlineCheckCircle className={styles.success} />;
};

export const LoadingStatusModal = (props: StatusProps) => {
  const { status, message, closeModal } = props;
  const router = useRouter();
  const previousRoute = router.asPath.replace("/add-bill", "");

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
          <div className={styles.links}>
            <button onClick={closeModal} className={styles.link}>
              Powrót
            </button>
            <Link href={previousRoute} className={styles.link}>
              Strona główna
            </Link>
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
          <div className={styles.links}>
            <button onClick={closeModal} className={styles.link}>
              Dodaj następny
            </button>
            <Link href={previousRoute} className={styles.link}>
              Strona główna
            </Link>
          </div>
        </div>
        <div className={styles.blur} onClick={closeModal} />
      </>
    );
  }
};
