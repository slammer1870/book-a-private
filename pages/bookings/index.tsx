import type { GetServerSidePropsContext } from "next";
import { useState } from "react";

import Layout from "@/components/Layout";
import Booking from "@/interfaces/booking";
import Lesson from "@/interfaces/lesson";

import BookingManageModal from "@/components/BookingManageModal";

import { getServerSession } from "next-auth/next";
import { authOptions } from "../api/auth/[...nextauth]";

import prisma from "../../lib/prisma";

type Props = {
  bookings: Booking[];
};

export default function Bookings(props: Props) {
  const { bookings } = props;

  const [booking, setBooking] = useState<Booking>();
  const [bookingArray, setBookingArray] = useState<Booking[]>(bookings);

  const d = new Date();

  return (
    <Layout>
      <div className="max-w-screen-md mx-auto px-4 pt-20 pb-10 min-h-screen">
        <h1 className="text-3xl font-medium mb-2">Upcoming bookings</h1>
        <p className="text-gray-700 mb-4">
          These are you active upcoming bookings
        </p>
        <div className="flex flex-col">
          {bookingArray?.map((booking) => (
            <div
              key={new Date(booking.lesson.date).toUTCString()}
              className="border rounded-md p-4 mb-4 text-sm flex justify-around"
            >
              <div className="grid grid-cols-2 grid-rows-2 gap-4 w-full">
                <div className="flex flex-col col-span-1 row-span-1">
                  <div className="my-auto">
                    <p className="font-semibold">Date:</p>
                    <span>{new Date(booking.lesson.date).toDateString()}</span>
                  </div>
                </div>
                <div className="flex flex-col col-span-1 row-span-1">
                  <div className="my-auto">
                    <p className="font-semibold">Location:</p>
                    <span>{booking.lesson.location}</span>
                  </div>
                </div>
                <div className="flex flex-col col-span-1 row-span-1">
                  <div className="my-auto">
                    <p className="font-semibold">Attendee Name:</p>
                    <span>{booking.name}</span>
                  </div>
                </div>
                <div className="flex flex-col col-span-1 row-span-1">
                  <div className="my-auto">
                    <p className="font-semibold">Attendee Email:</p>
                    <span>{booking.email}</span>
                  </div>
                </div>
              </div>
              <div className="grid col-span-1 gap-1 grid-rows-2 w-24 md:w-40">
                <button
                  onClick={() => setBooking(booking)}
                  className="bg-green-400 col-span-1 row-span-2 w-full text-white h-min my-auto px-4 py-2 rounded ml-auto"
                >
                  Manage this Booking
                </button>
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
    context.res.statusCode = 403;
    return { props: { bookings: [] } };
  }

  if (session) {
    const bookings = await prisma.booking.findMany({
      where: {
        lesson: {
          userId: session.user.id as string,
          date: {
            gte: new Date(),
          },
        },
        status: "active",
      },
      orderBy: {
        lesson: { date: "asc" },
      },
      include: {
        lesson: true,
      },
    });

    return {
      props: { bookings: JSON.parse(JSON.stringify(bookings)) },
    };
  }
}
