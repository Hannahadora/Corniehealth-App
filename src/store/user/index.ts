import { rememberLogin } from "@/plugins/auth";
import { IOrganization } from "@/types/IOrganization";
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
  cornieData: {
    user: CornieUser;
    practitioner: IPractitioner;
    organization: IOrganization;
  };
  practitionerAuthenticated: boolean;
  domain: string;
  currentLocation: string;
  orgTwoFA: boolean;
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
    orgTwoFA: false,
    currentLocation: "",
  },
  getters: {
    accountMeta(state, getters, rootState: any) {
      const organization: IOrganization =
        rootState.organization.organizationInfo;
      return {
        organizationType: organization?.organisationType,
        accountType: getters.accountType,
        practiceType: organization?.providerProfile,
        practiceSubType: organization?.providerProfile,
      };
    },
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
    authCurrentLocation(state) {
      if (state.currentLocation) return state.currentLocation;
      const cachedLocation = sessionStorage.getItem("authCurrentLocation");
      if (cachedLocation) return cachedLocation;
      const locations = state.cornieData?.practitioner?.locationRoles;
      const defaultLocation = locations?.find((location) => location.default);

      const currentLocation = defaultLocation?.locationId ?? "";
      sessionStorage.setItem("authCurrentLocation", currentLocation);

      return currentLocation;
    },
    authorizedLocations(state) {
      const practitioner = state.cornieData?.practitioner;
      return practitioner?.locationRoles?.map(
        ({ location, locationId, default: isDefault }) => ({
          ...location,
          isDefault,
          currentLocation: locationId == state.currentLocation,
        })
      );
    },
  },
  mutations: {
    updateTwoFA(state, payload: boolean) {
      state.requiresTwoFactorAuth = payload;
    },
    setCornieData(state, payload) {
      const { organization, ...data } = payload;
      state.cornieData = { ...state.cornieData, ...data };
      if (organization) {
        (this.state as any).organization.organizationInfo = organization;
      }
      const practitioner = state.cornieData?.practitioner;
      state.currentLocation = practitioner?.defaultLocation || "";
    },
    switchCurrentLocation(state, locationId) {
      sessionStorage.setItem("authCurrentLocation", locationId);
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
    updatePractitioner(state, payload: IPractitioner) {
      state.cornieData.practitioner = payload;
    },
  },
  actions: {
    async updatePractitionerAuthStatus({ commit }, authenticated) {
      commit("updatePractitionerAuthStatus", authenticated);
    },
  },
} as StoreOptions<UserState>;
