import { useState, useEffect } from "react";
import "../assets/css/Time/TimeDetails.css";

const TimeDetails = () => {
  const [time, setTime] = useState(new Date());

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

  const secondsSinceMidnight = time.getHours() * 3600 + time.getMinutes() * 60 + time.getSeconds();
  const totalSecondsInDay = 24 * 60 * 60;
  const timePerc = (secondsSinceMidnight / totalSecondsInDay * 100).toFixed(2);

  return (
    <div className="time-details">
      <h2 className="current-date">
        <span className="text-highlight">Today</span> is {currentDate}
      </h2>
      <h2 className="current-time">{currentTime}</h2>
      <h3 className="time-perc">
        Time elapsed today: <span className="text-highlight">{timePerc}%</span>
      </h3>
    </div>
  );
};

export default TimeDetails;
