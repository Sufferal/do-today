import { useEffect } from "react";
import { useState } from "react";

export const useTime = () => {
  const [time, setTime] = useState(new Date()); 
  const [period, setPeriod] = useState("today");

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  const currentDate = time.toLocaleDateString(undefined, {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
  const currentTime = time.toLocaleTimeString();

  const secondsSinceMidnight =
    time.getHours() * 3600 + time.getMinutes() * 60 + time.getSeconds();
  const totalSecondsInDay = 24 * 60 * 60;
  const dayTimePerc = ((secondsSinceMidnight / totalSecondsInDay) * 100).toFixed(2);

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

  const getHoursSinceMonday = () => {
    let day = time.getDay();
    day = day === 0 ? 7 : day; 
    const todayHours = time.getHours();

    return (day - 1) * 24 + todayHours;
  };

  return { period, setPeriod, time, getWeekTime, getHoursSinceMonday, currentDate, currentTime, dayTimePerc }; 
};
