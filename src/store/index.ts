import { createStore, StoreOptions } from "vuex";
import DeviceStore from "./device";
import UserStore from "./user";
import Dropdown from "./dropdowns";
import LocationStore from "./location";
import ContactStore from "./contact";

import DomainStore from "./domain";
import PaymentStore from "./payment";
import CarePartnersStore from "./CarePartners"

export default createStore({
  modules: {
    user: UserStore,
    device: DeviceStore,
    dropdown: Dropdown,
    location: LocationStore,
    contact: ContactStore,
    domain: DomainStore,
    payment: PaymentStore,
    
    CarePartnersStore
  },
} as StoreOptions<any>);
