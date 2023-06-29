import type { NextApiRequest, NextApiResponse } from "next";

import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";

import Stripe from "stripe";
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  // https://github.com/stripe/stripe-node#configuration
  apiVersion: "2022-11-15",
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { payment_intent } = req.body;

  try {
    const paymentIntent = await stripe.paymentIntents.retrieve(payment_intent);

    if (paymentIntent) return res.status(201).json(paymentIntent);
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message);
      return res.status(500).json({
        error: error.message,
      });
    }
  }
}
