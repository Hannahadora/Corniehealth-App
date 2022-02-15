import { StoreOptions } from "vuex";
import IPractitioner from "@/types/IPractitioner";
import ObjectSet from "@/lib/objectset";
import {
  setUserUp,
  getDormains,
  changePassword,
  postSignature,
  getUserProfile
} from "./helper";

interface UserSetup {
  practitioner: any;
  domains: any[];
  userprofiles: any[],
}

export default {
  namespaced: true,
  state: {
    practitioner: {},
    domains: [],
    userprofiles: [],
  },

  mutations: {
    setDomains(state, domains) {
      if (domains) state.domains = [...domains];
    },
    setUserProfile(state, practitioner:IPractitioner[]){
      const existingRefs = state.practitioner || [];
      const refset = new ObjectSet(
        [...existingRefs, ...practitioner],
        "id"
      )
      state.practitioner = [...refset]
    },
  },

  actions: {
    async getDomains(ctx) {
      const domains = await getDormains();
      ctx.commit("setDomains", domains);
    },
    async getUserProfile(ctx) {
      const userprofiles = await getUserProfile();
      ctx.commit("setUserProfile", userprofiles);
    },
    async changePassword(ctx, body: any) {
      const res = await changePassword(body);
      if (!res) return false;
      return true;
    },

    async setUserUp(ctx, body: any) {
      const setup = await setUserUp(body);
      if (!setup) return false;
      // ctx.commit("removeRole", id);
      return true;
    },

    async postSignature(ctx, body: any) {
      const signature = await postSignature(body);
      if (!signature) return false;
      // ctx.commit("removeRole", id);
      return true;
    },
  },
} as StoreOptions<UserSetup>;
