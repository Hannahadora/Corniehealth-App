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
const Weekdays: string[] = ["Sat", "Sun", "Mon", "Tue", "Wed", "Thu", "Fri"];

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

const sortListByDate = (list: any[]) => {
  if (!list || list.length <= 0) return [];
  return list?.sort((a, b) => {
    const date1: any = new Date(a.date);
    const date2: any = new Date(b.date);
    return date1 - date2;
  });
};

const currentYearData = (arr: IStat[]) => {
  return sortListByDate(arr).filter(
    i => new Date(i.date).getFullYear() === new Date().getFullYear()
  );
};

const getAverage = (arr: number[]) => {
  if (arr.length <= 0) return 0;
  const sum = arr.reduce((a, b) => {
    const num1 = a ? a : 0;
    const num2 = b ? b : 0;
    return num1 + num2;
  });
  return +(sum / arr.length).toFixed(1);
};

export const getYearData = (arr: IStat[]) => {
  const thisYear = currentYearData(arr);
  const groupedData = [];
  for (let i = 0; i < 12; i++) {
    groupedData.push(
      thisYear
        .filter(j => +new Date(j.date).getMonth() === i)
        .map(k => k.count)
    );
  }
  return {
    dataSet: groupedData.map(m => getAverage(m)),
    labels: Months,
    total: 0,
  };
};

const currentMonthData = (arr: IStat[]) => {
  return arr.filter(
    i => new Date(i.date).getMonth() === new Date().getMonth()
  );
};

const getDailyInMonthData = (arr: IStat[]) => {
  const thisYear = currentYearData(arr);
  const thisMonth = currentMonthData(thisYear);
  const groupedData = [];
  for (let i = 1; i <= 31; i++) {
    groupedData.push(
      thisMonth
        .filter(j => +new Date(j.date).getDate() === i)
        .map(k => k.count)
    );
  }
  const data = {
    dataSet: groupedData.map(m => getAverage(m)),
    labels: [
      "1",
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      "9",
      "10",
      "11",
      "12",
      "13",
      "14",
      "15",
      "16",
      "17",
      "18",
      "19",
      "20",
      "21",
      "22",
      "23",
      "24",
      "25",
      "26",
      "27",
      "28",
      "29",
      "30",
      "31",
    ],
    total: 0,
  };
  return data;
};

const currentDayData = (arr: IStat[]) => {
  return arr.filter(
    i =>
      new Date(i.date).getDate() === new Date().getDate() &&
      new Date(i.date).getMonth() === new Date().getMonth() &&
      new Date(i.date).getFullYear() === new Date().getFullYear()
  );
};

const getHourlyInDayData = (arr: IStat[]) => {
  const thisYear = currentYearData(arr);
  const todayData = currentDayData(thisYear);
  const groupedData = [];
  for (let i = 0; i < 24; i++) {
    const hourItems: IStat[] = todayData.filter(j => {
      const hour = j.date.split("T")[1].split(":")[0];
      return +hour === i;
    });
    groupedData.push(hourItems.map(k => k.count));
  }
  return {
    dataSet: groupedData.map(m => getAverage(m)),
    labels: HoursOfDay,
    total: 0,
  };
};

const isSameDate = (date1: Date | string, date2: Date | string) => {
  return (
    new Date(date1).getDate() === new Date(date2).getDate() &&
    new Date(date1).getMonth() === new Date(date2).getMonth() &&
    new Date(date1).getFullYear() === new Date(date2).getFullYear()
  );
};

const weeksDates = () => {
  const arr = [];
  for (let i = 0; i < 7; i++) {
    const sunday = new Date(
      new Date().setDate(new Date().getDate() - ((new Date().getDay() + 7) % 6))
    );
    arr.push(new Date(sunday.setDate(sunday.getDate() + i)).toDateString());
  }

  return arr;
};

const getDailyInWeekData = (arr: IStat[]) => {
  const thisYear = currentYearData(arr);
  const dates = weeksDates();
  const groupedData = [];
  for (const date of dates) {
    const forDayInWeek = thisYear.filter(i => isSameDate(date, i.date));
    groupedData.push(forDayInWeek.map(i => i.value));
  }
  return {
    dataSet: groupedData.map(m => getAverage(m)),
    labels: Weekdays,
    total: 0,
  };
};

export const getChartData = (
  arr: IStat[],
  order: "Today" | "WTD" | "MTD" | "YTD"
) => {
  if (order === "Today") return getHourlyInDayData(arr);
  if (order === "WTD") return getDailyInWeekData(arr);
  if (order === "MTD") return getDailyInMonthData(arr);
  if (order === "YTD") return getYearData(arr);
};
