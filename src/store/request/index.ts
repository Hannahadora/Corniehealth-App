import ObjectSet from "@/lib/objectset";
import IRequest from "@/types/IRequest";
import { StoreOptions } from "vuex";
import { deleteRequest, fetchRequests } from "./helper";

interface RequestState {
  requests: IRequest[];
}

export default {
  namespaced: true,
  state: {
    requests: [],
  },
  mutations: {
    setRequests(state, requests: IRequest[]) {
      state.requests = [...requests];
    },
    updateRequests(state, requests: IRequest[]) {
      const requestSet = new ObjectSet([...state.requests, ...requests], "id");
      state.requests = [...requestSet];
    },
    deleteRequest(state, id: string) {
      const index = state.requests.findIndex((request) => request.id == id);
      if (index < 0) return;
      const requests = [...state.requests];
      requests.splice(index, 1);
      state.requests = [...requests];
    },
  },
  actions: {
    async fetchRequests(ctx) {
      const requests = await fetchRequests();
      ctx.commit("setRequests", requests);
    },
    async getRequestById(ctx, id: string) {
      if (ctx.state.requests.length < 1) await ctx.dispatch("fetchRequests");
      return ctx.state.requests.find((request) => request.id == id);
    },
    async deleteRequest(ctx, id: string) {
      const deleted = await deleteRequest(id);
      if (!deleted) return false;
      ctx.commit("deleteRequest", id);
      return true;
    },
  },
} as StoreOptions<RequestState>;
