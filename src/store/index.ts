import { createStore, StoreOptions } from "vuex";
import DeviceStore from "./device";
import UserStore from "./user";
import Dropdown from "./dropdowns";
import LocationStore from "./location";
import DomainStore from "./domain";
import PaymentStore from "./payment";
export default createStore({
  modules: {
    user: UserStore,
    device: DeviceStore,
    dropdown: Dropdown,
    location: LocationStore,
    domain: DomainStore,
    payment: PaymentStore,
  },
} as StoreOptions<any>);
