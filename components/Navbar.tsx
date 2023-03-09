import React from "react";

import { signIn, signOut, useSession } from "next-auth/react";

const Navbar = () => {
  const { data: session, status } = useSession();
  const loading = status === "loading";

  return (
    <div className="absolute top-0 left-0 w-full">
      <nav className="container mx-auto flex items-center justify-between p-4">
        <h1 className="font-semibold text-lg">Book a Private</h1>
        {!session && (
          <div>
            <button onClick={() => signIn()} data-testid="login">
              Log In
            </button>
            <button className="ml-4 p-2 bg-gray-500 text-white rounded">Sign Up</button>
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
    </div>
  );
};

export default Navbar;
