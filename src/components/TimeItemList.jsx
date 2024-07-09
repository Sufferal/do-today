import TimeItem from "./TimeItem";
import "../assets/css/Time/TimeItemList.css";
import { useBetween } from "use-between";
import { useTime } from "../hooks/useTime";

const TimeList = ({ maxWidth, cellSize, desc }) => {
  const {
    lifespan, 
    time,
    period,
    capitalize, 
    getWeekTime,
    dayTimePerc,
    daysOfWeek,
    months,
    getMonthDays,
    getMonthTime,
    getYearTime,
    getLifeTime
  } = useBetween(useTime);
  const dayItemsCount = Math.floor(dayTimePerc);

  let timeItems = [];

  if (desc === "today") {
    timeItems = Array.from({ length: 100 }, (_, index) => (
      <TimeItem
        key={index}
        isActive={index < dayItemsCount}
        cellSize={cellSize}
      />
    ));
  } else if (daysOfWeek.includes(desc)) {
    timeItems = Array.from({ length: 24 }, (_, index) => (
      <TimeItem
        key={index}
        isActive={getWeekTime(desc, index)}
        cellSize={cellSize}
      />
    ));
  } else if (months.includes(desc)) {
    timeItems = Array.from({ length: getMonthDays(desc) }, (_, index) => (
      <TimeItem
        key={index}
        isActive={getMonthTime(index)}
        cellSize={cellSize}
      />
    ));
  } else if (months.includes(desc.split("_")[1])) {
    const month = desc.split("_")[1];
    desc = month;

    timeItems = Array.from({ length: getMonthDays(month) }, (_, index) => (
      <TimeItem
        key={index}
        isActive={getYearTime(month, index)}
        cellSize={cellSize}
      />
    ));
  } else if (desc === "life") {
    timeItems = Array.from({ length: lifespan}, (_, index) => (
      <TimeItem
        key={index}
        isActive={getLifeTime(index)}
        cellSize={cellSize}
      />
    ));
  } else {
    console.log("No such period exists!");
  }

  const listStyle = { maxWidth: maxWidth };
  const descStyle =
    desc === "saturday" || desc === "sunday" ? "text-highlight" : "";

  return (
    <div className="time-list-wrapper" style={listStyle}>
      <h2 className={`list-title ${descStyle}`}>
        {capitalize(desc)}
        {period === "month" ? `, ${time.getFullYear()}` : ""}
      </h2>
      <div className="time-list">{timeItems}</div>
    </div>
  );
};

export default TimeList;
