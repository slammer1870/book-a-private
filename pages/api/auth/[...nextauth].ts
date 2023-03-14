import { NextApiHandler } from "next";
import NextAuth, { NextAuthOptions, Session, User } from "next-auth";
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
    async signIn({ user }) {
      if (!user.stripeAccountId) {
        const account = await stripe.accounts.create({
          type: "standard",
          email: user.email,
        });

        const userUpdate = await prisma.user.update({
          where: {
            email: user.email as string,
          },
          data: {
            stripeAccountId: account.id,
          },
        });
      }

      return true;
    },
    async jwt({ token, account, user }) {
      if (user) {
        token.user = user;
      }
      return token;
    },
    async session({ token, user, session }) {
      if (token.user) {
        session.user = token.user as User;
      }
      return session;
    },
  },
  events: {
    async signIn(message) {
      if (!message.user.stripeAccountId) {
        const account = await stripe.accounts.create({
          type: "standard",
          email: message.user.email,
        });

        const user = await prisma.user.update({
          where: {
            email: message.user.email as string,
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
