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

export function dateBetween(dateStr: string, start: string, end: string) {
  const date = new Date(dateStr).getTime();
  const startDate = new Date(start).getTime();
  const endDate = new Date(end).getTime();
  if (start && end) return date > startDate && date < endDate;
  if (start) return date > startDate;
  if (end) return date < endDate;
  return false;
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

function addDays(date: Date, days: number) {
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
  console.log(date);
  const map: any = {
    1: "monday",
    2: "tuesday",
    3: "wednesday",
    4: "thursday",
    5: "friday",
    6: "saturday",
    7: "sunday",
  };
  const day = date.getDay();
  return map[day];
}
