import Calendar from "@/components/Calendar";
import Layout from "@/components/Layout";
import { Lesson } from "@prisma/client";
import { useRouter } from "next/router";

import { useEffect, useState } from "react";

type User = {
  name: String;
  username: String;
};

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

  return (
    <Layout>
      <div className="mx-auto min-h-screen max-w-screen-md px-4 pt-20 pb-10">
        {loadingState && !user && (
          <h1 className="mb-2 text-3xl font-medium">Loading...</h1>
        )}
        {user && (
          <h1 className="mb-8 text-3xl font-medium">
            {user.name}&apos;s Booking Profile
          </h1>
        )}
        {!user && !loadingState && (
          <h1 className="mt-20 text-3xl font-medium">
            Booking Profile not found for User with username {username}
          </h1>
        )}
        <Calendar
          selectDate={setSelectedDate}
          availableDays={filterDates(userLessons)}
          selectedDate={selectedDate}
        />
        {selectedDate && (
          <div className="flex-wrap space-x-2 space-y-2">
            {filterTimes(selectedDate).map((date) => (
              <button className="rounded border p-2">
                {new Date(date.date).toLocaleTimeString()}
              </button>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
}
