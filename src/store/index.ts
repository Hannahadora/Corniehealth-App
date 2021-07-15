import { createStore, StoreOptions } from "vuex";
import DeviceStore from "./device";
import UserStore from "./user";
import Dropdown from "./dropdowns";
import LocationStore from "./location";
import ContactStore from "./contact";

export default createStore({
  modules: {
    user: UserStore,
    device: DeviceStore,
    dropdown: Dropdown,
    location: LocationStore,
    contact: ContactStore,
  },
} as StoreOptions<any>);
