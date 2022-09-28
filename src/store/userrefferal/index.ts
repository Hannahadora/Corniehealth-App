import IUserrefferal from "@/types/IUserrefferal";
import { StoreOptions } from "vuex";
import { fetchUserrefferral, fetchRefferredAccounts } from "./helper";

interface UserReferralState {
  userrefferals: IUserrefferal;
  refferedaccounts: IUserrefferal[];
}

export default {
  namespaced: true,
  state: {
    userrefferals:{} as any,
    refferedaccounts: [],
  },
  mutations: {
    setUserrefferal(state, userrefferals: IUserrefferal) {
      state.userrefferals = userrefferals;
    },
    setRefferedAccounts(state, refferedaccounts: IUserrefferal[]) {
      state.refferedaccounts = refferedaccounts;
    },
  },
  actions: {
    async fetchUserrefferral(ctx) {
      const userrefferals = await fetchUserrefferral();
      ctx.commit("setUserrefferal", userrefferals);
    },
    async fetchRefferredAccounts(ctx) {
      const refferedaccounts = await fetchRefferredAccounts();
      ctx.commit("setRefferedAccounts", refferedaccounts);
    },
  },
} as StoreOptions<UserReferralState>;
