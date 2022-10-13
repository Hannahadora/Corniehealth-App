
import  IVirtuallaborder  from "@/types/IVirtuallaborder";
import { StoreOptions } from "vuex";
import { fetchVirtualLabOrder } from "./helper";

interface VirtualLabState {
  virtuallaborders: IVirtuallaborder[];
}

export default {
  namespaced: true,
  state: {
    virtuallaborders: [],
  },
  mutations: {
    setVirtuallaborder(state, virtuallaborders: any) {
      state.virtuallaborders = virtuallaborders;
    },
  },
  actions: {
    async fetchVirtualLabOrder(ctx, locationId: string) {
      const virtuallaborder = await fetchVirtualLabOrder(locationId);
      ctx.commit("setVirtuallaborder", virtuallaborder);
    },
  },
} as StoreOptions<VirtualLabState>;
