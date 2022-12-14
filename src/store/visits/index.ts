import { StoreOptions } from "vuex";
import {
  createSlot,
  getVisits,
  schedulesByPractitioner,
  checkin,
  getPatients,
  checkout,
  startEncounter,
  cancel,
  noShow,
  getPatientVisits,
  updateStatus,
  fetchPractitonerVisits
} from "./helper";

interface SchedulesStore {
  visits: any[];
  patients: any[];
  patientVisits: any[];
  practitionervisits: any[];
}

export default {
  namespaced: true,
  state: {
    visits: [],
    patients: [],
    patientVisits: [],
    practitionervisits: []
  },
  mutations: {
    setVisits(state, visits) {
      if (visits && visits.length > 0) state.visits = [...visits];
    },

    setPatientVisits(state, visits) {
      if (visits && visits.length > 0) state.patientVisits = [...visits];
    },
    setPractitionerVisit(state, practitionervisits) {
      state.practitionervisits = practitionervisits;
    },
    setPatients(state, pts) {
      if (pts && pts.length > 0) state.patients = [...pts];
    },

    updateStatus(state, payload) {
      const index = state.visits.findIndex((i: any) => i.id === payload.id);
      if (index >= 0) state.visits[index].status = payload.status;

      const inPatientsVisits = state.patientVisits.findIndex(
        (i: any) => i.id === payload.id
      );

      if (inPatientsVisits >= 0)
        state.patientVisits[inPatientsVisits].status = payload.status;
    },

    addVisit(state, payload) {
      state.visits.unshift(payload);
    },
  },

  actions: {
    async getVisits(ctx) {
      const visits = await getVisits();
      ctx.commit("setVisits", visits);
    },

    async getPatientVisits(ctx, id: string) {
      const visits = await getPatientVisits(id);
      ctx.commit("setPatientVisits", visits);
    },

    async fetchPractitonerVisits(ctx, id: string) {
      const practitionervisits = await fetchPractitonerVisits(id);
      ctx.commit("setPractitionerVisit", practitionervisits);
    },

    async getPatients(ctx) {
      const pts = await getPatients();
      ctx.commit("setPatients", pts);
    },

    async schedulesByPractitioner(ctx, id: string) {
      const schedules = await schedulesByPractitioner(id);
      return schedules;
    },

    async createSlot(ctx, schedule: any) {
      const sch = await createSlot(schedule);
      if (!sch) return {};
      // ctx.commit("addSchedule", sch);
      return sch;
    },

    async checkin(ctx, schedule: any) {
      const sch = await checkin(schedule);
      if (!sch) return false;
      ctx.commit("addVisit", sch);
      return sch;
    },

    async checkout(ctx, id: string) {
      const sch = await checkout(id);
      if (!sch) return false;
      ctx.commit("updateStatus", { id, status: "completed" });
      return sch as boolean;
    },

    async startEncounter(ctx, id: string) {
      const sch = await startEncounter(id);
      if (!sch) return false;
      // ctx.commit("addSchedule", sch);
      return sch;
    },

    async cancel(ctx, id: string) {
      const sch = await cancel(id);
      if (!sch) return false;
      ctx.commit("updateStatus", { id, status: "cancelled" });
      return sch;
    },

    async noShow(ctx, id: string) {
      const sch = await noShow(id);
      if (!sch) return false;
      ctx.commit("updateStatus", { id, status: "no-show" });
      return sch;
    },

    async updateVisitStatus(ctx, body: any) {
      const sch = await updateStatus(body);
      if (!sch) return false;
      ctx.commit("updateStatus", { id: body.id, status: body.status });
      return sch as boolean;
    },
  },
} as StoreOptions<SchedulesStore>;
