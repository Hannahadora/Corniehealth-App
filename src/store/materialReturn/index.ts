import ObjectSet from "@/lib/objectset";
import IMaterialReturn from "@/types/IMaterialReturn";
import { StoreOptions } from "vuex";
import { fetchMaterialReturnIncoming, fetchMaterialReturnOutgoing} from "./helper";

interface MateirialReturnState {
    materialreturns: IMaterialReturn[];
}

export default {
  namespaced: true,
  state: {
    materialreturns: [],
  },
  mutations: {
    setMaterialReturn(state, materialreturns: any) {
      state.materialreturns = [...materialreturns];
    },
    updateMaterialReturn(state, materialreturns: IMaterialReturn[]) {
      const materialreturnSet = new ObjectSet([...state.materialreturns, ...materialreturns], "id");
      state.materialreturns = [...materialreturnSet];
    },
  },
  actions: {
    async fetchMaterialReturnIncoming(ctx, locaitonId: string) {
      const materialreturns = await fetchMaterialReturnIncoming(locaitonId);
      ctx.commit("setMaterialReturn", materialreturns);
    },
    async fetchMaterialReturnOutgoing(ctx, locaitonId: string) {
      const materialreturns = await fetchMaterialReturnOutgoing(locaitonId);
      ctx.commit("setMaterialReturn", materialreturns);
    },
    async getMaterialReturnById(ctx, id: string) {
      if (ctx.state.materialreturns.length < 1) await ctx.dispatch("fetchMaterialReturnIncoming");
      return ctx.state.materialreturns.find(materialreturn => materialreturn.id == id);
    },
    async getMaterialRequestOutgoingById(ctx, id: string) {
      if (ctx.state.materialreturns.length < 1) await ctx.dispatch("fetchMaterialReturnOutgoing");
      return ctx.state.materialreturns.find(materialreturn => materialreturn.id == id);
    },
  },
} as StoreOptions<MateirialReturnState>;
