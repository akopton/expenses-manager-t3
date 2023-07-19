import { signIn } from "next-auth/react";
import styles from "./button.module.css";
import Link from "next/link";

export const SignInBtn = () => {
  const handleSignIn = async () => {
    // for now its google, will be fixed in future
    await signIn("google");
  };

  return (
    <button id="sign-in-btn" className={styles.btn} onClick={handleSignIn}>
      Sign In
    </button>
  );
};
