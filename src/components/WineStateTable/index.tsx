import React from "react";

export type WineEntry = {
  Alcohol: number;
  "Malic Acid": number;
  Ash: number;
  "Alcalinity of ash": number;
  Magnesium: number;
  "Total phenols": number;
  Flavanoids: number;
  "Nonflavanoid phenols": number;
  Proanthocyanins: number;
  "Color intensity": number;
  Hue: number;
  "OD280/OD315 of diluted wines": number;
  Unknown: number;
};

type WineStatsProps = {
  data: WineEntry[];
};

type Stat = {
  Class: number;
  Mean: number;
  Median: number;
  Mode: number;
};

function calculateMode(arr: number[]): number[] {
  const frequencyMap: { [key: number]: number } = {};
  let maxFrequency = 0;
  const modes: number[] = [];

  arr.forEach((element) => {
    if (frequencyMap[element]) {
      frequencyMap[element]++;
    } else {
      frequencyMap[element] = 1;
    }

    if (frequencyMap[element] > maxFrequency) {
      maxFrequency = frequencyMap[element];
    }
  });

  for (const key in frequencyMap) {
    if (frequencyMap[key] === maxFrequency) {
      modes.push(Number(key));
    }
  }

  if (modes.length === arr.length) {
    return [];
  }

  return modes;
}

function calculateStatistics(data: WineEntry[]) {
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

  const stats = [];

  for (const alcoholClass in classes) {
    const classData = classes[alcoholClass];
    const mean =
      classData.reduce((acc, val) => acc + val, 0) / classData.length;

    classData.sort((a, b) => a - b);
    const median =
      classData.length % 2 === 0
        ? (classData[classData.length / 2 - 1] +
            classData[classData.length / 2]) /
          2
        : classData[Math.floor(classData.length / 2)];

    let mode = calculateMode(classData);

    stats.push({
      Class: alcoholClass,
      Mean: mean.toFixed(2),
      Median: median.toFixed(2),
      Mode: mode.length
        ? mode.length === 1
          ? `${mode[0]}`
          : mode.reduce(
              (acc, val, idx) =>
                acc + ` ${val}${idx !== mode.length - 1 ? "," : ""}`,
              ""
            )
        : "N/A",
    });
  }

  return stats;
}

const WineStatsTable: React.FC<WineStatsProps> = ({ data }) => {
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

export default WineStatsTable;
