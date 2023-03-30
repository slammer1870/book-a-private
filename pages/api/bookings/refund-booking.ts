import type { NextApiRequest, NextApiResponse } from "next";
import { Prisma } from "@prisma/client";

import prisma from "../../../lib/prisma";

import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";

import Stripe from "stripe";
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  // https://github.com/stripe/stripe-node#configuration
  apiVersion: "2022-11-15",
});

// Optional fields in body: content
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method == "POST") {
    const session = await getServerSession(req, res, authOptions);

    if (session) {
      const { id, status, paymentIntent } = req.body;

      try {
        const refund = await stripe.refunds.create({
          payment_intent: paymentIntent,
        });

        const book = await prisma.booking.update({
          where: {
            id: id,
          },
          data: {
            status: status,
          },
        });

        return res.json(book);
      } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
          // The .code property can be accessed in a type-safe manner
          if (error.code === "P2002") {
            res.status(401).send({
              error: "Lesson at this date and time already exists",
            });
          }
        } else {
          console.log(error);
          res.status(401).send({
            error: "Something went wrong.",
          });
        }
      }
    } else {
      res.status(401).send({ message: "Unauthorized" });
    }
  } else {
    res.status(401).send({ message: "Method not allowed" });
  }
}
