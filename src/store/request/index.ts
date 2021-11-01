import ObjectSet from "@/lib/objectset";
import IRequest from "@/types/IRequest";
import { StoreOptions } from "vuex";
import { deleteRequest, fetchRequests,getPatients,getPractitioners,fetchOtherrequestsById } from "./helper";

interface RequestState {
  requests: IRequest[];
  patients: any[],
  practitioners: any[],
  patientrequests:IRequest[],
}

export default {
  namespaced: true,
  state: {
    requests: [],
    patients: [],
    practitioners: [],
    patientrequests:[],
  },
  mutations: {
    updatedRequests(state, requests: IRequest[]) {
      const requestSet = new ObjectSet([...state.requests, ...requests], "id"); 
      state.requests = [...requestSet];
    },
    setPatientRequests(state, requests: IRequest[]) {
      const requestSet = new ObjectSet([...state.requests, ...requests], "id"); 
      state.patientrequests = [...requestSet];
    },
    setPatients(state, pts) {
      if (pts && pts.length > 0) state.patients = [ ...pts ];
    },
    setPractitioners(state, pts) {
      if (pts && pts.length > 0) state.practitioners = [ ...pts ];
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
    async fetchOtherrequestsById(ctx, patientId: string) {
      const requests = await fetchOtherrequestsById(patientId);
      ctx.commit("setPatientRequests", requests);
    },
    async fetchRequests(ctx) {
      const requests = await fetchRequests();
      console.log('request', requests);
      ctx.commit("updatedRequests", requests);
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
