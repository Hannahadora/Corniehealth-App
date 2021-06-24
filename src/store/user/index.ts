import User from "@/types/user";
import { StoreOptions } from "vuex";

interface UserState {
  user: User;
  authToken: string;
  emailVerified: boolean;
  requiresTwoFactorAuth: boolean;
  requiresSecurityQuestion: boolean;
}
export default {
  namespaced: true,
  state: {
    user: {} as User,
    authToken: "",
    requiresSecurityQuestion: false,
    requiresTwoFactorAuth: false,
    emailVerified: false,
  },
  getters: {},
  mutations: {
    setLoginInfo(state, payload) {
      state.user = payload.user;
      state.emailVerified = payload.emailVerified;
      state.requiresTwoFactorAuth = payload.requiresTwoFactorAuth;
      state.requiresSecurityQuestion = payload.requiresSecurityQuestion;
      state.authToken = payload.token;
    },
  },
  actions: {},
} as StoreOptions<UserState>;
