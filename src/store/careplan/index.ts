import ObjectSet from "@/lib/objectset";
import ICarePlan from "@/types/ICarePlan";
import { StoreOptions } from "vuex";
import { getCarePlans, updateCarePlan } from "./helper";

interface CareplanStore {
  careplans: ICarePlan[];
}

export default {
  namespaced: true,
  state: {
    careplans: [],
  },

  mutations: {
    setCareplans(state, careplans: ICarePlan[]) {
      state.careplans = [...careplans];
    },
    updateCareplans(state, careplans: ICarePlan[]) {
      const careplanSet = new ObjectSet(
        [...state.careplans, ...careplans],
        "id"
      );
      state.careplans = [...careplanSet];
    },
    deleteCareplan(state, id: string) {
      const index = state.careplans.findIndex(orgCarePlan => orgCarePlan.id == id);
      if (index < 0) return;
      const careplans = [...state.careplans];
      careplans.splice(index, 1);
      state.careplans = [...careplans];
    },

  

  
  },

  actions: {
    async getCarePlans(ctx) {
      const careplans = await getCarePlans();
      ctx.commit("setCareplans", careplans);
    },
    async getCareplanById(ctx, id: string) {
      if (ctx.state.careplans.length < 1) await ctx.dispatch("getCarePlans");
      return ctx.state.careplans.find(orgCarePlan => orgCarePlan.id == id);
    },

    async updateCarePlan(ctx, body: any) {
      const res = await updateCarePlan(body);
      if (!res) return false;
      //   ctx.commit("updateHospitalisation", res)
      return res as boolean;
    },
  },
} as StoreOptions<CareplanStore>;
