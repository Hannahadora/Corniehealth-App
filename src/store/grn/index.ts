import ObjectSet from "@/lib/objectset";
import IGrn from "@/types/IGrn";
import { StoreOptions } from "vuex";
import { fetchGrns } from "./helper";

interface GrnState {
  grns: IGrn[];
}

export default {
  namespaced: true,
  state: {
    grns: [],
  },
  mutations: {
    setGrns(state, grns: IGrn[]) {
      state.grns = [...grns];
    },
    updateGrns(state, grns: IGrn[]) {
      const grnSet = new ObjectSet([...state.grns, ...grns], "id");
      state.grns = [...grnSet];
    },

  },
  actions: {
    async fetchGrns(ctx) {
      const grns = await fetchGrns();
      ctx.commit("setGrns", grns);
    },
    async getGrnById(ctx, id: string) {
      if (ctx.state.grns.length < 1) await ctx.dispatch("fetchGrns");
      return ctx.state.grns.find(grn => grn.id == id);
    },
  },
} as StoreOptions<GrnState>;
