import { StoreOptions } from "vuex";
import { deleteSchedule, createSchedule, getSchedules, activateSchedule, deactivateSchedule } from "./helper";

interface SchedulesStore {
  schedules: any[],
}

export default {
  namespaced: true,
  state: {
    schedules: [],
  },
  mutations: {

    setSchedules(state, schs) {
      if (schs) state.schedules = [ ...schs ];
    },

    addSchedule(state, sch) {
        if (sch) state.schedules.unshift(sch);
    },

    removeSchedule(state, id) {
        if (id) state.schedules = state.schedules.filter(i => i.id !== id);
    },

    activateSchedule(state, id) {
        if (id) {
            const index = state.schedules.findIndex(i => i.id === id);
            if (index >= 0) state.schedules[index].status = 'active';
        }
    },

    deactivateSchedule(state, id) {
        if (id) {
            const index = state.schedules.findIndex(i => i.id === id);
            if (index >= 0) state.schedules[index].status = 'inactive';
        }
    },
  },

  actions: {
    async getSchedules(ctx) {
      const schs = await getSchedules();
      ctx.commit("setSchedules", schs);
    },
    
    async deleteSchedule(ctx, id: string) {
      const deleted = await deleteSchedule(id);
      
      if (!deleted) return false;
      ctx.commit("removeSchedule", id);
      return true;
    },

    async createSchedule(ctx, shift: any) {
      const deleted = await createSchedule(shift);
      if (!deleted) return false;
      // ctx.commit("removeRole", id);
      return true;
    },

    async activateSchedule(ctx, id: any) {
      const activated = await activateSchedule(id);
      if (!activated) return false;
      ctx.commit("activateSchedule", id);
      return true;
    },

    async deactivateSchedule(ctx, id: any) {
      const activated = await deactivateSchedule(id);
      if (!activated) return false;
      ctx.commit("deactivateSchedule", id);
      return true;
    },
  },
} as StoreOptions<SchedulesStore>
