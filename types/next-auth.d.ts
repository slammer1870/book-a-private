import NextAuth, { DefaultSession, DefaultUser, DefaultToken } from "next-auth";

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: {
      /** The user's stripe account details. */
      id: String;
      username: String;
      stripeAccountId: String;
      stripeAccountVerified: Date;
      blurb: String;
    } & DefaultSession["user"];
  }

  interface User {
    /** The user's stripe account details. */
    id: String;
    username: String;
    stripeAccountId: String;
    stripeAccountVerified: Date;
    blurb: String;
  }
}

interface Token {
  user: {
    /** The user's stripe account details. */
    id: String;
    username: String;
    stripeAccountId: String;
    stripeAccountVerified: Date;
  } & DefaultToken["user"];
}
