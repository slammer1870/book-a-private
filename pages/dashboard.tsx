import Layout from "@/components/Layout";
import LessonModal from "@/components/LessonModal";
import BookingModal from "@/components/BookingModal";
import LinkStripe from "@/components/LinkStripe";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

import React, { useState, useEffect } from "react";

import Lesson from "@/interfaces/lesson";
import Booking from "@/interfaces/booking";
import Link from "next/link";
import BookingCreateModal from "@/components/BookingCreateModal";

import Calendar from "@/components/Calendar";

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
  const [booking, setBooking] = useState<Lesson | undefined>();
  const [bookingForm, setBookingForm] = useState<Lesson | undefined>();

  const [blurb, setBlurb] = useState<string>(session?.user.blurb as string);
  const [editBlurb, setEditBlurb] = useState<Boolean>();

  const [error, setError] = useState();

  useEffect(() => {
    setBlurb(session?.user.blurb as string);
  }, [session]);

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
            new Date(lesson.date).getDate() == selectedDate.getDate() &&
            new Date(lesson.date).getMonth() == selectedDate.getMonth()
        )
        .sort(({ date: a }, { date: b }) => (a > b ? 1 : a < b ? -1 : 0));
      setFilteredLessons(todaysLessons);
    }
  }, [activeLesson, selectedDate, lessons]);

  //set initial state of date object to be the value of todays date
  const [today, setToday] = useState(d);

  //array of strings that represent month names
  const months: String[] = [
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
  const [month, setMonth] = useState<String>();

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

  const generateDateArray = () => {
    const dateArray: Date[] = [];
    const startDate = new Date();
    const endDate = new Date();
    endDate.setDate(endDate.getDate() + 90);

    while (startDate <= endDate) {
      dateArray.push(new Date(startDate));
      startDate.setDate(startDate.getDate() + 1);
    }

    return dateArray;
  };

  // filter for lessons with active bookings
  const filterBookings = (lessons: Lesson[]) => {
    return lessons.filter(
      (lesson: Lesson) =>
        hasActiveBooking(lesson) &&
        lesson.bookings?.map((booking: Booking) => booking.status == "active")
    );
  };

  const hasActiveBooking = (lesson: Lesson) => {
    return lesson.bookings?.some((booking) => booking.status == "active");
  };

  // filter for booking that is active
  const activeBooking = (lesson: Lesson) => {
    return lesson.bookings?.find(
      (booking) => booking.status == "active"
    ) as Booking;
  };

  const upcomingBookings: Lesson[] = filterBookings(lessons);

  const handleDelete = async (lesson: Lesson) => {
    if (confirm("Are you sure you want to delete this?")) {
      const res = await fetch("/api/bookings/delete-lesson", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: lesson.id,
          date: lesson.date,
          location: lesson.location,
          price: lesson.price,
          available: false,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        setLessons(lessons.filter((lesson) => lesson.date != data.date));
      }
    }
  };

  const handleBlurbEdit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch("/api/profiles/edit-blurb", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        blurb: blurb,
      }),
    });

    const { data, error } = await res.json();

    if (!res.ok) {
      setError(error);
    } else {
      setEditBlurb(false);
    }
  };

  if (!loading && !session) {
    return router.push("/signin");
  }

  return (
    <Layout>
      <div className="mx-auto min-h-screen max-w-screen-md px-4 pt-20 pb-10">
        <h1 className="mb-2 text-3xl font-medium">Dashboard</h1>
        {loading && <p className="animate-pulse text-gray-700">Loading...</p>}
        {!loading && session?.user.stripeAccountVerified ? (
          <>
            <div className="mb-4 flex flex-wrap">
              <p className="mb-2 pr-2 text-start text-gray-700">
                Welcome to your dashboard, your public profile url is:
              </p>
              <Link href={`/profiles/${session.user.username}`}>
                <span className="underline">
                  {process.env.NEXT_PUBLIC_URL}/profiles/
                  {session.user.username}
                </span>
              </Link>
            </div>
            {upcomingBookings.length >= 1 && (
              <div className="mb-4">
                <h3 className="mb-4 text-2xl font-semibold">
                  Your upcoming bookings
                </h3>
                <div className="flex flex-col">
                  {upcomingBookings.map((lesson: Lesson) => (
                    <div
                      key={new Date(lesson.date).toUTCString()}
                      className="mb-4 flex justify-around rounded-md border p-4 text-sm"
                    >
                      <div className="grid w-full grid-cols-2 grid-rows-2 gap-4">
                        <div className="col-span-1 row-span-1 flex flex-col">
                          <div className="my-auto">
                            <p className="font-semibold">Date:</p>
                            <span>
                              {new Date(lesson.date).toLocaleString()}
                            </span>
                          </div>
                        </div>
                        <div className="col-span-1 row-span-1 flex flex-col">
                          <div className="my-auto">
                            <p className="font-semibold">Location:</p>
                            <span>{lesson.location}</span>
                          </div>
                        </div>
                        <div className="col-span-1 row-span-1 flex flex-col">
                          <div className="my-auto">
                            <p className="font-semibold">Attendee Name:</p>
                            <span>{activeBooking(lesson).name}</span>
                          </div>
                        </div>
                        <div className="col-span-1 row-span-1 flex flex-col">
                          <div className="my-auto">
                            <p className="font-semibold">Attendee Email:</p>
                            <span>{activeBooking(lesson).email}</span>
                          </div>
                        </div>
                      </div>
                      <div className="col-span-1 grid w-24 grid-rows-2 gap-1 md:w-40">
                        <button
                          onClick={() => setBooking(lesson)}
                          className="col-span-1 row-span-2 my-auto ml-auto h-min w-full rounded bg-green-400 px-4 py-2 text-white"
                        >
                          Manage this Booking
                        </button>
                      </div>
                    </div>
                  ))}
                  {upcomingBookings.length > 3 && (
                    <div className="my-4 flex">
                      <Link href="/bookings" className="ml-auto underline">
                        See all upcoming bookings &rarr;
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            )}
            <div className="mb-4">
              <div className="mb-4 flex items-center justify-between ">
                <h3 className="text-2xl font-semibold">Your Profile Info</h3>
                {!editBlurb && (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24.362 24.362"
                    className="h-8 w-6 fill-gray-900"
                    onClick={() => setEditBlurb(true)}
                  >
                    <path
                      id="pen-to-square-solid"
                      d="M22.674,6.065a2.69,2.69,0,0,0-3.808,0L17.419,7.507l4.707,4.707,1.447-1.447a2.69,2.69,0,0,0,0-3.808ZM8.289,16.642a2.656,2.656,0,0,0-.649,1.053L6.217,21.964A1.16,1.16,0,0,0,6.5,23.147a1.145,1.145,0,0,0,1.183.279L11.947,22A2.784,2.784,0,0,0,13,21.354l8.044-8.048L16.332,8.594ZM4.616,8.1A4.617,4.617,0,0,0,0,12.714V25.022a4.617,4.617,0,0,0,4.616,4.616H16.924a4.617,4.617,0,0,0,4.616-4.616V20.406a1.539,1.539,0,0,0-3.077,0v4.616a1.537,1.537,0,0,1-1.539,1.539H4.616a1.537,1.537,0,0,1-1.539-1.539V12.714a1.537,1.537,0,0,1,1.539-1.539H9.231a1.539,1.539,0,1,0,0-3.077Z"
                      transform="translate(0 -5.275)"
                    />
                  </svg>
                )}
              </div>
              {!editBlurb ? (
                <p>{blurb}</p>
              ) : (
                <form className="flex flex-col" onSubmit={handleBlurbEdit}>
                  <textarea
                    name="blurb"
                    aria-multiline="true"
                    className="mb-4 w-full rounded border p-2"
                    placeholder="e.g. 'Hello and welcome to my profile.&#10;Bookings are refundable up to 24 hours before booking start time.'"
                    {...(blurb && { value: blurb })}
                    onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                      setBlurb(e.target.value)
                    }
                  ></textarea>
                  {error && (
                    <p className="text-sm font-medium text-red-500">{error}</p>
                  )}

                  <button
                    type="submit"
                    className="ml-auto mt-2 rounded bg-indigo-400 px-4 py-2 text-white"
                  >
                    Submit
                  </button>
                </form>
              )}
            </div>
            <div>
              <h3 className="mb-4 text-2xl font-semibold">
                Manage your Availability
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
                <Calendar
                  selectedDate={selectedDate}
                  selectDate={setSelectedDate}
                  availableDays={generateDateArray()}
                />
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
                            booked: false,
                            available: true,
                            bookings: [],
                          })
                        }
                        className="mb-4 w-full border border-dashed p-4 text-center text-xl font-thin text-gray-700"
                      >
                        + Add a new lesson
                      </button>
                      <div className="flex flex-col">
                        {lessons
                          .filter(
                            (lesson) =>
                              new Date(lesson.date).toDateString() ==
                              selectedDate.toDateString()
                          )
                          ?.map((lesson: Lesson) => (
                            <>
                              <div
                                key={new Date(lesson.date).toISOString()}
                                className={`mb-4 flex justify-between rounded-md border p-4 text-sm`}
                              >
                                <div className="grid w-2/3 grid-cols-2 grid-rows-2 gap-4">
                                  <div className="col-span-1 row-span-1 flex flex-col">
                                    <div className="my-auto">
                                      <p className="font-semibold">Date:</p>
                                      <span>
                                        {new Date(lesson.date).toLocaleString()}
                                      </span>
                                    </div>
                                  </div>
                                  <div className="col-span-1 row-span-1 flex flex-col">
                                    <div className="my-auto overflow-auto">
                                      <p className="font-semibold">Location:</p>
                                      <span>{lesson.location}</span>
                                    </div>
                                  </div>
                                  <div className="col-span-1 row-span-1 flex flex-col">
                                    <div className="my-auto">
                                      <p className="font-semibold">Price:</p>
                                      <span>€{lesson.price}</span>
                                    </div>
                                  </div>
                                  <div className="col-span-1 row-span-1 flex flex-col">
                                    <div className="my-auto">
                                      <p className="font-semibold">Status:</p>
                                      {hasActiveBooking(lesson) ? (
                                        <p>booked</p>
                                      ) : (
                                        <p>unbooked</p>
                                      )}
                                    </div>
                                  </div>
                                </div>
                                <div className="col-span-1 grid w-24 grid-rows-2 gap-1 md:w-40">
                                  {hasActiveBooking(lesson) ? (
                                    <button
                                      onClick={() => setBooking(lesson)}
                                      className="col-span-1 row-span-2 my-auto ml-auto h-min w-full rounded bg-green-400 px-4 py-2 text-white"
                                    >
                                      Manage this Booking
                                    </button>
                                  ) : (
                                    <>
                                      <button
                                        onClick={() => setBookingForm(lesson)}
                                        className="col-span-1 my-auto ml-auto h-min w-full rounded bg-green-400 px-4 py-2 text-white"
                                      >
                                        Create a booking
                                      </button>
                                      <button
                                        onClick={() => setActiveLesson(lesson)}
                                        className="col-span-1 my-auto ml-auto h-min w-full rounded bg-indigo-400 px-4 py-2 text-white md:mb-2 md:mt-1"
                                      >
                                        Edit
                                      </button>
                                      <button
                                        onClick={() => handleDelete(lesson)}
                                        className="col-span-1 my-auto ml-auto h-min w-full rounded bg-red-400 px-4 py-2 text-white"
                                      >
                                        Delete
                                      </button>
                                    </>
                                  )}
                                </div>
                              </div>
                            </>
                          ))}
                      </div>
                    </>
                  )}
                </div>
                <div className="mb-4">
                  <h3 className="mb-2 text-2xl font-semibold">
                    Manange all bookings
                  </h3>
                  <div className="flex items-end justify-between md:justify-start">
                    <p className="w-1/2 text-start text-gray-700 md:w-auto">
                      To manage all of your bookings:
                    </p>
                    <Link href="/bookings/manage" className="ml-2 underline">
                      follow this link &rarr;
                    </Link>
                  </div>
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
            {booking && (
              <BookingModal
                lesson={booking}
                setActiveLesson={setBooking}
                lessons={lessons}
                setLessons={setLessons}
              />
            )}
            {bookingForm && (
              <BookingCreateModal
                lesson={bookingForm}
                setActiveLesson={setBookingForm}
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
