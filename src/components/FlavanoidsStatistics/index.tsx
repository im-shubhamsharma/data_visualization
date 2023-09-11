import React from "react";
import { WineEntry } from "../../types/wine-data.types";
import { renderHeader, renderMeasureRow } from "../TableHelper";
import { getStats } from "../../utils/getStats";

type FlavanoidsStatisticsProps = {
  data: WineEntry[];
};

const FlavanoidsStatistics: React.FC<FlavanoidsStatisticsProps> = ({
  data,
}) => {
  const classes: Record<string, number[]> = {};

  data.forEach((entry) => {
    const alcoholClass = entry.Alcohol.toString();
    if (!classes[alcoholClass]) {
      classes[alcoholClass] = [];
    }
    if (typeof entry.Flavanoids === "string") {
      classes[alcoholClass].push(parseFloat(entry.Flavanoids));
    } else if (typeof entry.Flavanoids === "number") {
      classes[alcoholClass].push(entry.Flavanoids);
    }
  });

  const stats = getStats(classes);

  return (
    <div>
      <h2>Class-wise Flavanoids Statistics</h2>
      <table>
        <thead>{renderHeader(stats)}</thead>
        <tbody>
          {renderMeasureRow(stats, "Flavanoids", "Mean")}
          {renderMeasureRow(stats, "Flavanoids", "Median")}
          {renderMeasureRow(stats, "Flavanoids", "Mode")}
        </tbody>
      </table>
    </div>
  );
};

export default FlavanoidsStatistics;
