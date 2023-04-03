import Layout from "@/components/Layout";

export default function VerifyRequest() {
  return (
    <Layout>
      <div className="container mx-auto flex min-h-screen p-4 text-gray-900">
        <div className="mx-auto my-auto w-full max-w-screen-sm rounded bg-indigo-100 p-4">
          <h1 className="mb-2 text-2xl font-semibold">Check your email</h1>
          <p className="mb-4 text-gray-700">
            A sign in link has been sent to your email address.
          </p>
        </div>
      </div>
    </Layout>
  );
}
