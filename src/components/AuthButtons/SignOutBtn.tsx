import { signOut } from "next-auth/react";

import { useContext } from "react";
import { ThemeContext } from "~/context/ThemeContext";
import styles from "./button.module.css";

export const SignOutBtn = () => {
  const { theme } = useContext(ThemeContext);
  const handleSignOut = async () => {
    await signOut();
  };

  return (
    <button
      className={`${styles.btn} ${styles[`${theme}`]}`}
      onClick={handleSignOut}
    >
      Sign Out
    </button>
  );
};
