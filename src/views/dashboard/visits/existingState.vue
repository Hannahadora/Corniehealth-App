<template>
  <div class="w-full pb-7">
    <span class="flex justify-end w-full">
      <cornie-menu top="30px" right="100%">
        <template #activator="{ on }">
          <icon-btn v-on="on">
            <button
              class="bg-danger rounded-lg text-white mt-5 py-2 px-14 focus:outline-none hover:opacity-90 font-semibold inline-flex"
              @click="() => $emit('clicked')"
            >
              <span class="mr-1">Check-In to Start </span>
              <chevron-down-icon
                class="text-white mb-2 stroke-current mt-2 ml-1"
              />
            </button>
          </icon-btn>
        </template>
        <card-text>
          <div
            class="p-2 w-full hover:bg-gray-100 p-3 cursor-pointer"
            @click="showPatient"
          >
            <span class="ml-3 text-xs">Check-In from Patients Register</span>
          </div>
          <div
            class="p-2 w-full flex hover:bg-gray-100 p-3 cursor-pointer"
            @click="showAppointment"
          >
            <span class="ml-3 text-xs"
              >Check-In from Scheduled Appointments</span
            >
          </div>
        </card-text>
      </cornie-menu>
    </span>

    <cornie-table :columns="rawHeaders" v-model="items">
      <template #status="{ item }">
        <div class="flex items-center">
          <p
            class="text-xs bg-gray-300 p-1 rounded"
            v-if="
              item.status == 'vitals-acquired' || item.status == 'visit-ended'
            "
          >
            {{ item.status }}
          </p>
          <p
            class="text-xs bg-yellow-100 text-yellow-500 p-1 rounded"
            v-if="
              item.status == 'queued' ||
              item.status == 'waitlisted' ||
              item.status == 'in-progress' ||
              item.status == 'bill-processing'
            "
          >
            {{ item.status }}
          </p>
          <p
            class="text-xs bg-green-100 text-green-500 p-1 rounded"
            v-if="
              item.status == 'on-time | Late' ||
              item.status == 'completed' ||
              item.status == 'diagnostics-completed' ||
              item.status == 'medication-dispensed' ||
              item.status == 'discharged' ||
              item.status == 'checked-out' ||
              item.status == 'checked-in'
            "
          >
            {{ item.status }}
          </p>
          <p
            class="text-xs bg-purple-100 text-purple-600 p-1 rounded"
            v-if="item.status == 'referred'"
          >
            {{ item.status }}
          </p>
          <p
            class="text-xs bg-red-100 text-red-600 p-1 rounded"
            v-if="item.status == 'cancelled'"
          >
            {{ item.status }}
          </p>
        </div>
      </template>
      <template #checkedInBy="{ item }">
        <div class="w-full flex space-x-4 mb-3">
          <div class="w-10 h-10">
            <avatar
              class="mr-2"
              v-if="item.checkedInBy?.image"
              :src="item.checkedInBy?.image"
            />
            <avatar class="mr-2" v-else :src="localSrc" />
          </div>
          <div class="w-full mt-2">
            <p class="text-sm text-dark font-semibold">
              {{ item.checkedInBy.firstName }}
              {{ item.checkedInBy.lastName }}
            </p>
          </div>
        </div>
      </template>

      <template #actions="{ item }">
        <div
          class="flex items-center hover:bg-gray-100 p-3 cursor-pointer"
          style="width: 200px"
        >
          <eye-icon class="mt-1" />
          <span
            class="ml-3 text-xs"
            @click="showTimeline(item.id, item.timelines, item.patient)"
            >View timeline</span
          >
        </div>

        <div
          class="flex items-center hover:bg-gray-100 p-3 cursor-pointer"
          @click="start(item.id)"
        >
          <EncounterIcon class="mr-3 mt-1" />
          <span class="ml-3 text-xs">Start Encounter</span>
        </div>
        <div
          class="flex items-center hover:bg-gray-100 p-3 cursor-pointer"
          @click="destroy(item.id)"
        >
          <CancelIcon />
          <span class="ml-3 text-xs">Cancel Visit</span>
        </div>
        <div class="flex items-center hover:bg-gray-100 p-3 cursor-pointer">
          <AddIcon />
          <span class="ml-3 text-xs">Add Vitals</span>
        </div>
        <div class="flex items-center hover:bg-gray-100 p-3 cursor-pointer">
          <ArrowRight />
          <span class="ml-3 text-xs">Refer Patient</span>
        </div>
        <div class="flex items-center hover:bg-gray-100 p-3 cursor-pointer">
          <ManageBillIcon />
          <span class="ml-3 text-xs">Manage Bill</span>
        </div>
        <div class="flex items-center hover:bg-gray-100 p-3 cursor-pointer">
          <AddIcon />
          <span class="ml-3 text-xs">Admit Patient</span>
        </div>
        <div
          class="flex items-center hover:bg-gray-100 p-3 cursor-pointer"
          @click="markAsNoShow(item.id)"
        >
          <NoshowIcon />
          <span class="ml-3 text-xs">No Show</span>
        </div>
        <div
          class="flex items-center hover:bg-gray-100 p-3 cursor-pointer"
          @click="
            showCheckoutPane(item.id, item.checkedInBy, item.patient, item)
          "
        >
          <CheckoutIcon />
          <span class="ml-3 text-xs">Check-out</span>
        </div>
        <div
          class="flex items-center hover:bg-gray-100 p-3 cursor-pointer"
          @click="
            showCheckoutPane(item.id, item.checkedInBy, item.patient, item)
          "
        >
          <UpdateIcon />
          <span class="ml-3 text-xs">Update Status</span>
        </div>
      </template>
    </cornie-table>

    <column-filter
      :columns="rawHeaders"
      v-model:preferred="preferredHeaders"
      v-model:visible="showColumnFilter"
    />
    <side-modal
      :visible="showCheckNoapp"
      :header="'Check-In'"
      @closesidemodal="() => (showCheckNoapp = false)"
    >
      <CheckinNoapp
        :patientId="patients[0]?.id"
        :item="appointments[0]"
        @close="() => (showCheckNoapp = false)"
      />
    </side-modal>

    <side-modal :visible="false">
      <AdvancedFilter />
    </side-modal>

    <side-modal :visible="showViewPane" :header="'View Stot'">
      <div class="w-full my-3">
        <ViewDetails :schedule="selectedSchedule" />
      </div>
      <div class="w-full my-3">
        <ViewPlan :schedule="selectedSchedule" />
      </div>
      <div class="w-full my-3">
        <ViewBreaks :schedule="selectedSchedule" />
      </div>
    </side-modal>

    <modal :visible="viewDetails">
      <template #title>
        <p class="flex items-center justify-between px-2" style="width: 440px">
          <span class="font-bold text-danger p-2 text-xl">{{
            getPatientName(selectedPatient.id)
          }}</span>
          <span
            class="bg-danger cursor-pointer"
            @click="() => (viewDetails = false)"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M0 4C0 1.79086 1.79086 0 4 0H20C22.2091 0 24 1.79086 24 4V20C24 22.2091 22.2091 24 20 24H4C1.79086 24 0 22.2091 0 20V4Z"
                fill="white"
              />
              <path
                d="M12 2C17.53 2 22 6.47 22 12C22 17.53 17.53 22 12 22C6.47 22 2 17.53 2 12C2 6.47 6.47 2 12 2ZM15.59 7L12 10.59L8.41 7L7 8.41L10.59 12L7 15.59L8.41 17L12 13.41L15.59 17L17 15.59L13.41 12L17 8.41L15.59 7Z"
                fill="#FF0000"
              />
            </svg>
          </span>
        </p>
      </template>
      <div class="w-4/12 px-4" style="width: 440px">
        <div class="w-full flex">
          <div class="w-7/12">
            <div class="w-full">
              <div class="w-11/12">
                <div class="w-full py-2">
                  <span class="font-semibold text-primary">MRN No:</span>
                  <span class="ml-2">{{ selectedPatientData.mrn }}</span>
                </div>
                <div class="w-full py-2">
                  <span class="font-semibold text-primary">D.O.B:</span>
                  <span class="ml-2">{{ selectedPatientData.dob }}</span>
                </div>
                <div class="w-full py-2">
                  <span class="font-semibold text-primary">Policy Expiry:</span>
                  <span class="ml-2">XXXXXX</span>
                </div>
                <div class="w-full py-2">
                  <span class="font-semibold text-primary">Policy No:</span>
                  <span class="ml-2">XXXXXX</span>
                </div>
              </div>
            </div>
          </div>
          <div class="w-5/12">
            <div class="w-full">
              <div class="w-11/12">
                <div class="py-2 w-full">
                  <span class="font-semibold text-primary">Gender:</span>
                  <span class="ml-2">{{ selectedPatientData.gender }}</span>
                </div>
                <div class="py-2 w-full">
                  <span class="font-semibold text-primary">Profile Type:</span>
                  <span class="ml-2">XXXX</span>
                </div>
                <div class="py-2w-full">
                  <span class="font-semibold text-primary">Payor:</span>
                  <span class="ml-2">XXXXXX</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="w-full pt-3 pb-6">
          <p class="text-center font-normal text-large text-primary">
            View Policy Coverage
          </p>
        </div>
      </div>
    </modal>

    <patient-search v-model="showPatientModal" @checkin-data="checkindata" />
    <timeline-modal
      v-model="timeLineVissible"
      :id="currentVisitId"
      :timeline="timeline"
      :patient="patientTimeline"
    />
    <check-out
      v-model="showCheckout"
      :allvisit="allvisit"
      @checkout-added="checkindata"
      :patient="patientTimeline"
      :practitionerdata="practitioner"
      :id="currentVisitId"
    />
    <scheduled-appointment v-model="showAppoitmentModal" />
  </div>
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";
import { first, getTableKeyValue } from "@/plugins/utils";
import { namespace } from "vuex-class";
import search from "@/plugins/search";

import ThreeDotIcon from "@/components/icons/threedot.vue";
import SortIcon from "@/components/icons/sort.vue";
import SearchIcon from "@/components/icons/search.vue";
import PrintIcon from "@/components/icons/print.vue";
import TableRefreshIcon from "@/components/icons/tablerefresh.vue";
import FilterIcon from "@/components/icons/filter.vue";
import IconInput from "@/components/IconInput.vue";
import ColumnFilter from "@/components/columnfilter.vue";
import TableOptions from "@/components/table-options.vue";
import DeleteIcon from "@/components/icons/delete.vue";
import EyeIcon from "@/components/icons/eye.vue";
import EditIcon from "@/components/icons/edit.vue";
import AddIcon from "@/components/icons/add.vue";
import DeactivateIcon from "@/components/icons/deactivate.vue";
import Button from "@/components/globals/corniebtn.vue";
import CornieTable from "@/components/cornie-table/CornieTable.vue";
import Modal from "@/components/modal.vue";
import Avatar from "@/components/avatar.vue";
//import Close from '@/components/icons/close.vue'

import ArrowRight from "@/components/icons/arrow-right.vue";
import EncounterIcon from "@/components/icons/encounter.vue";
import ChevronDownIcon from "@/components/icons/chevrondown.vue";
import CornieMenu from "@/components/dynamicCornieMenu.vue";
import CheckoutIcon from "@/components/icons/checkout.vue";

import EmptyState from "./emptyState.vue";
import CancelIcon from "./components/cancel.vue";
import UpdateIcon from "./components/update.vue";
import NoshowIcon from "./components/no-show.vue";
import ManageBillIcon from "./components/manage-bill.vue";
import ActionLog from "./components/timeline-component.vue";
import MultiSelect from "../schedules/components/apply-to.vue";
import TimeLine from "./components/timeline-table.vue";
import SideModal from "../schedules/components/side-modal.vue";
import CheckIn from "./components/checkin.vue";
import CheckOut from "./components/checkout.vue";
import Actors from "../schedules/components/actors.vue";
import PatientSearch from "./components/searchPatient.vue";
import TimelineModal from "./components/timeline.vue";
import ScheduledAppointment from "./components/schedulesPatient.vue";
import IPageInfo from "@/types/IPageInfo";

const visitsStore = namespace("visits");
const appointment = namespace("appointment");

@Options({
  components: {
    ActionLog,
    MultiSelect,
    CancelIcon,
    CornieMenu,
    TimeLine,
    SortIcon,
    ThreeDotIcon,
    SearchIcon,
    PrintIcon,
    TableRefreshIcon,
    FilterIcon,
    IconInput,
    TimelineModal,
    ScheduledAppointment,
    Avatar,
    DeleteIcon,
    EyeIcon,
    ColumnFilter,
    PatientSearch,
    TableOptions,
    ChevronDownIcon,
    EditIcon,
    Button,
    SideModal,
    CheckIn,
    CornieTable,
    AddIcon,
    DeactivateIcon,
    EmptyState,
    CheckOut,
    Modal,
    Actors,
    ArrowRight,
    EncounterIcon,
    CheckoutIcon,
    UpdateIcon,
    NoshowIcon,
    ManageBillIcon,
  },
})
export default class visitExistingState extends Vue {
  showColumnFilter = false;
  show = false;
  query = "";
  search = "";
  showPatientModal = false;
  allvisit = [];
  showAppoitmentModal = false;

  selectedStatus = 0;
  filterByType: any = [];
  filterByStatus: any = [];
  completedStatus: any = [];
  currentVisitId = "";
  timeline = [] as any;
  patientTimeline = [] as any;
  practitioner = [];

  activeTab = 0;
  showEditPane = false;
  showViewPane = false;
  showAllActors = false;
  showActorsPane = false;
  showAddActorsPane = false;
  showCheckin = false;
  showCheckNoapp = false;
  selectType = false;
  filterStatus = false;
  showCheckout = false;
  timeLineVissible = false;
  viewDetails = false;
  localSrc = require("../../../assets/img/placeholder.png");

  selectedSchedule: any = {};
  selectedVisit: any = {};
  selectedPatient: any = {};
  months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "Auust",
    "September",
    "October",
    "November",
    "December",
  ];

  @visitsStore.State
  visits!: any[];

  @visitsStore.Action
  getVisits!: () => Promise<void>;

  @visitsStore.State
  pageInfo!: IPageInfo;

  @visitsStore.State
  patients!: any[];

  @visitsStore.Action
  getPatients!: () => Promise<void>;

  @visitsStore.Action
  createSlot!: (body: any) => Promise<any>;

  @visitsStore.Action
  schedulesByPractitioner!: () => Promise<any>;

  @visitsStore.Action
  checkin!: (body: any) => Promise<boolean>;

  @visitsStore.Action
  startEncounter!: (id: string) => Promise<boolean>;

  @visitsStore.Action
  cancel!: (id: string) => Promise<boolean>;

  @visitsStore.Action
  noShow!: (id: string) => Promise<boolean>;

  @appointment.State
  appointments!: any[];

  @appointment.Action
  fetchAppointments!: () => Promise<void>;

  getKeyValue = getTableKeyValue;
  preferredHeaders = [];
  rawHeaders = [
    {
      title: "Check-In Time",
      key: "checkInTime",
      show: true,
      noOrder: true,
    },
    {
      title: "Check-out Time",
      key: "checkOutTime",
      show: true,
      noOrder: true,
    },
    {
      title: "visit id",
      key: "id",
      show: true,
      noOrder: true,
    },
    {
      title: "Patient",
      key: "patient",
      show: true,
      noOrder: true,
    },
    {
      title: "visit type",
      key: "type",
      show: false,
      noOrder: true,
    },
    {
      title: "specialty",
      key: "specialty",
      show: false,
      noOrder: true,
    },
    {
      title: "practitioner",
      key: "checkedInBy",
      show: true,
      noOrder: true,
    },
    {
      title: "period",
      key: "period",
      show: true,
      noOrder: true,
    },
    {
      title: "Status",
      key: "status",
      show: true,
    },
  ];

  types = ["All", "Emergency", "Walk-In", "Follow-Up", "Routine"];
  statuses = ["All", "Completed", "Queue", "In-Progress"];
  availableSlots: any = [];

  get currentVisit() {
    if (!this.currentVisitId) return {};
    return this.visits.find((i: any) => i.id === this.currentVisitId);
  }

  get headers() {
    const preferred =
      this.preferredHeaders.length > 0
        ? this.preferredHeaders
        : this.rawHeaders;
    const headers = preferred.filter((header) => header.show);
    return [...first(4, headers), { title: "", key: "action", image: true }];
  }

  get items() {
    const visits = this.visits.map((visit) => {
      const checkInTime = new Date(visit.checkInTime).toLocaleDateString(
        "en-US"
      );

      const patient = visit.patient;
      const patientName = `${patient.firstname} ${patient.lastname}` ?? "";
      const checkOutTime = Boolean(visit.checkOutTime)
        ? new Date(visit.checkOutTime).toLocaleDateString("en-US")
        : "--";
      return {
        ...visit,
        checkInTime,
        checkOutTime,
        action: visit.id,
        type: "xxxxxx",
        period: checkInTime + " - " + checkOutTime,
        patient: patientName,
        specialty: "xxxxxx",
      };
    });
    if (!this.query) return visits;
    return search.searchObjectArray(visits, this.query);
  }

  getPatientName(id: string) {
    const pt = this.patients.find((i: any) => i.id === id);
    return pt ? `${pt.firstname} ${pt.lastname}` : "";
  }

  setSelectedVisit(id: string) {
    const pt = this.visits.find((i: any) => i.id === id);
    this.selectedVisit = pt ? pt : {};
  }

  setSelectedPatient(id: string) {
    const pt = this.patients.find((i: any) => i.id === id);
    this.selectedPatient = pt ? pt : {};
  }

  getActors(id: string) {
    const pt = this.appointments.find((i: any) => i.id === id);

    return pt ? pt.Practitioners : [];
  }

  showPatient() {
    this.showPatientModal = true;
  }

  showAppointment() {
    this.showAppoitmentModal = true;
  }

  getAppointment(id: string) {
    const pt = this.appointments.find((i: any) => i.id === id);

    return pt ? pt : {};
  }

  async start(id: string) {
    await this.startEncounter(id).then((res: any) => {
      window.notify({ msg: "Visit Started", status: "success" });
    });
  }

  async destroy(id: string) {
    const cancelled = await this.cancel(id);
    if (cancelled) {
      window.notify({ msg: "Visit Cancelled", status: "success" });
    }
  }

  async markAsNoShow(id: string) {
    const marked = await this.noShow(id);
    if (marked) {
      window.notify({ msg: "Visit marked as no-show", status: "success" });
    }
  }

  get selectedPatientData() {
    if (!this.selectedPatient || !this.selectedPatient.id) return {};
    const data = this.selectedPatient;

    return {
      gender: data.gender,
      dob: `${new Date(data.dateOfBirth).getDate()} ${
        this.months[new Date(data.dateOfBirth).getMonth()]
      }, ${new Date(data.dateOfBirth).getFullYear()}`,
      mrn: data.mrn,
    };
  }

  viewSchedule(id: string) {
    // const schedule = this.schedules.find((i: any) => i.id === id);
    // if (schedule) this.selectedSchedule = schedule;
    // ;
    // this.showActorsPane = true;
    // this.showViewPane = true;
  }

  showCheckoutPane(id: string, practitioner: any, patient: any, visit: any) {
    this.practitioner = practitioner;
    this.patientTimeline = patient;
    this.allvisit = visit;

    this.currentVisitId = id;
    this.showCheckout = true;
  }

  showPatientDetails(id: string) {
    this.setSelectedPatient(id);
    this.viewDetails = true;
  }

  showTimeline(id: string, timeline: any, patient: any) {
    this.timeline = timeline;
    this.patientTimeline = patient;
    //this.setSelectedVisit(id);
    this.currentVisitId = id;
    this.timeLineVissible = true;
  }

  showCheckinPane(id: string) {
    this.setSelectedVisit(id);
    this.showCheckin = true;
  }

  closeEditPane() {
    this.showEditPane = false;
  }
  async checkindata() {
    await this.getPatients();
  }

  async created() {
    if (!this.patients || this.patients.length === 0) await this.getPatients();
    if (!this.appointments || this.appointments.length === 0)
      await this.fetchAppointments();
    if (!this.visits || this.visits.length === 0) await this.getVisits();
    window.addEventListener("click", (e: any) => {
      if (!e.target.classList.contains("md")) {
        this.selectType = false;
        this.filterStatus = false;
      }
    });
  }
}
</script>

<style scoped>
.active-tab {
  border-bottom-width: 4px;
  margin-bottom: -0.22rem;
}

.active-color {
  border-color: #fe4d3c;
}

.status-active {
  background: #f3fcf8;
  color: #35ba83;
}

.status-inactive {
  background: #fff1f0;
  color: #fe4d3c;
}

.border-b-4 {
  border-bottom: 4px solid #f0f4fe;
}

.h-screen {
  height: 100vh;
  overflow: scroll;
  padding-bottom: 40px;
  padding-bottom: 24px;
}

/* Hide scrollbar for Chrome, Safari and Opera */
.h-screen::-webkit-scrollbar {
  display: none;
}

/* Hide scrollbar for IE, Edge and Firefox */
.h-screen {
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
}

.file-picker {
  width: 0;
  height: 0;
  overflow: hidden;
}

.light-grey-bg {
  background: #f0f4fe;
}
</style>
