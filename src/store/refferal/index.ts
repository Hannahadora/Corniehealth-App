import ObjectSet from "@/lib/objectset";
import IRefferal from "@/types/IRefferal";
import { StoreOptions } from "vuex";
import { fetchRefferal, fetchRefferalById } from "./helper";

interface RefferalState {
  refferals: IRefferal[];
  patientrefferals: IRefferal[];
}

export default {
  namespaced: true,
  state: {
    refferals: [],
    patientrefferals : [],
  },
  mutations: {
    updatedRefferal(state, refferals: IRefferal[]) {
      const refferalSet = new ObjectSet([...state.refferals, ...refferals], "id");
      state.refferals = [...refferalSet];
    },
    setPatientRefferals(state, refferals: IRefferal[]) {
      const refferalSet = new ObjectSet([...state.refferals, ...refferals], "id");
      state.patientrefferals= [...refferalSet];
    },
    updateRefferals(state, refferals: IRefferal[]) {
      const refferalSet = new ObjectSet([...state.refferals, ...refferals], "id");
      state.refferals = [...refferalSet];
    },
  },
  actions: {
    async fetchRefferalById(ctx, patientId: string) {
      const refferals = await fetchRefferalById(patientId);
      ctx.commit("setPatientRefferals", refferals);
    },
    async fetchRefferal(ctx) {
      const refferals = await fetchRefferal();

      ctx.commit("updatedRefferal", refferals);
    },
    async getRefferalById(ctx, id: string) {
      if (ctx.state.refferals.length < 1) await ctx.dispatch("fetchRefferal");
      return ctx.state.refferals.find(refferal => refferal.id == id);
    },
    async getOneRefferalById(ctx, id: string) {
      if (ctx.state.patientrefferals.length < 1) await ctx.dispatch("fetchRefferalById");
      return ctx.state.patientrefferals.find(refferal => refferal.id == id);
    },
  },
} as StoreOptions<RefferalState>;
