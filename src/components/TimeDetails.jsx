import { useBetween } from "use-between";
import { useTime } from "../hooks/useTime";
import "../assets/css/Time/TimeDetails.css";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import TimeItem from "./TimeItem";
import Birthday from "./Birthday";
import Lifespan from "./Lifespan";

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
    getAge,
    isLeapYear,
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

    case "life":
      detailOutput = getAge() +  " years";
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
            <MenuItem value={"life"}>Life</MenuItem>
          </Select>
        </FormControl>
        <span className="text-highlight">{detailOutput}</span>
      </h3>

      {period === "life" && (
        <div className="time-life-wrapper">
          <div className="time-life-input">
            <h3 className="text-highlight">Date of birth</h3>
            <Birthday />
          </div>
          <div className="time-life-input">
            <h3>Expected lifespan</h3>
            <div className="time-lifespan-wrapper">
              <Lifespan />
              <h3> years</h3>
            </div>
          </div>
        </div>
      )}

      <div className="time-legend">
        <div className="legend-option">
          <TimeItem isActive={false} />
          <h3 className="legend-title"> - remaining</h3>
        </div>
        <div className="legend-option">
          <TimeItem isActive={true} />
          <h3 className="legend-title"> - elapsed</h3>
        </div>
        <div className="legend-option">
          <TimeItem isActive={true} isCurrent={true} />
          <h3 className="legend-title"> - current</h3>
        </div>
      </div>
    </div>
  );
};

export default TimeDetails;
