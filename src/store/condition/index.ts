import { ICondition } from "@/types/ICondition";
import { StoreOptions } from "vuex";
import { fetchPatientConditions, deleteCondition } from "./helper";

interface ConditionState {
  conditions: ICondition[];
}

export default {
  namespaced: true,
  state: {
    conditions: [],
  },
  mutations: {
    setPatientConditions(state, conditions: ICondition[]) {
      state.conditions = [...conditions];
    },
    deleteCondition(state, id: string) {
      const index = state.conditions.findIndex(condition => condition.id == id);
      if (index < 0) return;
      const conditions = [...state.conditions];
      conditions.splice(index, 1);
      state.conditions = [...conditions];
    },

  }, 
  actions: {
    async fetchPatientConditions(ctx, patientId: string) {
      const conditions = await fetchPatientConditions(patientId);
      ctx.commit("setPatientConditions", conditions);
    },
    async getConditionById(ctx, id: string) {
      if (ctx.state.conditions.length < 1) await ctx.dispatch("fetchPatientConditions");
      return ctx.state.conditions.find(condition => condition.id == id);
    },
    async deleteCondition(ctx, id: string) {
      const deleted = await deleteCondition(id);
      if (!deleted) return false;
      ctx.commit("deleteCondition", id);
      return true;
    },
  },
} as StoreOptions<ConditionState>;
