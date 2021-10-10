import { createStore, StoreOptions } from "vuex";
import DeviceStore from "./device";
import UserStore from "./user";
import Dropdown from "./dropdowns";
import LocationStore from "./location";
import ContactStore from "./contact";

import DomainStore from "./domain";
import PaymentStore from "./payment";
import CarePartnersStore from "./CarePartners";
import practitioner from "./practitioner";
import HealthcareStore from "./healthcare";
import CareteamStore from "./careteam";
import RolesStore from "./roles";
import GroupteamStore from "./group";
import PracticeformStore from "./practiceform";
import AppointmentStore from "./appointment";
import TaskStore from "./task";
import UserSettingsStore from "./usersettings";

import OrgStore from "./organization";

import VisitsStore from "./visits";
import ShiftsStore from "./shift";
import ScheduleStore from "./schedules";
import PatientStore from "./patient";
import RequestStore from "./request";
import OtherrequestStore from "./otherrequest";
import AllergyStore from "./allergy";
import OrgLevels from "./hierarchy/levels";
import OrganizationHierarchy from "./hierarchy";
import OrgFunctions from "./hierarchy/functions";
import VitalsStore from "./vitals";
import ProcedureStore from "./procedure";
import designation from "./hierarchy/designation";

export default createStore({
  modules: {
    user: UserStore,
    device: DeviceStore,
    dropdown: Dropdown,
    location: LocationStore,
    contact: ContactStore,
    domain: DomainStore,
    payment: PaymentStore,
    OrgFunctions,

    hierarchy: OrganizationHierarchy,
    designation,

    CarePartnersStore,
    practitioner: practitioner,
    healthcare: HealthcareStore,
    careteam: CareteamStore,
    roles: RolesStore,
    group: GroupteamStore,
    OrgLevels,

    shifts: ShiftsStore,
    practiceform: PracticeformStore,
    appointment: AppointmentStore,
    request: RequestStore,
    otherrequest: OtherrequestStore,

    usersettings: UserSettingsStore,
    schedules: ScheduleStore,
    visits: VisitsStore,
    patients: PatientStore,
    organization: OrgStore,
    task: TaskStore,
    allergy: AllergyStore,

    vitals: VitalsStore,
    procedure: ProcedureStore,
  },
} as StoreOptions<any>);
