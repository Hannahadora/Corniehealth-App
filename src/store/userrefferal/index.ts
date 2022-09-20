import IUserrefferal from "@/types/IUserrefferal";
import { StoreOptions } from "vuex";
import { fetchUserrefferral } from "./helper";

interface UserReferralState {
  userrefferals: IUserrefferal;
}

export default {
  namespaced: true,
  state: {
    userrefferals:{} as any,
  },
  mutations: {
    setUserrefferal(state, userrefferals: IUserrefferal) {
      state.userrefferals = userrefferals;
    },
  },
  actions: {
    async fetchUserrefferral(ctx) {
      const userrefferals = await fetchUserrefferral();
      ctx.commit("setUserrefferal", userrefferals);
    },
  },
} as StoreOptions<UserReferralState>;
