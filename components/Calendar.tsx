import React, { useState, useEffect } from "react";

type CalendarProps = {
  availableDays: Date[];
  selectedDate?: Date;
  selectDate: (day: Date) => void;
};

const Calendar = ({
  availableDays,
  selectedDate,
  selectDate,
}: CalendarProps) => {
  //get todays date
  let d = new Date();

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
    var date = new Date(year, month, 1);
    while (date.getMonth() === month) {
      days.push(new Date(date));
      date.setDate(date.getDate() + 1);
    }
    return days;
  };

  const [days, setDays] = useState(
    getDays(today.getMonth(), today.getFullYear())
  );

  useEffect(() => {
    setMonth(months[today.getMonth()]);
    setDays(getDays(today.getMonth(), today.getFullYear()));
  }, [today]);

  // calculate how many spaces need to be taken up by empty boxes on the calender given the start date of the month
  const calcArray = (day: number) => {
    if (day > 1) {
      return day - 1;
    } else {
      return 1;
    }
  };

  return (
    <>
      <div className="mb-4 flex items-center justify-between px-12">
        {d.getMonth() + d.getFullYear() <
        today.getMonth() + today.getFullYear() ? (
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
        {today.getMonth() <
        availableDays[availableDays.length - 1]?.getMonth() ? (
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
      <div className="mb-8 grid grid-cols-7 grid-rows-6 gap-4">
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
        {[...Array(calcArray(days[0]?.getDay()))].map((x, i) => (
          <div className="mx-auto my-auto h-7 w-7 rounded-full" key={i}></div>
        ))}
        <>
          {days.map((day: Date) => (
            <div key={day.toISOString()}>
              {day >= d &&
              availableDays.some(
                (av: Date) =>
                  av.getDate() == day.getDate() &&
                  av.getMonth() == day.getMonth() &&
                  av.getFullYear() == day.getFullYear()
              ) ? (
                <button
                  onClick={() => {
                    selectDate(day);
                  }}
                  className={`${
                    selectedDate &&
                    selectedDate == day &&
                    "border-none bg-indigo-400 text-white shadow-lg"
                  } mx-auto my-auto flex h-7 w-7 cursor-pointer items-center justify-center rounded-full border border-gray-900`}
                >
                  <p className="border-gray-900 text-xs ">{day.getDate()}</p>
                </button>
              ) : (
                <div className="mx-auto my-auto flex h-7 w-7 cursor-not-allowed items-center justify-center rounded-full border bg-white opacity-30">
                  <p className="border-opacity-50 text-xs text-gray-900 ">
                    {day.getDate()}
                  </p>
                </div>
              )}
            </div>
          ))}
        </>
      </div>
    </>
  );
};

export default Calendar;
