import ObjectSet from "@/lib/objectset";
import { updateModelField } from "@/plugins/utils";
import { IPatient } from "@/types/IPatient";
import { StoreOptions } from "vuex";
import { deletePatient, fetchPatients } from "./helper";

interface PatientState {
  patients: IPatient[];
}

export default {
  namespaced: true,
  state: {
    patients: [],
  },
  mutations: {
    addPatients(state, patients: IPatient[]) {
      const patientSet = new ObjectSet([...state.patients, ...patients], "id");
      state.patients = [...patientSet];
    },
    updatePatient(state, patient: IPatient) {
      const patientSet = new ObjectSet([...state.patients, patient], "id");
      state.patients = [...patientSet];
    },
    deletePatient(state, id: string) {
      state.patients = state.patients.filter((p) => p.id != id);
    },
  },
  actions: {
    updatePatientField(ctx, { id, field, data }: any) {
      const patients = ctx.state.patients;
      let patient = patients.find((p) => p.id == id);
      patient = updateModelField(patient, field, data);
      ctx.commit("updatePatient", patient);
    },
    async fetchPatients(ctx) {
      const patients = await fetchPatients();
      ctx.commit("addPatients", patients);
    },
    async deletePatient(ctx, id: string) {
      const deleted = await deletePatient(id);
      if (deleted) ctx.commit("removePatient", id);
      return deleted;
    },
  },
} as StoreOptions<PatientState>;
