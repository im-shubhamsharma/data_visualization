import data from "./utils/Wine-Data.json";
import "./App.css";
import WineStatsTable from "./components/FlavanoidsStatistics";
import { WineEntry } from "./types/wine-data.types";

function App() {
  return (
    <div className="app">
      <WineStatsTable data={data as unknown as WineEntry[]} />
    </div>
  );
}

export default App;
