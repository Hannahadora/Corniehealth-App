export const first = (num: number, vals: any[]) => {
  const res = [];
  for (let index = 0; index < vals.length; index++) {
    const element = vals[index];
    res.push(element);
  }
  return res;
};

export function getTableKeyValue(item: any) {
  const { data, index, ...rest } = item;
  const key = Object.values(rest)[0] as string;
  const value = data[key];
  return {
    key,
    value,
    index,
  };
}
