import ObjectSet from "@/lib/objectset";
import IAllergy from "@/types/IAllergy";
import { StoreOptions } from "vuex";
import { deleteAllergy, fetchAllergys, getPractitioners,fetchAllAllergys } from "./helper";

interface AllergyState {
  allergys: IAllergy[];
  allallergys: IAllergy[];
  practitioners: any[],
}

export default {
  namespaced: true,
  state: {
    allergys: [],
    allallergys: [],
    practitioners: [],
  },
  mutations: {
    setAllAllergys(state, allergys: any) {
      state.allallergys = [...allergys.result];
    },
    setAllergys(state, allergys:any) {
      state.allergys = [...allergys.result];
    },
    setPractitioners(state, pts) {
      if (pts && pts.length > 0) state.practitioners = [ ...pts ];
    },
    updateAllergys(state, allergys: IAllergy[]) {
      const allergySet = new ObjectSet([...state.allergys, ...allergys], "id");
      state.allergys = [...allergySet];
    },
    deleteAllergy(state, id: string) {
      const index = state.allergys.findIndex((allergy) => allergy.id == id);
      if (index < 0) return;
      const allergys = [...state.allergys];
      allergys.splice(index, 1);
      state.allergys = [...allergys];
    },
  },
  actions: {
    async fetchAllAllergys(ctx) {
      const allergys = await fetchAllAllergys();
      ctx.commit("setAllAllergys", allergys);
    },
    async fetchAllergys(ctx,patientId:string) {
      const allergys = await fetchAllergys(patientId);
      console.log("allergyfromstatebypatient", allergys.result);
      ctx.commit("setAllergys", allergys.result);
    },
    async getPractitioners(ctx) {
      const pts = await getPractitioners();      
      ctx.commit("setPractitioners", pts);
    },
    async getAllergyById(ctx, id: string) {
      if (ctx.state.allergys.length < 1) await ctx.dispatch("fetchAllergys");
      return ctx.state.allergys.find((allergy) => allergy.id == id);
    },
    async deleteAllergy(ctx, id: string) {
      const deleted = await deleteAllergy(id);
      if (!deleted) return false;
      ctx.commit("deleteAllergy", id);
      return true;
    },
  },
} as StoreOptions<AllergyState>;
