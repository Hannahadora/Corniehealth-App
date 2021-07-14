import { rememberLogin } from "@/plugins/auth";
import User from "@/types/user";
import { StoreOptions } from "vuex";

interface UserState {
  user: User;
  authToken: string;
  emailVerified: boolean;
  requiresTwoFactorAuth: boolean;
  requiresSecurityQuestion: boolean;
  authTime?: Date;
  cornieData: { accountType: string };
}
export default {
  namespaced: true,
  state: {
    user: {} as User,
    authToken: "",
    authTime: undefined,
    requiresSecurityQuestion: false,
    requiresTwoFactorAuth: false,
    emailVerified: false,
    cornieData: {} as any,
  },
  getters: {},
  mutations: {
    setCornieData(state, payload) {
      state.cornieData = { ...state.cornieData, ...payload };
    },
    setAuthToken(state, token) {
      state.authToken = token;
      state.authTime = new Date();
      rememberLogin(token);
    },
    setLoginInfo(state, payload) {
      state.user = payload.user;

      state.authTime = new Date();
      rememberLogin(payload.token);

      state.emailVerified = payload.emailVerified;
      state.requiresTwoFactorAuth = payload.requiresTwoFactorAuth;
      state.requiresSecurityQuestion = payload.requiresSecurityQuestion;
      state.authToken = payload.token;
    },
  },
  actions: {},
} as StoreOptions<UserState>;
