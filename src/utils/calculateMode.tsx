export const calculateMode = (arr: number[]): number[] => {
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
};
