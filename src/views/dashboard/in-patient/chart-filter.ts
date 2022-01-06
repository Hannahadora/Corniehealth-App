import IStat from "@/types/IStat";

const Months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
const Weekdays: string[] = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

const HoursOfDay: string[] = [
  "00:00",
  "01:00",
  "02:00",
  "03:00",
  "04:00",
  "05:00",
  "06:00",
  "07:00",
  "08:00",
  "09:00",
  "10:00",
  "11:00",
  "12:00",
  "13:00",
  "14:00",
  "15:00",
  "16:00",
  "17:00",
  "18:00",
  "19:00",
  "20:00",
  "21:00",
  "22:00",
  "23:00",
];

type Order = "Today" | "WTD" | "MTD" | "YTD";

interface DateStat {
  count: number;
  date: Date;
}

function getDaysInMonth() {
  const date = new Date();
  date.setDate(1);
  const days = [];
  const thisMonth = date.getMonth();
  while (date.getMonth() === thisMonth) {
    const day = `${new Date(date).getDate()}`;
    days.push(day);
    date.setDate(date.getDate() + 1);
  }
  return days;
}

function getUnitData(data: DateStat[], getUnit: (date: Date) => number) {
  const map = new Map<number, number>();
  data.forEach(d => {
    const day = getUnit(d.date);
    const dayCount = Number(d.count);
    const sum = (map.get(day) || 0) + dayCount;
    map.set(day, sum);
  });
  return map;
}

function getChartData(
  data: DateStat[],
  labels: string[],
  getUnit: (date: Date) => number
) {
  const unitData = getUnitData(data, getUnit);
  const dataSet: number[] = [];
  let total = 0;
  labels.forEach((_, index) => {
    const unit = index + 1;
    const sum = unitData.get(unit) || 0;
    dataSet.push(sum);
    total += sum;
  });
  return {
    dataSet,
    labels,
    total,
  };
}

function weekToDay(data: DateStat[]) {
  return getChartData(data, Weekdays, d => d.getDay());
}

function yearToDay(data: DateStat[]) {
  return getChartData(data, Months, d => d.getMonth() + 1);
}

function monthToDay(data: DateStat[]) {
  return getChartData(data, getDaysInMonth(), d => d.getDate());
}

function today(data: DateStat[]) {
  const today = new Date();
  const todayData = data.filter(
    d =>
      d.date.getFullYear() == today.getFullYear() &&
      d.date.getMonth() == today.getMonth() &&
      d.date.getDate() == today.getDate()
  );
  return getChartData(todayData, HoursOfDay, d => d.getHours());
}

export function groupData(data: IStat[], order: Order) {
  const datedData = data.map(d => ({ ...d, date: new Date(d.date) }));
  switch (order) {
  case "WTD":
    return weekToDay(datedData);
  case "YTD":
    return yearToDay(datedData);
  case "MTD":
    return monthToDay(datedData);
  case "Today":
    return today(datedData);
  default:
    break;
  }
  return weekToDay(datedData);
}
