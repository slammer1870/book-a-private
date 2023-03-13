import Layout from "@/components/Layout";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

import { signIn, useSession } from "next-auth/react";

export default function Register() {
  const router = useRouter();

  const { data: session } = useSession();

  const username = router.query.username as string;

  const [usernameValue, setUsernameValue] = useState("");
  const [nameValue, setNameValue] = useState("");
  const [emailValue, setEmailValue] = useState("");

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (username) {
      setUsernameValue(username);
    }
  }, [router]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const res = await fetch("/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: usernameValue,
        name: nameValue,
        email: emailValue,
      }),
    });

    const data = await res.json();
    const { error } = data;

    if (error) {
      setError(error);
    }

    if (res.ok) {
      setError("");
      signIn("email", { email: emailValue });
    }
  };

  if (session) {
    return router.push("/dashboard");
  }

  return (
    <Layout>
      <div className="container mx-auto p-4 flex min-h-screen text-gray-900">
        <div className="mx-auto my-auto bg-indigo-100 p-4 rounded w-full max-w-screen-sm">
          <h1 className="text-2xl font-semibold">Complete your registration</h1>
          <p className="text-gray-700 mb-4">Enter your details below.</p>
          <form onSubmit={(e) => handleSubmit(e)}>
            <div className="flex flex-col mb-4">
              <label className="mb-1 font-medium">Username</label>
              <input
                value={usernameValue}
                className="p-2 rounded"
                onChange={(e) => setUsernameValue(e.currentTarget.value)}
                type="text"
                name="username"
                id="username"
                minLength={5}
                required
              ></input>
            </div>
            <div className="flex flex-col mb-4">
              <label className="mb-1 font-medium">Name</label>
              <input
                value={nameValue}
                className="p-2 rounded"
                onChange={(e) => setNameValue(e.currentTarget.value)}
                type="text"
                name="name"
                id="name"
                required
              ></input>
            </div>
            <div className="flex flex-col mb-2">
              <label className="mb-1 font-medium">Email</label>
              <input
                value={emailValue}
                className="p-2 rounded"
                onChange={(e) => setEmailValue(e.currentTarget.value)}
                type="email"
                name="email"
                id="email"
                required
              ></input>
            </div>
            {message && (
              <p className="text-sm text-green-500 font-medium">{message}</p>
            )}
            {error && (
              <p className="text-sm text-red-500 font-medium">{error}</p>
            )}
            <button
              className="p-2 bg-gray-400 text-white w-full rounded mt-4"
              type="submit"
            >
              Claim your profile
            </button>
          </form>
        </div>
      </div>
    </Layout>
  );
}
