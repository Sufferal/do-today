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
      listOuput = [
        <TimeItemList key="monday"    maxWidth={maxWidth} cellSize={cellSize} desc="monday" />,
        <TimeItemList key="tuesday"   maxWidth={maxWidth} cellSize={cellSize} desc="tuesday" />,
        <TimeItemList key="wednesday" maxWidth={maxWidth} cellSize={cellSize} desc="wednesday" />,
        <TimeItemList key="thursday"  maxWidth={maxWidth} cellSize={cellSize} desc="thursday" />,
        <TimeItemList key="friday"    maxWidth={maxWidth} cellSize={cellSize} desc="friday" />,
        <TimeItemList key="saturday"  maxWidth={maxWidth} cellSize={cellSize} desc="saturday" />,
        <TimeItemList key="sunday"    maxWidth={maxWidth} cellSize={cellSize} desc="sunday" />
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
          {listOuput.length > 0 ? listOuput 
          : (<h2 className="text-highlight">No data to display!</h2>)}
        </div>
      </div>
    </ThemeProvider>
  );
}

export default App;
