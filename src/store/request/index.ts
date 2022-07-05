import ObjectSet from "@/lib/objectset";
import IRequest from "@/types/IRequest";
import { StoreOptions } from "vuex";
import IPageInfo from "@/types/IPageInfo";
import {
  deleteRequest,
  fetchRequests,
  getPatients,
  getPractitioners,
  fetchrequestsById,
} from "./helper";

interface RequestState {
  requests: IRequest[];
  patients: any[];
  practitioners: any[];
  patientrequests: IRequest[];
  pageInfo : IPageInfo;
}

export default {
  namespaced: true,
  state: {
    requests: [],
    patients: [],
    practitioners: [],
    patientrequests: [],
    pageInfo: {},
  },
  mutations: {
    setPageInfo(state, pageInfo){
      state.pageInfo = pageInfo;
    },
    updatedRequests(state, requests) {
      state.requests = [...requests];
    },
    // updatedRequests(state, requests: IRequest[]) {
    //   const requestSet = new ObjectSet([...state.requests, ...requests], "id");
    //   state.requests = [...requestSet];
    // },
    setPatientRequests(state, requests: any) {
      state.patientrequests = [...requests];
    },
    // setPatientRequests(state, requests: IRequest[]) {
    //   const requestSet = new ObjectSet([...state.requests, ...requests], "id");
    //   state.patientrequests = [...requestSet];
    // },
    setPatients(state, pts) {
      if (pts && pts.length > 0) state.patients = [...pts];
    },
    setPractitioners(state, pts) {
      if (pts && pts.length > 0) state.practitioners = [...pts];
    },
    updateRequests(state, requests: IRequest[]) {
      const requestSet = new ObjectSet([...state.requests, ...requests], "id");
      state.requests = [...requestSet];
    },
    deleteRequest(state, id: string) {
      const index = state.requests.findIndex(request => request.id == id);
      if (index < 0) return;
      const requests = [...state.requests];
      requests.splice(index, 1);
      state.requests = [...requests];
    },
  },
  actions: {
    async fetchrequestsById(ctx, patientId: string) {
      const requests = await fetchrequestsById(patientId);
      ctx.commit("setPatientRequests", requests);
    },
    async fetchRequests(ctx,payload? : {page:number, limit:number}) {
      const { page, limit } = payload ?? {}
      const { data, pageInfo } = await fetchRequests(page ?? 1, limit ?? 10);
      ctx.commit("updatedRequests", data);
      ctx.commit("setPageInfo", pageInfo);
    },
    async getPatients(ctx) {
      const pts = await getPatients();
      ctx.commit("setPatients", pts);
    },
    async getPractitioners(ctx) {
      const pts = await getPractitioners();
      ctx.commit("setPractitioners", pts);
    },
    async getRequestById(ctx, id: string) {
      if (ctx.state.requests.length < 1) await ctx.dispatch("fetchRequests");
      return ctx.state.requests.find(request => request.id == id);
    },
    async getOneRequestById(ctx, id: string) {
      if (ctx.state.patientrequests.length < 1) await ctx.dispatch("fetchrequestsById");
      return ctx.state.patientrequests.find(request => request.id == id);
    },
    async deleteRequest(ctx, id: string) {
      const deleted = await deleteRequest(id);
      if (!deleted) return false;
      ctx.commit("deleteRequest", id);
      return true;
    },
    async pageSwitch(ctx, page:number){
      const requests = await fetchRequests();
      ctx.commit("updatedRequests", requests);
      ctx.commit("setPageInfo", requests);
    }
  },
} as StoreOptions<RequestState>;
