import { StoreOptions } from "vuex";

interface Route {
  path: string;
  name: string;
  position: number;
}

interface RoutingState {
  recents: Route[];
}

export default {
  namespaced: true,
  state: {
    recents: [],
  },
  mutations: {
    setRecents(state, payload) {
      state.recents = payload;
    },
  },
} as StoreOptions<RoutingState>;
