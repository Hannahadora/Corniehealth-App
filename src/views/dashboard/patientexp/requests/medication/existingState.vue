<template>
  <div class="w-full pb-80 mt-12">
    <!-- <span class="flex justify-end w-full mb-8">
      <button
        class="bg-danger rounded-lg text-white mt-5 py-2 pr-5 pl-5 px-3 mb-5 font-semibold focus:outline-none hover:opacity-90"
        @click="showMedicationRequest = true">
        New Request
      </button>
    </span> -->
     <div class="flex justify-center space-x-6 w-full -mb-10">
        <span class="flex space-x-4 text-sm ml-20">
          <medication-drug class="mr-2"/> Substitution Permitted
        </span>
        <span class="flex space-x-4 text-sm">
          <refill-drug class="mr-2"/> Refilled Required
        </span>
      </div>
    <cornie-table :columns="rawHeaders" v-model="items" :showPagination="true"
        @pagechanged="fetchRequests"
        :pageInfo="pageInfo">
      <template #actions="{ item }">
        <!-- <div class="flex items-center hover:bg-gray-100 p-3 cursor-pointer" @click="showModal(item.id)">
          <edit-icon class="text-purple-700 fill-current" />
          <span class="ml-3 text-xs">Edit</span>
        </div> -->
        <div class="flex items-center hover:bg-gray-100 p-3 cursor-pointer" @click="showDetailsModal(item)">
          <eye-icon class="text-purple-600 fill-current" />
          <span class="ml-3 text-xs">View Details</span>
        </div>
        <div class="flex items-center hover:bg-gray-100 p-3 cursor-pointer">
          <bill-icon class="text-yellow-400 fill-current" />
          <span class="ml-3 text-xs">Manage Bill</span>
        </div>
        <div class="flex items-center hover:bg-gray-100 p-3 cursor-pointer" @click="$router.push(`/dashboard/experience/calendar`)">
          <add-icon class="text-green-400 fill-current" />
          <span class="ml-3 text-xs">Add Appointment</span>
        </div>
        
        <!-- <div class="flex items-center hover:bg-gray-100 p-3 cursor-pointer" @click="showStatus(item)">
          <update-icon />
          <span class="ml-3 text-xs">Update Status</span>
        </div>
            <div class="flex items-center hover:bg-gray-100 p-3 cursor-pointer" @click="showRefillModal(item.medicationId)">
              <refill-icon />
              <span class="ml-3 text-xs">Refill Request</span>
            </div>
         <div class="flex items-center hover:bg-gray-100 p-3 cursor-pointer" @click="showPrintModal(item)">
          <print-icon />
          <span class="ml-3 text-xs">Print</span>
        </div> -->
      </template>
      <template #prescription="{ item }">
        <p>{{ item.identifier }}</p>
        <p class="text-gray-400">{{ new Date(item.createdAt).toLocaleDateString() }}</p>

      </template>
      <template #subject="{ item }">
        <p>{{ item.patient.firstname + '' + item.patient.lastname }}</p>
        <p class="text-gray-400">{{ item.patient.mrn }}</p>

      </template>
      <template #medication="{ item }">
        <div class="flex space-x-3">
          <div>
            <p>{{ item.genericName }}</p>
            <p class="text-gray-400">{{ item.durationInDays }} days</p>
          </div>
          <medication-drug v-if="item.substitutionAllowed == true" />
          <refill-drug v-else />
        </div>
      </template>
      <template #dosage="{ item }">
        <p>{{ item.dosageInstruction }}/day</p>
      </template>
      <template #duration="{ item }">
        <p>{{ item.durationInDays }} Days</p>
      </template>
      <template #quantity="{ item }">
        <span>
          {{ item.quantity }}
        </span>
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
              v-if="item.status == 'on-hold'"
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
              class="text-xs bg-red-100 text-red-600 p-1 rounded"
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
              v-if="item.status == 'do-not-perform'"
            >
              {{ item.status }}
            </p>
          </div>
        </template>
        <template #refillno="{ item }">
            <span>{{ item.refills.length }}</span>
        </template>
    </cornie-table>

    <medication-request-modal v-model="showMedicationRequest" :id="requestId" @medication-added="medicationadded" />

    <view-modal v-model="showDetails" :selectedItem="selectedItem" :id="requestId" :medicationid="medicationId" />
    <refill-modal v-model="showRefill" :id="requestId" />
    <print-modal v-model="showPrint" :selectedItem="selectedItem" />

    <medication-modal :requestId="requestId" @update:preferred="showMedication" v-model="showMedicationModal" />
    <edit-medication-modal :requestId="requestId" @update:preferred="showEditMedication"
      v-model="showEditMedicationModal" />
    <status-modal :id="requestId" :selectedItem="selectedItem" :updatedBy="otherupdatedBy"
      :currentStatus="othercurrentStatus" :dateUpdated="otherupdate" :patientId="patientId" :dispenserId="dispenserId"
      :requesterId="requesterId" v-model="showStatusModal" @status-added="statusadded" />

  
  </div>
</template>
<script lang="ts">
import { cornieClient } from "@/plugins/http";
import { first, getTableKeyValue } from "@/plugins/utils";
import { Options, Vue } from "vue-class-component";
import { namespace } from "vuex-class";
import search from "@/plugins/search";
import { mapDisplay } from "@/plugins/definitions";

import IOtherrequest from "@/types/IOtherrequest";
import IRequest, {Medications} from "@/types/IRequest";
import IPageInfo from "@/types/IPageInfo";

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
import SpecimenIcon from "@/components/icons/specimenicon.vue";
import RefillIcon from "@/components/icons/refill.vue";
import MedicationDrug from "@/components/icons/drugicon.vue";
import RefillDrug from "@/components/icons/refillIcon.vue";

import PrintModal from "./print.vue";
import BillIcon from "./icons/bill.vue";


import ViewModal from "./viewDetails.vue";
import MedicationRequestModal from "./medicationModal.vue";
import StatusModal from "./status.vue";
import RefillModal from "./refill.vue";

import EmptyState from "./emptyState.vue";

const request = namespace("request");
const otherrequest = namespace("otherrequest");


@Options({
  components: {
    SortIcon,
    ThreeDotIcon,
    MedicationRequestModal,
    ViewModal,
    StatusModal,
    SearchIcon,
    PrintIcon,
   BillIcon,
    PlusIcon,
    TableRefreshIcon,
    FilterIcon,
    IconInput,
    RefillDrug,
    DeleteIcon,
    PrintModal,
    EyeIcon,
    ColumnFilter,
    MedicationDrug,
    CancelIcon,
    DangerIcon,
    TableOptions,
    SpecimenIcon,
    EditIcon,
    RefillModal,
    Button,
    RefillIcon,
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
  },
})
export default class RequestExistingState extends Vue {
  medicationMapper = (code: string) => "";

  showMedicationRequest = false;
  showDetails = false;
  showRefill = false;
  showPrint = false;

  showColumnFilter = false;
  showMedicationModal = false;
  showEditMedicationModal = false;
  show = false;
  selected = 1;
  requestId = "";
  showPartcipants = false;
  query = "";
  search = "";
  selectedItem = {} as any;

  patientId = "";
  dispenserId = "";
  requesterId = "";
  medicationId = "";

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
  request: IRequest = {} as any;

  @request.Action
  deleteRequest!: (id: string) => Promise<boolean>;

  @otherrequest.Action
  deleteOtherrequest!: (id: string) => Promise<boolean>;

  @request.State
  patients!: any[];

  @request.State
  practitioners!: any[];

  @request.Action
  getPatients!: () => Promise<void>;

  @request.Action
  getPractitioners!: () => Promise<void>;

  select(i: number) {
    this.selected = i;
  }

  @request.State
  requests!: any[];


  @request.Action
  fetchRequests!: (page?:number, limit?:number) => Promise<void>;

   @request.State
  pageInfo!: IPageInfo;

  getKeyValue = getTableKeyValue;
  preferredHeaders = [];
  rawHeaders = [
    {
      title: "prescription id",
      key: "prescription",
      show: true,
      noOrder: true
    },
    { title: "subject (PATIENT)", key: "subject", show: true, noOrder: true },
    {
      title: "medication",
      key: "medication",
      show: true,
      noOrder: true
    },
    {
      title: "",
      key: "drug",
      show: true,
      noOrder: true
    },
    {
      title: "dosage",
      key: "dosage",
      show: true,
      noOrder: true
    },
    {
      title: "duration",
      key: "duration",
      show: true,
      noOrder: true
    },
    {
      title: "quantity",
      key: "newquantity",
      show: true,
      noOrder: true
    },
    {
      title: "status",
      key: "status",
      show: true,
    },
    {
      title: "course of therapy",
      key: "course",
      show: false,
      noOrder: true
    },
    {
      title: "substitution?",
      key: "substitution",
      show: false,
      noOrder: true
    },
    {
      title: "reason code",
      key: "reasoncode",
      show: false,
      noOrder: true
    },
    {
      title: "refill?",
      key: "refill",
      show: false,
      noOrder: true
    },
    {
      title: "dispense interval",
      key: "interval",
      show: false,
      noOrder: true
    },
    {
      title: "validity period",
      key: "period",
      show: false,
      noOrder: true
    },
    {
      title: "no of refill",
      key: "refillno",
      show: false,
      noOrder: true
    },
    {
      title: "quantity",
      key: "qunatity",
      show: false,
      noOrder: true
    },
    {
      title: "supply duration",
      key: "duration",
      show: false,
      noOrder: true
    },
  ];

  types = ["All", "Emergency", "Walk-In", "Follow-Up", "Routine"];
  statuses = ["Show All", "On-Hold", "Cancelled", "Completed", "Stopped"];
  availableSlots: any = [];

  get headers() {
    const preferred =
      this.preferredHeaders.length > 0
        ? this.preferredHeaders
        : this.rawHeaders;
    const headers = preferred.filter((header) => header.show);
    return [...first(4, headers), { title: "", key: "action", image: true }];
  }

  get items() {
    const combined = this.requests.map(this.medicationRequest)
    const requests = combined.flatMap(value => value);

    if (!this.query) return requests;
    return search.searchObjectArray(requests, this.query);
  }

  medicationRequest(request: any) {
    const { medications, ...rest } = request;
    return medications.map((medication: any) => {
      return { ...medication, ...rest, medicationId: medication.id, requestId: request.id, createdAt: new Date(request.createdAt).toLocaleDateString(), newquantity: (medication.dosageInstruction.split(":").map(Number).reduce ((a:any,b:any) => a+b, 0)) * (medication.durationInDays) }
    })
  }
  getPatientName(id: string) {
    const pt = this.patients.find((i: any) => i.id === id);
    return pt ? `${pt.firstname} ${pt.lastname}` : "";
  }
  getPatientMrn(id: string) {
    const pt = this.patients.find((i: any) => i.id === id);
    return pt ? `${pt.mrn}` : "";
  }

  async createMapper() {
    this.medicationMapper = await mapDisplay(
      "http://hl7.org/fhir/ValueSet/medication-codes"
    );
  }

  async showStatus(item: any) {
    this.showStatusModal = true;
    this.selectedItem = item;

    // const medId = request.medications.map((c:any) => c.id);
    //    (request as any).createdAt = new Date((request as any).createdAt).toDateString();

    //   this.otherupdatedBy = this.getPractitionerName(request.requesterId);
    //   this.othercurrentStatus = request.status;

    //   this.otherupdate = request.createdAt;

    //   this.patientId = request.patientId;
    //   this.dispenserId = request.dispenserId;
    //   this.requesterId = request.requesterId;

  }
  showDetailsModal(item: any) {
    this.selectedItem = item;
    this.showDetails = true;
  }
  showRefillModal(value:string){
    console.log(value, 'medicationId');
    this.showRefill = true;
    this.requestId = value;
  }
  showPrintModal(item: any) {
    this.showPrint = true;
    this.selectedItem = item;
  }
  showModal(value: string) {
    this.showMedicationRequest = true;
    this.requestId = value;
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
  async deleteItem(id: string) {
    const confirmed = await window.confirmAction({
      message: "You are about to cancel this request",
      title: "Cancel request",
    });
    if (!confirmed) return;

    if (await this.deleteRequest(id))
      window.notify({ msg: "Request canceled", status: "success" });
    else window.notify({ msg: "Request not canceled", status: "error" });
  }


  getPractitionerName(id: string) {
    const pt = this.practitioners.find((i: any) => i.id === id);
    return pt ? `${pt.firstName} ${pt.lastName}` : "";
  }
  setSelectedPatient(id: string) {
    const pt = this.patients.find((i: any) => i.id === id);
    this.selectedPatient = pt ? pt : {};
  }

  getRequest(id: string) {
    const pt = this.requests.find((i: any) => i.id === id);
    return pt ? pt : {};
  }

  get selectedPatientData() {
    if (!this.selectedPatient || !this.selectedPatient.id) return {};
    const data = this.selectedPatient;
    return {
      gender: data.gender,
      dob: `${new Date(data.dateOfBirth).getDate()} ${this.months[new Date(data.dateOfBirth).getMonth()]
        }, ${new Date(data.dateOfBirth).getFullYear()}`,
      mrn: data.mrn,
    };
  }

  showPatientDetails(id: string) {
    this.setSelectedPatient(id);
    this.viewDetails = true;
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

  async statusadded() {
    await this.fetchRequests();
  }

  async medicationadded() {
    await this.fetchRequests();
  }
  async created() {
    await this.createMapper();
    await this.fetchRequests();
  }
}
</script>

<style>
.outline-primary {
  border: 2px solid #080056;
}
</style>
