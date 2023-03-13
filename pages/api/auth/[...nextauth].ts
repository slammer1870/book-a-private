import { NextApiHandler } from "next";
import NextAuth, { NextAuthOptions } from "next-auth";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import EmailProvider from "next-auth/providers/email";
import prisma from "../../../lib/prisma";

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

export const authOptions: NextAuthOptions = {
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

  session: {
    strategy: "jwt",
  },

  callbacks: {
    async jwt({ token, account, user }) {
      console.log("token is", token);
      console.log("user is", user);
      if (user) {
        token.user = user;
      }
      return token;
    },
    async session({ token, user, session }) {
      console.log("session is", session);
      console.log("session token is", token);
      console.log("session user is", user);
      if (token.user) {
        session.user = token.user;
      }
      return session;
    },
  },
  events: {
    async updateUser(message) {
      console.log("message is", message);

      if (!message.user.stripeAccountId) {
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
      }
    },
  },
};

export default NextAuth(authOptions);
