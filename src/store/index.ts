import { createStore, StoreOptions } from "vuex";
import DeviceStore from "./device";
import UserStore from "./user";
import Dropdown from "./dropdowns";

export default createStore({
  modules: {
    user: UserStore,
    device: DeviceStore,
    dropdown: Dropdown,
  },
} as StoreOptions<any>);
