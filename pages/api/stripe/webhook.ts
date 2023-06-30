import type { NextApiRequest, NextApiResponse } from "next";

import prisma from "@/lib/prisma";

import { buffer } from "micro";
import Cors from "micro-cors";

import Stripe from "stripe";
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  // https://github.com/stripe/stripe-node#configuration
  apiVersion: "2022-11-15",
});

const webhookSecret: string = process.env.STRIPE_WEBHOOK_SECRET!;

import sgMail from "@sendgrid/mail";

sgMail.setApiKey(process.env.SMTP_PASSWORD as string);
const FROM_EMAIL = process.env.SMTP_FROM || "default@gmail.com";

// Stripe requires the raw body to construct the event.
export const config = {
  api: {
    bodyParser: false,
  },
};

const cors = Cors({
  allowMethods: ["POST", "HEAD"],
});

const webhookHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    const buf = await buffer(req);
    const sig = req.headers["stripe-signature"]!;

    let event: Stripe.Event;

    try {
      event = stripe.webhooks.constructEvent(
        buf.toString(),
        sig,
        webhookSecret
      );
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Unknown error";
      // On error, log and return the error message.
      if (err! instanceof Error) console.log(err);
      console.log(`❌ Error message: ${errorMessage}`);
      res.status(400).send(`Webhook Error: ${errorMessage}`);
      return;
    }

    // Successfully constructed event.
    console.log("✅ Success:", event.id);

    if (event.type === "account.updated") {
      const account = event.data.object as Stripe.Account;

      // find the user with stripe account id
      const user = await prisma.user.findUnique({
        where: {
          stripeAccountId: account.id,
        },
      });

      // check to see if user has not previosuly verified stripe account but webhook has payouts enabled
      if (!user?.stripeAccountVerified && account.payouts_enabled == true) {
        //update user to show stripe verified
        try {
          await prisma.user.update({
            where: {
              stripeAccountId: account.id,
            },
            data: {
              stripeAccountVerified: new Date(Date.now()),
            },
          });
        } catch (error) {
          console.error("Error updating user status:", error);
        }
      }
    }
    if (event.type === "payment_intent.succeeded") {
      console.log("payment intent");
      const paymentIntent = event.data.object as Stripe.PaymentIntent;
      const { lessonId, name, email } = paymentIntent.metadata;

      try {
        const booking = await prisma.booking.create({
          data: {
            lessonId: lessonId,
            stripePaymentIntent: paymentIntent.id,
            name: name,
            email: email,
          },
        });

        const lesson = await prisma.lesson.findUniqueOrThrow({
          where: { id: lessonId as string },
        });

        const user = await prisma.user.findUniqueOrThrow({
          where: { id: lesson.userId },
        });

        const instructor_message = `New booking from ${booking.name} ${booking.email} on ${lesson.date}`;

        const instructor_msg = {
          to: user.email as string,
          from: FROM_EMAIL,
          reply_to: email as string,
          subject: "New booking from " + email,
          text: instructor_message,
        };

        await sgMail.send(instructor_msg);

        const user_message = `Thank you for your booking on ${lesson.date} with ${user.name} ${user.email}`;

        const user_msg = {
          to: email as string,
          from: FROM_EMAIL,
          reply_to: user.email as string,
          subject: "Thank you for your booking " + name,
          text: user_message,
        };

        await sgMail.send(user_msg);
        console.log(`Lesson ${lessonId} status updated to 'booked'.`);
      } catch (error) {
        console.error("Error updating lesson status:", error);
      }
    }

    res.json({ received: true });
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method Not Allowed");
  }
};

export default cors(webhookHandler as any);
