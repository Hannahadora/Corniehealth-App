import ObjectSet from "@/lib/objectset";
import IOtherrequest from "@/types/IOtherrequest";
import { StoreOptions } from "vuex";
import { deleteOtherrequest, fetchOtherrequests,getPatients,getPractitioners } from "./helper";

interface OtherrequestState {
otherrequests: IOtherrequest[];
  patients: any[],
  practitioners: any[],
}

export default {
  namespaced: true,
  state: {
    otherrequests: [],
    patients: [],
    practitioners: [],
  },
  mutations: {
    updatedOtherrequests(state, otherrequests: IOtherrequest[]) {
      const otherrequestSet = new ObjectSet([...state.otherrequests, ...otherrequests], "id");
      state.otherrequests = [...otherrequestSet];
    },
    setPatients(state, pts) {
      if (pts && pts.length > 0) state.patients = [ ...pts ];
    },
    setPractitioners(state, pts) {
      if (pts && pts.length > 0) state.practitioners = [ ...pts ];
    },
    updateOtherrequests(state, otherrequests: IOtherrequest[]) {
      const otherrequestSet = new ObjectSet([...state.otherrequests, ...otherrequests], "id");
      state.otherrequests = [...otherrequestSet];
    },
    deleteOtherrequest(state, id: string) {
      const index = state.otherrequests.findIndex((otherrequest) => otherrequest.id == id);
      if (index < 0) return;
      const otherrequests = [...state.otherrequests];
      otherrequests.splice(index, 1);
      state.otherrequests = [...otherrequests];
    },
  },
  actions: {
    async fetchOtherrequests(ctx) {
      const otherrequests = await fetchOtherrequests();
      ctx.commit("updatedOtherrequests", otherrequests);
    },
    async getPatients(ctx) {
      const pts = await getPatients();      
      ctx.commit("setPatients", pts);
    },
    async getPractitioners(ctx) {
      const pts = await getPractitioners();      
      ctx.commit("setPractitioners", pts);
    },
    async getOtherrequestById(ctx, id: string) {
      if (ctx.state.otherrequests.length < 1) await ctx.dispatch("fetchOtherrequests");
      return ctx.state.otherrequests.find((otherrequest) => otherrequest.id == id);
    },
    async deleteOtherrequest(ctx, id: string) {
      const deleted = await deleteOtherrequest(id);
      if (!deleted) return false;
      ctx.commit("deleteOtherrequest", id);
      return true;
    },
  },
} as StoreOptions<OtherrequestState>;
