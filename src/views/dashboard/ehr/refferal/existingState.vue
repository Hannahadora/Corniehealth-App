<template>
  <div class="w-full pb-80">
     <span class="flex justify-end w-full mb-8">
        <button
          class="bg-danger rounded-lg text-white mt-5 py-2 px-6 mb-5 font-semibold focus:outline-none hover:opacity-90"
          @click="showModalRefferal = true">
          New Request
        </button>
      </span>
      <cornie-table :columns="rawHeaders" v-model="items">
        <template #actions="{ item }">
          <div
            class="flex items-center hover:bg-gray-100 p-3 cursor-pointer"
            @click="showView(item)">
            <newview-icon class="text-yellow-500 fill-current" />
            <span class="ml-3 text-xs">View</span>
          </div>
          <div
            class="flex items-center hover:bg-gray-100 p-3 cursor-pointer"
            @click="showModal(item.id)">
            <edit-icon class="text-yellow-500 fill-current" />
            <span class="ml-3 text-xs">Edit</span>
          </div>
              <div class="flex items-center hover:bg-gray-100 p-3 cursor-pointer" @click="showPrintModal(item)">
              <print-icon />
              <span class="ml-3 text-xs">Print</span>
            </div>
          <div
            class="flex items-center hover:bg-gray-100 p-3 cursor-pointer"
            @click="showStatus(item)"
          >
            <update-icon />
            <span class="ml-3 text-xs">Update</span>
          </div>
          <!-- <div
            class="flex items-center hover:bg-gray-100 p-3 cursor-pointer"
            @click="
              $router.push(
                '/dashboard/provider/experience/add-appointment'
              )
            "
          >
            <plus-icon class="text-primary fill-current" />
            <span class="ml-3 text-xs">Add Appointment</span>
          </div>
          <div
            class="flex items-center hover:bg-gray-100 p-3 cursor-pointer"
            @click="
              $router.push('/dashboard/provider/experience/add-task')
            "
          >
            <plus-icon class="text-red-500 fill-current" />
            <span class="ml-3 text-xs">Add Task</span>
          </div>
          <div
            class="flex items-center hover:bg-gray-100 p-3 cursor-pointer"
            @click="makeothersNotes(item.id)"
          >
            <note-icon class="text-green-600 fill-current" />
            <span class="ml-3 text-xs">Add Notes</span>
          </div> -->

        </template>
        <template #status="{ item }">
          <div class="flex items-center">
            <p
              class="text-xs bg-gray-300 p-1 rounded"
              v-if="item.status == 'draft'"
            >
              {{ item.status }}
            </p>
            <p
              class="text-xs bg-yellow-100 text-yellow-400 p-1 rounded"
              v-if="item.status == 'on-hold' || item.status == 'do-not-perform'"
            >
              {{ item.status }}
            </p>
            <p
              class="text-xs bg-green-100 text-green-500 p-1 rounded"
              v-if="item.status == 'active'"
            >
              {{ item.status }}
            </p>
            <p
              class="text-xs bg-gray-300 p-1 rounded"
              v-if="item.status == 'unknown'"
            >
              {{ item.status }}
            </p>
            <p
              class="text-xs bg-green-100 text-green-400 p-1 rounded"
              v-if="item.status == 'completed'"
            >
              {{ item.status }}
            </p>
            <p
              class="text-xs bg-red-300 text-red-600 p-1 rounded"
              v-if="item.status == 'revoked' || item.status == 'cancelled'"
            >
              {{ item.status }}
            </p>
            <p
              class="text-xs bg-purple-300 text-purple-600 p-1 rounded"
              v-if="item.status == 'entered-in-error'"
            >
              {{ item.status }}
            </p>
            <p
              class="text-xs bg-blue-300 text-blue-600 p-1 rounded"
              v-if="item.status == 'do-Not-perform'"
            >
              {{ item.status }}
            </p>
          </div>
        </template>
      </cornie-table>
 
    <medication-modal
      :requestId="requestId"
      @update:preferred="showMedication"
      v-model="showMedicationModal"
    />
    <edit-medication-modal
      :requestId="requestId"
      @update:preferred="showEditMedication"
      v-model="showEditMedicationModal"
    />
    <status-modal
      :selectedItem="selectedItem"
      v-model="showStatusModal"
      @status-added="statusadded"
    />

    <refferal-modal v-model="showModalRefferal" :id="requestId" @medication-added="medicationadded"/>
    <view-modal v-model="showViewModal" :selectedItem="selectedItem"/>
    <print-modal v-model="showPrint" :selectedItem="selectedItem"/>
  </div>
</template>
<script lang="ts">
import { cornieClient } from "@/plugins/http";
import { first, getTableKeyValue } from "@/plugins/utils";
import { Options, Vue } from "vue-class-component";
import { namespace } from "vuex-class";

import search from "@/plugins/search";
import IOtherrequest from "@/types/IOtherrequest";
import IRefferal from "@/types/IRefferal";
import ISpecial from "@/types/ISpecial";

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
import EyeIcon from "@/components/icons/yelloweye.vue";
import EditIcon from "@/components/icons/edit.vue";
import AddIcon from "@/components/icons/add.vue";
import DeactivateIcon from "@/components/icons/deactivate.vue";
import Button from "@/components/globals/corniebtn.vue";
import CancelIcon from "@/components/icons/cancel.vue";
import NoteIcon from "@/components/icons/notes.vue";
import CheckinIcon from "@/components/icons/checkin.vue";
import UpdateIcon from "@/components/icons/newupdate.vue";
import NewviewIcon from "@/components/icons/newview.vue";
import CornieTable from "@/components/cornie-table/CornieTable.vue";
import Modal from "@/components/modal.vue";
import PlusIcon from "@/components/icons/plus.vue";
import DangerIcon from "@/components/icons/danger.vue";
import ArrowRight from "@/components/icons/arrow-right.vue";
import EncounterIcon from "@/components/icons/encounter.vue";
import CheckoutIcon from "@/components/icons/checkout.vue";

import refferalModal from "./refferalModal.vue";
import ViewModal from "./view.vue";
import PrintModal from "./print.vue";


// import MedicationModal from "./medication.vue";
// import EditMedicationModal from "./updateMedication.vue";
// import NotesAdd from "./notes.vue";
 import StatusModal from "./status.vue";
// import OtherStatusModal from "./statusother.vue";
// import OtherNotesAdd from "./othernote.vue";
import EmptyState from "./emptyState.vue";

const refferal = namespace("refferal");
const special = namespace("special");
const request = namespace("request");

@Options({
  components: {
    //Close,
    SortIcon,
    ThreeDotIcon,
    refferalModal,
    // OtherNotesAdd,
    SearchIcon,
    // NotesAdd,
    PrintIcon,
     ViewModal,
     StatusModal,
    // StatusModal,
    // OtherStatusModal,
    PlusIcon,
    TableRefreshIcon,
    FilterIcon,
    IconInput,
    DeleteIcon,
    EyeIcon,
    ColumnFilter,
    // MedicationModal,
    // EditMedicationModal,
    CancelIcon,
    DangerIcon,
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
    PrintModal,
    ArrowRight,
    EncounterIcon,
    CheckoutIcon,
  },
})
export default class ReffferalExistingState extends Vue {
  showColumnFilter = false;
  showMedicationModal = false;
  showEditMedicationModal = false;
  show = false;
  showModalRefferal = false;
  selected = 1;
  requestId = "";
  showPartcipants = false;
  query = "";
  search = "";
  showViewModal = false;
  showPrint = false;

  selectedStatus = 0;
  filterByStatus: any = [];
  completeStatus: any = [];
  currentVisitId = "";
  onePatientId = "";
  showNotes = false;
  taskId = "";
  activeTab = 0;
  showOthersNotes = false;
  selectType = false;
  filterStatus = false;
  showStatusModal = false;
  showOtherStatusModal = false;
  viewDetails = false;
  requestnotes = [];
  otherrequestnotes = [];
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
  updatedBy = "";
  currentStatus = "";
  update = "";
  otherupdatedBy = "";
  othercurrentStatus = "";
  otherupdate = "";
  selectedItem = {} as any;


   get aPatientId() {
    return this.$route.params.id as string;
  }

  @refferal.State
  patientrefferals!: IRefferal[];

  @refferal.Action
  fetchRefferalById!: (patientId: string) => Promise<void>;

   @special.State
    specials!: ISpecial[];

    @special.Action
    fetchSpecials!: () => Promise<void>;

    @request.State
    patients!: any[];


    @request.Action
    getPatients!: () => Promise<void>;

     @request.State
     practitioners!: any[];


    @request.Action
    getPractitioners!: () => Promise<void>;


  select(i: number) {
    this.selected = i;
  }

  getKeyValue = getTableKeyValue;
  preferredHeaders = [];
  rawHeaders = [
    {
      title: "requisition id",
      key: "identifier",
      show: true,
    },
    { title: "category", key: "category", show: true },
    {
      title: "specialty",
      key: "specialty",
      show: true,
    },
    {
      title: "subject",
      key: "subject",
      show: true,
    },
    {
      title: "requester",
      key: "requester",
      show: true,
    },
    {
      title: "PERFORMER",
      key: "performer",
      show: true,
    },
    {
      title: "status",
      key: "status",
      show: true,
    },
  ];
  
  types = ["All", "Emergency", "Walk-In", "Follow-Up", "Routine"];
  statuses = ["Show All", "On-Hold", "Cancelled", "Completed", "Stopped"];
  availableSlots: any = [];

  //Other request
  get headers() {
    const preferred =
      this.preferredHeaders.length > 0
        ? this.preferredHeaders
        : this.rawHeaders;
    const headers = preferred.filter((header) => header.show);
    return [...first(4, headers), { title: "", key: "action", image: true }];
  }
    get items() {
    const refferals = this.patientrefferals.map((refferal:any) => {
      return {
        ...refferal,
        action: refferal.id,
        specialty: this.getspecialtyname(refferal.specialty),
        subject: refferal?.patient?.firstname +' '+ refferal?.patient?.lastname,
        // category: "Pathology",
        // service: "XXXXXX",
        // subject: "James E. Flair",
         requester: refferal?.patient?.firstname +' '+ refferal?.patient?.lastname,
         performer: this.getPractitionerName(refferal.performerId),
      };
    });
    if (!this.query) return refferals;
    return search.searchObjectArray(refferals, this.query);
  }
 
 getspecialtyname(id: string) {
    const pt = this.specials.find((i: any) => i.id === id);
    return pt ? `${pt.name}` : "";
  }

  getPatientName(id: string) {
    const pt = this.patients.find((i: any) => i.id === id);
    return pt ? `${pt.firstname} ${pt.lastname}` : "";
  }

  getPractitionerName(id: string) {
    const pt = this.practitioners.find((i: any) => i.organizationId === id);
    return pt ? `${pt.firstName} ${pt.lastName}` : "";
  }

  showPrintModal(item:any){
    this.showPrint = true;
    this.selectedItem = item;
  }
  showModal(value:any){
     this.requestId = value;
    this.showModalRefferal = true;
  }
  showView(item:any){
    this.selectedItem = item;
    this.showViewModal = true;
  }
  async showStatus(item: any) {
    this.showStatusModal = true;
     this.selectedItem = item;
  }

  async showOtherStatus(value: string) {
    this.showOtherStatusModal = true;
    this.requestId = value;
  }

  async makeNotes(id: string) {
    this.requestId = id;
    this.showNotes = true;
    this.fetchNotes();
  }

  async makeothersNotes(id: string) {
    this.requestId = id;
    this.showOthersNotes = true;
    this.fetchOtherNotes();
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

  async fetchNotes() {
    const id = this.requestId;
    const AllNotes = cornieClient().get(
      `/api/v1/requests/getNotesByRequestId/${id}`
    );
    const response = await Promise.all([AllNotes]);
    this.requestnotes = response[0].data;
  }

  async fetchOtherNotes() {
    const id = this.requestId;
    const AllNotes = cornieClient().get(
      `/api/v1/other-requests/getNotesByOtherRequestId/${id}`
    );
    const response = await Promise.all([AllNotes]);
    this.otherrequestnotes = response[0].data;
  }

  async showMedication(value: string) {
    this.requestId = value;
    this.showMedicationModal = true;
  }

  async showEditMedication(value: string) {
    this.requestId = value;
    this.showEditMedicationModal = true;
  }
  async medicationadded(){
    await this.fetchRefferalById(this.aPatientId);
  }

  async statusadded(){
    await this.fetchRefferalById(this.aPatientId);
  }

  async created() {
   await this.fetchRefferalById(this.aPatientId);
    await this.fetchSpecials();
    await this.getPatients();
    await this.getPractitioners();
  }
}
</script>

<style>
.outline-primary {
  border: 2px solid #080056;
}
</style>
