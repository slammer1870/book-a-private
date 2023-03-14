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
  const session = await getServerSession(req, res, authOptions);

  if (session) {
    try {
      const accountLink = await stripe.accountLinks.create({
        account: session.user.stripeAccountId as string,
        refresh_url: `${process.env.VERCEL_URL}/dashboard`,
        return_url: `${process.env.VERCEL_URL}/dashboard`,
        type: "account_onboarding",
      });

      res.json(accountLink);
    } catch (error) {
      if (error instanceof Error) {
        res.status(401).send({ error: error.message });
      }
      res.status(401).send({ error: "Something went wrong" });
    }
  } else {
    res.status(401).send({ error: "Unauthorized" });
  }
}
