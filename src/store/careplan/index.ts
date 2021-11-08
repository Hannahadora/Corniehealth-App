import ICarePlan from "@/types/ICarePlan";
import { StoreOptions } from "vuex";
import { createCarePlan, getCarePlans, updateCarePlan } from "./helper";

interface CareplanStore {
  patientCarePlans: ICarePlan[],
}

export default {
  namespaced: true,
  state: {
    patientCarePlans: [],
  },

  mutations: {

    setPatientPlans(state, items) {
      if (items && items.length > 0) state.patientCarePlans = [ ...items ];
    },

    addNewItem(state, data) {
      if (data) {
        state.patientCarePlans.unshift(data);
      }
    },

    // updateHospitalisation(state, data) {
    //   if (data) {
    //     const index = state.patientHospitalisations.findIndex(hospitalisation => hospitalisation.id === data.id);
    //     if (index >= 0) state.patientHospitalisations[index] = { ...data };
    //   }
    // },

    // updateStatus(state, payload) {
    //   const index = state.visits.findIndex((i: any) => i.id === payload.id);
    //   if (index >= 0) state.visits[index].status = payload.status;

    //   const inPatientsVisits = state.patientVisits.findIndex((i: any) => i.id === payload.id);
      
    //   if (inPatientsVisits >= 0) state.patientVisits[inPatientsVisits].status = payload.status;
    // },
  },

  actions: {
    async getCarePlans(ctx, patientId: string) {
      const response = await getCarePlans(patientId);
      ctx.commit("setPatientPlans", response);
    },

    async createCarePlan(ctx, body) {
      const res = await createCarePlan(body)
      if (!res) return false;
      ctx.commit("addNewItem", res)
      return res as boolean;
    },

    async updateCarePlan(ctx, body: any) {
      const res = await updateCarePlan(body)
      if (!res) return false;
    //   ctx.commit("updateHospitalisation", res)
      return res as boolean;
    }
  },
} as StoreOptions<CareplanStore>
