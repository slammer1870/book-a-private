import React, { useEffect, useState } from "react";

import { signIn } from "next-auth/react";

type RegisterProps = {
  username?: string;
};

const RegisterForm = ({ username }: RegisterProps) => {
  const [usernameValue, setUsernameValue] = useState<string>();
  const [nameValue, setNameValue] = useState<string>();
  const [emailValue, setEmailValue] = useState<string>();

  const [message, setMessage] = useState<string>();
  const [error, setError] = useState<string>();
  const [disabled, setDisabled] = useState<boolean>();

  const [loadingSpinner, setLoadingSpinner] = useState(false);

  useEffect(() => {
    if (username) {
      setUsernameValue(username);
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    const validateUsername = async () => {
      const res = await fetch("/api/users/validate-username", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: usernameValue }),
      });

      const data = await res.json();

      const { message, error } = data;

      if (error) {
        setMessage("");
        setError(error);
        setDisabled(true);
      }

      if (message) {
        setError("");
        setMessage(message);
        setDisabled(false);
      }
    };

    if (usernameValue && usernameValue.length > 4) {
      validateUsername();
    } else {
      setError("");
      setMessage("");
    }
  }, [usernameValue]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoadingSpinner(true);
    const res = await fetch("/api/users/register", {
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

    setLoadingSpinner(false);

    if (error) {
      setError(error);
    }

    if (res.ok) {
      setError("");
      signIn("email", { email: emailValue, callbackUrl: "/dashboard" });
    }
  };

  return (
    <div className="mx-auto my-auto w-full max-w-screen-sm rounded bg-indigo-100 p-4">
      <h1 className="text-2xl font-semibold">Complete your registration</h1>
      <p className="mb-4 text-gray-700">Enter your details below.</p>
      <form onSubmit={(e) => handleSubmit(e)}>
        <div className="mb-4 flex flex-col">
          <label className="mb-1 font-medium">Username</label>
          <input
            value={usernameValue}
            className="rounded p-2"
            onChange={(e) => setUsernameValue(e.currentTarget.value)}
            type="text"
            name="username"
            id="username"
            minLength={5}
            required
          ></input>
        </div>
        <div className="mb-4 flex flex-col">
          <label className="mb-1 font-medium">Name</label>
          <input
            value={nameValue}
            className="rounded p-2"
            onChange={(e) => setNameValue(e.currentTarget.value)}
            type="text"
            name="name"
            id="name"
            required
          ></input>
        </div>
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
        {message && (
          <p className="text-sm font-medium text-green-500">{message}</p>
        )}
        {error && <p className="text-sm font-medium text-red-500">{error}</p>}
        {!loadingSpinner ? (
          <button
            className="mt-2 w-full rounded bg-gray-400 p-2 text-white disabled:cursor-not-allowed disabled:bg-gray-300"
            type="submit"
            disabled={disabled}
          >
            Claim your profile
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

export default RegisterForm;
