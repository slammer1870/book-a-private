import Layout from "@/components/Layout";

export default function VerifyRequest() {
  return (
    <Layout>
      <div className="container mx-auto p-4 flex min-h-screen text-gray-900">
        <div className="mx-auto my-auto bg-indigo-100 p-4 rounded w-full max-w-screen-sm">
          <h1 className="text-2xl font-semibold mb-2">Check your email</h1>
          <p className="text-gray-700 mb-4">
            A sign in link has been sent to your email address.
          </p>
        </div>
      </div>
    </Layout>
  );
}
