import { useState } from "react";

import Booking from "@/interfaces/booking";

type BookingProps = {
  booking: Booking;
  setActive: React.Dispatch<React.SetStateAction<Booking | undefined>>;
  bookings: Booking[];
  setBookings: React.Dispatch<React.SetStateAction<Booking[]>>;
};

const BookingManageModal = ({
  booking,
  setActive,
  bookings,
  setBookings,
}: BookingProps) => {
  const { id, lesson, name, email, stripePaymentIntent } = booking;

  const { date, location } = lesson;

  const [error, setError] = useState<String>();

  const handleSubmit = async (booking: Booking, action: String) => {
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
          id: id,
          status: status,
          paymentIntent: stripePaymentIntent,
        }),
      });

      const data = await res.json();

      const { error } = data;

      if (res.ok) {
        setActive(undefined);

        setBookings(bookings.filter((booking) => booking.id != id));
        setError("");
      }

      if (error) {
        setError(error);
      }
    }
  };

  return (
    <div className="w-screen min-h-screen h-full inset-0 fixed bg-gray-900 bg-opacity-75 z-10">
      <div className="w-full">
        <div className="flex container mx-auto p-4">
          <span
            onClick={() => setActive(undefined)}
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
                <p className="text-sm text-gray-700">{name}</p>
              </div>
              <div className="flex flex-col mb-4 col-span-1 row-span-1">
                <span className="font-semibold text-sm mb-2">
                  Attendee Email:
                </span>
                <p className="text-sm text-gray-700">{email}</p>
              </div>
            </div>
            <p className="text-red-500 text-sm my-4">{error}</p>
            <button
              onClick={() => handleSubmit(booking, "cancel")}
              className="rounded bg-indigo-400 w-full text-white p-2 mb-4"
            >
              Cancel
            </button>
            {booking.stripePaymentIntent && (
              <button
                onClick={() => handleSubmit(booking, "refund")}
                className="rounded bg-red-400 w-full text-white p-2 mb-4"
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

export default BookingManageModal;
