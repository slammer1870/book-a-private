import { Dispatch, useState } from "react";
import cuid from "cuid";

import Lesson from "@/interfaces/lesson";
import Booking from "@/interfaces/booking";

type LessonProps = {
  lesson: Lesson;
  setActiveLesson: React.Dispatch<React.SetStateAction<Lesson | undefined>>;
  lessons: Lesson[];
  setLessons: React.Dispatch<React.SetStateAction<Lesson[]>>;
};

const LessonModal = ({
  lesson,
  setActiveLesson,
  lessons,
  setLessons,
}: LessonProps) => {
  const { id, date, location, bookings } = lesson;

  const booking = bookings.find(
    (booking) => booking.status == "active"
  ) as Booking;

  const [error, setError] = useState<String>();

  const handleSubmit = async (lesson: Lesson) => {
    const url = booking.stripePaymentIntent
      ? "/api/bookings/refund-booking"
      : "/api/bookings/cancel-booking";

    const status = booking.stripePaymentIntent ? "refunded" : "cancelled";

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

    const { error } = data;

    if (res.ok) {
      setActiveLesson(undefined);

      const index = lessons.findIndex((lesson) =>
        lesson.bookings.some((lb) => lb.id == booking.id)
      );

      const bookingIndex = lessons[index].bookings.findIndex(
        (lb) => lb.id == booking.id
      );

      lessons[index].bookings[bookingIndex].status = status;

      setLessons(lessons);
      setError("");
    }

    if (error) {
      setError(error);
    }
  };

  return (
    <div className="w-screen min-h-screen h-full inset-0 fixed bg-gray-900 bg-opacity-75 z-10">
      <div className="w-full">
        <div className="flex container mx-auto p-4">
          <span
            onClick={() => setActiveLesson(undefined)}
            className="text-4xl text-white cursor-pointer ml-auto"
          >
            X
          </span>
        </div>
        <div className="w-screen h-screen flex items-center justify-center p-4">
          <div className="w-full max-w-screen-sm bg-white rounded p-4 -mt-20">
            <h5 className="text-xl font-medium mb-4">Manage your booking</h5>
            <div className="grid grid-rows-2 grid-cols-2">
              <div className="flex flex-col mb-4 col-span-1 row-span-1">
                <span className="font-semibold text-sm mb-2">Time:</span>
                <p className="text-sm text-gray-700">
                  {new Date(date).toUTCString()}
                </p>
              </div>
              <div className="flex flex-col mb-4 col-span-1 row-span-1">
                <span className="font-semibold text-sm mb-2">Location:</span>
                <p className="text-sm text-gray-700">{location}</p>
              </div>
              <div className="flex flex-col mb-4 col-span-1 row-span-1">
                <span className="font-semibold text-sm mb-2">
                  Attendee Name:
                </span>
                <p className="text-sm text-gray-700">{booking.name}</p>
              </div>
              <div className="flex flex-col mb-4 col-span-1 row-span-1">
                <span className="font-semibold text-sm mb-2">
                  Attendee Email:
                </span>
                <p className="text-sm text-gray-700">{booking.email}</p>
              </div>
            </div>
            <p className="text-red-500 text-sm my-4">{error}</p>
            <button
              onClick={() => handleSubmit(lesson)}
              className="rounded bg-red-400 w-full text-white p-2"
            >
              {booking.stripePaymentIntent ? "Refund" : "Cancel"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LessonModal;
