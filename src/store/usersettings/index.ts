import { StoreOptions } from "vuex";
import IPractitioner from "@/types/IPractitioner";
import ObjectSet from "@/lib/objectset";
import {
  setUserUp,
  getDormains,
  changePassword,
  postSignature,
} from "./helper";

interface UserSetup {
  practitioners: IPractitioner[];
  domains: any[];
  userprofiles: any[],
}

export default {
  namespaced: true,
  state: {
    practitioners: [],
    domains: [],
    userprofiles: [],
  },

  mutations: {
    setDomains(state, domains) {
      if (domains) state.domains = [...domains];
    },
    updatePractitioners(state, practitioners: IPractitioner[]) {
      // eslint-disable-next-line no-console
      console.log(practitioners,"HELLO PREA");
      const practitionerSet = new ObjectSet(
        [...state.practitioners, ...practitioners],
        "id"
      );
      state.practitioners = [...practitionerSet];
    },
  },

  actions: {
    async getDomains(ctx) {
      const domains = await getDormains();
      ctx.commit("setDomains", domains);
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
