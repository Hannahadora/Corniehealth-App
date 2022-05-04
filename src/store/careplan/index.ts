import ObjectSet from "@/lib/objectset";
import ICarePlan from "@/types/ICarePlan";
import { StoreOptions } from "vuex";
import { getCarePlans, updateCarePlan, getPatientCarePlans } from "./helper";

interface CareplanStore {
  careplans: ICarePlan[];
  patientCarePlans: ICarePlan[];
}

export default {
  namespaced: true,
  state: {
    careplans: [],
    patientCarePlans: []
  },

  mutations: {
    setCareplans(state, careplans: ICarePlan[]) {
      state.careplans = [...careplans];
    },
    setPatientPlans(state, patientCarePlans: ICarePlan[]) {
      state.patientCarePlans = [...patientCarePlans];
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
    async getPatientCarePlans(ctx, patientId: string) {
      const response = await getPatientCarePlans(patientId);
      ctx.commit("setPatientPlans", response);
    },
    async getCareplanById(ctx, id: string) {
      if (ctx.state.careplans.length < 1) await ctx.dispatch("getCarePlans");
      return ctx.state.careplans.find(orgCarePlan => orgCarePlan.id == id);
    },
    async getPatientCareplanById(ctx, id: string) {
      if (ctx.state.patientCarePlans.length < 1) await ctx.dispatch("getPatientCarePlans");
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
