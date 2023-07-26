import Link from "next/link";
import { AiOutlineCheckCircle } from "react-icons/ai";
import { MdErrorOutline } from "react-icons/md";
import { useRouter } from "next/router";
import styles from "./modal.module.css";
import { useEffect, useState } from "react";

type StatusProps = {
  status: "error" | "loading" | "success";
  message?: string;
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
  const { status, message } = props;
  const router = useRouter();
  const previousRoute = router.asPath.replace("/add-bill", "");
  const [showComponent, setShowComponent] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowComponent(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  if (status === "loading") {
    return (
      <>
        <div className={styles.statusModal}>
          <span className={styles.modalMessage}>{message}</span>
          <Loader />
        </div>
      </>
    );
  }

  // if (status === "error") {
  //   return (
  //     <>
  //       <div className={styles.statusModal}>
  //         <span className={styles.modalMessage}>{message}</span>
  //         <div>
  //           <Error />
  //         </div>
  //         <div className={styles.links}>
  //           <button onClick={closeModal} className={styles.link}>
  //             Powrót
  //           </button>
  //           <Link href={previousRoute} className={styles.link}>
  //             Strona główna
  //           </Link>
  //         </div>
  //       </div>
  //       <div className={styles.blur} onClick={closeModal} />
  //     </>
  //   );
  // }

  if (status === "success") {
    if (showComponent) {
      return (
        <>
          <div className={styles.statusModal}>
            <span className={styles.modalMessage}>{message}</span>
            <div>
              <Success />
            </div>
          </div>
        </>
      );
    } else {
      return null;
    }
  }
};
