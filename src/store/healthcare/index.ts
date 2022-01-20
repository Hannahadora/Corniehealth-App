import ObjectSet from "@/lib/objectset";
import IHealthcare from "@/types/IHealthcare";
import { StoreOptions } from "vuex";
import { deleteHealthcare, fetchHealthcares } from "./helper";

interface HealthcareState {
  healthcares: IHealthcare[];
}

export default {
  namespaced: true,
  state: {
    healthcares: [],
  },
  mutations: {
    setHealthcares(state, healthcares: IHealthcare[]) {
      state.healthcares = [...healthcares];
    },
    updateHealthcares(state, healthcares: IHealthcare[]) {
      const healthcareSet = new ObjectSet(
        [...state.healthcares, ...healthcares],
        "id"
      );
      state.healthcares = [...healthcareSet];
    },
    deleteHealthcare(state, id: string) {
      const index = state.healthcares.findIndex(
        healthcare => healthcare.id == id
      );
      if (index < 0) return;
      const healthcares = [...state.healthcares];
      healthcares.splice(index, 1);
      state.healthcares = [...healthcares];
    },
  },
  actions: {
    async fetchHealthcares(ctx) {
      const healthcares = await fetchHealthcares();
      ctx.commit("setHealthcares", healthcares);
    },
    async getHealthcareById(ctx, id: string) {
      if (ctx.state.healthcares.length < 1)
        await ctx.dispatch("fetchHealthcares");
      return ctx.state.healthcares.find(healthcare => healthcare.id == id);
    },
    async deleteHealthcare(ctx, id: string) {
      const deleted = await deleteHealthcare(id);
      if (!deleted) return false;
      ctx.commit("deleteHealthcare", id);
      return true;
    },
  },
} as StoreOptions<HealthcareState>;
