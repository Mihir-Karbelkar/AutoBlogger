"use client";
import { getSession, signOut, useSession } from "next-auth/react";

export default function Page() {
  const session = useSession();
  return (
    <div
      onClick={() => {
        signOut({
          callbackUrl: "/",
        });
      }}
    >
      sign out
    </div>
  );
}
