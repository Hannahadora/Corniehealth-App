import { StoreOptions } from "vuex";
import  IPatientvisit  from "@/types/IPatientvisit";
// import ObjectSet from "@/lib/objectset";
import { fetchPatientvisits, getPatientVisitsBill } from "./helper";

interface PatientvisitStore {
  patientvisits: IPatientvisit[];
  patientvisitbill : any

}

export default {
  namespaced: true,
  state: {
    patientvisits: [],
    patientvisitbill: {}

  },
  mutations: {
    setPatientVisit(state, patientvisits: IPatientvisit[]) {
      // const patientvisitSet = new ObjectSet([...state.patientvisits, ...patientvisits], "id");
      // state.patientvisits = [...patientvisitSet];
      state.patientvisits = patientvisits;
    },
    setPatientvisitbill(state, patientvisitbill: any) {
      state.patientvisitbill = patientvisitbill;
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
    async getPatientVisitsBill(ctx, encounterId: string) {
      const patientvisitbill = await getPatientVisitsBill(encounterId);
      ctx.commit("setPatientvisitbill", patientvisitbill);
    },

  },
} as StoreOptions<PatientvisitStore>;
