import ObjectSet from "@/lib/objectset";
import IPractitioner from "@/types/IPractitioner";

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
  document.addEventListener("click", e => {
    const select = document.getElementById(id);
    let targetElement: any = e.target; // clicked element
    do {
      if (targetElement == select || targetElement.id?.includes(id)) {
        return;
      }
      targetElement = targetElement.parentNode;
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

export async function getCoordinates(address: string) {
  const query = new URLSearchParams();
  query.set("query", address);
  query.set("limit", "1");
  query.set("output", "json");
  query.set("access_key", "3e1333d988d21294663d2939f778ee07");
  const url = `http://api.positionstack.com/v1/forward?${query.toString()}`;
  const res = await fetch(url);
  const resData = await res.json();
  return resData.data[0];
}

export function dateObjBetween(date: Date, start: Date, end: Date) {
  const _date = date.getTime();
  const startDate = start.getTime();
  const endDate = end.getTime();
  if (start && end) return _date > startDate && _date < endDate;
  if (start) return _date > startDate;
  if (end) return _date < endDate;
  return false;
}

export function dateBetween(dateStr: string, start: string, end: string) {
  const date = new Date(dateStr);
  const startDate = new Date(start);
  const endDate = new Date(end);
  return dateObjBetween(date, startDate, endDate);
}

export function printPractitioner(practitioner: IPractitioner) {
  if (!practitioner) return "";
  const name = `${practitioner.firstName} ${practitioner.lastName}`;
  const title = printTitle(practitioner.jobDesignation);
  return `${title} ${name}`;
}

function printTitle(designation: string) {
  if (!designation) return "Pr.";
  switch (designation.toLowerCase()) {
  case "doctor":
    return "Dr.";
  case "nurse":
    return "RN.";
  case "surgeon":
    return "Sr.";
  default:
    return designation;
  }
}

export function addDays(date: Date, days: number) {
  const newDate = new Date(date);
  newDate.setDate(newDate.getDate() + days);
  return newDate;
}

export function getWeekStart(date: Date) {
  const day = date.getDay();
  const weekStart = addDays(date, -day);
  return weekStart;
}

export function printWeekday(date: Date) {
  const map: any = {
    0: "monday",
    1: "tuesday",
    2: "wednesday",
    3: "thursday",
    4: "friday",
    5: "saturday",
    6: "sunday",
  };
  const day = date.getDay();
  return map[day];
}

export function splitDate(date: Date){
  const [dateStr, ..._] = date.toISOString().split("T");
  return dateStr
}
