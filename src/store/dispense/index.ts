import { StoreOptions } from "vuex";
import { fetchMedReq, viewDispense } from "./helper";
import IDispense from "@/types/IDispense";
import IMedicationReq from "@/types/ImedicationReq";

interface DispenseState {
  dispenses: any[];
  dispense: IDispense
  medicationRequest: IMedicationReq[]
}

export default {
  namespaced: true,
  state: {
    medicationRequest: [],
    dispenses: [],
    dispense: {} as any
  },
  mutations: {
    setMedReq(state, medReq: IMedicationReq[]) {
      state.medicationRequest = medReq;
    },
    setDispense(state, dispense: IDispense) {
      state.dispense = dispense;
    },
  },
  actions: {
    async fetchMedReq(ctx) {
      const medReq = await fetchMedReq();
      ctx.commit("setMedReq", medReq);
    },
    async viewDispense(ctx, { locationId, requestId }) {
      const dispense = await viewDispense(locationId, requestId);
      ctx.commit("setDispense", dispense);
    },
  },
} as StoreOptions<DispenseState>;
