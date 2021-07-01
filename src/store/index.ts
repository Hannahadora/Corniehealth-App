import { createStore, StoreOptions } from "vuex";
import DeviceStore from "./device";
import UserStore from "./user";

export default createStore({
  modules: {
    user: UserStore,
    device: DeviceStore,
  },
} as StoreOptions<any>);
