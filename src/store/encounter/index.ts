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
      // const res = await createEncounter(data);
      // // ctx.commit("setEncounters", res);
      // ctx.dispatch("getEncounters");
      await createEncounter(data)
        .then(() => {
          return Promise.resolve();
        })
        .catch(e => {
          return Promise.reject(e);
        });
    },
    async getEncounters(ctx, id) {
      await getEncounters(id)
        .then(res => {
          console.log("encounterrr", res.data);
          ctx.commit("setEncounters", res.data);
          return Promise.resolve();
        })
        .catch(e => {
          return Promise.reject(e);
        });
    },
  },
} as StoreOptions<any>;
