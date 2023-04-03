import { useRouter } from "next/router";

const LinkStripe = () => {
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
    <>
      <p className="text-gray-700">
        To complete your account we need to set up a way for you to get paid. We
        have initiated the registration by creating a Stripe account for you, we
        just need you to click the button below to complete the process!
      </p>
      <div className="my-12 flex w-full">
        <button
          onClick={() => handleStripe()}
          className="mx-auto w-full max-w-screen-sm rounded bg-indigo-400 p-2 text-white hover:bg-indigo-500"
        >
          Link your Stripe Account
        </button>
      </div>
    </>
  );
};

export default LinkStripe;
