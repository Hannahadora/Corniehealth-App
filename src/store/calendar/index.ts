import ICalendar from "@/types/ICalendar";
import { StoreOptions } from "vuex";
import { fetchCalendars } from "./helper";

interface CalendarState {
  calendars: ICalendar[];
}

export default {
  namespaced: true,
  state: {
    calendars: [],
  },
  mutations: {
    setCalendars(state, calendars: any) {
      state.calendars = [calendars];
    },
  },
  actions: {
    async fetchCalendars(ctx) {
      const calendars = await fetchCalendars();
      ctx.commit("setCalendars", calendars);
    },
    getCalendarById(ctx, id: string) {
      return ctx.state.calendars.find(calendar => calendar.id == id);
    },
  },
} as StoreOptions<CalendarState>;
