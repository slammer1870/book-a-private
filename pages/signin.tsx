import { useRouter } from "next/router";

import { useSession } from "next-auth/react";

import Layout from "@/components/Layout";
import Container from "@/components/Container";
import SignInForm from "@/components/SignInForm";

export default function SignIn() {
  const router = useRouter();

  const { data: session } = useSession();

  if (session) {
    return router.push("/dashboard");
  }

  return (
    <Layout>
      <Container>
        <SignInForm />
      </Container>
    </Layout>
  );
}
