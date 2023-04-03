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

const BookingModal = ({
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

  const handleSubmit = async (lesson: Lesson, action: String) => {
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
    }
  };

  return (
    <div className="fixed inset-0 z-10 h-full min-h-screen w-screen bg-gray-900 bg-opacity-75">
      <div className="w-full">
        <div className="container mx-auto flex p-4">
          <span
            onClick={() => setActiveLesson(undefined)}
            className="ml-auto cursor-pointer text-4xl text-white"
          >
            X
          </span>
        </div>
        <div className="flex h-screen w-screen items-center justify-center p-4">
          <div className="-mt-20 w-full max-w-screen-sm rounded bg-white p-4">
            <h5 className="mb-4 text-xl font-medium">Manage your booking</h5>
            <div className="grid grid-cols-2 grid-rows-2">
              <div className="col-span-1 row-span-1 mb-4 flex flex-col">
                <span className="mb-2 text-sm font-semibold">Time:</span>
                <p className="text-sm text-gray-700">
                  {new Date(date).toUTCString()}
                </p>
              </div>
              <div className="col-span-1 row-span-1 mb-4 flex flex-col">
                <span className="mb-2 text-sm font-semibold">Location:</span>
                <p className="text-sm text-gray-700">{location}</p>
              </div>
              <div className="col-span-1 row-span-1 mb-4 flex flex-col">
                <span className="mb-2 text-sm font-semibold">
                  Attendee Name:
                </span>
                <p className="text-sm text-gray-700">{booking.name}</p>
              </div>
              <div className="col-span-1 row-span-1 mb-4 flex flex-col">
                <span className="mb-2 text-sm font-semibold">
                  Attendee Email:
                </span>
                <p className="text-sm text-gray-700">{booking.email}</p>
              </div>
            </div>
            <p className="my-4 text-sm text-red-500">{error}</p>
            <button
              onClick={() => handleSubmit(lesson, "cancel")}
              className="mb-4 w-full rounded bg-indigo-400 p-2 text-white"
            >
              Cancel
            </button>
            {booking.stripePaymentIntent && (
              <button
                onClick={() => handleSubmit(lesson, "refund")}
                className="mb-4 w-full rounded bg-red-400 p-2 text-white"
              >
                Refund
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingModal;
