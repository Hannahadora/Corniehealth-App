import ObjectSet from "@/lib/objectset";

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

export function clickOutside(id: string, callBack: () => void) {
  document.addEventListener("click", (e) => {
    const select = document.getElementById(id);
    let targetElement: any = e.target; // clicked element
    do {
      if (targetElement == select || targetElement.id?.includes(id)) {
        return;
      }
      targetElement = (targetElement as any).parentNode;
    } while (targetElement);
    callBack();
  });
}

export function createDate(days: number, months: number, years: number) {
  const date = new Date();
  date.setDate(date.getDate() + days);
  date.setMonth(date.getMonth() + months);
  date.setFullYear(date.getFullYear() + years);
  return date;
}

export function updateModelField(model: any, field: string, data: any[]) {
  const fieldData = model[field];
  const fieldSet = new ObjectSet([...fieldData, ...data], "id");
  model[field] = [...fieldSet];
  return model;
}

export function getCoordinates(address: string) {
  const query = new URLSearchParams();
  query.set("query", address);
  query.set("limit", "1");
  query.set("output", "json");
  query.set("access_key", "");
}

export function dateBetween(dateStr: string, start: string, end: string) {
  const date = new Date(dateStr).getTime();
  const startDate = new Date(start).getTime();
  const endDate = new Date(end).getTime();
  if (start && end) return date > startDate && date < endDate;
  if (start) return date > startDate;
  if (end) return date < endDate;
  return false;
}
