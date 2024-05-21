import TimeItem from "./TimeItem";
import "../assets/css/Time/TimeList.css";

const TimeList = () => {
  const timeItems = Array.from({ length: 100 }, (_, index) => (
    <TimeItem key={index} />
  ));

  return (
    <div className="time-list-wrapper">
      <h2 className="time-list-title">
        <span className="text-highlight">Time</span> Cells
      </h2>
      <div className="time-list">{timeItems}</div>
    </div>
  );
};

export default TimeList;
