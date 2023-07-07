import { signIn, signOut, useSession } from "next-auth/react";
export const SignInBtn = () => {
  const session = useSession();

  const handleSignIn = () => {
    try {
      signIn();
    } catch (e) {
      console.error(e);
    }
  };

  const handleSignOut = () => {
    try {
      signOut();
    } catch (e) {
      console.error(e);
    }
  };

  if (session.status === "authenticated") {
    return (
      <button className="btn" onClick={handleSignOut}>
        Sign Out
      </button>
    );
  }

  return (
    <button className="btn" onClick={handleSignIn}>
      Sign In
    </button>
  );
};
