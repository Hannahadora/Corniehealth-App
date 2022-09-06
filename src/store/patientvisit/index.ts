import { StoreOptions } from "vuex";
import  IPatientvisit  from "@/types/IPatientvisit";
// import ObjectSet from "@/lib/objectset";
import { fetchPatientvisits } from "./helper";

interface PatientvisitStore {
  patientvisits: IPatientvisit[];

}

export default {
  namespaced: true,
  state: {
    patientvisits: [],

  },
  mutations: {
    setPatientVisit(state, patientvisits: IPatientvisit[]) {
      // const patientvisitSet = new ObjectSet([...state.patientvisits, ...patientvisits], "id");
      // state.patientvisits = [...patientvisitSet];
      state.patientvisits = patientvisits;
    },
  },

  actions: {
    async fetchPatientvisits(ctx) {
      const patientvisits = await fetchPatientvisits();
      ctx.commit("setPatientVisit", patientvisits);
    },

    getPatientVisitById(ctx, id: string) {
      return ctx.state.patientvisits.find(
        patientvisit => patientvisit.id == id
      );
    },

  },
} as StoreOptions<PatientvisitStore>;
