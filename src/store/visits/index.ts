import { StoreOptions } from "vuex";
import { createSchedule, getVisits } from "./helper";

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

    async createSchedule(ctx, schedule: any) {
      const sch = await createSchedule(schedule);
      if (!sch) return false;
      ctx.commit("addSchedule", sch);
      return true;
    },
  },
} as StoreOptions<SchedulesStore>
