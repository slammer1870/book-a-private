import Layout from "@/components/Layout";
import { useRouter } from "next/router";

export default function Dashboard() {
  const router = useRouter();

  const handleStripe = async () => {
    const res = await fetch("/api/stripe/create-account-link", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    const data = await res.json();

    return router.push(data.url);
  };
  return (
    <Layout>
      <div className="container mx-auto px-4 py-20">
        <h1 className="text-3xl font-medium mb-2">Dashboard</h1>
        <p className="text-gray-700">
          To complete your account we need to set up a way for you to get paid.
          We have initiated the registration by creating a Stripe account for
          you, we just need you to click the button below to complete the
          process!
        </p>
        <div className="flex w-full my-12">
          <button
            onClick={() => handleStripe()}
            className="w-full max-w-screen-sm mx-auto bg-indigo-400 hover:bg-indigo-500 text-white p-2 rounded"
          >
            Link your Stripe Account
          </button>
        </div>
      </div>
    </Layout>
  );
}
