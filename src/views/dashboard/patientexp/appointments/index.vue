<template>
  <div class="w-full my-2">
    <div
      class="container-fluid"
      v-if="
        items &&
        items.length === 0 &&
        filterByStatus.length === 0 &&
        filterByType.length === 0 &&
        !selectedStatus
      "
    >
      <EmptyState />
    </div>
    <div v-else class="container-fluid bg-white sm:p-6">
      <span
        class="flex flex-col w-full justify-center border-b-2 font-bold mb-10 text-xl text-primary py-2"
      >
        Appointment
      </span>

      <div class="w-full mt-6">
        <!-- <span class="flex justify-end w-full mb-8">
          <button
            class="bg-danger rounded text-white font-semibold mt-5 py-2 pr-5 pl-5 px-3 mb-5 focus:outline-none hover:opacity-90"
            @click="$router.push('/dashboard/provider/experience/add-appointment')">
            Create Appointment
          </button>
        </span> -->
        <div class="w-full pb-7 mb-8">
          <cornie-table :columns="rawHeaders" v-model="sortAppointments">
            <template #appointmentType-header="{}">
              <span
                class="cursor-pointer md text-xs uppercase"
                @click="() => (selectType = !selectType)"
                >Appointment Type</span
              >
              <div class="absolute md" v-if="selectType">
                <div
                  style="max-height: 280px; overflow-y: scroll; width: 200px"
                  class="md origin-top-right right-0 mt-2 w-full rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
                  role="menu"
                  aria-orientation="vertical"
                  aria-labelledby="menu-button"
                  tabindex="-1"
                >
                  <div class="py-1 md" role="none">
                    <!-- Active: "bg-gray-100 text-gray-900", Not Active: "text-gray-700" -->
                    <a
                      class="md text-gray-700 px-4 py-2 text-sm flex items-center"
                      role="menuitem"
                      tabindex="-1"
                      id="menu-item-0"
                      v-for="(day, index) in types"
                      :key="index"
                    >
                      <span
                        ><input
                          type="checkbox"
                          class="h-4 w-4 md"
                          name=""
                          v-model="filterByType"
                          id=""
                          :value="day"
                      /></span>
                      <span class="mx-2 text-xs md">{{ day }}</span>
                    </a>
                  </div>
                </div>
              </div>
            </template>

            <template #status-header="{}">
              <p
                class="cursor-pointer md text-xs uppercase"
                @click="() => (filterStatus = !filterStatus)"
              >
                Participant Status
              </p>
              <div class="absolute md" v-if="filterStatus">
                <div
                  style="max-height: 280px; overflow-y: scroll; width: 200px"
                  class="md origin-top-right right-0 mt-2 w-full rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
                  role="menu"
                  aria-orientation="vertical"
                  aria-labelledby="menu-button"
                  tabindex="-1"
                >
                  <div class="py-1 md" role="none">
                    <!-- Active: "bg-gray-100 text-gray-900", Not Active: "text-gray-700" -->
                    <a
                      class="md text-gray-700 px-4 py-2 text-sm flex items-center"
                      role="menuitem"
                      tabindex="-1"
                      id="menu-item-0"
                      v-for="(day, index) in statuses"
                      :key="index"
                    >
                      <span
                        ><input
                          type="checkbox"
                          class="h-4 w-4 md"
                          name=""
                          id=""
                          v-model="filterByStatus"
                          :value="day"
                      /></span>
                      <span class="mx-2 text-xs md">{{ day }}</span>
                    </a>
                  </div>
                </div>
              </div>
            </template>

            <template #patient="{ item }">
              <p
                class="cursor-pointer"
                @click="showPatientDetails(onePatientId)"
              >
                {{ item.patient }}
              </p>
            </template>
            <template #days="{ item }">
              <p>{{ item.days.map((i) => i.substring(0, 3)).join(", ") }}</p>
            </template>
            <template #appointmentType="{ item }">
              <span class="text-xs">{{
                item.id ? getAppointment(item.id).appointmentType : ""
              }}</span>
            </template>
            <template #status="{ item }">
              <div class="container">
                <span
                  class="rounded-full"
                  :class="{
                    'status-inactive': item.status === 'inactive',
                    'status-active': item.status === 'active',
                  }"
                  >{{ item.status }}</span
                >
              </div>
            </template>
            <template #Participants="{ item }">
              <div class="flex items-center">
                <span class="text-xs">{{ item.Participants }}</span>
                <eye-icon
                  class="cursor-pointer ml-3"
                  @click="displayParticipants(item.id)"
                />
              </div>
            </template>
            <template #actions="{ item }">
              <div
                class="flex items-center hover:bg-gray-100 p-3 cursor-pointer"
                @click="
                  $router.push(
                    `/dashboard/experience/add-appointment/${item.id}`
                  )
                "
              >
                <newview-icon class="text-yellow-500 fill-current" />
                <span class="ml-3 text-xs">View</span>
              </div>
              <div
                class="flex items-center hover:bg-gray-100 p-3 cursor-pointer"
                @click="
                  $router.push(`/dashboard/experience/add-response/${item.id}`)
                "
              >
                <update-icon class="text-yellow-300 fill-current" />
                <span class="ml-3 text-xs">Update</span>
              </div>
              <div
                class="flex items-center hover:bg-gray-100 p-3 cursor-pointer"
                @click="showCheckinPane(item.id)"
              >
                <checkin-icon />
                <span class="ml-3 text-xs">Check-In</span>
              </div>
              <div
                class="flex items-center hover:bg-gray-100 p-3 cursor-pointer"
                @click="makeNotes(item.id)"
              >
                <note-icon class="text-green-300 fill-current" />
                <span class="ml-3 text-xs">Make Notes</span>
              </div>
              <div
                class="flex items-center hover:bg-gray-100 p-3 cursor-pointer"
                @click="deleteItem(item.id)"
              >
                <cancel-icon />
                <span class="ml-3 text-xs">Cancel</span>
              </div>
            </template>
          </cornie-table>

          <column-filter
            :columns="rawHeaders"
            v-model:preferred="preferredHeaders"
            v-model:visible="showColumnFilter"
          />

          <modal :visible="viewDetails">
            <template #title>
              <p
                class="flex items-center justify-between px-2"
                style="width: 440px"
              >
                <span class="font-bold text-danger p-2 text-xl">{{
                  getPatientName(selectedPatient.id)
                }}</span>
                <svg
                  class="cursor-pointer"
                  @click="() => (viewDetails = false)"
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M10 0C15.53 0 20 4.47 20 10C20 15.53 15.53 20 10 20C4.47 20 0 15.53 0 10C0 4.47 4.47 0 10 0ZM13.59 5L10 8.59L6.41 5L5 6.41L8.59 10L5 13.59L6.41 15L10 11.41L13.59 15L15 13.59L11.41 10L15 6.41L13.59 5Z"
                    fill="#FF0000"
                  />
                </svg>
              </p>
            </template>
            <div class="w-4/12 px-4" style="width: 440px">
              <div class="w-full flex">
                <div class="w-6/12">
                  <div class="w-full">
                    <div class="w-11/12">
                      <div class="w-full py-2">
                        <span class="font-semibold text-sm text-primary"
                          >MRN No:</span
                        >
                        <span class="ml-2 text-xs">{{
                          selectedPatientData.mrn
                        }}</span>
                      </div>
                      <div class="w-full py-2">
                        <span class="font-semibold text-sm text-primary"
                          >D.O.B:</span
                        >
                        <span class="ml-2 text-xs">{{
                          selectedPatientData.dob
                        }}</span>
                      </div>
                      <div class="w-full py-2">
                        <span class="font-semibold text-sm text-primary"
                          >Policy Expiry:</span
                        >
                        <span class="ml-2 text-xs">XXXXXX</span>
                      </div>
                      <div class="w-full py-2">
                        <span class="font-semibold text-sm text-primary"
                          >Policy No:</span
                        >
                        <span class="ml-2 text-xs">XXXXXX</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="w-6/12">
                  <div class="w-full">
                    <div class="w-11/12">
                      <div class="py-2 w-full">
                        <span class="font-semibold text-sm text-primary"
                          >Gender:</span
                        >
                        <span class="ml-2 text-xs">{{
                          selectedPatientData.gender
                        }}</span>
                      </div>
                      <div class="py-2 w-full">
                        <span class="font-semibold text-sm text-primary"
                          >Profile Type</span
                        >
                        <span class="ml-2 text-xs">XXXX</span>
                      </div>
                      <div class="py-2w-full">
                        <span class="font-semibold text-primary">Payor</span>
                        <span class="ml-2 text-xs">XXXXXX</span>
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
          <all-participants
            :appointmentId="appointmentId"
            :columns="singleParticipant"
            @update:preferred="displayParticipants"
            v-model:visible="showPartcipants"
          />

          <SideModal
            :visible="showCheckin"
            :header="'Check-In'"
            @closesidemodal="() => (showCheckin = false)"
          >
            <Checkin :item="appment" @close="() => (showCheckin = false)" />
          </SideModal>
        </div>

        <div style="height: 400px"></div>
      </div>
    </div>
  </div>
  <notes-section   @update:preferred="makeNotes"
      v-model:visible="noteShow" :appointmentId="appointmentId" :allNotes="notes"/>

  <show-confirm-modal   v-model="showConfirm" @setCancel="setCancel" :appointmentId="appointmentId" />
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";
import { cornieClient } from "@/plugins/http";
// import Table from "@scelloo/cloudenly-ui/src/components/table";
import ThreeDotIcon from "@/components/icons/threedot.vue";
import SortIcon from "@/components/icons/sort.vue";
import SearchIcon from "@/components/icons/search.vue";
import PrintIcon from "@/components/icons/print.vue";
import TableRefreshIcon from "@/components/icons/tablerefresh.vue";
import FilterIcon from "@/components/icons/filter.vue";
import IconInput from "@/components/IconInput.vue";
import ColumnFilter from "@/components/columnfilter.vue";
import { first, getTableKeyValue } from "@/plugins/utils";
import { namespace } from "vuex-class";
import TableOptions from "@/components/table-options.vue";
import DeleteIcon from "@/components/icons/delete.vue";
import EyeIcon from "@/components/icons/yelloweye.vue";
import EditIcon from "@/components/icons/edit.vue";
import AddIcon from "@/components/icons/add.vue";
import DeactivateIcon from "@/components/icons/deactivate.vue";
import Button from "@/components/globals/corniebtn.vue";
import CancelIcon from "@/components/icons/cancel.vue";
import NoteIcon from "@/components/icons/notes.vue";
import CheckinIcon from "@/components/icons/checkin.vue";
import UpdateIcon from "@/components/icons/update.vue";
import NewviewIcon from "@/components/icons/newview.vue";
import AllParticipants from "./participants.vue";
import CornieTable from "@/components/cornie-table/CornieTable.vue";
import Modal from "@/components/modal.vue";
//import Close from '@/components/icons/close.vue'
import ArrowRight from "@/components/icons/arrow-right.vue";
import EncounterIcon from "@/components/icons/encounter.vue";
import CheckoutIcon from "@/components/icons/checkout.vue";
import Checkin from "../../visits/components/checkin.vue";
import SideModal from "../../schedules/components/side-modal.vue";
import NotesSection from './notes.vue';
import showConfirmModal from './cancel.vue';

import EmptyState from "./emptyState.vue";

const visitsStore = namespace("visits");
const appointment = namespace("appointment");

@Options({
  components: {
    //Close,
    SortIcon,
    ThreeDotIcon,
    NotesSection,
    SearchIcon,
    PrintIcon,
    TableRefreshIcon,
    FilterIcon,
    IconInput,
    showConfirmModal,
    DeleteIcon,
    AllParticipants,
    EyeIcon,
    ColumnFilter,
    CancelIcon,
    TableOptions,
    EditIcon,
    Button,
    NoteIcon,
    CornieTable,
    CheckinIcon,
    UpdateIcon,
    AddIcon,
    NewviewIcon,
    DeactivateIcon,
    EmptyState,
    Modal,
    ArrowRight,
    EncounterIcon,
    CheckoutIcon,
    SideModal,
    Checkin,
  },
})
export default class AppoitmentExistingState extends Vue {
  showColumnFilter = false;
  show = false;
  appointmentId = "";
  showPartcipants = false;
  query = "";
  search = "";
  noteShow = false;
  notes=[] as any;

  selectedStatus = 0;
  filterByType: any = [];
  filterByStatus: any = [];
  completedStatus: any = [];
  currentVisitId = "";
  onePatientId = "";


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
  showConfirm = false;

  selectedSchedule: any = {};
  singleParticipant = [];
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

  @appointment.Action
  deleteAppointment!: (id: string) => Promise<boolean>;

  @appointment.State
  patients!: any[];

  @appointment.Action
  getPatients!: () => Promise<void>;

  @visitsStore.Action
  createSlot!: (body: any) => Promise<any>;

  @appointment.State
  appointments!: any[];

  @appointment.Action
  fetchAppointments!: () => Promise<void>;

  getKeyValue = getTableKeyValue;
  preferredHeaders = [];
  rawHeaders = [
    { title: "Identifier", key: "id", show: true },
    {
      title: "Patient",
      key: "patient",
      show: true,
    },
    {
      title: "Appointment Type",
      key: "appointmentType",
      show: true,
    },
    {
      title: "Participants",
      key: "Participants",
      show: true,
    },
    {
      title: "Slot",
      key: "slot",
      show: false,
    },
    {
      title: "Status",
      key: "status",
      show: true,
    },
    {
      title: "Code",
      key: "reasonCode",
      show: false,
    },
    {
      title: "Reason Reference",
      key: "reasonRef",
      show: false,
    },
    {
      title: "Period",
      key: "newperiod",
      show: false,
    },
    {
      title: "Priority",
      key: "priority",
      show: false,
    },
    {
      title: "Description",
      key: "description",
      show: false,
    },
    {
      title: "Consultation Medium",
      kwy: "consultationMedium",
      show: false,
    },
  ];

  types = ["All", "Emergency", "Walk-In", "Follow-Up", "Routine"];
  statuses = ["All", "Completed", "Queue", "In-Progress"];
  availableSlots: any = [];

  get headers() {
    const preferred =
      this.preferredHeaders.length > 0
        ? this.preferredHeaders
        : this.rawHeaders;
    const headers = preferred.filter((header) => header.show);
    return [...first(4, headers), { title: "", key: "action", image: true }];
  }

  get appment() {
    if (!this.currentAppId) return {};
    const pt = this.appointments.find((i: any) => i.id === this.currentAppId);
    return pt ? pt : {};
  }

  get items() {
    if (!this.appointments || this.appointments.length === 0) return [];
    const filtered = this.appointments.filter((i: any) => {
      if (this.filterByType.length === 0 && this.filterByStatus.length === 0) {
        return i;
      } else {
        if (
          this.filterByStatus.includes("All") ||
          this.filterByType.includes("All")
        )
          return true;
        const indexInTypes = this.filterByType.findIndex(
          (j: any) =>
            j.toLowerCase() ===
            this.getAppointment(i.id).appointmentType.toLowerCase()
        );
        const indexInStatuses = this.filterByStatus.findIndex(
          (j: any) => j.toLowerCase() === i.status.toLowerCase()
        );
        if (indexInTypes >= 0 || indexInStatuses >= 0) return true;
      }
    });

    const appointments = filtered.map((i: any) => {
      if (i.status === "cancelled" || i.status === "no-show") {
        i.completedStatus = "Completed";
      } else if (i.status === "queue") {
        i.completedStatus = "Queue";
      } else {
        i.completedStatus = "In-Progress";
      }

      const singleParticipantlength =
        i.Practitioners.length + i.Devices.length + i.Patients.length;

      const pateintId = i.Patients.map((patient: any) => {
        this.onePatientId = patient.patientId;
      });
      const patientNewId = this.onePatientId;
      return {
        ...i,
        action: i.id,
        patient: this.getPatientName(this.onePatientId),
        status: i.status,
        slot: ` `,
        Participants: singleParticipantlength,
        // slot: `${i.startTime ? i.startTime : ''} ${i.endTime ? i.endTime : ''}`,
      };
    });
    if (this.selectedStatus === 1)
      return appointments.filter((i: any) => i.completedStatus === "Queue");
    if (this.selectedStatus === 2)
      return appointments.filter((i) => i.status === "in-progress");
    if (this.selectedStatus === 3)
      return appointments.filter(
        (i) => i.status !== "in-progress" && i.status !== "queue"
      );

    return appointments;
    // if (!this.query) return shifts;
    // return search.searchObjectArray(shifts, this.query);
  }

  currentAppId = "";
  showCheckinPane(id: string) {
    this.currentAppId = id;
    this.showCheckin = true;
  }
  makeNotes(value:string){
  this.noteShow = true
  this.appointmentId = value;
  this.fetchNotes();
  
}
 async fetchNotes() {
      const AllNotes = cornieClient().get(`/api/v1/appointment/notes/getAllNotesForAppointment/${this.appointmentId}`,{} );
      const response = await Promise.all([AllNotes]);
      this.notes = response[0].data;
  }

  async displayParticipants(value: string) {
    this.appointmentId = value;
    this.showPartcipants = true;
    try {
      const response = await cornieClient().get(`/api/v1/appointment/${value}`);
      if (response.success) {
        this.singleParticipant = response.data;
      }
    } catch (e) {}
  }
  async deleteItem(id: string) {
    const confirmed = await window.confirmAction({
      message: "Are you sure you want to cancel this appoitment? This action caanot be undone.",
      title: "Cancel appointment",
    });
  
      this.appointmentId = id;
      this.showConfirm = true;
  }

  getPatientName(id: string) {
    const pt = this.patients.find((i: any) => i.id === id);
    return pt ? `${pt.firstname} ${pt.lastname}` : "";
  }

  setSelectedPatient(id: string) {
    const pt = this.patients.find((i: any) => i.id === id);
    this.selectedPatient = pt ? pt : {};
  }

  getActors(id: string) {
    const pt = this.appointments.find((i: any) => i.id === id);

    return pt ? pt.Practitioners : [];
  }

  getAppointment(id: string) {
    const pt = this.appointments.find((i: any) => i.id === id);
    return pt ? pt : {};
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

  showPatientDetails(id: string) {
    this.setSelectedPatient(id);
    this.viewDetails = true;
  }
  async setCancel(){
    await this.fetchAppointments();
  }
   get sortAppointments() {
    return this.items.slice().sort(function (a, b) {
      return a.createdAt < b.createdAt ? 1 : -1;
    });
  }

  async created() {
    this.getPatients();
    this.fetchAppointments();
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
/* Large checkboxes */

input[type="checkbox"] {
  height: 22px;
  width: 22px;
}

input[type="checkbox"]:before {
  width: 24px;
  border: hidden;
  height: 20px;
}

input[type="checkbox"]:after {
  top: -20px;
  width: 22px;
  height: 22px;
}

input[type="checkbox"].md:checked:after {
  background-image: url("../../../../assets/tick.svg");
  background-color: #fe4d3c;
}
input[type="checkbox"].md:after {
  position: relative;
  display: block;
  left: 0px;
  content: "";
  background: white;
  background-repeat: no-repeat;
  background-position: center;
  border-radius: 3px;
  text-align: center;
  border: 1px solid #fe4d3c;
}
</style>
