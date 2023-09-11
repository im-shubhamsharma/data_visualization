import { Stat } from "../../types/wine-data.types";

export const renderHeader = (stats: Stat[]) => (
  <tr>
    <th>Measure</th>
    {stats.map((stat) => (
      <th key={`header-${stat.Class}`}>Class {stat.Class}</th>
    ))}
  </tr>
);

export const renderMeasureRow = (
  stats: Stat[],
  measureName: string,
  statisticKey: keyof Stat
) => (
  <tr key={`row-${measureName}-${statisticKey}`}>
    <td>{`${measureName} ${statisticKey}`}</td>
    {stats.map((stat) => (
      <td key={`cell-${stat.Class}-${statisticKey}`}>{stat[statisticKey]}</td>
    ))}
  </tr>
);
