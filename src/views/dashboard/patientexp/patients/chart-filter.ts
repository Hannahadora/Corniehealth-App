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
const Weekdays: [string, number][] = [
  ["Mon", 1],
  ["Tue", 2],
  ["Wed", 3],
  ["Thu", 4],
  ["Fri", 5],
  ["Sat", 6],
  ["Sun", 7],
];

type Order = "Today" | "WTD" | "MTD" | "YTD";

interface DateStat {
  count: number;
  date: Date;
}
function sortDaily(data: DateStat[]) {
  const dailyMap = new Map<number, number>();
  data.forEach((d) => {
    const day = d.date.getDay();
    const dayCount = Number(d.count);
    const sum = (dailyMap.get(day) || 0) + dayCount;
    dailyMap.set(day, sum);
  });

  const dataSet: number[] = [];
  const labels: string[] = [];
  Weekdays.forEach(([day, id]) => {
    const sum = dailyMap.get(id) || 0;
    dataSet.push(sum);
    labels.push(day);
  });
  const total = dataSet.reduce((prev, curr) => prev + curr, 0);
  return {
    dataSet,
    labels,
    total,
  };
}

export function groupData(data: IStat[], order: Order) {
  const datedData = data.map((d) => ({ ...d, date: new Date(d.date) }));
  return sortDaily(datedData);
}
