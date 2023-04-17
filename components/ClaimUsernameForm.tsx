import Router, { useRouter } from "next/router";
import { useEffect, useState } from "react";

const ClaimUsernameForm = () => {
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const validateUsername = async () => {
      const res = await fetch("/api/users/validate-username", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: username }),
      });

      const data = await res.json();

      const { message, error } = data;

      if (error) {
        setMessage("");
        setError(error);
      }

      if (message) {
        setError("");
        setMessage(message);
      }
    };

    if (username.length > 4) {
      validateUsername();
    } else {
      setError("");
      setMessage("");
    }
  }, [username]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (message) {
      Router.push({
        pathname: "/register/",
        query: { username: e.currentTarget.username.value },
      });
    }
  };

  return (
    <div className="mx-auto my-auto w-full max-w-screen-sm rounded bg-indigo-100 p-4">
      <h1 className="text-2xl font-semibold">Book a Private</h1>
      <p className="mb-4 text-gray-700">
        Private lessons bookings made simple.
      </p>
      <h3 className="mb-1 text-xl font-medium">
        How it works in three simple steps:
      </h3>
      <p className="mb-2 text-lg text-gray-800">
        1. Claim your username and register your account
      </p>
      <p className="mb-2 text-lg text-gray-800">
        2. Add your available dates, time and booking details.
      </p>
      <p className="mb-4 text-lg text-gray-800">
        3. Share your profile link and start to accept bookings!
      </p>
      <form onSubmit={(e) => handleSubmit(e)}>
        <div className="mb-2 flex w-full items-center justify-center rounded bg-white p-2">
          <p className="">book-a-private.com /</p>
          <input
            className="ml-1 w-28"
            placeholder="your username"
            type="text"
            name="username"
            id="username"
            minLength={5}
            onChange={(e) => setUsername(e.target.value)}
          ></input>
        </div>
        {message && (
          <p className="text-sm font-medium text-green-500">{message}</p>
        )}
        {error && <p className="text-sm font-medium text-red-500">{error}</p>}
        <button
          className="mt-2 w-full rounded bg-gray-400 p-2 text-white"
          type="submit"
        >
          Claim your profile
        </button>
      </form>
    </div>
  );
};

export default ClaimUsernameForm;
