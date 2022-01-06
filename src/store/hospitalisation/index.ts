import { IAdminNote, IHospitalisation } from "@/types/IHospitalisation";
import { StoreOptions } from "vuex";
import {
  getHospitalisations,
  createHospitalisation,
  createAdminNote,
  updateHospitalisation,
} from "./helper";

interface SchedulesStore {
  patientHospitalisations: IHospitalisation[];
}

export default {
  namespaced: true,
  state: {
    patientHospitalisations: [],
  },

  mutations: {
    setPatientHospitalizations(state, items) {
      if (items && items.length > 0) state.patientHospitalisations = [...items];
    },

    addNewItem(state, data) {
      if (data) {
        state.patientHospitalisations.unshift(data);
      }
    },

    addNote(state, data) {
      if (data) {
        const index = state.patientHospitalisations.findIndex(
          hospitalisation => hospitalisation.id === data.hospitalizationId
        );
        state.patientHospitalisations[index]?.notes?.unshift(data);
      }
    },

    updateHospitalisation(state, data) {
      if (data) {
        const index = state.patientHospitalisations.findIndex(
          hospitalisation => hospitalisation.id === data.id
        );
        if (index >= 0) state.patientHospitalisations[index] = { ...data };
      }
    },

    // updateStatus(state, payload) {
    //   const index = state.visits.findIndex((i: any) => i.id === payload.id);
    //   if (index >= 0) state.visits[index].status = payload.status;

    //   const inPatientsVisits = state.patientVisits.findIndex((i: any) => i.id === payload.id);

    //   if (inPatientsVisits >= 0) state.patientVisits[inPatientsVisits].status = payload.status;
    // },
  },

  actions: {
    async getHospitalisations(ctx, patientId: string) {
      const response = await getHospitalisations(patientId);
      ctx.commit("setPatientHospitalizations", response);
    },

    async createHospitalisation(ctx, body) {
      const res = await createHospitalisation(body);
      if (!res) return false;
      ctx.commit("addNewItem", res);
      return res as boolean;
    },

    async createAdminNote(ctx, body: IAdminNote) {
      const res = await createAdminNote(body);

      if (!res) return false;

      ctx.commit("addNote", res);
      return res as boolean;
    },

    async updateHospitalisation(ctx, body: IHospitalisation) {
      const res = await updateHospitalisation(body);
      if (!res) return false;
      ctx.commit("updateHospitalisation", res);
      return res as boolean;
    },
  },
} as StoreOptions<SchedulesStore>;
