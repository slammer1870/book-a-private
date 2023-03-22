import { Dispatch, useState } from "react";
import cuid from "cuid";

type Lesson = {
  id?: String;
  date: Date;
  location?: string;
  price?: string;
  status: String;
};

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

  const [error, setError] = useState<String>();
  const [dateValue, setDateValue] = useState<Date>(new Date(date));
  const [timeValue, setTimeValue] = useState<string>(
    `${
      String(dateValue.getHours()).length < 2
        ? `0${dateValue.getHours()}`
        : `${dateValue.getHours()}`
    }:${
      String(dateValue.getMinutes()).length < 2
        ? `0${dateValue.getMinutes()}`
        : `${dateValue.getMinutes()}`
    }`
  );
  const [locationValue, setLocationValue] =
    useState<string | undefined>(location);
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

    const res = await fetch("/api/bookings/add-lesson", {
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
            <h5 className="text-xl font-medium mb-2">
              Add a new lesson for {dateValue.toDateString()}
            </h5>
            <div className="flex flex-col mb-4">
              <span className="font-semibold text-sm mb-2">Time:</span>
              <input
                type="time"
                name="time"
                id="time"
                className="text-sm font-medium p-2 border rounded"
                value={timeValue}
                onChange={(e) => setTimeValue(e.currentTarget.value)}
                required
              />
            </div>
            <div className="flex flex-col mb-4">
              <span className="font-semibold text-sm mb-2">Location:</span>
              <input
                type="string"
                name="location"
                id="location"
                className="text-sm font-medium p-2 border rounded"
                value={locationValue}
                onChange={(e) => setLocationValue(e.currentTarget.value)}
                required
              />
            </div>
            <div className="flex flex-col">
              <span className="font-semibold text-sm mb-2">Price:</span>
              <input
                type="number"
                name="price"
                id="price"
                className="text-sm font-medium p-2 border rounded"
                value={priceValue}
                onChange={(e) => setPriceValue(e.currentTarget.value)}
                required
              />
            </div>
            <p className="text-red-500 text-sm my-4">{error}</p>
            <button className="rounded bg-indigo-400 w-full text-white p-2">
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LessonModal;
