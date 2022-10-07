import  IPatientSwtich  from "@/types/IPatientSwtich";
import { StoreOptions } from "vuex";
import { fetchDependaantsAccount} from "./helper";

interface PatientSwitchState {
    patientdependants: IPatientSwtich[];
}

export default {
  namespaced: true,
  state: {
    patientdependants: [],
  },
  mutations: {
    setPatientDependant(state, patientdependants: any) {
      state.patientdependants = [...patientdependants];
    },
  },
  actions: {
    async fetchDependaantsAccount(ctx) {
      const patientdependants = await fetchDependaantsAccount();
      ctx.commit("setPatientDependant", patientdependants);
    },

  },
} as StoreOptions<PatientSwitchState>;
