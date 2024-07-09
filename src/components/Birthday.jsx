import { useState, useEffect } from "react";
import "../assets/css/Date/Birthday.css";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { useBetween } from "use-between";
import { useTime } from "../hooks/useTime";

const DatePicker = () => {
  const { setBirthday, months, capitalize, isLeapYear } =
    useBetween(useTime);
  const [dayOfBirth, setDayOfBirth] = useState(1);
  const [monthOfBirth, setMonthOfBirth] = useState(1);
  const [yearOfBirth, setYearOfBirth] = useState(2000);
  const [dayOptions, setDayOptions] = useState([]);

  useEffect(() => {
    const daysInMonth = (month, year) => {
      // February
      if (month === 2) {
        return isLeapYear(year) ? 29 : 28;
      }
      // April, June, September, November
      else if ([4, 6, 9, 11].includes(month)) {
        return 30;
      } else {
        return 31;
      }
    };

    const days = Array.from(
      { length: daysInMonth(monthOfBirth, yearOfBirth) },
      (_, i) => i + 1
    );
    setDayOptions(days);
  }, [monthOfBirth, yearOfBirth, isLeapYear]);

  useEffect(() => {
    setBirthday(new Date(yearOfBirth, monthOfBirth - 1, dayOfBirth));
  }, [dayOfBirth, monthOfBirth, yearOfBirth, setBirthday]);

  const monthOptions = Array.from({ length: 12 }, (_, i) => i + 1);
  const yearOptions = Array.from({ length: 125 }, (_, i) => 1900 + i);

  const convertMonth = (index) => {
    const monthStr = months[index - 1];
    return capitalize(monthStr);
  };

  return (
    <div className="date-picker-wrapper">
      <FormControl className="date-picker-form">
        <Select
          value={dayOfBirth}
          onChange={(e) => setDayOfBirth(e.target.value)}
          displayEmpty
          inputProps={{ "aria-label": "Without label" }}
        >
          {dayOptions.map((day) => (
            <MenuItem key={day} value={day}>
              {day}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl className="date-picker-form">
        <Select
          value={monthOfBirth}
          onChange={(e) => setMonthOfBirth(e.target.value)}
          displayEmpty
          inputProps={{ "aria-label": "Without label" }}
        >
          {monthOptions.map((month) => (
            <MenuItem key={month} value={month}>
              {convertMonth(month)}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl className="date-picker-form">
        <Select
          value={yearOfBirth}
          onChange={(e) => setYearOfBirth(e.target.value)}
          displayEmpty
          inputProps={{ "aria-label": "Without label" }}
        >
          {yearOptions.map((year) => (
            <MenuItem key={year} value={year}>
              {year}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
};

export default DatePicker;
