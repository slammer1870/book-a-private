import Layout from "@/components/Layout";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function Home() {
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const validateUsername = async () => {
      const res = await fetch("/api/validate-username", {
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
      router.push(`/register/?username=${e.currentTarget.username.value}`);
    }
  };

  return (
    <Layout>
      <div className="container mx-auto p-4 flex min-h-screen tsext-gray-900">
        <div className="mx-auto my-auto bg-indigo-100 p-4 rounded w-full max-w-screen-sm">
          <h1 className="text-2xl font-semibold">Book a Private</h1>
          <p className="text-gray-700 mb-4">
            Private lessons bookings made simple.
          </p>
          <h3 className="text-xl font-medium mb-1">
            How it works in three simple steps:
          </h3>
          <p className="text-lg text-gray-800 mb-2">
            1. Claim your username and register your account
          </p>
          <p className="text-lg text-gray-800 mb-2">
            2. Add your available dates, time and booking details.
          </p>
          <p className="text-lg text-gray-800 mb-4">
            3. Share your profile link and start to accept bookings!
          </p>
          <form onSubmit={(e) => handleSubmit(e)}>
            <div className="flex w-full rounded p-2 bg-white items-center justify-center mb-2">
              <p className="">book-a-private.com /</p>
              <input
                className="w-28 ml-1"
                placeholder="your username"
                type="text"
                name="username"
                id="username"
                minLength={5}
                onChange={(e) => setUsername(e.target.value)}
              ></input>
            </div>
            {message && (
              <p className="text-sm text-green-500 font-medium">{message}</p>
            )}
            {error && (
              <p className="text-sm text-red-500 font-medium">{error}</p>
            )}
            <button
              className="p-2 bg-gray-400 text-white w-full rounded mt-2"
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
