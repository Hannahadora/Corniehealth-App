import User from "@/types/user";
import { StoreOptions } from "vuex";

interface UserState {
  user: User;
  authToken: string;
}
export default {
  namespaced: true,
  state: {
    user: {} as User,
    authToken: "",
  },
  getters: {},
  mutations: {
    setAuthToken(state, token) {
      state.authToken = token;
    },
  },
  actions: {},
} as StoreOptions<UserState>;
