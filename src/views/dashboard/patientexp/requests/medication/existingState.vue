<template>
  <div class="w-full pb-80">
    <span class="flex justify-end w-full mb-8">
          <button
            class="bg-danger rounded-lg text-white mt-5 py-2 pr-5 pl-5 px-3 mb-5 font-semibold focus:outline-none hover:opacity-90"
            @click="showMedicationRequest = true">
            New Request
          </button>
    </span>
    <cornie-table :columns="rawHeaders" v-model="items">
      <template #actions="{ item }">
        <div class="flex items-center hover:bg-gray-100 p-3 cursor-pointer" @click="showDetails = true">
          <eye-icon class="text-purple-700 fill-current" />
          <span class="ml-3 text-xs">View Details</span>
        </div>
        <div class="flex items-center hover:bg-gray-100 p-3 cursor-pointer" @click="showStatus(item.id)">
          <update-icon />
          <span class="ml-3 text-xs">Update Status</span>
        </div>
        <div class="flex items-center hover:bg-gray-100 p-3 cursor-pointer" @click="showRefillModal(item.id)">
          <refill-icon />
          <span class="ml-3 text-xs">Refill Request</span>
        </div>
         <div class="flex items-center hover:bg-gray-100 p-3 cursor-pointer" @click="showPrintModal(item.id)">
          <print-icon />
          <span class="ml-3 text-xs">Print</span>
        </div>

        <!-- <div class="flex items-center hover:bg-gray-100 p-3 cursor-pointer">
          <print-icon />
          <span class="ml-3 text-xs">Print</span>
        </div>
        <div class="flex items-center hover:bg-gray-100 p-3 cursor-pointer">
           <plus-icon class="text-purple-800 fill-current" />
          <span class="ml-3 text-xs">Book Appointment</span>
        </div>
         <div class="flex items-center hover:bg-gray-100 p-3 cursor-pointer">
           <specimen-icon class="text-purple-800 fill-current" />
          <span class="ml-3 text-xs">Specimen ID #</span>
        </div>
         <div class="flex items-center hover:bg-gray-100 p-3 cursor-pointer">
           <specimen-icon class="text-purple-800 fill-current" />
          <span class="ml-3 text-xs">Report</span>
        </div>
        <div class="flex items-center hover:bg-gray-100 p-3 cursor-pointer">
           <checkin-icon class="text-green-500 fill-current" />
          <span class="ml-3 text-xs">Check In</span>
        </div>
        <div class="flex items-center hover:bg-gray-100 p-3 cursor-pointer">
           <checkout-icon class="text-grren-500 fill-current" />
          <span class="ml-3 text-xs">Check Out</span>
        </div> -->

        <!-- <div
          class="flex items-center hover:bg-gray-100 p-3 cursor-pointer"
          @click="
            $router.push(
              `/dashboard/experience/view-request/${item.id}`
            )
          "
        >
          <newview-icon class="text-blue-700 fill-current" />
          <span class="ml-3 text-xs">View</span>
        </div>
        <div
          class="flex items-center hover:bg-gray-100 p-3 cursor-pointer"
          @click="
            $router.push(
              `/dashboard/experience/edit-request/${item.id}`
            )
          "
        >
          <newview-icon class="text-blue-700 fill-current" />
          <span class="ml-3 text-xs">View & Edit</span>
        </div>
       
        <div
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
          @click="makeNotes(item.id)"
        >
          <note-icon class="text-green-600 fill-current" />
          <span class="ml-3 text-xs">Add Notes</span>
        </div>
        <div
          class="flex items-center hover:bg-gray-100 p-3 cursor-pointer"
          @click="deleteItem(item.id)"
        >
          <danger-icon />
          <span class="ml-3 text-xs">Cancel</span>
        </div> -->

      </template>
      <template #status-header="{}">
        <p
          class="cursor-pointer md text-xs uppercase"
          @click="() => (filterStatus = !filterStatus)"
        >
          Status
        </p>
        <div class="absolute md" v-if="filterStatus">
          <div
            style="
              max-height: 280px;
              overflow-y: scroll;
              width: 200px;
            "
            class="md origin-top-right right-0 mt-2 w-full rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="menu-button"
            tabindex="-1"
          >
            <div class="py-1 md" role="none">
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
          {{ item.patientsubject }}
        </p>
      </template>
      <template #requester="{ item }">
        <p class="cursor-pointer">{{ item.patientrequester }}</p>
      </template>
      <template #dispenser="{ item }">
        <p class="cursor-pointer">{{ item.practitionerdispenser }}</p>
      </template>
      <template #performer="{ item }">
        <p class="cursor-pointer">{{ item.practitionerperformer }}</p>
      </template>
    </cornie-table>

    <medication-request-modal v-model="showMedicationRequest"/>

    <view-modal v-model="showDetails"/>
    <refill-modal v-model="showRefill"/>
    <print-modal v-model="showPrint"/>

   <notes-add
      :requestnotes="requestnotes"
      :requestId="requestId"
      v-model="showNotes"
    />
    <other-notes-add
      :otherrequestnotes="otherrequestnotes"
      :requestId="requestId"
      v-model="showOthersNotes"
    />
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
      :id="requestId"
      :updatedBy="updatedBy"
      :currentStatus="currentStatus"
      :dateUpdated="update"
      v-model="showStatusModal"
      @status-added="statusadded"
    />

    <other-status-modal
      :id="requestId"
      :updatedBy="otherupdatedBy"
      :currentStatus="othercurrentStatus"
      :dateUpdated="otherupdate"
      @update:preferred="showOtherStatus"
      v-model="showOtherStatusModal"
    />
    
</div>
</template>
<script lang="ts">
import { cornieClient } from "@/plugins/http";
import { first, getTableKeyValue } from "@/plugins/utils";
import { Options, Vue } from "vue-class-component";
import { namespace } from "vuex-class";
import search from "@/plugins/search";


import IOtherrequest from "@/types/IOtherrequest";
import IRequest from "@/types/IRequest";

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
import SpecimenIcon from "@/components/icons/specimenicon.vue";
import RefillIcon from "@/components/icons/refill.vue";

import PrintModal from "./print.vue";

import ViewModal from "./viewDetails.vue";
import MedicationRequestModal from "./medicationModal.vue";
import StatusModal from "./status.vue";
import RefillModal from "./refill.vue";

// import MedicationModal from "./medication.vue";
// import EditMedicationModal from "./updateMedication.vue";
// import NotesAdd from "./notes.vue";
// import StatusModal from "./status.vue";
// import OtherStatusModal from "./statusother.vue";
// import OtherNotesAdd from "./othernote.vue";
import EmptyState from "./emptyState.vue";

const request = namespace("request");
const otherrequest = namespace("otherrequest");

const emptyOtherrequest: IOtherrequest = {
  basicInfo: {},
  requestInfo: {},
  subject: {},
  performer: {},
  forms: {},
  request: {
    range: [20, 50],
  },
};
const emptyRequest: IRequest = {
  requestInfo: {},
  requestDetails: {},
  subject: {},
  performer: {},
  medicationAdministration: {},
  fufillment: {},
  history: {},
  Medications: [],
};

@Options({
  components: {
    //Close,
    SortIcon,
    ThreeDotIcon,
    MedicationRequestModal,
    ViewModal,
    StatusModal,
    // OtherNotesAdd,
    SearchIcon,
    // NotesAdd,
    PrintIcon,
    // StatusModal,
    // OtherStatusModal,
    PlusIcon,
    TableRefreshIcon,
    FilterIcon,
    IconInput,
    DeleteIcon,
    PrintModal,
    EyeIcon,
    ColumnFilter,
    // MedicationModal,
    // EditMedicationModal,
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
  request: IRequest = emptyRequest;

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

  @otherrequest.State
  otherrequests!: any[];

  @request.Action
  fetchRequests!: () => Promise<void>;

  @otherrequest.Action
  fetchOtherrequests!: () => Promise<void>;

  getKeyValue = getTableKeyValue;
  preferredHeaders = [];
  rawHeaders = [
    {
      title: "identifier",
      key: "id",
      show: true,
    },
    { title: "Date Requested", key: "createdAt", show: true },
    {
      title: "Patient",
      key: "patient",
      show: true,
    },
    {
      title: "Requester",
      key: "requester",
      show: true,
    },
    {
      title: "Dispenser",
      key: "dispenser",
      show: true,
    },
    {
      title: "Performer",
      key: "performer",
      show: true,
    },
    {
      title: "Status",
      key: "completeStatus",
      show: true,
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
    if (!this.requests || this.requests.length === 0) return [];
    const filtered = this.requests.filter((i: any) => {
      if (this.filterByStatus.length === 0) {
        return i;
      } else {
        if (this.filterByStatus.includes("Show All")) return true;
        const indexInStatuses = this.filterByStatus.findIndex(
          (j: any) => j.toLowerCase() === i.status.toLowerCase()
        );
        if (indexInStatuses >= 0) return true;
      }
    });

    const requests = filtered.map((i: any) => {
      if (i.status === "cancelled" || i.status === "no-show") {
        i.completeStatus = "Completed";
      } else if (i.status === "On-Hold") {
        i.completeStatus = "On-Hold";
      } else {
        i.completeStatus = "Stopped";
      }
      (i as any).createdAt = new Date((i as any).createdAt).toDateString();

      (i as any).updatedAt = new Date((i as any).updatedAt).toDateString();
      this.onePatientId = i.subject.subject;
      this.updatedBy = this.getPatientName(i.requestDetails.requester);
      this.currentStatus = i.status;
      this.update = i.updatedAt;
      return {
        ...i,
        action: i.id,
        patientsubject: this.getPatientName(i.subject.subject),
        patientrequester: this.getPatientName(i.requestDetails.requester),
        practitionerdispenser: this.getPractitionerName(i.performer.dispenser),
        practitionerperformer: this.getPractitionerName(
          i.medicationAdministration.performer
        ),
        status: i.status,
        // slot: `${i.startTime ? i.startTime : ''} ${i.endTime ? i.endTime : ''}`,
      };
    });
    if (this.selectedStatus === 1)
      return requests.filter((i: any) => i.completeStatus === "On-Hold");
    if (this.selectedStatus === 2)
      return requests.filter((i) => i.status === "Stopped");
    if (this.selectedStatus === 3)
      return requests.filter(
        (i) => i.status !== "Stopped" && i.status !== "On-Hold"
      );

    return requests;
    // if (!this.query) return shifts;
    // return search.searchObjectArray(shifts, this.query);
  }
  //Other request
  rawHeadersothers = [
    {
      title: "identifier",
      key: "id",
      show: true,
    },
    { title: "Date Requested", key: "createdAt", show: true },
    {
      title: "Patient",
      key: "patient",
      show: true,
    },
    {
      title: "Requester",
      key: "requester",
      show: true,
    },
    {
      title: "Performer",
      key: "performer",
      show: true,
    },
    {
      title: "Status",
      key: "completeStatus",
      show: true,
    },
  ];
  get headersothers() {
    const preferred =
      this.preferredHeaders.length > 0
        ? this.preferredHeaders
        : this.rawHeadersothers;
    const headers = preferred.filter((header) => header.show);
    return [...first(4, headers), { title: "", key: "action", image: true }];
  }
  get itemsothers() {
    if (!this.otherrequests || this.otherrequests.length === 0) return [];
    const filtered = this.otherrequests.filter((i: any) => {
      if (this.filterByStatus.length === 0) {
        return i;
      } else {
        if (this.filterByStatus.includes("Show All")) return true;
        const indexInStatuses = this.filterByStatus.findIndex(
          (j: any) => j.toLowerCase() === i.status.toLowerCase()
        );
        if (indexInStatuses >= 0) return true;
      }
    });

    const otherrequests = filtered.map((i: any) => {
      if (i.status === "cancelled" || i.status === "no-show") {
        i.completeStatus = "Completed";
      } else if (i.status === "On-Hold") {
        i.completeStatus = "On-Hold";
      } else {
        i.completeStatus = "Stopped";
      }
      (i as any).createdAt = new Date((i as any).createdAt).toDateString();
      (i as any).updatedAt = new Date((i as any).updatedAt).toDateString();

      this.otherupdatedBy = this.getPractitionerName(i.performer.performer);
      this.othercurrentStatus = i.status;

      this.otherupdate = i.updatedAt;

      this.onePatientId = i.subject.subject;

      return {
        ...i,
        action: i.id,
        patientsubject: this.getPatientName(i.subject.subject),
        patientrequester: this.getPatientName(i.requestInfo.requester),
        practitionerperformer: this.getPractitionerName(i.performer.performer),
        status: i.status,
        // slot: `${i.startTime ? i.startTime : ''} ${i.endTime ? i.endTime : ''}`,
      };
    });
    if (this.selectedStatus === 1)
      return otherrequests.filter((i: any) => i.completeStatus === "On-Hold");
    if (this.selectedStatus === 2)
      return otherrequests.filter((i) => i.status === "Stopped");
    if (this.selectedStatus === 3)
      return otherrequests.filter(
        (i) => i.status !== "Stopped" && i.status !== "On-Hold"
      );

    return otherrequests;
    // if (!this.query) return shifts;
    // return search.searchObjectArray(shifts, this.query);
  }

  //Other request end
  //Medications
  rawHeadersRequest = [
    {
      title: "identifier",
      key: "id",
      show: true,
    },
    { title: "medication code", key: "code", show: true },
    {
      title: "Medication Name",
      key: "name",
      show: true,
    },
    {
      title: "strength",
      key: "strength",
      show: true,
    },
    {
      title: "Quantity",
      key: "quantity",
      show: true,
    },
    {
      title: "dosage (daily)",
      key: "dosage",
      show: true,
    },
    {
      title: "duration",
      key: "duration",
      show: true,
    },
    {
      title: "course of therapy",
      key: "course",
      show: true,
    },
    {
      title: "substitution?",
      key: "substitution",
      show: false,
    },
    {
      title: "reason code",
      key: "reasoncode",
      show: false,
    },
    {
      title: "refill?",
      key: "refill",
      show: false,
    },
    {
      title: "dispense interval",
      key: "interval",
      show: false,
    },
    {
      title: "validity period",
      key: "period",
      show: false,
    },
    {
      title: "no of refill",
      key: "refillno",
      show: false,
    },
    {
      title: "quantity",
      key: "qunatity",
      show: false,
    },
    {
      title: "supply duration",
      key: "duration",
      show: false,
    },
  ];

  get headersrequest() {
    const preferred =
      this.preferredHeaders.length > 0
        ? this.preferredHeaders
        : this.rawHeadersRequest;
    const headers = preferred.filter((header) => header.show);
    return [...first(4, headers), { title: "", value: "action", image: true }];
  }

  get itemsrequest() {
    const requests = this.requests[0].Medications.map((request: any) => {
      (request as any).createdAt = new Date(
        (request as any).createdAt
      ).toLocaleDateString("en-US");
      (request as any).medicationDetails.duration.start = new Date(
        (request as any).medicationDetails.duration.start
      ).toLocaleDateString("en-US");
      (request as any).medicationDetails.duration.end = new Date(
        (request as any).medicationDetails.duration.end
      ).toLocaleDateString("en-US");
      return {
        ...request,
        code: request.medicationDetails.medicationCode,
        name: request.medicationDetails.medicationReference,
        strength: "xxxxxx",
        quantity: request.medicationDetails.quantity,
        course: request.medicationDetails.courseOfTherapyType,
        reasoncode: request.substitutionAllowed.code,
        interval: request.refillInfo.dispenseInterval,
        period: request.medicationDetails.createdAt,
        refillno: request.refillInfo.quantity,
        duration:
          request.medicationDetails.duration.start +
          "-" +
          request.medicationDetails.duration.end,
        dosage: request.medicationDetails.dosageInstruction,

        //  action: request.id,
        //  keydisplay: "XXXXXXX",
        //  Participants: singleParticipantlength
      };
    });
    if (!this.query) return requests;
    return search.searchObjectArray(requests, this.query);
  }

  async showStatus(value: string) {
    this.showStatusModal = true;
    this.requestId = value;
  }
  showRefillModal(value:string){
    this.showRefill = true;
    this.requestId = value;
  }
  showPrintModal(value:string){
    this.showPrint = true;
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

  getPatientName(id: string) {
    const pt = this.patients.find((i: any) => i.id === id);
    return pt ? `${pt.firstname} ${pt.lastname}` : "";
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

  async statusadded(){
     await this.fetchRequests();
  }

  async created() {
    //this.fetchNotes();
    // this.fetchOtherNotes();
    this.getPractitioners();
    // if (!this.practitioners || this.practitioners.length === 0) await this.getPractitioners();
    if (!this.patients || this.patients.length === 0) await this.getPatients();
    if (!this.requests || this.requests.length === 0)
      await this.fetchRequests();
    if (!this.otherrequests || this.otherrequests.length === 0)
      await this.fetchOtherrequests();
    if (!this.requests || this.requests.length === 0) await this.getPatients();
    window.addEventListener("click", (e: any) => {
      if (!e.target.classList.contains("md")) {
        this.filterStatus = false;
      }
    });
  }
}
</script>

<style>
.outline-primary {
  border: 2px solid #080056;
}
</style>
