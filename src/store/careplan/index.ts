import ICarePlan from "@/types/ICarePlan";
import { StoreOptions } from "vuex";
import { createCarePlan, getCarePlans, updateCarePlan } from "./helper";

interface CareplanStore {
  patientCarePlans: ICarePlan[];
}

export default {
  namespaced: true,
  state: {
    patientCarePlans: [],
  },

  mutations: {
    setPatientPlans(state, patientCarePlans: ICarePlan[]) {
      state.patientCarePlans = [...patientCarePlans];
    },

    addNewItem(state, data) {
      if (data) {
        state.patientCarePlans.unshift(data);
      }
    },

  
  },

  actions: {
    async getCarePlans(ctx, patientId: string) {
      const response = await getCarePlans(patientId);
      ctx.commit("setPatientPlans", response);
    },

    async createCarePlan(ctx, body) {
      const res = await createCarePlan(body);
      if (!res) return false;
      ctx.commit("addNewItem", res);
      return res as boolean;
    },
    async getCareplanById(ctx, id: string) {
      if (ctx.state.patientCarePlans.length < 1) await ctx.dispatch("getCarePlans");
      return ctx.state.patientCarePlans.find(patientCarePlan => patientCarePlan.id == id);
    },

    async updateCarePlan(ctx, body: any) {
      const res = await updateCarePlan(body);
      if (!res) return false;
      //   ctx.commit("updateHospitalisation", res)
      return res as boolean;
    },
  },
} as StoreOptions<CareplanStore>;
