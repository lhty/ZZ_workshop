type randomFnType = (min: number, max: number) => number;
export const random: randomFnType = (min, max) => Math.floor(Math.random() * (max - min)) + min;

type rangeFnType = (start: number, end?: number, step?: number) => Array<number>;
export const range: rangeFnType = (start, end, step = 1) => {
  const output = [];
  if (typeof end === 'undefined') {
    end = start;
    start = 0;
  }
  for (let i = start; i < end; i += step) {
    output.push(i);
  }
  return output;
};
