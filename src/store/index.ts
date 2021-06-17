import { createStore } from "vuex";

export default createStore({
  state: {
    authToken: "",
  },
  mutations: {
    setAuthToken(state, token) {
      state.authToken = token;
    },
  },
  actions: {},
  modules: {},
});
