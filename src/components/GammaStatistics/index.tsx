import { WineDataWithGamma, WineEntry } from "../../types/wine-data.types";
import { getStats } from "../../utils/getStats";
import { renderHeader, renderMeasureRow } from "../TableHelper";

type GammaStatisticsProps = {
  data: WineEntry[];
};

const GammaStatistics = (props: GammaStatisticsProps) => {
  const { data } = props;

  const dataWithGamma: WineDataWithGamma[] = data.map((entry) => {
    let Gamma = (entry.Ash * entry.Hue) / entry.Magnesium;
    Gamma = parseFloat(Gamma.toFixed(3));
    return { ...entry, Gamma };
  });

  const classes: Record<string, number[]> = {};

  dataWithGamma.forEach((entry) => {
    const alcoholClass = entry.Alcohol.toString();
    if (!classes[alcoholClass]) {
      classes[alcoholClass] = [];
    }
    classes[alcoholClass].push(entry.Gamma);
  });

  const stats = getStats(classes);

  return (
    <div>
      <h2>Class-wise Gamma Statistics</h2>

      <table>
        <thead>{renderHeader(stats)}</thead>
        <tbody>
          {renderMeasureRow(stats, "Gamma", "Mean")}
          {renderMeasureRow(stats, "Gamma", "Median")}
          {renderMeasureRow(stats, "Gamma", "Mode")}
        </tbody>
      </table>
    </div>
  );
};

export default GammaStatistics;
