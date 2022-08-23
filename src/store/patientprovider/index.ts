import ObjectSet from "@/lib/objectset";
import {IPatientProvider} from "@/types/IPatientProvider";
import { StoreOptions } from "vuex";
import { fetchPatientProvider, deletePatientProvider, fetchPrimaryDoctors} from "./helper";

interface PatientProviderState {
    patientproviders: IPatientProvider[];
    primarydoctors: any;
}

export default {
  namespaced: true,
  state: {
    patientproviders: [],
    primarydoctors: {},
  },
  mutations: {
    setPatientProvider(state, patientproviders: any) {
      state.patientproviders = [...patientproviders];
    },
    setPrimaryDoctors(state, primarydoctors: any) {
      state.primarydoctors = primarydoctors;
    },
    updatePatientProvider(state, patientproviders: IPatientProvider[]) {
      const patientproviderSet = new ObjectSet([...state.patientproviders, ...patientproviders], "id");
      state.patientproviders = [...patientproviderSet];
    },
    deletePatientProvider(state, id: string) {
      const index = state.patientproviders.findIndex(
        patientprovider => patientprovider.id == id
      );
      if (index < 0) return;
      const patientproviders = [...state.patientproviders];
      patientproviders.splice(index, 1);
      state.patientproviders = [...patientproviders];
    },
  },
  actions: {
    async fetchPatientProvider(ctx) {
      const patientproviders = await fetchPatientProvider();
      ctx.commit("setPatientProvider", patientproviders);
    },
    async fetchPrimaryDoctors(ctx) {
      const primarydoctors = await fetchPrimaryDoctors();
      ctx.commit("setPrimaryDoctors", primarydoctors);
    },
    async getPatientProviderById(ctx, id: string) {
      if (ctx.state.patientproviders.length < 1) await ctx.dispatch("fetchPatientProvider");
      return ctx.state.patientproviders.find(patientprovider => patientprovider.id == id);
    },
    async deletePatientProvider(ctx, { providerId }: any) {
      if (!providerId) return;
      const deleted = await deletePatientProvider(providerId);
      if (!deleted) return false;
      ctx.commit("deletePatientProvider", providerId);
      return true;
    },
  },
} as StoreOptions<PatientProviderState>;
