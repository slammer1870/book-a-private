import React from "react";

import { signIn, signOut, useSession } from "next-auth/react";

const Navbar = () => {
  const { data: session, status } = useSession();
  const loading = status === "loading";

  return (
    <nav className="container mx-auto flex items-center justify-between p-4">
      <h1>Book a Private</h1>
      {!session && (
        <div>
          <button onClick={() => signIn()}>Log In</button>
          <button className="ml-4">Sign Up</button>
        </div>
      )}
      {!session && loading && <p className="pulse">Loading...</p>}
      {session && (
        <div>
          <button>Dashboard</button>
          <button onClick={() => signOut()} className="ml-4">
            Log Out
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
