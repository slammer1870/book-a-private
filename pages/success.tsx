import { useRouter } from "next/router";

import { useEffect, useState } from "react";

import { PaymentIntent } from "@stripe/stripe-js";

const usePaymentIntent = (payment_intent: string | string[] | undefined) => {
  const [paymentIntent, setPaymentIntent] = useState<PaymentIntent>();
  const [loading, setLoading] = useState<Boolean>(false);
  const [error, setError] = useState();

  useEffect(() => {
    if (payment_intent) {
      const fetchSession = async () => {
        setLoading(true);
        try {
          const res = await fetch("/api/stripe/confirmation", {
            method: "POST",
            body: JSON.stringify({ payment_intent: payment_intent }),
            headers: {
              "Content-type": "application/json",
            },
          });

          const result = await res.json();

          if (paymentIntent == null) {
            setPaymentIntent(result);
          }
        } catch (error: any) {
          setError(error.message);
        }
        setLoading(false);
      };
      fetchSession();
    }
  }, [payment_intent]);

  return { paymentIntent, loading, error };
};

export default function Success() {
  const router = useRouter();

  const { payment_intent } = router.query;

  const { paymentIntent, loading, error } = usePaymentIntent(payment_intent);

  const [paymentIntentResult, setPaymentIntentResult] =
    useState<PaymentIntent>();

  useEffect(() => {
    if (paymentIntent) {
      setPaymentIntentResult(paymentIntent);
    }
  }, [paymentIntent]);

  return (
    <div className="flex h-screen w-full items-center justify-start p-4">
      <div className="mx-auto">
        {paymentIntent ? (
          <>
            <h3 className="mb-2 text-2xl font-medium">
              Success! Thank you for your purchase!
            </h3>
            <p className="mb-2">
              A receipt has been sent to {paymentIntentResult?.receipt_email}
            </p>
            <button
              className="font-medium underline"
              onClick={() => router.back()}
            >
              Click here tp return to the booking page
            </button>
          </>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
}
