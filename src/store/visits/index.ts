import { StoreOptions } from "vuex";
import { createSlot, getVisits, schedulesByPractitioner, checkin } from "./helper";

interface SchedulesStore {
  visits: any[],
}

export default {
  namespaced: true,
  state: {
    visits: [],
  },
  mutations: {

    setVisits(state, visits) {
      if (visits && visits.length > 0) state.visits = [ ...visits ];
    },

    // updateSchedule(state, sch) {
    //     if (sch) {
    //         const index = state.schedules.findIndex(i => i.id === sch.id);
    //         if (index >= 0) state.schedules[index] = { ...sch };
    //     }
    // },
  },

  actions: {
    async getVisits(ctx) {
      const visits = await getVisits();
      ctx.commit("setVisits", visits);
    },

    async schedulesByPractitioner(ctx) {
      const slots = await schedulesByPractitioner();
      return slots;
    },

    async createSlot(ctx, schedule: any) {
      const sch = await createSlot(schedule);
      if (!sch) return { };
      ctx.commit("addSchedule", sch);
      return sch;
    },

    async checkin(ctx, schedule: any) {
      const sch = await checkin(schedule);
      if (!sch) return { };
      ctx.commit("addSchedule", sch);
      return sch;
    },
  },
} as StoreOptions<SchedulesStore>
