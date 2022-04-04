import ObjectSet from "@/lib/objectset";
import { StoreOptions } from "vuex";
import { fetchDispenses } from "./helper";
import IDispense from "@/types/IDispense";

interface PharmacyState {
  dispenses: IDispense[];
}

export default {
  namespaced: true,
  state: {
    dispenses: [],
  },
  mutations: {
    setDispenses(state, dispenses: IDispense[]) {
      state.dispenses = [...dispenses];
    },
  },
  actions: {
    async fetchDispenses(ctx, { locationId, requestId }) {
      const dispenses = await fetchDispenses(locationId, requestId);
      ctx.commit("setDispenses", dispenses);
    },
  },
} as StoreOptions<PharmacyState>;
