import Layout from "@/components/Layout";

export default function Pricing() {
  return (
    <Layout>
      <section className="body-font h-screen overflow-hidden text-gray-600">
        <div className="container mx-auto px-5 py-24">
          <div className="mb-12 flex w-full flex-col text-center">
            <h1 className="title-font mb-2 text-3xl font-medium text-gray-900 sm:text-4xl">
              Pricing
            </h1>
            <p className="mx-auto text-base leading-relaxed text-gray-500 lg:w-2/3">
              We offer competitive pricing with service providers in mind!
            </p>
          </div>
          <div className="-m-4 mx-auto flex flex-wrap items-center justify-center">
            <div className="h-72 w-full p-4 md:w-1/2 xl:w-1/4">
              <div className="relative flex h-full flex-col overflow-hidden rounded-lg border-2 border-gray-300 p-6">
                <h2 className="title-font mb-1 text-sm font-medium tracking-widest">
                  PERSONAL
                </h2>
                <h1 className="mb-4 flex items-center border-b border-gray-200 pb-4 text-5xl leading-none text-gray-900">
                  <span>€0</span>
                  <span className="ml-1 text-lg font-normal text-gray-500">
                    /mo
                  </span>
                </h1>
                <p className="mb-2 flex items-center text-gray-600">
                  <span className="mr-2 inline-flex h-4 w-4 flex-shrink-0 items-center justify-center rounded-full bg-gray-400 text-white">
                    <svg
                      fill="none"
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2.5"
                      className="h-3 w-3"
                      viewBox="0 0 24 24"
                    >
                      <path d="M20 6L9 17l-5-5"></path>
                    </svg>
                  </span>
                  Scheduling and Bookings
                </p>
                <p className="mb-2 flex items-center text-gray-600">
                  <span className="mr-2 inline-flex h-4 w-4 flex-shrink-0 items-center justify-center rounded-full bg-gray-400 text-white">
                    <svg
                      fill="none"
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2.5"
                      className="h-3 w-3"
                      viewBox="0 0 24 24"
                    >
                      <path d="M20 6L9 17l-5-5"></path>
                    </svg>
                  </span>
                  4% transaction fee on bookings
                </p>
              </div>
            </div>
            <div className="h-72 w-full p-4 md:w-1/2 xl:w-1/4">
              <div className="relative flex h-full flex-col overflow-hidden rounded-lg border-2 border-gray-300 p-6">
                <h2 className="title-font mb-1 text-sm font-medium tracking-widest">
                  ENTERPRISE
                </h2>
                <h1 className="mb-4 flex items-center border-b border-gray-200 pb-4 text-5xl leading-none text-gray-900">
                  <span>TBD</span>
                  <span className="ml-1 text-lg font-normal text-gray-500">
                    /mo
                  </span>
                </h1>
                <p className="mb-2 flex items-center text-gray-600">
                  <span className="mr-2 inline-flex h-4 w-4 flex-shrink-0 items-center justify-center rounded-full bg-gray-400 text-white">
                    <svg
                      fill="none"
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2.5"
                      className="h-3 w-3"
                      viewBox="0 0 24 24"
                    >
                      <path d="M20 6L9 17l-5-5"></path>
                    </svg>
                  </span>
                  Scheduling and Booking
                </p>
                <p className="mb-2 flex items-center text-gray-600">
                  <span className="mr-2 inline-flex h-4 w-4 flex-shrink-0 items-center justify-center rounded-full bg-gray-400 text-white">
                    <svg
                      fill="none"
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2.5"
                      className="h-3 w-3"
                      viewBox="0 0 24 24"
                    >
                      <path d="M20 6L9 17l-5-5"></path>
                    </svg>
                  </span>
                  Staff accounts with commision on staff bookings
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
