import { Dispatch, useState } from "react";
import cuid from "cuid";

import Lesson from "@/interfaces/lesson";

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
  const { id, date, location, price } = lesson;

  const formatTime = (date: Date) => {
    return `${
      String(date.getHours()).length < 2
        ? `0${date.getHours()}`
        : `${date.getHours()}`
    }:${
      String(date.getMinutes()).length < 2
        ? `0${date.getMinutes()}`
        : `${date.getMinutes()}`
    }`;
  };

  const [error, setError] = useState<String>();
  const [dateValue, setDateValue] = useState<Date>(new Date(date));
  const [timeValue, setTimeValue] = useState<string>(formatTime(dateValue));
  const [locationValue, setLocationValue] = useState<string | undefined>(
    location
  );
  const [priceValue, setPriceValue] = useState<string | undefined>(price);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const time = e.currentTarget.time.value.split(":");
    const newDate = new Date(
      dateValue.getFullYear(),
      dateValue.getMonth(),
      dateValue.getDate(),
      time[0],
      time[1]
    );

    const url = lesson.id
      ? "/api/bookings/edit-lesson"
      : "/api/bookings/add-lesson";

    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: id || cuid(),
        date: newDate,
        location: locationValue,
        price: priceValue,
      }),
    });

    const data = await res.json();

    const { error } = data;

    if (res.ok) {
      setActiveLesson(undefined);
      setLessons([
        ...lessons.filter((lessoning) => lessoning.id != lesson.id),
        data,
      ]);
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
            <h5 className="mb-2 text-xl font-medium">
              Add a new lesson for {dateValue.toDateString()}
            </h5>
            <div className="mb-4 flex flex-col">
              <span className="mb-2 text-sm font-semibold">Time:</span>
              <input
                type="time"
                name="time"
                id="time"
                className="rounded border p-2 text-sm font-medium"
                value={timeValue}
                onChange={(e) => setTimeValue(e.currentTarget.value)}
                required
              />
            </div>
            <div className="mb-4 flex flex-col">
              <span className="mb-2 text-sm font-semibold">Location:</span>
              <input
                type="string"
                name="location"
                id="location"
                className="rounded border p-2 text-sm font-medium"
                value={locationValue}
                onChange={(e) => setLocationValue(e.currentTarget.value)}
                required
              />
            </div>
            <div className="flex flex-col">
              <span className="mb-2 text-sm font-semibold">Price:</span>
              <input
                type="number"
                name="price"
                id="price"
                className="rounded border p-2 text-sm font-medium"
                value={priceValue}
                onChange={
                  lesson.booked
                    ? () =>
                        setError("Prices of booked lessons cannot be changed")
                    : (e) => setPriceValue(e.currentTarget.value)
                }
                required
              />
            </div>
            <p className="my-4 text-sm text-red-500">{error}</p>
            <button className="w-full rounded bg-indigo-400 p-2 text-white">
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LessonModal;
