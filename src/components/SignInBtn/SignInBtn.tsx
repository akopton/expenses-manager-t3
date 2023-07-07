import { signIn, signOut, useSession } from "next-auth/react";
export const SignInBtn = () => {
  const session = useSession();

  const handleSignIn = async () => {
    await signIn().catch((e) => {
      throw new Error(e);
    });
  };

  const handleSignOut = async () => {
    await signOut().catch((e) => {
      throw new Error(e);
    });
  };

  if (session.status === "authenticated") {
    return (
      <button className="btn" onClick={() => handleSignIn()}>
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
