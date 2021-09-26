import { rememberLogin } from "@/plugins/auth";
import IPractitioner from "@/types/IPractitioner";
import User, { CornieUser } from "@/types/user";
import { StoreOptions } from "vuex";

interface UserState {
  user: User;
  authToken: string;
  emailVerified: boolean;
  requiresTwoFactorAuth: boolean;
  requiresSecurityQuestion: boolean;
  authTime?: Date;
  cornieData: { user: CornieUser; practitioner: IPractitioner };
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
  getters: {
    accountType(state) {
      return state.cornieData?.user?.accountType;
    },
    cornieUser(state) {
      return state.cornieData.user;
    },
    authPractitioner(state) {
      return state.cornieData.practitioner;
    },
  },
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
