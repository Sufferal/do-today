import { useEffect } from "react";
import { useState } from "react";

export const useTime = () => {
  const [time, setTime] = useState(new Date());
  const [period, setPeriod] = useState(
    localStorage.getItem("period") || "today"
  );
  const daysOfWeek = [
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
    "sunday",
  ];
  const months = [
    "january",
    "february",
    "march",
    "april",
    "may",
    "june",
    "july",
    "august",
    "september",
    "october",
    "november",
    "december",
  ];

  // Update localStorage whenever period changes
  useEffect(() => {
    localStorage.setItem("period", period);
  }, [period]);

  // This is for the time to update every second
  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  // This is for the time that is displayed (every second)
  const currentDate = time.toLocaleDateString(undefined, {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
  const currentTime = time.toLocaleTimeString();

  // DAY - This is for the percentage of the day that has passed
  const secondsSinceMidnight =
    time.getHours() * 3600 + time.getMinutes() * 60 + time.getSeconds();
  const totalSecondsInDay = 24 * 60 * 60;
  const dayTimePerc = (
    (secondsSinceMidnight / totalSecondsInDay) *
    100
  ).toFixed(2);

  // WEEK - This is for true or false if the day has passed
  const getWeekTime = (day, index) => {
    let timeIndex = time.getDay();
    timeIndex = timeIndex === 0 ? 7 : timeIndex;
    const argDays = {
      monday: 1,
      tuesday: 2,
      wednesday: 3,
      thursday: 4,
      friday: 5,
      saturday: 6,
      sunday: 7,
    };
    let dayIndex = argDays[day];

    if (dayIndex < timeIndex) {
      return true;
    } else if (dayIndex === timeIndex && time.getHours() > 0) {
      return index < time.getHours();
    }

    return false;
  };

  // WEEK - This is for the number of hours that have passed since Monday
  const getHoursSinceMonday = () => {
    let day = time.getDay();
    day = day === 0 ? 7 : day;
    const todayHours = time.getHours();

    return (day - 1) * 24 + todayHours;
  };

  // MONTH - Get the count of days in a month
  const getMonthDays = (month) => {
    const monthDays = {
      january: 31,
      february: 28,
      march: 31,
      april: 30,
      may: 31,
      june: 30,
      july: 31,
      august: 31,
      september: 30,
      october: 31,
      november: 30,
      december: 31,
    };

    if (month === "february") {
      const year = time.getFullYear();
      if (isLeapYear(year)) {
        return 29;
      }
    }

    return monthDays[month];
  };

  // MONTH - This is to check if the day has passed
  const getMonthTime = (index) => {
    const todayDate = time.getDate();
    return index < todayDate;
  };

  // MONTH - Get days since the start of the month
  const getDaysSinceMonthStart = () => {
    return time.getDate();
  };
  
  // YEAR - Constants
  const firstDayOfYear = new Date(time.getFullYear(), 0, 1);

  // YEAR - Is the year a leap year?
  const isLeapYear = (year) => {
    return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
  };

   // YEAR - Get the day of the year (1-365)
  const getDayOfYear = (date) => {
    const diff = date - firstDayOfYear;
    const oneDay = 1000 * 60 * 60 * 24;
    const day = Math.floor(diff / oneDay);
    return day + 1;
  };

  // YEAR - This is to check if the month has passed
  const getYearTime = (month, index) => {
    const tempDayOfYear = getDayOfYear(new Date(time.getFullYear(), months.indexOf(month) + 1, index + 1));
    return tempDayOfYear < getDayOfYear(time);
  }; 

  return {
    period,
    setPeriod,
    time,
    getWeekTime,
    getHoursSinceMonday,
    currentDate,
    currentTime,
    dayTimePerc,
    daysOfWeek,
    months,
    getMonthDays,
    getMonthTime,
    getDaysSinceMonthStart,
    getDayOfYear, 
    getYearTime,
    isLeapYear 
  };
};
