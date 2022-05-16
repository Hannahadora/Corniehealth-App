import ObjectSet from "@/lib/objectset";
import IMaterialRequest from "@/types/IMaterialRequest";
import { StoreOptions } from "vuex";
import { fetchMaterialRequests, } from "./helper";

interface MateirialRequestState {
  materialrequests: IMaterialRequest[];
}

export default {
  namespaced: true,
  state: {
    materialrequests: [],
  },
  mutations: {
    setMaterialRequest(state, materialrequests: IMaterialRequest[]) {
      state.materialrequests = [...materialrequests];
    },
    updateMaterialRequests(state, materialrequests: IMaterialRequest[]) {
      const materialrequestSet = new ObjectSet([...state.materialrequests, ...materialrequests], "id");
      state.materialrequests = [...materialrequestSet];
    },
  },
  actions: {
    async fetchMaterialRequests(ctx, locaitonId: string) {
      const materialrequests = await fetchMaterialRequests(locaitonId);
      ctx.commit("setMaterialRequest", materialrequests);
    },
    async getMaterialRequestById(ctx, id: string) {
      if (ctx.state.materialrequests.length < 1) await ctx.dispatch("fetchMaterialRequests");
      return ctx.state.materialrequests.find(materialrequest => materialrequest.id == id);
    },
  },
} as StoreOptions<MateirialRequestState>;
