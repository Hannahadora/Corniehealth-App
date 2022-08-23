import { createStore, StoreOptions } from "vuex";
import AllergyStore from "./allergy";
import AppointmentStore from "./appointment";
import AppointmentRoomStore from "./appointmentroom";
import AppointmentTypeStore from "./appointments";
import AssociationStore from "./associate";
import Attachments from "./attachment";
import CalenderStore from "./calendar";
import CanelStore from "./cancel";
import CarePartnersStore from "./CarePartners";
import CareplanStore from "./careplan";
import CareteamStore from "./careteam";
import CatalogueStore from "./catalogues";
import CollectionStore from "./collection";
import condition from "./condition";
import ContactStore from "./contact";
import CurrencyStore from "./currency";
import DetectedIssues from "./detectedissues";
import DeviceStore from "./device";
import DiagnostocStore from "./diagnostic";
import DiagnosticReport from "./diagnostic-report";
import DispenseStore from "./dispense";
import DomainStore from "./domain";
import Dropdown from "./dropdowns";
import encounter from "./encounter";
import GrnStore from "./grn";
import GroupteamStore from "./group";
import HealthcareStore from "./healthcare";
import OrganizationHierarchy from "./hierarchy";
import designation from "./hierarchy/designation";
import OrgFunctions from "./hierarchy/functions";
import OrgLevels from "./hierarchy/levels";
import HistoryStore from "./history";
import hospitalisationStore from "./hospitalisation";
import ImpressionStore from "./impression";
import inventorySettings from "./inventory";
import InventoryStockStore from "./inventorystock";
import KycStore from "./kyc";
import LocationStore from "./location";
import MarkupStore from "./markup";
import MaterialrequestStore from "./materialRequest";
import MaterialreturnStore from "./materialReturn";
import OrgStore from "./organization";
import PatientStore from "./patient";
import PaymentStore from "./payment";
import PracticeformStore from "./practiceform";
import PracticeInformationStore from "./practiceinformation";
import practitioner from "./practitioner";
import PrefrenceStore from "./prefrence";
import ProcedureStore from "./procedure";
import progressnote from "./progressnote";
import RefferalStore from "./refferal";
import RequestStore from "./request";
import RolesStore from "./roles";
import RouterStore from "./routing";
import ScheduleStore from "./schedules";
import ShiftsStore from "./shift";
import SpecialStore from "./special";
import TaskStore from "./task";
import UserStore from "./user";
import UserSettingsStore from "./usersettings";
import VisitsStore from "./visits";
import VitalsStore from "./vitals";
import WaybillStore from "./waybill";
import PracticeImageStore from "./practiceimage";
import BookingsiteStore from "./bookingsite";
import PreferenceStore from "./preference";
import RatingStore from "./ratings";
import BillingcenterStore from "./billingcenters";
import CollectioncenterStore from "./collectioncenters";
import PatientassociationStore from "./patientassociation";
import PatientproviderStore from "./patientprovider";

export default createStore({
  modules: {
    routerStore: RouterStore,
    user: UserStore,
    device: DeviceStore,
    dropdown: Dropdown,
    location: LocationStore,
    contact: ContactStore,
    domain: DomainStore,
    payment: PaymentStore,
    currency: CurrencyStore,
    OrgFunctions,
    condition,
    hierarchy: OrganizationHierarchy,
    designation,

    CarePartnersStore,
    practitioner: practitioner,
    healthcare: HealthcareStore,
    careteam: CareteamStore,
    roles: RolesStore,
    special: SpecialStore,
    group: GroupteamStore,
    OrgLevels,

    shifts: ShiftsStore,
    practiceform: PracticeformStore,
    practiceinformation: PracticeInformationStore,
    appointment: AppointmentStore,
    request: RequestStore,
    refferal: RefferalStore,
    diagnostic: DiagnostocStore,
    diagnosticReport: DiagnosticReport,

    usersettings: UserSettingsStore,
    inventorysettings: inventorySettings,
    schedules: ScheduleStore,
    visits: VisitsStore,
    patients: PatientStore,
    organization: OrgStore,
    task: TaskStore,
    allergy: AllergyStore,
    impression: ImpressionStore,
    history: HistoryStore,
    issues: DetectedIssues,
    attachments: Attachments,
    vitals: VitalsStore,
    procedure: ProcedureStore,
    hospitalisation: hospitalisationStore,
    careplan: CareplanStore,
    progressNote: progressnote,

    markup: MarkupStore,
    inventorystock: InventoryStockStore,

    appointmentRoom: AppointmentRoomStore,
    catalogues: CatalogueStore,
    appointmentType: AppointmentTypeStore,
    collections: CollectionStore,
    association: AssociationStore,
    calendar: CalenderStore,
    prefrence: PrefrenceStore,
    cancel: CanelStore,
    kyc: KycStore,

    dispense: DispenseStore,
    grn: GrnStore,
    materialrequest: MaterialrequestStore,
    materialreturn: MaterialreturnStore,
    waybill: WaybillStore,
    practiceimage: PracticeImageStore,
    billingcenter: BillingcenterStore,
    collectioncenter : CollectioncenterStore,

    encounter: encounter,
    bookingsite: BookingsiteStore,
    preference: PreferenceStore,
    rating: RatingStore,
    patientassociation:PatientassociationStore,
    patientprovider: PatientproviderStore,
  },
} as StoreOptions<any>);
