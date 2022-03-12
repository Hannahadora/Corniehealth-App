export default {
  getSlots() {
    const start = new Date(
      new Date(`${new Date().toLocaleDateString()} 06:00`)
    );
    const slots = [];
    for (let i = 0; i < 24; i = i + 1) {
      const slotStart = new Date(start).setMinutes(
        new Date(start).getMinutes() + i * 60
      );
      const slotEnd = new Date(slotStart).setMinutes(
        new Date(slotStart).getMinutes() + 60
      );
      slots.unshift({
        start: slotStart,
        end: slotEnd,
      });
    }

    return slots;
  },

  isWithinRange(slot: any, dayDate: string) {
    const start = new Date(slot.startTime);
    const end = new Date(slot.endTime);
    const day = new Date(dayDate);
    return day >= start && day <= end;
  },

  slots() {
    return [
      "00:00 - 01:00",
      "01:00 - 02:00",
      "02:00 - 03:00",
      "03:00 - 04:00",
      "04:00 - 05:00",
      "05:00 - 06:00",
      "06:00 - 07:00",
      "07:00 - 08:00",
      "08:00 - 09:00",
      "09:00 - 10:00",
      "10:00 - 11:00",
      "11:00 - 12:00",
      "12:00 - 13:00",
      "13:00 - 14:00",
      "14:00 - 15:00",
      "15:00 - 16:00",
      "16:00 - 17:00",
      "17:00 - 18:00",
      "18:00 - 19:00",
      "19:00 - 20:00",
      "20:00 - 21:00",
      "21:00 - 22:00",
      "22:00 - 23:00",
      "23:00 - 24:00",
    ];
  },
};
