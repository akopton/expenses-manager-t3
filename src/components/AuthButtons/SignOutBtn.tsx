import { signOut } from "next-auth/react";
import styles from "./button.module.css";

export const SignOutBtn = () => {
  const handleSignOut = async () => {
    await signOut();
  };

  return (
    <button className={styles.btn} onClick={handleSignOut}>
      Sign Out
    </button>
  );
};
