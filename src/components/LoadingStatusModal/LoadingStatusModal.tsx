import { AiOutlineCheckCircle } from "react-icons/ai";
import { MdErrorOutline } from "react-icons/md";
import styles from "./modal.module.css";
import Link from "next/link";
import { useRouter } from "next/router";

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
          <div>
            <button onClick={closeModal}>Dodaj następny</button>
            <Link href={previousRoute}>Wróć do strony głównej</Link>
          </div>
        </div>
        <div className={styles.blur} onClick={closeModal} />
      </>
    );
  }
};
