import { signIn, signOut, useSession } from "next-auth/react";
export const SignInBtn = () => {
  const session = useSession();

  const handleSignIn = async () => {
    return await signIn();
  };

  const handleSignOut = async () => {
    return await signOut();
  };

  if (session.status === "authenticated") {
    return (
      <button className="btn" onClick={handleSignIn}>
        Sign Out
      </button>
    );
  }

  return (
    <button className="btn" onClick={() => handleSignOut()}>
      Sign In
    </button>
  );
};
