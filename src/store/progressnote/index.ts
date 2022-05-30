import ObjectSet from "@/lib/objectset";
import IAllergy from "@/types/IAllergy";
import { StoreOptions } from "vuex";
import {
  createProgressNote,
  deleteAllergy,
  fetchAllergys,
  fetchProgressNote,
  getPractitioners,
} from "./helper";

interface AllergyState {
  allergys: IAllergy[];
  practitioners: any[];
}

export default {
  namespaced: true,
  state: {
    allergys: [],
    practitioners: [],
    progressNotes: [],
  },
  mutations: {
    setAllergys(state, allergys: IAllergy[]) {
      state.allergys = [...allergys];
    },
    setPractitioners(state, pts) {
      if (pts && pts.length > 0) state.practitioners = [...pts];
    },
    updateAllergys(state, allergys: IAllergy[]) {
      const allergySet = new ObjectSet([...state.allergys, ...allergys], "id");
      state.allergys = [...allergySet];
    },
    deleteAllergy(state, id: string) {
      const index = state.allergys.findIndex(
        (allergy: any) => allergy.id == id
      );
      if (index < 0) return;
      const allergys = [...state.allergys];
      allergys.splice(index, 1);
      state.allergys = [...allergys];
    },
    setProgressNote(state, data) {
      state.progressNotes = data;
    },
  },
  actions: {
    async fetchAllergys(ctx, patientId: string) {
      const allergys = await fetchAllergys(patientId);
      ctx.commit("setAllergys", allergys);
    },
    async getPractitioners(ctx) {
      const pts = await getPractitioners();
      ctx.commit("setPractitioners", pts);
    },
    async getAllergyById(ctx, id: string) {
      if (ctx.state.allergys.length < 1) await ctx.dispatch("fetchAllergys");
      return ctx.state.allergys.find((allergy: any) => allergy.id == id);
    },
    async deleteAllergy(ctx, id: string) {
      const deleted = await deleteAllergy(id);
      if (!deleted) return false;
      ctx.commit("deleteAllergy", id);
      return true;
    },
    async createProgressNote(ctx, data) {
      const response = await createProgressNote(data);
      console.log("created", response);
      // ctx.dispatch("fetchProgressNote");
    },
    async fetchProgressNote(ctx, id) {
      const response = await fetchProgressNote(id);
      ctx.commit("setProgressNote", response);
    },
  },
} as StoreOptions<any>;
