import { signIn } from "next-auth/react";
import styles from "./button.module.css";

export const SignInBtn = () => {
  const handleSignIn = async () => {
    // for now its google, will be fixed in future
    await signIn("google");
  };

  return (
    <button className={styles.btn} onClick={handleSignIn}>
      Sign In
    </button>
  );
};
