import { signIn, signOut, useSession } from "next-auth/react";
export const SignInBtn = () => {
  const session = useSession();

  const handleSignIn = async () => {
    await signIn();
  };

  const handleSignOut = async () => {
    await signOut();
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
