"use client";

import { useSession } from "next-auth/react";

export default function Profile() {
  const session = useSession();

  return (
    <div>
      {session.data?.user
        ? "From Client: user is signed In"
        : "From Client: user is NOT signed In"}
    </div>
  );
}
