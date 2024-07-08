import { useBetween } from "use-between";
import { useTime } from "../hooks/useTime";
import "../assets/css/Time/TimeDetails.css";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import TimeItem from "./TimeItem";

const TimeDetails = () => {
  const {
    time,
    months,
    period,
    setPeriod,
    getHoursSinceMonday,
    currentDate,
    currentTime,
    dayTimePerc,
    getMonthDays,
    getDaysSinceMonthStart,
    getDayOfYear,
    isLeapYear 
  } = useBetween(useTime);

  const yearDays = isLeapYear(time.getFullYear()) ? 366 : 365;
  let detailOutput = "";
  switch (period) {
    case "today":
      detailOutput = dayTimePerc + " / 100%";
      break;

    case "week":
      detailOutput = getHoursSinceMonday() + " / 168 hours";
      break;

    case "month":
      detailOutput =
        getDaysSinceMonthStart() +
        " / " +
        getMonthDays(months[time.getMonth()]) +
        " days";
      break;

    case "year":
      detailOutput = getDayOfYear(time) + " / " + yearDays + " days";
      break;

    default:
      console.log("No such period exists!");
  }

  const handleChange = (event) => {
    setPeriod(event.target.value);
  };

  return (
    <div className="time-details">
      <h2 className="current-date">
        <span className="text-highlight">Today</span> is {currentDate}
      </h2>
      <h2 className="current-time">{currentTime}</h2>
      <h3 className="time-perc-title">
        Time elapsed
        <FormControl>
          <Select
            value={period}
            onChange={handleChange}
            displayEmpty
            inputProps={{ "aria-label": "Without label" }}
          >
            <MenuItem value={"today"}>Today</MenuItem>
            <MenuItem value={"week"}>Week</MenuItem>
            <MenuItem value={"month"}>Month</MenuItem>
            <MenuItem value={"year"}>Year</MenuItem>
          </Select>
        </FormControl>
        <span className="text-highlight">{detailOutput}</span>
      </h3>
      <div className="time-legend">
        <div className="legend-option">
          <TimeItem isActive={false} />
          <h3 className="legend-title"> - remaining</h3>
        </div>
        <div className="legend-option">
          <TimeItem isActive={true} />
          <h3 className="legend-title"> - elapsed</h3>
        </div>
      </div>
    </div>
  );
};

export default TimeDetails;
