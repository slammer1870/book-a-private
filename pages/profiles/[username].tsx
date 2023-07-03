import Calendar from "@/components/Calendar";
import Layout from "@/components/Layout";
import { Lesson } from "@prisma/client";
import { useRouter } from "next/router";

import CheckoutForm from "@/components/CheckoutForm";

import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

import React, { useEffect, useState } from "react";

import { User } from "@prisma/client";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string
);

export default function Profile() {
  const router = useRouter();

  const { username } = router.query;

  const d = new Date();
  const theDayOfTheMonthOnNextWeek = d.getDate() + 7;
  d.setDate(theDayOfTheMonthOnNextWeek);

  const [user, setUser] = useState<User | undefined>();
  const [userLessons, setUserLessons] = useState<Lesson[]>([]);
  const [loadingState, setLoadingState] = useState<Boolean>();

  const [selectedDate, setSelectedDate] = useState<Date | undefined>();
  const [selectedLesson, setSelectedLesson] = useState<Lesson | undefined>();

  const [name, setName] = useState<string>();
  const [email, setEmail] = useState<string>();

  const [modal, setModal] = useState<Boolean>();

  const [clientSecret, setClientSecret] = useState();

  useEffect(() => {
    const getUser = async () => {
      setLoadingState(true);
      const res = await fetch("/api/profiles/get-user", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: username as string }),
      });

      const data = await res.json();

      const { error } = data;

      if (error) {
        setUser(undefined);
        setLoadingState(false);
        return;
      }

      setUser(data);
      setLoadingState(false);
    };

    getUser();
  }, [router, username]);

  useEffect(() => {
    const getUserLessons = async () => {
      setLoadingState(true);
      const res = await fetch("/api/profiles/get-user-lessons", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: username as string }),
      });

      const data = await res.json();

      const { error } = data;

      if (error) {
        setUserLessons([]);
        setLoadingState(false);
        return;
      }

      setUserLessons(data);
      setLoadingState(false);
    };

    if (user) {
      getUserLessons();
    }
  }, [user]);

  const filterDates = (lessons: Lesson[]) => {
    if (lessons?.length >= 1) {
      return lessons.map((lesson) => new Date(lesson.date));
    } else return [];
  };

  const filterTimes = (date: Date) => {
    return userLessons.filter(
      (userLesson) =>
        new Date(userLesson.date).getDate() == date.getDate() &&
        new Date(userLesson.date).getMonth() == date.getMonth() &&
        new Date(userLesson.date).getFullYear() == date.getFullYear()
    );
  };

  const appearance = {
    theme: "flat",

    variables: {
      borderRadius: "0px",
      spacingUnit: "3px",
      // See all possible variables below
    },
  };

  const options = {
    clientSecret,
    appearance,
  };

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();

    fetch(`/api/stripe/create-payment-intent`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: name,
        email: email,
        lesson: selectedLesson,
      }),
    })
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret));
    setModal(true);
  };

  return (
    <Layout>
      <div className="mx-auto min-h-screen max-w-screen-md px-4 pt-20 pb-10">
        {loadingState && !user && (
          <h1 className="mb-4 text-3xl font-medium">Loading...</h1>
        )}
        {user && (
          <div className="mb-4">
            <h1 className="mb-2 text-3xl font-medium">
              {user.name}&apos;s Booking Profile
            </h1>
            <p className="">{user.blurb}</p>
          </div>
        )}
        {!user && !loadingState && (
          <h1 className="mt-20 text-3xl font-medium">
            Booking Profile not found for User with username {username}
          </h1>
        )}

        {modal && clientSecret ? (
          <>
            <button
              onClick={() => setModal(false)}
              className="mb-2 font-medium underline"
            >
              &larr; Click here to go back
            </button>
            <h3 className="mb-4 text-2xl font-medium">
              Your booking information
            </h3>
            <div className="mb-4 grid grid-cols-2 grid-rows-2 gap-4 border-b pb-4">
              <div className="col-span-1 flex flex-col">
                <h6 className="mb-1 text-sm font-medium">Location:</h6>
                <p>Brú Grappling Studio</p>
              </div>
              <div className="col-span-1 flex flex-col">
                <h6 className="mb-1 text-sm font-medium">Date and time:</h6>
                <p>{new Date(selectedLesson?.date).toLocaleString()}</p>
              </div>
              <div className="col-span-1 flex flex-col">
                <h6 className="mb-1 text-sm font-medium">Instructor:</h6>
                <p>{user?.name}</p>
              </div>
              <div className="col-span-1 flex flex-col">
                <h6 className="mb-1 text-sm font-medium">
                  Email (for your booking confirmation):
                </h6>
                <p>{email}</p>
              </div>
            </div>
            <div className="mb-10 flex items-center justify-between">
              <h6 className="mb-1 font-medium">Total:</h6>
              <p>€{selectedLesson?.price}</p>
            </div>
            <Elements
              stripe={stripePromise}
              options={{
                appearance: {
                  variables: {
                    borderRadius: "0px",
                    spacingUnit: "3px",
                    // See all possible variables below
                  },
                },
                clientSecret: clientSecret,
              }}
            >
              <CheckoutForm user={user?.username as String} />
            </Elements>
          </>
        ) : (
          <>
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
              selectDate={setSelectedDate}
              availableDays={filterDates(userLessons)}
              selectedDate={selectedDate}
            />
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
            {selectedDate && (
              <div className="mb-4 flex-wrap space-x-2 space-y-2">
                {filterTimes(selectedDate).map((lesson, i) => (
                  <div
                    onClick={() => setSelectedLesson(lesson)}
                    className={`${
                      selectedLesson == lesson && "bg-indigo-400 text-white"
                    } mb-4 flex items-start justify-around rounded-lg border p-4`}
                    key={i}
                  >
                    <div className="flex flex-col">
                      <span className="mb-1 font-medium">Time:</span>
                      <p>{new Date(lesson.date).toLocaleTimeString()}</p>
                    </div>
                    <div className="flex w-1/4 flex-col overflow-auto">
                      <span className="mb-1 font-medium">Location:</span>
                      <p>{lesson.location}</p>
                    </div>
                    <div className="flex flex-col">
                      <span className="mb-1 font-medium">Price:</span>
                      <p>€{lesson.price}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
            <div className="item-center mb-4 flex justify-center bg-gray-200 p-2 text-center">
              <span className="">Enter your details</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className={`${
                  selectedLesson && "rotate-90"
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
            {selectedLesson && (
              <form onSubmit={handleSubmit}>
                <div className="mb-4 flex flex-wrap">
                  <div className="w-full">
                    <label
                      className="mb-2 block text-xs font-bold tracking-wide text-gray-700"
                      htmlFor="name"
                    >
                      Name
                    </label>
                    <input
                      className="block w-full appearance-none rounded border border-gray-200 p-2 leading-tight text-gray-700 focus:border-gray-500 focus:bg-white focus:outline-none"
                      id="name"
                      type="text"
                      name="name"
                      placeholder="Name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                    />
                  </div>
                </div>
                <div className="mb-4 flex flex-wrap lg:mb-0">
                  <div className="mb-2 w-full">
                    <label
                      className="mb-2 block text-xs font-bold tracking-wide text-gray-700"
                      htmlFor="grid-password"
                    >
                      Email
                    </label>
                    <input
                      className="mb-3 block w-full appearance-none rounded border border-gray-200 p-2 leading-tight text-gray-700 focus:border-gray-500 focus:bg-white focus:outline-none"
                      id="email"
                      type="email"
                      name="email"
                      placeholder="Email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                  <button className="w-full bg-indigo-400 px-4 py-2 text-white">
                    Complete your booking
                  </button>
                </div>
              </form>
            )}
          </>
        )}
      </div>
    </Layout>
  );
}
