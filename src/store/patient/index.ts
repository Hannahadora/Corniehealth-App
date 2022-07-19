import ObjectSet from "@/lib/objectset";
import { updateModelField } from "@/plugins/utils";
import { IPatient, Provider } from "@/types/IPatient";
import { StoreOptions } from "vuex";
import { deletePatient, deleteProvider, fetchPatients, fetchPatientsEncounter, deletePatientEncounter } from "./helper";
import  IEncounter  from "@/types/IEncounter";

type ActiveEncounter = Record<string, IEncounter | undefined> 

interface PatientState {
  patients: IPatient[];
  encounters:  ActiveEncounter;
  
}
export default {
  namespaced: true,
  state: {
    patients: [],
    encounters: {} as ActiveEncounter,
  },
  mutations: {
    setPatientEncounter(state, encounters: ActiveEncounter) {
      state.encounters = encounters
    },
    addPatients(state, patients: IPatient[]) {
      const patientSet = new ObjectSet([...state.patients, ...patients], "id");
      state.patients = [...patientSet];
    },
    updatePatient(state, patient: IPatient) {
      const patientSet = new ObjectSet([...state.patients, patient], "id");
      state.patients = [...patientSet];
    },
    deletePatientEncounter(state, patientId : string) {
      const encounters = {...state.encounters}
      delete encounters[patientId]
      state.encounters = {... encounters}
    },

    deletePatient(state, id: string) {
      const index = state.patients.findIndex(patient => patient.id == id);
      if (index < 0) return;
      const patients = [...state.patients];
      patients.splice(index, 1);
      state.patients = [...patients];
    },
    deleteProvider(state, { type, id, patientId }: any) {
      const patient = state.patients.find(p => p.id == patientId);
      if (!patient) return;
      let providers: Provider[] = [];
      if (type.includes("lab")) providers = patient.preferredLabs || [];
      else providers = patient.preferredPharmacies || [];
      providers = providers.filter(p => id != p.id);
      if (type.includes("lab")) patient.preferredLabs = providers as any;
      else patient.preferredPharmacies = providers as any;

      const patientSet = new ObjectSet([...state.patients, patient], "id");
      state.patients = [...patientSet];
    },
  },
  actions: {
    async fetchPatientsEncounter(ctx, locaitonId: string) {
      const encounters = await fetchPatientsEncounter(locaitonId);
      ctx.commit("setPatientEncounter", encounters);
    },
    updatePatientField(ctx, { id, field, data }: any) {
      const patients = ctx.state.patients;
      let patient = patients.find(p => p.id == id);
      patient = updateModelField(patient, field, data);
      ctx.commit("updatePatient", patient);
    },
    getPatientById(ctx, id: string) {
      return ctx.state.patients.find(
        patient => patient.id == id
      );
    },
    async deletePatientEncounter(ctx: any, payload: any) {
      const { id, data } = payload;
      const deleted = await deletePatientEncounter(id, data);
      if (!deleted) return false;
      ctx.commit("deletePatientEncounter", data.patientId);
      return true;
    },
    async fetchPatients(ctx) {
      const patients = await fetchPatients();
      ctx.commit("addPatients", patients);
    },
    async deletePatient(ctx, id: string) {
      const deleted = await deletePatient(id);
      if (!deleted) return false;
      ctx.commit("deletePatient", id);
      return true;
    },
    async deleteProvider(ctx, { type, id, patientId }: Provider) {
      const deleted = await deleteProvider(patientId, id!);
      if (deleted) ctx.commit("deleteProvider", { type, id, patientId });
      return deleted;
    },
    async findPatient(ctx, id: string) {
      if (!ctx.state.patients.length) await ctx.dispatch("fetchPatients");
      const patient = ctx.state.patients.find(p => p.id == id);
      return patient;
    },
  },
} as StoreOptions<PatientState>;
