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
          <form
            onSubmit={(e) => handleSubmit(e)}
            className="w-full max-w-screen-sm bg-white rounded p-4 -mt-20"
          >
            <h5 className="text-xl font-medium mb-4">
              Create a booking for {new Date(date).toUTCString()}
            </h5>
            <div className="grid grid-rows-1 gap-2 grid-cols-2">
              <div className="flex flex-col mb-4 col-span-1 row-span-1">
                <span className="font-semibold text-sm mb-2">
                  Attendee Name:
                </span>
                <input
                  className="text-sm font-medium p-2 border rounded"
                  type="string"
                  name="attendeeName"
                  id="attendeeName"
                  placeholder="Attendee Name"
                  onChange={(e) => setNameValue(e.currentTarget.value)}
                  required
                />
              </div>
              <div className="flex flex-col mb-4 col-span-1 row-span-1">
                <span className="font-semibold text-sm mb-2">
                  Attendee Email:
                </span>
                <input
                  className="text-sm font-medium p-2 border rounded"
                  type="email"
                  name="attendeeEmail"
                  id="attendeeEmail"
                  placeholder="Attendee Email"
                  onChange={(e) => setEmailValue(e.currentTarget.value)}
                  required
                />
              </div>
            </div>
            <p className="text-red-500 text-sm my-4">{error}</p>
            <button
              onClick={(e) => handleSubmit(e)}
              className="rounded bg-indigo-400 w-full text-white p-2 mb-4"
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
