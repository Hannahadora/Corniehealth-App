import { createStore, StoreOptions } from "vuex";
import UserStore from "./user";

export default createStore({
  modules: {
    user: UserStore,
  },
} as StoreOptions<any>);
