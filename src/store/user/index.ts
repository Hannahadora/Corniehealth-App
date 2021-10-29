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
  practitionerAuthenticated: boolean;
  domain: string;
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
    practitionerAuthenticated: false,
    domain: '',
  },
  getters: {
    accountType(state) {
      return state.cornieData?.user?.accountType;
    },
    cornieUser(state) {
      return state.cornieData?.user;
    },
    authPractitioner(state) {
      return state.cornieData?.practitioner;
    },
    authPractitionerDomain(state) {
      const corniedata = localStorage.getItem('corniehealthdata') as string;
      return JSON.parse(corniedata)?.authDomain
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
    setAuthDomain(state, domain: string){
      state.domain = domain
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

    updatePractitionerAuthStatus(state, payload) {
      state.practitionerAuthenticated = payload;
    },
  },
  actions: {
    async updatePractitionerAuthStatus({ commit }, authenticated) {
      commit("updatePractitionerAuthStatus", authenticated);
    },
  },
} as StoreOptions<UserState>;
