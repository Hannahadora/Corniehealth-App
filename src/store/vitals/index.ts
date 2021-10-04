import IVital, { IEncounter } from "@/types/IVital";
import { StoreOptions } from "vuex";
import { getVitals, createVital, createEncounter, getEncounters, updateVitalStatus } from "./helper";

interface VitalsStore {
  vitals: IVital[],
  encounters: IEncounter[],
}

export default {
  namespaced: true,
  state: {
    vitals: [],
    encounters: [],
  },
  mutations: {

    setVitals(state, vitals) {
      if (vitals && vitals.length > 0) state.vitals = [ ...vitals ];
    },

    setEncounters(state, encounters) {
      if (encounters && encounters.length > 0) state.encounters = [ ...encounters ];
    },

    addVital(state, vital) {
      if (vital?.id) state.vitals.unshift(vital);
    },

    updateVitalStatus(state, payload) {
      if (payload.vitalId) {
        const index = state.vitals.findIndex(vital => vital.id === payload.vitalId);
        if (index >= 0) state.vitals[index].status = payload.status
      }
    },
  },

  actions: {
    async getVitals(ctx, patientId: string) {
      const vitals = await getVitals(patientId);
      ctx.commit("setVitals", vitals);
    },

    async getEncounters(ctx, patientId: string) {
      const encounters = await getEncounters(patientId);
      ctx.commit("setEncounters", encounters);
    },

    async createVital(ctx, vital: IVital) {
      const res = await createVital(vital);
      if (!res) return { };
      // ctx.commit("addVital", res);
      return res;
    },

    async createEncounter(ctx, encounter: IEncounter) {
      const res = await createEncounter(encounter);
      if (!res) return { };
      // ctx.commit("addSchedule", sch);
      return res;
    },

    async updateVitalStatus(ctx, body: any) {
      const res = await updateVitalStatus(body.data, body.vitalId);
      if (!res) return { };
      ctx.commit("updateVitalStatus", { status: body.data?.status, vitalId: body.vitalId});
      return res;
    }
  },
} as StoreOptions<VitalsStore>
