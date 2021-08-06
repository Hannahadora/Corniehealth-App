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
    all: data,
    key,
    value,
    index,
  };
}

const isObj = (val: any) => val.constructor.name === "Object";

export function flatten(data: any) {
  let result = {} as IIndexableObject;
  Object.entries(data).forEach(([key, val]) => {
    if (isObj(val)) {
      result = { ...result, ...flatten(val) };
    } else {
      if (key) result[key] = val;
    }
  });
  return result;
}
