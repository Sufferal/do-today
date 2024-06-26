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
  const { period } = useBetween(useTime);

  let listOuput = [];
  let maxWidth = "100px";
  let cellSize = "10px";
  const daysOfWeek = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"];

  switch (period) {
    case "today":
      maxWidth = "500px";
      cellSize = "35px";
      listOuput = [
        <TimeItemList key="today" maxWidth={maxWidth} cellSize={cellSize} desc="today" /> 
      ]
      break;
    case "week":
      maxWidth = "300px";
      cellSize = "20px";
      listOuput = daysOfWeek.map((day) => (
        <TimeItemList key={day} maxWidth={maxWidth} cellSize={cellSize} desc={day} />
      ));
      break;
    default:
      console.log('No such period exists!');
  }

  return (
    <ThemeProvider theme={darkTheme}>
      <div className="container">
        <TimeDetails />
        <div className="list-wrapper">
          {listOuput.length > 0 ? listOuput 
          : (<h2 className="text-highlight">No data to display!</h2>)}
        </div>
      </div>
    </ThemeProvider>
  );
}

export default App;
