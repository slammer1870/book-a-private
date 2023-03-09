import Layout from "@/components/Layout";

export default function Home() {
  return (
    <Layout>
      <div className="container mx-auto p-4 flex min-h-screen">
        <div className="mx-auto my-auto bg-gray-200 p-4 rounded w-full max-w-screen-sm">
          <h1 className="text-2xl font-semibold">Book a Private</h1>
          <p className="text-gray-700">Private lessons bookings made simple.</p>
        </div>
      </div>
    </Layout>
  );
}
