import ObjectSet from "@/lib/objectset";
import IImpression from "@/types/IImpression";
import { StoreOptions } from "vuex";
import { deleteImpression, fetchImpressions } from "./helper";

interface ImpressionState {
  impressions: IImpression[];
}

export default {
  namespaced: true,
  state: {
    impressions: [],
  },
  mutations: {
    setImpressions(state, impressions: any) {
      state.impressions = [...impressions.result];
    },
    updateImpressions(state, impressions: IImpression[]) {
      const impressionSet = new ObjectSet(
        [...state.impressions, ...impressions],
        "id"
      );
      state.impressions = [...impressionSet];
    },
    deleteImpression(state, id: string) {
      const index = state.impressions.findIndex(
        impression => impression.id == id
      );
      if (index < 0) return;
      const impressions = [...state.impressions];
      impressions.splice(index, 1);
      state.impressions = [...impressions];
    },
  },
  actions: {
    async fetchImpressions(ctx, patientId: string) {
      const impressions = await fetchImpressions(patientId);

      ctx.commit("setImpressions", impressions);
    },
    async getImpressionById(ctx, id: string) {
      if (ctx.state.impressions.length < 1)
        await ctx.dispatch("fetchImpressions");
      return ctx.state.impressions.find(impression => impression.id == id);
    },
    async deleteImpression(ctx, id: string) {
      const deleted = await deleteImpression(id);
      if (!deleted) return false;
      ctx.commit("deleteImpression", id);
      return true;
    },
  },
} as StoreOptions<ImpressionState>;
