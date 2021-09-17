import ObjectSet from "@/lib/objectset";
import search from "@/plugins/search";
import IPractitioner from "@/types/IPractitioner";
import { StoreOptions } from "vuex";
import { deletePractitioner, fetchPractitioners } from "./helper";

interface PractitionerState {
  practitioners: IPractitioner[];
}

export default {
  namespaced: true,
  state: {
    practitioners: [],
  },
  mutations: {
    setPractitioners(state, practitioners: IPractitioner[]) {
      state.practitioners = [...practitioners];
    },
    updatePractitioners(state, practitioners: IPractitioner[]) {
      const practitionerSet = new ObjectSet(
        [...state.practitioners, ...practitioners],
        "id"
      );
      state.practitioners = [...practitionerSet];
    },
    deletePractitioner(state, id: string) {
      const index = state.practitioners.findIndex(
        (practitioner) => practitioner.id == id
      );
      if (index < 0) return;
      const practitioners = [...state.practitioners];
      practitioners.splice(index, 1);
      state.practitioners = [...practitioners];
    },
  },
  actions: {
    async fetchPractitioners(ctx) {
      const practitioners = await fetchPractitioners();
      ctx.commit("setPractitioners", practitioners);
    },
    getPractitionerById(ctx, id: string) {
      return ctx.state.practitioners.find(
        (practitioner) => practitioner.id == id
      );
    },
    async deletePractitioner(ctx, id: string) {
      const deleted = await deletePractitioner(id);
      if (deleted) ctx.commit("deletePractitioner", id);
      return deleted;
    },
    async searchPractitioners(ctx, query: string) {
      if (!ctx.state.practitioners.length)
        await ctx.dispatch("fetchPractitioners");
      const practitioners = ctx.state.practitioners;
      return search.searchObjectArray(practitioners, query);
    },
  },
} as StoreOptions<PractitionerState>;
