import data from "./utils/Wine-Data.json";
import "./App.css";
import FlavanoidsStatistics from "./components/FlavanoidsStatistics";
import { WineEntry } from "./types/wine-data.types";
import GammaStatistics from "./components/GammaStatistics";

function App() {
  return (
    <div className="app">
      <div className="container">
        <FlavanoidsStatistics data={data as unknown as WineEntry[]} />
        <GammaStatistics data={data as unknown as WineEntry[]} />
      </div>
    </div>
  );
}

export default App;
