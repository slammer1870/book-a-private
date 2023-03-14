import NextAuth, { DefaultSession } from "next-auth";

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: {
      /** The user's stripe account details. */
      stripeAccountId: string;
      stripeAccountVerified: Date;
    } & DefaultSession["user"];
  }

  interface User {
    /** The user's stripe account details. */
    stripeAccountId: string;
    stripeAccountVerified: Date;
  }
}
