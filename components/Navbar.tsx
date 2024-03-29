import React from "react";

import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";

const Navbar = () => {
  const { data: session, status } = useSession();
  const loading = status === "loading";

  return (
    <div className="absolute top-0 left-0 w-full">
      <nav className="container mx-auto flex items-center justify-between p-4">
        <Link href="/">
          <h1 className="text-lg font-semibold">Book a Private</h1>
        </Link>
        {!session && !loading && (
          <div>
            <Link href="/pricing">
              <button className="underline">Pricing</button>
            </Link>
            <button
              className="ml-4"
              onClick={() => signIn()}
              data-testid="login"
            >
              Log In
            </button>
            <Link href="/register">
              <button className="ml-4 rounded bg-gray-500 p-2 text-white">
                Sign Up
              </button>
            </Link>
          </div>
        )}
        {!session && loading && (
          <div>
            <p className="pulse">Loading...</p>
          </div>
        )}
        {session && (
          <div>
            <Link href="/dashboard">
              <button>Dashboard</button>
            </Link>
            <button
              onClick={() => signOut()}
              className="ml-4 rounded bg-gray-500 p-2 text-white"
            >
              Log Out
            </button>
          </div>
        )}
      </nav>
    </div>
  );
};

export default Navbar;
