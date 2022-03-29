import ObjectSet from "@/lib/objectset";
import IDiagnostic from "@/types/IDiagnostic";
import { StoreOptions } from "vuex";
import { fetchDiagnostic, fetchDiagnosticById } from "./helper";

interface DiagnosticState {
  diagnostics: IDiagnostic[];
  patientdiagnostics: IDiagnostic[];
}

export default {
  namespaced: true,
  state: {
    diagnostics: [],
    patientdiagnostics : [],
  },
  mutations: {
    updatedDiagnostics(state, diagnostics: IDiagnostic[]) {
      const diagnosticSet = new ObjectSet([...state.diagnostics, ...diagnostics], "id");
      state.diagnostics = [...diagnosticSet];
    },
    setPatientDiagnostics(state, diagnostics: IDiagnostic[]) {
      const diagnosticSet = new ObjectSet([...state.diagnostics, ...diagnostics], "id");
      state.patientdiagnostics = [...diagnosticSet];
    },
    updateDiagnostics(state, diagnostics: IDiagnostic[]) {
      const diagnosticSet = new ObjectSet([...state.diagnostics, ...diagnostics], "id");
      state.diagnostics = [...diagnosticSet];
    },
  },
  actions: {
    async fetchDiagnosticById(ctx, patientId: string) {
      const diagnostics = await fetchDiagnosticById(patientId);
      ctx.commit("setPatientDiagnostics", diagnostics);
    },
    async fetchDiagnostic(ctx) {
      const diagnostics = await fetchDiagnostic();
      ctx.commit("updatedDiagnostics", diagnostics);
    },
    async getDiagnostictById(ctx, id: string) {
      if (ctx.state.diagnostics.length < 1) await ctx.dispatch("fetchDiagnostic");
      return ctx.state.diagnostics.find(diagnostic => diagnostic.id == id);
    },
    async getOneDiagnostictById(ctx, id: string) {
      if (ctx.state.patientdiagnostics.length < 1) await ctx.dispatch("fetchDiagnosticById");
      return ctx.state.patientdiagnostics.find(diagnostic => diagnostic.id == id);
    },
  },
} as StoreOptions<DiagnosticState>;
