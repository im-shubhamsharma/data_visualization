import { Stat } from "../types/wine-data.types";
import { calculateMode } from "./calculateMode";

export const getStats = (
  classes: Record<string, number[]>,
  toFixed: number = 2
) => {
  const stats: Stat[] = [];

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
      Mean: mean.toFixed(toFixed),
      Median: median.toFixed(toFixed),
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
};
