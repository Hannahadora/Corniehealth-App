import ICalendar from "@/types/ICalendar"
import { StoreOptions } from "vuex"
import { fetchCalendars } from "./helper"

interface CalendarState {
  calendars: ICalendar[];
}

export default {
    namespaced: true,
    state: {
        calendars: [],
    },
    mutations: {
        setCalendars(state, calendars: ICalendar[]) {
            state.calendars = calendars
        },
    },
    actions: {
        async fetchCalendars(ctx) {
            const calendars = await fetchCalendars()
            ctx.commit("setCalendars", calendars)
        },
        async getCalendarById(ctx, id: string) {
            if (ctx.state.calendars.length < 1) await ctx.dispatch("fetchCalendars")
            return ctx.state.calendars.find(calendar => calendar.id == id)
        },
    },
} as StoreOptions<CalendarState>
