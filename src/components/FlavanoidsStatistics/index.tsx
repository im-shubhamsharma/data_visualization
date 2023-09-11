import React from "react";
import { Stat, WineEntry } from "../../types/wine-data.types";
import { calculateStatistics } from "./helper";

type FlavanoidsStatisticsProps = {
  data: WineEntry[];
};

const FlavanoidsStatistics: React.FC<FlavanoidsStatisticsProps> = ({
  data,
}) => {
  const stats = calculateStatistics(data);

  const renderHeader = () => (
    <tr>
      <th>Measure</th>
      {stats.map((stat) => (
        <th key={`header-${stat.Class}`}>Class {stat.Class}</th>
      ))}
    </tr>
  );

  const renderMeasureRow = (measureName: string, statisticKey: keyof Stat) => (
    <tr key={`row-${measureName}-${statisticKey}`}>
      <td>{`${measureName} ${statisticKey}`}</td>
      {stats.map((stat) => (
        <td key={`cell-${stat.Class}-${statisticKey}`}>{stat[statisticKey]}</td>
      ))}
    </tr>
  );

  return (
    <div>
      <h2>Class-wise Flavanoids Statistics</h2>
      <table>
        <thead>{renderHeader()}</thead>
        <tbody>
          {renderMeasureRow("Flavanoids", "Mean")}
          {renderMeasureRow("Flavanoids", "Median")}
          {renderMeasureRow("Flavanoids", "Mode")}
        </tbody>
      </table>
    </div>
  );
};

export default FlavanoidsStatistics;
