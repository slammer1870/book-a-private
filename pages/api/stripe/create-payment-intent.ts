import prisma from "@/lib/prisma";
import type { NextApiRequest, NextApiResponse } from "next";

import Stripe from "stripe";
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  // https://github.com/stripe/stripe-node#configuration
  apiVersion: "2022-11-15",
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { name, email, lesson } = req.body;

  console.log("lesson is", lesson);

  const user = await prisma.user.findUnique({
    where: {
      id: lesson.userId,
    },
  });

  console.log("user is", user);

  const fee = lesson.price * 0.15 * 100;

  console.log("fee is", fee);

  // Create a PaymentIntent with the order amount and currency
  const paymentIntent = await stripe.paymentIntents.create({
    amount: lesson.price * 100,
    currency: "eur",
    automatic_payment_methods: {
      enabled: true,
    },
    metadata: {
      name: name,
      email: email,
      lessonId: lesson.id,
    },
    application_fee_amount: fee,
    transfer_data: { destination: user?.stripeAccountId as string },
    receipt_email: email,
  });

  res.send({
    clientSecret: paymentIntent.client_secret,
  });
}
