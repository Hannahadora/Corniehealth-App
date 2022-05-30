import { StoreOptions } from "vuex";
import { createEncounter, getEncounters } from "./helper";

export default {
  namespaced: true,
  state: {
    encounters: [],
  },
  mutations: {
    setEncounters(state, encounters) {
      console.log("mm", encounters);
      state.encounters = [...encounters];
    },
  },
  actions: {
    async postEncounter(ctx, data) {
      const res = await createEncounter(data);
      // ctx.commit("setEncounters", res);
      ctx.dispatch("getEncounters");
    },
    async getEncounters(ctx, id) {
      const res = await getEncounters(id);
      console.log("encounterrr", res);
      ctx.commit("setEncounters", res);
    },
  },
} as StoreOptions<any>;
