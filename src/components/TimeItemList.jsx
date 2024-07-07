import TimeItem from "./TimeItem";
import "../assets/css/Time/TimeItemList.css";
import { useBetween } from "use-between";
import { useTime } from "../hooks/useTime";

const TimeList = ({ maxWidth, cellSize, desc }) => {
  const {
    time,
    getWeekTime,
    dayTimePerc,
    daysOfWeek,
    months,
    getMonthDays,
    getMonthTime,
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
  } else {
    console.log("No such period exists!");
  }

  const listStyle = { maxWidth: maxWidth };
  const descStyle =
    desc === "saturday" || desc === "sunday" ? "text-highlight" : "";
  const capitalize = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  return (
    <div className="time-list-wrapper" style={listStyle}>
      <h2 className={`list-title ${descStyle}`}>
        {capitalize(desc)}
        {months.includes(desc) ? `, ${time.getFullYear()}` : ""}
      </h2>
      <div className="time-list">{timeItems}</div>
    </div>
  );
};

export default TimeList;
