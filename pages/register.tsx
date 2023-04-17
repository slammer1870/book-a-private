import Layout from "@/components/Layout";
import Container from "@/components/Container";
import RegisterForm from "@/components/RegisterForm";

import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

export default function Register() {
  const { data: session, status } = useSession();

  const loading = status == "loading";

  const router = useRouter();

  const username = router.query.username as string;

  if (session && !loading) {
    return router.push("/dashboard");
  }
  return (
    <Layout>
      <Container>
        <RegisterForm username={username} />
      </Container>
    </Layout>
  );
}
