import { StoreOptions } from "vuex";
import {Slot} from "@/types/ISchedule";
import {
  deleteSchedule,
  removePractitioner,
  addPractitioner,
  deleteSlot,
  singlePractitonerSlot,
  removeBreak,
  removeService,
  getSchedules,
  createSchedule,
  updateSchedule,
  activateSchedule,
  deactivateSchedule,
  FetchDayCalendar
} from "./helper";

interface SchedulesStore {
  schedules: any[];
  slots: any[];
}

export default {
  namespaced: true,
  state: {
    schedules: [],
    slots:[],
  },
  mutations: {
    setSchedules(state, schs) {
      if (schs) state.schedules = [...schs];
    },
    setSlotPractitioner(state, slots: Slot[]) {
      state.slots = [...slots];
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
        if (index >= 0) state.schedules[index].status = "active";
      }
    },

    removePractitioner(state, data) {
      if (data) {
        const index = state.schedules.findIndex(
          i => i.id === data.scheduleId
        );
        if (index >= 0)
          state.schedules[index].practitioners = state.schedules[
            index
          ].practitioners.filter(
            (i: any) =>
              data.removedPractitioners.find((j: any) => j.id === i.id) < 0
          );
      }
    },
    removeBreak(state, data) {
      if (data) {
        const index = state.schedules.findIndex(
          i => i.id === data.scheduleId
        );
        if (index >= 0)
          state.schedules[index].breaks = state.schedules[
            index
          ].breaks.filter(
            (i: any) =>
              data.removeBreaks.find((j: any) => j.id === i.id) < 0
          );
      }
    },

    removeService(state, data) {
      if (data) {
        const index = state.schedules.findIndex(
          i => i.id === data.scheduleId
        );
        if (index >= 0)
          state.schedules[index].services = state.schedules[
            index
          ].services.filter(
            (i: any) =>
              data.removeServices.find((j: any) => j.id === i.id) < 0
          );
      }
    },

    deactivateSchedule(state, id) {
      if (id) {
        const index = state.schedules.findIndex(i => i.id === id);
        if (index >= 0) state.schedules[index].status = "inactive";
      }
    },

    updateSchedule(state, sch) {
      if (sch) {
        const index = state.schedules.findIndex(i => i.id === sch.id);
        if (index >= 0) state.schedules[index] = { ...sch };
      }
    },
    deleteSlot(state, id: string) {
      const index = state.slots.findIndex(
        slot => slot.id == id
      );
      if (index < 0) return;
      const slots = [...state.slots];
      slots.splice(index, 1);
      state.slots = [...slots];
    },
  },

  actions: {
    async getSchedules(ctx) {
      const schs = await getSchedules();
      ctx.commit("setSchedules", schs);
    },
    getScheduleById(ctx, id: string) {
      return ctx.state.schedules.find(
        schedule => schedule.id == id
      );
    },
    getSlotById(ctx, id: string) {
      return ctx.state.slots.find(
        slot => slot.id == id
      );
    },
    async singlePractitonerSlot(ctx, locationId: string) {
      const slots = await singlePractitonerSlot(locationId);
      ctx.commit("setSlotPractitioner", slots);
    },
    async fetchDayCalendar(ctx, locationId: string) {
      const slots = await FetchDayCalendar(locationId);
      ctx.commit("setSchedules", slots);
    },
    async deleteSchedule(ctx, id: string) {
      const deleted = await deleteSchedule(id);

      if (!deleted) return false;
      ctx.commit("removeSchedule", id);
      return true;
    },

    async createSchedule(ctx, schedule: any) {
      const sch = await createSchedule(schedule);
      if (!sch) return false;
      ctx.commit("addSchedule", sch);
      return true;
    },
    async deleteSlot(ctx, id: string) {
      const deleted = await deleteSlot(id);
      if (!deleted) return false;
      ctx.commit("deleteSlot", id);
      return true;
    },

    async updateSchedule(ctx, schedule: any) {
      const sch = await updateSchedule(schedule, schedule.id);
      if (!sch) return false;
      ctx.commit("updateSchedule", sch);
      return true;
    },

    async activateSchedule(ctx, id: any) {
      const activated = await activateSchedule(id);
      if (!activated) return false;
      ctx.commit("activateSchedule", id);
      return true;
    },

    async removePractitioner(ctx, reqData: any) {
      const removed = await removePractitioner(reqData.body, reqData.id);
      if (!removed) return false;
      ctx.commit("removePractitioner", {
        scheduleId: reqData.id,
        removedPractitioners: reqData.body,
      });
      return true;
    },
    async removeBreak(ctx, reqData: any) {
      const removed = await removeBreak(reqData.body, reqData.id);
      if (!removed) return false;
      ctx.commit("removeBreak", {
        scheduleId: reqData.id,
        removeBreaks: reqData.body,
      });
      return true;
    },
    async removeService(ctx, reqData: any) {
      const removed = await removeService(reqData.body, reqData.id);
      if (!removed) return false;
      ctx.commit("removeService", {
        scheduleId: reqData.id,
        removeServices: reqData.body,
      });
      return true;
    },

    async addPractitioner(ctx, reqData: any) {
      const removed = await addPractitioner(reqData.body, reqData.id);

      if (!removed) return false;
      ctx.commit("addPractitioner", {
        scheduleId: reqData.id,
        removedPractitioners: reqData.body,
      });
      return true;
    },

    async deactivateSchedule(ctx, id: any) {
      const activated = await deactivateSchedule(id);
      if (!activated) return false;
      ctx.commit("deactivateSchedule", id);
      return true;
    },
  },
} as StoreOptions<SchedulesStore>;
