import { GetServerSidePropsContext } from "next";
import { useState } from "react";

import Layout from "@/components/Layout";
import Booking from "@/interfaces/booking";

import BookingManageModal from "@/components/BookingManageModal";

import { getServerSession } from "next-auth/next";
import { authOptions } from "../../api/auth/[...nextauth]";

import prisma from "../../../lib/prisma";
import Lesson from "@/interfaces/lesson";

type Props = {
  bookings: Booking[];
};

export default function Bookings(props: Props) {
  const { bookings } = props;

  const [booking, setBooking] = useState<Booking>();
  const [bookingArray, setBookingArray] = useState<Booking[]>(bookings);

  const d = new Date();

  const isAvailable = (booking: Booking) => {
    if (new Date(booking.lesson.date) > d && booking.status == "active") {
      return true;
    } else {
      return false;
    }
  };

  const handleRefund = async (booking: Booking, action: String) => {
    if (confirm(`Are you sure you want to ${action} this?`)) {
      const url =
        action == "refund"
          ? "/api/bookings/refund-booking"
          : "/api/bookings/cancel-booking";

      const status = action == "refund" ? "refunded" : "cancelled";

      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: booking.id,
          status: status,
          paymentIntent: booking.stripePaymentIntent,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        const index = bookings.findIndex((book) => book.id == booking.id);
        bookings[index].status == status;
        setBookingArray(bookings);
      }
    }
  };

  return (
    <Layout>
      <div className="mx-auto min-h-screen max-w-screen-md px-4 pt-20 pb-10">
        <h1 className="mb-2 text-3xl font-medium">All bookings</h1>
        <p className="mb-4 text-gray-700">These are all of your bookings</p>
        <div className="flex flex-col">
          {bookingArray?.map((booking) => (
            <div
              key={new Date(booking.lesson.date).toUTCString()}
              className="mb-4 flex justify-around rounded-md border p-4 text-sm"
            >
              <div
                className={`${
                  !isAvailable(booking) && "opacity-50"
                } grid w-full grid-cols-2 grid-rows-2 gap-4`}
              >
                <div className="col-span-1 row-span-1 flex flex-col">
                  <div className="my-auto">
                    <p className="font-semibold">Date:</p>
                    <span>{new Date(booking.lesson.date).toDateString()}</span>
                  </div>
                </div>
                <div className="col-span-1 row-span-1 flex flex-col">
                  <div className="my-auto">
                    <p className="font-semibold">Location:</p>
                    <span>{booking.lesson.location}</span>
                  </div>
                </div>
                <div className="col-span-1 row-span-1 flex flex-col">
                  <div className="my-auto">
                    <p className="font-semibold">Attendee Name:</p>
                    <span>{booking.name}</span>
                  </div>
                </div>
                <div className="col-span-1 row-span-1 flex flex-col">
                  <div className="my-auto">
                    <p className="font-semibold">Attendee Email:</p>
                    <span>{booking.email}</span>
                  </div>
                </div>
                <div className="col-span-1 row-span-1 flex flex-col">
                  <div className="my-auto">
                    <p className="font-semibold">Status:</p>
                    <span>{booking.status}</span>
                  </div>
                </div>
              </div>
              <div className="col-span-1 grid w-24 grid-rows-2 gap-1 md:w-40">
                {isAvailable(booking) ? (
                  <button
                    onClick={() => setBooking(booking)}
                    className="col-span-1 row-span-2 my-auto ml-auto h-min w-full rounded bg-green-400 px-4 py-2 text-white"
                  >
                    Manage this Booking
                  </button>
                ) : booking.status != "refunded" &&
                  booking.stripePaymentIntent ? (
                  <button
                    onClick={() => handleRefund(booking, "refund")}
                    className="col-span-1 row-span-2 my-auto ml-auto h-min w-full rounded bg-red-400 px-4 py-2 text-white"
                  >
                    Refund
                  </button>
                ) : (
                  <span></span>
                )}
              </div>
            </div>
          ))}
        </div>
        {booking && (
          <BookingManageModal
            booking={booking}
            setActive={setBooking}
            bookings={bookingArray}
            setBookings={setBookingArray}
          />
        )}
      </div>
    </Layout>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getServerSession(context.req, context.res, authOptions);

  if (!session) {
    return {
      redirect: {
        destination: "/signin",
        permanent: false,
      },
    };
  }

  if (session) {
    const bookings = await prisma.booking.findMany({
      where: {
        lesson: {
          userId: session.user.id as string,
        },
      },
      orderBy: {
        lesson: { date: "desc" },
      },
      include: {
        lesson: true,
      },
    });

    return {
      props: {
        bookings: JSON.parse(JSON.stringify(bookings)),
      }, // will be passed to the page component as props
    };
  }
}
