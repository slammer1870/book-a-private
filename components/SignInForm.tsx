import React, { useState } from "react";

import Link from "next/link";

import { signIn } from "next-auth/react";

const SignInForm = () => {
  const [emailValue, setEmailValue] = useState("");

  const [error, setError] = useState("");

  const [loadingSpinner, setLoadingSpinner] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoadingSpinner(true);
    const res = await fetch("/api/users/check-user-exists", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: emailValue,
      }),
    });

    const data = await res.json();
    const { error } = data;

    if (error) {
      setError(error);
      setLoadingSpinner(false);
    }

    if (res.ok) {
      setError("");
      signIn("email", { email: emailValue, callbackUrl: "/dashboard" });
      setLoadingSpinner(false);
    }
  };

  return (
    <div className="mx-auto my-auto w-full max-w-screen-sm rounded bg-indigo-100 p-4">
      <h1 className="text-2xl font-semibold">Sign In</h1>
      <p className="mb-4 text-gray-700">Enter your details below.</p>
      <form onSubmit={(e) => handleSubmit(e)}>
        <div className="mb-2 flex flex-col">
          <label className="mb-1 font-medium">Email</label>
          <input
            value={emailValue}
            className="rounded p-2"
            onChange={(e) => setEmailValue(e.currentTarget.value)}
            type="email"
            name="email"
            id="email"
            required
          ></input>
        </div>
        {error && (
          <div className="flex items-center text-sm text-gray-900">
            <p className="font-medium text-red-500">{error}</p>
            <Link href="/register" className="ml-2 font-bold underline">
              <span>Click here to Reigster</span>
            </Link>
          </div>
        )}
        {!loadingSpinner ? (
          <button
            className="mt-4 w-full rounded bg-gray-400 p-2 text-white"
            type="submit"
          >
            Submit
          </button>
        ) : (
          <div className="mt-6 flex w-full items-center justify-center rounded bg-gray-400 p-2 text-white">
            <div
              className="inline-block h-6 w-6 animate-spin rounded-full border-2 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
              role="status"
            >
              <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
                Loading...
              </span>
            </div>
          </div>
        )}
      </form>
    </div>
  );
};

export default SignInForm;
