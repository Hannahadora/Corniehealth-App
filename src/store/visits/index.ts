import { StoreOptions } from "vuex";
import { createSlot, getVisits, schedulesByPractitioner, checkin, getPatients, checkout, startEncounter, cancel } from "./helper";

interface SchedulesStore {
  visits: any[],
  patients: any[]
}

export default {
  namespaced: true,
  state: {
    visits: [],
    patients: []
  },
  mutations: {

    setVisits(state, visits) {
      if (visits && visits.length > 0) state.visits = [ ...visits ];
    },

    setPatients(state, pts) {
      if (pts && pts.length > 0) state.patients = [ ...pts ];
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

    async getPatients(ctx) {
      const pts = await getPatients();
      ctx.commit("setPatients", pts);
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
      // ctx.commit("addSchedule", sch);
      return sch;
    },

    async checkout(ctx, id: string) {
      const sch = await checkout(id);
      if (!sch) return { };
      // ctx.commit("addSchedule", sch);
      return sch;
    },

    async startEncounter(ctx, id: string) {
      const sch = await startEncounter(id);
      if (!sch) return { };
      // ctx.commit("addSchedule", sch);
      return sch;
    },

    async cancel(ctx, id: string) {
      const sch = await cancel(id);
      if (!sch) return { };
      // ctx.commit("addSchedule", sch);
      return sch;
    },
  },
} as StoreOptions<SchedulesStore>
