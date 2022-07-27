import IBillingCenters from "@/types/IBillingCenters";
import { StoreOptions } from "vuex";
import {  fetchBillingcenters } from "./helper";

interface IBillingCentersState {
    billingcenters: IBillingCenters[];
}

export default {
  namespaced: true,
  state: {
    billingcenters: [],
  },
  mutations: {
    setBillingCenter(state, billingcenters: any) {
      state.billingcenters = [billingcenters];
    },
 
  },
  actions: {
    async fetchBillingcenters(ctx) {
      const billingcenters = await fetchBillingcenters();
      ctx.commit("setBillingCenter", billingcenters);
    },
    getBookingsiteById(ctx, id: string) {
      return ctx.state.billingcenters.find(
        billingcenter => billingcenter.id == id
      );
    },

  
  },
} as StoreOptions<IBillingCentersState>;
