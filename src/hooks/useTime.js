import { useEffect } from "react";
import { useState } from "react";

export const useTime = () => {
  const [time, setTime] = useState(new Date()); 
  const [period, setPeriod] = useState(
    localStorage.getItem("period") ||  
    "today"
  );

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
  const dayTimePerc = ((secondsSinceMidnight / totalSecondsInDay) * 100).toFixed(2);

  // WEEK - This is for the percentage of the week that has passed
  const getWeekTime = (day, index) => {
    let timeIndex = time.getDay();
    timeIndex = timeIndex === 0 ? 7 : timeIndex;
    const argDays = {
      "monday": 1,
      "tuesday": 2,
      "wednesday": 3,
      "thursday": 4,
      "friday": 5,
      "saturday": 6,
      "sunday": 7,
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

  return { period, setPeriod, time, getWeekTime, getHoursSinceMonday, currentDate, currentTime, dayTimePerc }; 
};
