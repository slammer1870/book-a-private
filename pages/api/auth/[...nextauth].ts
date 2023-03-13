import { NextApiHandler } from "next";
import NextAuth, { NextAuthOptions } from "next-auth";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import EmailProvider from "next-auth/providers/email";
import prisma from "../../../lib/prisma";

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const authHandler: NextApiHandler = (req, res) => NextAuth(req, res, options);
export default authHandler;

const options: NextAuthOptions = {
  providers: [
    EmailProvider({
      server: {
        host: process.env.SMTP_HOST,
        port: Number(process.env.SMTP_PORT),
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASSWORD,
        },
      },
      from: process.env.SMTP_FROM,
    }),
  ],
  adapter: PrismaAdapter(prisma),
  secret: process.env.SECRET,
  events: {
    async updateUser(message) {
      console.log(message);

      const account = await stripe.accounts.create({
        type: "standard",
        email: message.user.email,
      });

      const user = await prisma.user.update({
        where: {
          email: message.user.email,
        },
        data: {
          stripeAccountId: account.id,
        },
      });
    },
  },
};
