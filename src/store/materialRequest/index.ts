import ObjectSet from "@/lib/objectset";
import IMaterialRequest from "@/types/IMaterialRequest";
import { StoreOptions } from "vuex";
import { fetchMaterialRequestsIncoming, fetchMaterialRequestsOutgoing} from "./helper";

interface MateirialRequestState {
  materialrequests: IMaterialRequest[];
}

export default {
  namespaced: true,
  state: {
    materialrequests: [],
  },
  mutations: {
    setMaterialRequest(state, materialrequests: any) {
      state.materialrequests = [...materialrequests];
    },
    updateMaterialRequests(state, materialrequests: IMaterialRequest[]) {
      const materialrequestSet = new ObjectSet([...state.materialrequests, ...materialrequests], "id");
      state.materialrequests = [...materialrequestSet];
    },
  },
  actions: {
    async fetchMaterialRequestsIncoming(ctx, locaitonId: string) {
      const materialrequests = await fetchMaterialRequestsIncoming(locaitonId);
      ctx.commit("setMaterialRequest", materialrequests);
    },
    async fetchMaterialRequestsOutgoing(ctx, locaitonId: string) {
      const materialrequests = await fetchMaterialRequestsOutgoing(locaitonId);
      ctx.commit("setMaterialRequest", materialrequests);
    },
    async getMaterialRequestById(ctx, id: string) {
      if (ctx.state.materialrequests.length < 1) await ctx.dispatch("fetchMaterialRequestsIncoming");
      return ctx.state.materialrequests.find(materialrequest => materialrequest.id == id);
    },
    async getMaterialRequestOutgoingById(ctx, id: string) {
      if (ctx.state.materialrequests.length < 1) await ctx.dispatch("fetchMaterialRequestsOutgoing");
      return ctx.state.materialrequests.find(materialrequest => materialrequest.id == id);
    },
  },
} as StoreOptions<MateirialRequestState>;
