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
  currentLocation:string;
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
    practitionerAuthenticated: true,
    domain: "",
    currentLocation : "",
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
    authPractitionerDomain() {
      const corniedata = localStorage.getItem("corniehealthdata") as string;
      return JSON.parse(corniedata)?.authDomain;
    },
    authCurrentLocation(state){
      return state.currentLocation;
    },
    authorizedLocations(state){
      const practitioner =  state.cornieData?.practitioner; 
      const defaultLocation = practitioner?.defaultLocation;
      return practitioner?.authorizedLocations?.map((location:any)=>{
        return{
          ...location,
          isDefault: location.id == defaultLocation,
          currentLocation: location.id == state.currentLocation ? true : false
        }
      })
    }
  },
  mutations: {
    setCornieData(state, payload) {
      state.cornieData = { ...state.cornieData, ...payload };
      const practitioner = state.cornieData?.practitioner;
      state.currentLocation =  practitioner?.defaultLocation || "";
    },
    switchCurrentLocation(state,locationId){
      state.currentLocation = locationId;
    },
    setAuthToken(state, token) {
      state.authToken = token;
      state.authTime = new Date();
      rememberLogin(token);
    },
    setAuthDomain(state, domain: string) {
      state.domain = domain;
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
