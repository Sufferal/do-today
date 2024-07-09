import "./assets/css/App.css";
import TimeDetails from "./components/TimeDetails";
import TimeItemList from "./components/TimeItemList";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { useBetween } from "use-between";
import { useTime } from "./hooks/useTime";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

function App() {
  const { period, time, daysOfWeek, months } = useBetween(useTime);

  let listOutput = [];
  let maxWidth = "100px";
  let cellSize = "10px";

  switch (period) {
    case "today":
      maxWidth = "500px";
      cellSize = "35px";
      listOutput = [
        <TimeItemList key="today" maxWidth={maxWidth} cellSize={cellSize} desc="today" /> 
      ]
      break;

    case "week":
      maxWidth = "300px";
      cellSize = "20px";
      listOutput = daysOfWeek.map((day) => (
        <TimeItemList key={day} maxWidth={maxWidth} cellSize={cellSize} desc={day} />
      ));
      break;

    case "month":
      maxWidth = "550px";
      cellSize = "40px";
      listOutput = [
        <TimeItemList key="month" maxWidth={maxWidth} cellSize={cellSize} desc={months[time.getMonth()]} />
      ]
      break;

    case "year":
      maxWidth = "300px";
      cellSize = "15px";
      listOutput = months.map((month) => (
        <TimeItemList key={month} maxWidth={maxWidth} cellSize={cellSize} desc={`year_${month}`} />
      ));
      break;

    case "life":
      maxWidth = "500px";
      cellSize = "35px";
      listOutput = [
        <TimeItemList key="life" maxWidth={maxWidth} cellSize={cellSize} desc="life" />
      ]
      break;

    default:
      console.log('No such period exists!');
  }

  return (
    <ThemeProvider theme={darkTheme}>
      <div className="container">
        <TimeDetails />
        <div className="list-wrapper">
          {listOutput.length > 0 ? listOutput 
          : (<h2 className="text-highlight">No data to display!</h2>)}
        </div>
      </div>
    </ThemeProvider>
  );
}

export default App;
