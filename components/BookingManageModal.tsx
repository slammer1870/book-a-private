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
    <div className="fixed inset-0 z-10 h-full min-h-screen w-screen bg-gray-900 bg-opacity-75">
      <div className="w-full">
        <div className="container mx-auto flex p-4">
          <span
            onClick={() => setActive(undefined)}
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
                <p className="text-sm text-gray-700">{name}</p>
              </div>
              <div className="col-span-1 row-span-1 mb-4 flex flex-col">
                <span className="mb-2 text-sm font-semibold">
                  Attendee Email:
                </span>
                <p className="text-sm text-gray-700">{email}</p>
              </div>
            </div>
            <p className="my-4 text-sm text-red-500">{error}</p>
            <button
              onClick={() => handleSubmit(booking, "cancel")}
              className="mb-4 w-full rounded bg-indigo-400 p-2 text-white"
            >
              Cancel
            </button>
            {booking.stripePaymentIntent && (
              <button
                onClick={() => handleSubmit(booking, "refund")}
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

export default BookingManageModal;
