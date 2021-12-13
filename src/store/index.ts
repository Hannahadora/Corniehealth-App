import { createStore, StoreOptions } from 'vuex'
import DeviceStore from './device'
import UserStore from './user'
import Dropdown from './dropdowns'
import LocationStore from './location'
import ContactStore from './contact'

import DomainStore from './domain'
import PaymentStore from './payment'
import CurrencyStore from './currency'
import CarePartnersStore from './CarePartners'
import practitioner from './practitioner'
import HealthcareStore from './healthcare'
import CareteamStore from './careteam'
import RolesStore from './roles'
import GroupteamStore from './group'
import PracticeformStore from './practiceform'
import AppointmentStore from './appointment'
import TaskStore from './task'
import UserSettingsStore from './usersettings'

import OrgStore from './organization'
import CollectionStore from './collection'
import VisitsStore from './visits'
import ShiftsStore from './shift'
import ScheduleStore from './schedules'
import PatientStore from './patient'
import RequestStore from './request'
import OtherrequestStore from './otherrequest'
import AllergyStore from './allergy'
import ImpressionStore from './impression'
import HistoryStore from './history'
import OrgLevels from './hierarchy/levels'
import OrganizationHierarchy from './hierarchy'
import OrgFunctions from './hierarchy/functions'
import VitalsStore from './vitals'
import ProcedureStore from './procedure'
import designation from './hierarchy/designation'
import condition from './condition'
import DetectedIssues from './detectedissues'
import Attachments from './attachment'
import PracticeInformations from './practiceinformation'
import hospitalisationStore from './hospitalisation'
import CareplanStore from './careplan'
import CatalogueStore from './catalogues'
import AppointmentTypes from './appointments'

import AppointmentRoomStore from './appointmentroom'

export default createStore({
	modules: {
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
		group: GroupteamStore,
		OrgLevels,

		shifts: ShiftsStore,
		practiceform: PracticeformStore,
		practiceinformation: PracticeInformations,
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
		impression: ImpressionStore,
		history: HistoryStore,
		issues: DetectedIssues,
		attachments: Attachments,
		vitals: VitalsStore,
		procedure: ProcedureStore,
		hospitalisation: hospitalisationStore,
		careplan: CareplanStore,

		AppointmentRoom: AppointmentRoomStore,
		catalogues: CatalogueStore,
		appointments: AppointmentTypes,
		collections: CollectionStore,
	},
} as StoreOptions<any>)
