import data from "./utils/Wine-Data.json";
import "./App.css";
import WineStatsTable, { WineEntry } from "./components/WineStateTable";

function App() {
  return (
    <div className="app">
      <WineStatsTable data={data as unknown as WineEntry[]} />
    </div>
  );
}

export default App;
