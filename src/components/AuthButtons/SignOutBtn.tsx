import { signOut } from "next-auth/react";

import styles from "./button.module.css";
import { useContext } from "react";
import { ThemeContext } from "~/context/ThemeContext";

export const SignOutBtn = () => {
  const { theme } = useContext(ThemeContext);
  const handleSignOut = async () => {
    await signOut();
  };

  return (
    <button
      className={`${styles.btn} ${theme !== undefined && styles[`${theme}`]}`}
      onClick={handleSignOut}
    >
      Sign Out
    </button>
  );
};
