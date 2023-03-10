import Layout from "@/components/Layout";

export default function Home() {
  return (
    <Layout>
      <div className="container mx-auto p-4 flex min-h-screen text-gray-900">
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
          <div className="flex w-full rounded p-2 bg-white items-center justify-center mb-4">
            <p className="">book-a-private.com /</p>
            <input className="w-28 ml-1" placeholder="your username"></input>
          </div>
          <button className="p-2 bg-gray-400 text-white w-full rounded">
            Claim your profile
          </button>
        </div>
      </div>
    </Layout>
  );
}
