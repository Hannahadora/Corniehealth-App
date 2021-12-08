import { cornieClient } from "@/plugins/http";
import IPractitioner from "@/types/IPractitioner";
import ISchedule, { Slot } from "@/types/ISchedule";

const minutesFromTimeString = (time: string): number => {
  const hours = +time.split(":")[0];
  const minutes = +time.split(":")[1];
  return hours * 60 + minutes;
};

const compareTime = (time: string, date: string) => {
  const hours = +time.split(":")[0];
  const minutes = +time.split(":")[1];
  const sum = hours * 60 + minutes;

  return new Date(date).setMinutes(new Date(date).getMinutes() + sum);
};

const filterByDate = (schedules: ISchedule[], date: string | Date) => {
  return schedules.filter((schedule) => {
    return (
      new Date(schedule.startDate).getDate() === new Date(date).getDate() &&
      new Date(schedule.startDate).getMonth() === new Date(date).getMonth() &&
      new Date(schedule.startDate).getFullYear() ===
        new Date(date).getFullYear()
    );
  });
};

const filterSlotsByDate = (slots: any, date: string | Date) => {
  return slots.filter((slot: any) => {
    console.log(slot.date, "jdjd", date);

    return (
      new Date(slot.date).getDate() === new Date(date).getDate() &&
      new Date(slot.date).getMonth() === new Date(date).getMonth() &&
      new Date(slot.date).getFullYear() === new Date(date).getFullYear()
    );
  });
};

const filterBySlotTime = (
  schedules: ISchedule[],
  slotStartTime: string,
  slotEndTime: string,
  date: string | Date
) => {
  return schedules.filter((schedule) => {
    const { startTime, startDate, endTime, endDate } = schedule;
    return (
      constructDate(date, slotStartTime) >=
        constructDate(startDate, startTime) &&
      constructDate(date, slotEndTime) <= constructDate(endDate, endTime)
    );
  });
};

const constructDate = (date: Date | string | number, time: string) => {
  return time
    ? new Date(`${new Date(date).toDateString()}, ${time}`)
    : new Date(date);
};

const extractSlotsFromSchedules = (schedules: ISchedule[]) => {
  const slots: any[] = [];
  schedules.forEach((schedule) => {
    const { slots: slts } = schedule;
    if (slts?.length > 0) {
      slots.push(
        ...slts.map((slot) => {
          return { ...slot, scheduleId: schedule.id };
        })
      );
    } else {
      slots.push(
        ...generateSlots(schedule).map((slot) => {
          return { ...slot, scheduleId: schedule.id };
        })
      );
    }
  });
  return slots;
};
const extractExistingSlotsFromSchedules = (schedules: ISchedule[]) => {
  const slots: any[] = [];
  schedules.forEach((schedule) => {
    const { slots: slts } = schedule;
    if (slts?.length > 0) {
      slots.push(
        ...slts.map((slot) => {
          return { ...slot, scheduleId: schedule.id };
        })
      );
    }
  });
  return slots;
};

const extractPractitionersFromSchedules = (schedules: ISchedule[]) => {
  const practitioners: IPractitioner[] = [];
  schedules.forEach((schedule) => {
    practitioners.push(...schedule.practitioners);
  });
  return practitioners;
};

const generateSlots = (schedule: ISchedule) => {
  const slots = [];
  const { startDate, startTime, endDate, endTime } = schedule;
  const limit = constructDate(endDate, endTime);
  let begin = constructDate(startDate, startTime);

  let pastEndTime = false;
  let count = 0;
  while (!pastEndTime) {
    const slotEnd = constructDate(
      new Date(begin).setMinutes(60 + count * 5),
      ""
    );
    if (slotEnd < limit) {
      const slot: any = {
        endTime: new Date(slotEnd),
        startTime: new Date(begin.setMinutes(5 * count)),
      };
      count = count + 1;
      slots.push(slot);
      begin = constructDate(slotEnd, "");
    } else {
      pastEndTime = true;
    }
  }
  return slots;
};

export default {
  slotsFromSchedules(schedules: ISchedule[]) {
    return extractSlotsFromSchedules(schedules);
  },

  getAvailableSlots(arrOfSchedules: any[]) {
    // const futureSchedules = arrOfSchedules.filter((i: any) => new Date(i.startDate) > new Date(Date.now()));
    console.log(arrOfSchedules, "arrs");

    const futureSchedules = arrOfSchedules.map((i: any) => {
      i.fullStartDate = new Date(
        new Date(new Date(i.startDate).toISOString()).setMinutes(
          new Date(i.startDate).getMinutes() +
            minutesFromTimeString(i.startTime)
        )
      ).toISOString();
      i.fullEndDate = new Date(
        new Date(new Date(i.endDate).toISOString()).setMinutes(
          new Date(i.endDate).getMinutes() + minutesFromTimeString(i.endTime)
        )
      ).toISOString();
      return i;
    });

    const arrOfSlots: any = [];
    let streak = true;
    let count = 0;
    futureSchedules.forEach((i: any) => {
      streak = true;
      while (streak) {
        const slotStart = new Date(i.fullStartDate).setMinutes(
          new Date(i.startDate).getMinutes() +
            (i.slotSize + (count > 0 ? 5 : 0)) * count
        );
        const slotEnd = new Date(slotStart).setMinutes(
          new Date(slotStart).getMinutes() + i.slotSize
        );

        if (
          new Date(slotEnd).toLocaleString() <
            new Date(i.fullEndDate).toLocaleString() ||
          new Date(slotEnd).toLocaleString() ===
            new Date(i.fullEndDate).toLocaleString()
        ) {
          const index = i.breaks.findIndex(
            (x: any) =>
              compareTime(x.startTime, i.startDate) >=
                compareTime(i.startTime, i.startDate) &&
              compareTime(x.endTime, x.endDate) <=
                compareTime(i.endTime, i.endDate)
          );
          const indx = i.slots.findIndex(
            (y: any) =>
              compareTime(y.startTime, i.startDate) >=
                compareTime(i.startTime, i.startDate) &&
              compareTime(y.endTime, y.endDate) <=
                compareTime(i.endTime, i.endDate)
          );

          if (index < 0 && indx < 0) {
            const startTime = new Date(slotStart).toLocaleTimeString("en", {
              hour12: false,
              timeZone: "UTC",
            });
            const endTime = new Date(slotEnd).toLocaleTimeString("en", {
              hour12: false,
              timeZone: "UTC",
            });

            arrOfSlots.push({
              start: startTime.substring(0, 5),
              end: endTime.substring(0, 5),
            });
            // arrOfSlots.push({ start: new Date(slotStart).toISOString(), end: new Date(new Date(slotEnd).toISOString()).toTimeString().substring(0, 5) })
          }
        } else {
          streak = false;
        }
        count += 1;
      }
    });
    console.log(arrOfSlots, "SLOTS");
    return arrOfSlots;
  },

  matchDates(date1: string, date2: string) {
    const result =
      new Date(date1).getDay() === new Date(date2).getDay() &&
      new Date(date1).getMonth() === new Date(date2).getMonth() &&
      new Date(date1).getFullYear() === new Date(date2).getFullYear();
    return result;
  },

  slots(schedules: ISchedule[], date: string | Date) {
    const availableSlots: any[] = [];
    const schedulesForDate = filterByDate(schedules, date);
    const scheduleSlots = extractSlotsFromSchedules(schedulesForDate);

    if (scheduleSlots?.length > 0) return scheduleSlots;
    schedulesForDate.forEach((schedule) => {
      availableSlots.push(...generateSlots(schedule));
    });

    return availableSlots;
  },

  getAvailablePractitioners(
    schedules: ISchedule[],
    startTime: string,
    endTime: string,
    date: string | Date
  ) {
    const schedulesForDate = filterByDate(schedules, date);

    const schedulesForTime = filterBySlotTime(
      schedulesForDate,
      startTime,
      endTime,
      date
    );

    const practitioners = extractPractitionersFromSchedules(schedulesForTime);

    return practitioners;
  },

  getScheduleIdForSlot(
    schedules: ISchedule[],
    startTime: string,
    endTime: string,
    date: string | Date
  ) {
    const schedulesForDate = filterByDate(schedules, date);

    const schedulesForTime = filterBySlotTime(
      schedulesForDate,
      startTime,
      endTime,
      date
    );
    if (schedulesForTime?.length > 0) return schedulesForTime[0].id;
    return "";
  },

  async getPractitionersSlots(practitionerId: string): Promise<any> {
    try {
      const slots = await cornieClient().get(
        `/api/v1/slot/practitioner/${practitionerId}`
      );
      console.log(slots, "p slots");
      if (!slots) return [];
      return slots;
    } catch (error) {
      console.log(error);
    }
  },

  isSlotTime(slots: any, slotTime: string, date: Date | string) {
    console.log(slots, "stae");

    if (!slots || slots.length === 0) return {};
    const [startTime, endTime] = slotTime.split(" - ");
    const slotsForDay = filterSlotsByDate(slots, date);

    const slotForTime = slotsForDay.find((slot: any) => {
      return (
        constructDate(date, startTime) >= constructDate(date, slot.startTime)
      );
      // && constructDate(date, slot.endTime) <= constructDate(date, slot.endTime)
    });
    console.log(slotsForDay, "for time");

    if (!slotForTime) return {};
    return slotForTime;
  },

  getFixedSlots(schedules: ISchedule[]) {
    return extractExistingSlotsFromSchedules(schedules);
  },

  constructDate,
};
