import ObjectSet from "@/lib/objectset";
import IPractitioner from "@/types/IPractitioner";
import { StoreOptions } from "vuex";
import { fetchPractitioners } from "./helper";

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
  },
} as StoreOptions<PractitionerState>;
