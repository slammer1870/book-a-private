import React, { Dispatch, useState } from "react";
import cuid from "cuid";

import Lesson from "@/interfaces/lesson";
import Booking from "@/interfaces/booking";

type LessonProps = {
  lesson: Lesson;
  setActiveLesson: React.Dispatch<React.SetStateAction<Lesson | undefined>>;
  lessons: Lesson[];
  setLessons: React.Dispatch<React.SetStateAction<Lesson[]>>;
};

const BookingCreateModal = ({
  lesson,
  setActiveLesson,
  lessons,
  setLessons,
}: LessonProps) => {
  const { id, date } = lesson;

  const [nameValue, setNameValue] = useState<String>();
  const [emailValue, setEmailValue] = useState<String>();

  const [error, setError] = useState<String>();

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();

    const url = "/api/bookings/create-booking";

    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        lesson: id,
        attendeeName: nameValue,
        attendeeEmail: emailValue,
      }),
    });

    const data = await res.json();

    const { error } = data;

    if (res.ok) {
      setActiveLesson(undefined);

      const index = lessons.findIndex((lesson) => (lesson.id = id));

      lessons[index].bookings.push(data);

      setLessons(lessons);
      window.location.reload();
      setError("");
    }

    if (error) {
      setError(error);
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
          <form
            onSubmit={(e) => handleSubmit(e)}
            className="-mt-20 w-full max-w-screen-sm rounded bg-white p-4"
          >
            <h5 className="mb-4 text-xl font-medium">
              Create a booking for {new Date(date).toUTCString()}
            </h5>
            <div className="grid grid-cols-2 grid-rows-1 gap-2">
              <div className="col-span-1 row-span-1 mb-4 flex flex-col">
                <span className="mb-2 text-sm font-semibold">
                  Attendee Name:
                </span>
                <input
                  className="rounded border p-2 text-sm font-medium"
                  type="string"
                  name="attendeeName"
                  id="attendeeName"
                  placeholder="Attendee Name"
                  onChange={(e) => setNameValue(e.currentTarget.value)}
                  required
                />
              </div>
              <div className="col-span-1 row-span-1 mb-4 flex flex-col">
                <span className="mb-2 text-sm font-semibold">
                  Attendee Email:
                </span>
                <input
                  className="rounded border p-2 text-sm font-medium"
                  type="email"
                  name="attendeeEmail"
                  id="attendeeEmail"
                  placeholder="Attendee Email"
                  onChange={(e) => setEmailValue(e.currentTarget.value)}
                  required
                />
              </div>
            </div>
            <p className="my-4 text-sm text-red-500">{error}</p>
            <button
              onClick={(e) => handleSubmit(e)}
              className="mb-4 w-full rounded bg-indigo-400 p-2 text-white"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default BookingCreateModal;
