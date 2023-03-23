import Layout from "@/components/Layout";
import LessonModal from "@/components/LessonModal";
import LinkStripe from "@/components/LinkStripe";
import { User } from "next-auth";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

import React, { useState, useEffect, FormEvent, use } from "react";

import Lesson from "@/interfaces/lesson";

export default function Dashboard() {
  const router = useRouter();

  const { data: session, status } = useSession();

  const loading = status == "loading";

  //get todays date
  let d = new Date();

  const [selectedDate, setSelectedDate] = useState<Date | undefined>();
  const [lessons, setLessons] = useState<Array<Lesson>>([]);
  const [filteredLessons, setFilteredLessons] = useState<Array<Lesson>>([]);
  const [activeLesson, setActiveLesson] = useState<Lesson | undefined>();

  useEffect(() => {
    const getLessons = async () => {
      const res = await fetch("/api/bookings/get-lessons", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user_id: session?.user.id as string }),
      });

      const data = await res.json();

      setLessons(data);
    };

    if (!loading && session) {
      getLessons();
    }
  }, [session, loading]);

  useEffect(() => {
    if (selectedDate) {
      const todaysLessons: Lesson[] = lessons
        .filter(
          (lesson: Lesson) =>
            new Date(lesson.date).getDate() == selectedDate.getDate()
        )
        .sort(({ date: a }, { date: b }) => (a > b ? 1 : a < b ? -1 : 0));
      setFilteredLessons(todaysLessons);
    }
  }, [activeLesson, selectedDate]);

  //set initial state of date object to be the value of todays date
  const [today, setToday] = useState(d);

  //array of strings that represent month names
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  //setting the initial state of the month string
  const [month, setMonth] = useState("");

  //calculating the number of days in a month given the month and year
  const getDays = (month: number, year: number) => {
    const days = [];
    var date = new Date(Date.UTC(year, month, 1));
    while (date.getMonth() === month) {
      days.push(new Date(date));
      date.setDate(date.getDate() + 1);
    }
    return days;
  };

  const [days, setDays] = useState(
    getDays(today.getUTCMonth(), today.getUTCFullYear())
  );

  useEffect(() => {
    setMonth(months[today.getUTCMonth()]);
    setDays(getDays(today.getUTCMonth(), today.getUTCFullYear()));
  }, [today]);

  const calcArray = (day: number) => {
    if (day > 1) {
      return day - 1;
    } else {
      return 1;
    }
  };

  if (!loading && !session) {
    return router.push("/signin");
  }

  return (
    <Layout>
      <div className="max-w-screen-md mx-auto px-4 pt-20 pb-10 min-h-screen">
        <h1 className="text-3xl font-medium mb-2">Dashboard</h1>
        {loading && <p className="text-gray-700 animate-pulse">Loading...</p>}
        {!loading && session?.user.stripeAccountVerified ? (
          <>
            <p className="text-gray-700 mb-4">Welcome to your dashboard</p>
            <div>
              <h3 className="text-2xl font-semibold mb-4">
                Manage your Bookings
              </h3>
              <div className="mb-4">
                <div className="item-center mb-4 flex justify-center bg-gray-200 p-2 text-center">
                  <span className="">Select a date</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="my-auto ml-4 h-3 w-3 rotate-90"
                  >
                    <path
                      id="Polygon_17"
                      data-name="Polygon 17"
                      d="M6.5,0,13,11.762H0Z"
                      transform="translate(11.762) rotate(90)"
                      fill="#525252"
                    />
                  </svg>
                </div>
                <div className="mb-4 flex items-center justify-between px-12">
                  {d.getMonth() < today.getMonth() ? (
                    <button
                      onClick={() =>
                        setToday(new Date(today.setMonth(today.getMonth() - 1)))
                      }
                    >
                      &#60;
                    </button>
                  ) : (
                    <span></span>
                  )}
                  <p>{month}</p>
                  {today.getMonth() - d.getMonth() < 2 ? (
                    <button
                      onClick={() =>
                        setToday(new Date(today.setMonth(today.getMonth() + 1)))
                      }
                    >
                      &#62;
                    </button>
                  ) : (
                    <span></span>
                  )}
                </div>
                <div className="mb-4 grid grid-cols-7 grid-rows-6 gap-4">
                  <p className="col-span-1 mx-auto my-auto text-center text-xs font-semibold">
                    Mon
                  </p>
                  <p className="col-span-1 mx-auto my-auto text-center text-xs font-semibold">
                    Tues
                  </p>
                  <p className="col-span-1 mx-auto my-auto text-center text-xs font-semibold">
                    Weds
                  </p>
                  <p className="col-span-1 mx-auto my-auto text-center text-xs font-semibold">
                    Thurs
                  </p>
                  <p className="col-span-1 mx-auto my-auto text-center text-xs font-semibold">
                    Fri
                  </p>
                  <p className="col-span-1 mx-auto my-auto text-center text-xs font-semibold">
                    Sat
                  </p>
                  <p className="col-span-1 mx-auto my-auto text-center text-xs font-semibold">
                    Sun
                  </p>
                  {[...Array(calcArray(days[0].getDay()))].map((x, i) => (
                    <div
                      className="mx-auto my-auto h-7 w-7 rounded-full"
                      key={i}
                    ></div>
                  ))}
                  <>
                    {days.map((day: Date) => (
                      <div key={day.toISOString()}>
                        {day >= d ? (
                          <button
                            onClick={() => {
                              setSelectedDate(day);
                            }}
                            className={`${
                              selectedDate &&
                              selectedDate == day &&
                              "border-none bg-indigo-400 text-white shadow-lg"
                            } mx-auto my-auto flex h-7 w-7 cursor-pointer items-center justify-center rounded-full border border-gray-900`}
                          >
                            <p className="border-gray-900 text-xs ">
                              {day.getDate()}
                            </p>
                          </button>
                        ) : (
                          <div className="mx-auto my-auto flex h-7 w-7 cursor-default items-center justify-center rounded-full border bg-white opacity-30">
                            <p className="border-opacity-50 text-xs text-gray-900 ">
                              {day.getDate()}
                            </p>
                          </div>
                        )}
                      </div>
                    ))}
                  </>
                </div>
              </div>
              <div className="mb-4">
                <div className="item-center mb-4 flex justify-center bg-gray-200 p-2 text-center">
                  <span className="">Select a time</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className={`${
                      selectedDate && "rotate-90"
                    } my-auto ml-4 h-3 w-3`}
                  >
                    <path
                      id="Polygon_17"
                      data-name="Polygon 17"
                      d="M6.5,0,13,11.762H0Z"
                      transform="translate(11.762) rotate(90)"
                      fill="#525252"
                    />
                  </svg>
                </div>
                <div>
                  {selectedDate && (
                    <>
                      <button
                        onClick={() =>
                          setActiveLesson({
                            date: selectedDate,
                            location: undefined,
                            price: undefined,
                            status: "unbooked",
                          })
                        }
                        className="border border-dashed p-4 mb-4 w-full text-center text-gray-700 font-thin text-xl"
                      >
                        + Add a new lesson
                      </button>
                      <div className="flex flex-col">
                        {filteredLessons.map((lesson: Lesson) => (
                          <>
                            <div
                              key={new Date(lesson.date).toISOString()}
                              className={`rounded-md border p-4 text-sm flex justify-around mb-4`}
                            >
                              <div className="grid grid-cols-2 grid-rows-2 gap-4 w-full">
                                <div className="flex flex-col col-span-1 row-span-1">
                                  <div className="my-auto">
                                    <p className="font-semibold">Date:</p>
                                    <span>
                                      {new Date(lesson.date).toLocaleString()}
                                    </span>
                                  </div>
                                </div>
                                <div className="flex flex-col col-span-1 row-span-1">
                                  <div className="my-auto">
                                    <p className="font-semibold">Location:</p>
                                    <span>{lesson.location}</span>
                                  </div>
                                </div>
                                <div className="flex flex-col col-span-1 row-span-1">
                                  <div className="my-auto">
                                    <p className="font-semibold">Price:</p>
                                    <span>€{lesson.price}</span>
                                  </div>
                                </div>
                                <div className="flex flex-col col-span-1 row-span-1">
                                  <div className="my-auto">
                                    <p className="font-semibold">Status:</p>
                                    <span>{lesson.status}</span>
                                  </div>
                                </div>
                              </div>
                              <div className="grid col-span-1 gap-1 grid-rows-2">
                                <button
                                  onClick={() => setActiveLesson(lesson)}
                                  className="bg-indigo-400 w-full col-span-1 h-min text-white px-4 py-2 my-auto rounded ml-auto"
                                >
                                  Edit
                                </button>
                                <button
                                  onClick={() => setActiveLesson(undefined)}
                                  className="bg-red-400 col-span-1 w-full text-white h-min my-auto px-4 py-2 rounded ml-auto"
                                >
                                  Delete
                                </button>
                              </div>
                            </div>
                          </>
                        ))}
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
            {activeLesson && (
              <LessonModal
                lesson={activeLesson}
                setActiveLesson={setActiveLesson}
                lessons={lessons}
                setLessons={setLessons}
              />
            )}
          </>
        ) : (
          <LinkStripe />
        )}
      </div>
    </Layout>
  );
}
