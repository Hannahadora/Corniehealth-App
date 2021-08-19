import { createStore, StoreOptions } from "vuex";
import DeviceStore from "./device";
import UserStore from "./user";
import Dropdown from "./dropdowns";
import LocationStore from "./location";
import ContactStore from "./contact";

import DomainStore from "./domain";
import PaymentStore from "./payment";
import CarePartnersStore from "./CarePartners"
import practitioner from "./practitioner";
import HealthcareStore from "./healthcare";
import CareteamStore from "./careteam";
import RolesStore from './roles'
import GroupteamStore from "./group";
import PracticeformStore from "./practiceform";
import AppointmentStore from "./appointment";

import UserSettingsStore from "./usersettings";

import ShiftsStore from './shift'

export default createStore({
  modules: {
    user: UserStore,
    device: DeviceStore,
    dropdown: Dropdown,
    location: LocationStore,
    contact: ContactStore,
    domain: DomainStore,
    payment: PaymentStore,
    
    CarePartnersStore,
    practitioner: practitioner,
    healthcare: HealthcareStore,
    careteam: CareteamStore,
    roles: RolesStore,
    group: GroupteamStore,

    shifts: ShiftsStore,
    practiceform: PracticeformStore,
    appointment: AppointmentStore,

    usersettings: UserSettingsStore,
  },
} as StoreOptions<any>);
