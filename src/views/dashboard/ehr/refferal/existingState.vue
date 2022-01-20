<template>
  <div class="w-full pb-80">
    <div>
      <span class="flex justify-end w-full mb-8">
        <button
          class="bg-danger rounded-full text-white mt-5 py-2 pr-12 pl-12 px-3 mb-5 font-semibold focus:outline-none hover:opacity-90"
          @click="showDiagnostic('false')"
        >
          New Request
        </button>
      </span>
      <cornie-table :columns="rawHeaders" v-model="sortMedications">
        <template #actions="{ item }">
          <div
            class="flex items-center hover:bg-gray-100 p-3 cursor-pointer"
            @click="showView(item.id)"
          >
            <eye-icon class="text-blue-300 fill-current" />
            <span class="ml-8 text-xs">View</span>
          </div>
          <div
            class="flex items-center hover:bg-gray-100 p-3 cursor-pointer"
            @click="showDiagnostic(item.id)"
          >
            <edit-icon class="text-blue-300 fill-current" />
            <span class="ml-8 text-xs">Edit</span>
          </div>
          <div
            class="flex items-center hover:bg-gray-100 p-3 cursor-pointer"
            @click="showStatus(item.id)"
          >
            <update-icon class="text-purple-800 fill-current" />
            <span class="ml-8 text-xs">Update Status</span>
          </div>
          <div
            class="flex items-center hover:bg-gray-100 p-3 cursor-pointer"
            @click="
              $router.push('/dashboard/provider/experience/add-appointment')
            "
          >
            <calender-icon />
            <span class="ml-8 text-xs">Add Appointment</span>
          </div>
          <div
            class="flex items-center hover:bg-gray-100 p-3 cursor-pointer"
            @click="showDiagnostic(item.id)"
          >
            <checkin-icon class="text-yellow-600 fill-current" />
            <span class="ml-8 text-xs">Check In</span>
          </div>
          <div
            class="flex items-center hover:bg-gray-100 p-3 cursor-pointer"
            @click="showCheckoutPane(item.id)"
          >
            <checkout-icon class="text-red-600 fill-current" />
            <span class="ml-8 text-xs">Check Out</span>
          </div>
          <div class="flex items-center hover:bg-gray-100 p-3 cursor-pointer">
            <send-icon class="text-purple-800 fill-current" />
            <span class="ml-8 text-xs">Report</span>
          </div>
          <div
            class="flex items-center hover:bg-gray-100 p-3 cursor-pointer"
            @click="$router.push('/dashboard/provider/experience/add-task')"
          >
            <plus-icon class="text-green-400 fill-current" />
            <span class="ml-8 text-xs">Add Task</span>
          </div>
          <div
            class="flex items-center hover:bg-gray-100 p-3 cursor-pointer"
            @click="deleteItem(item.id)"
          >
            <message-icon class="text-blue-600 fill-current" />
            <span class="ml-8 text-xs">Message</span>
          </div>
        </template>
        <template #asserter="{ item }">
          <p class="cursor-pointer">{{ item.asserter }}</p>
        </template>
        <template #recorder="{ item }">
          <p class="cursor-pointer">{{ item.asserter }}</p>
        </template>
        <template #status="{ item }">
          <div class="flex items-center">
            <p
              class="text-xs bg-gray-300 p-1 rounded"
              v-if="item.status == 'Draft'"
            >
              {{ item.status }}
            </p>
            <p
              class="text-xs bg-yellow-200 text-yellow-400 p-1 rounded"
              v-if="item.status == 'On-Hold'"
            >
              {{ item.status }}
            </p>
            <p
              class="text-xs bg-green-100 text-green-500 p-1 rounded"
              v-if="item.status == 'Active'"
            >
              {{ item.status }}
            </p>
            <p
              class="text-xs bg-gray-300 p-1 rounded"
              v-if="item.status == 'Unknown'"
            >
              {{ item.status }}
            </p>
            <p
              class="text-xs bg-green-100 text-green-400 p-1 rounded"
              v-if="item.status == 'Completed'"
            >
              {{ item.status }}
            </p>
            <p
              class="text-xs bg-red-300 text-red-600 p-1 rounded"
              v-if="item.status == 'Revoked'"
            >
              {{ item.status }}
            </p>
            <p
              class="text-xs bg-purple-300 text-purple-600 p-1 rounded"
              v-if="item.status == 'Entered-in-Error'"
            >
              {{ item.status }}
            </p>
            <p
              class="text-xs bg-blue-300 text-blue-600 p-1 rounded"
              v-if="item.status == 'Do Not Perform'"
            >
              {{ item.status }}
            </p>
          </div>
        </template>
      </cornie-table>
    </div>
    <notes-add
      :requestnotes="requestnotes"
      :requestId="requestId"
      v-model="showNotes"
    />
    <reffer-modal
      v-if="requestId == 'false'"
      @medication-added="medicationAdded"
      @update:preferred="showDiagnostic"
      v-model="showDiagnosticModal"
    />

    <reffer-modal
      v-else
      :id="requestId"
      @update:preferred="showDiagnostic"
      v-model="showDiagnosticModal"
    />

    <status-modal
      @medication-added="medicationAdded"
      :id="requestId"
      :updatedBy="updatedBy"
      :dateUpdated="update"
      :currentStatus="currentStatus"
      v-model="showStatusModal"
    />

    <view-modal
      :id="requestId"
      :updatedBy="updatedBy"
      :currentStatus="currentStatus"
      :dateUpdated="update"
      v-model="showViewModal"
    />
  </div>
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";
import CornieTable from "@/components/cornie-table/CornieTable.vue";
import CardText from "@/components/cornie-card/CornieCardText.vue";
import CornieDialog from "@/components/CornieDialog.vue";
import Table from "@scelloo/cloudenly-ui/src/components/table";
import ThreeDotIcon from "@/components/icons/threedot.vue";
import SortIcon from "@/components/icons/sort.vue";
import SearchIcon from "@/components/icons/search.vue";
import PrintIcon from "@/components/icons/print.vue";
import TableRefreshIcon from "@/components/icons/tablerefresh.vue";
import FilterIcon from "@/components/icons/filter.vue";
import IconInput from "@/components/IconInput.vue";
import ColumnFilter from "@/components/columnfilter.vue";
import TableOptions from "@/components/table-options.vue";
import search from "@/plugins/search";
import { first, getTableKeyValue } from "@/plugins/utils";
import { Prop } from "vue-property-decorator";
import IOtherrequest from "@/types/IOtherrequest";
import DeleteIcon from "@/components/icons/delete.vue";
import EyeIcon from "@/components/icons/yelloweye.vue";
import EditIcon from "@/components/icons/edit.vue";
import CancelIcon from "@/components/icons/cancel.vue";
import TimelineIcon from "@/components/icons/timeline.vue";
import DangerIcon from "@/components/icons/danger.vue";
import ShareIcon from "@/components/icons/share.vue";
import CheckinIcon from "@/components/icons/newcheckin.vue";
import UpdateIcon from "@/components/icons/newupdate.vue";
import PlusIcon from "@/components/icons/plus.vue";
import CheckoutIcon from "@/components/icons/newcheckout.vue";
import NewviewIcon from "@/components/icons/newview.vue";
import MessageIcon from "@/components/icons/message.vue";
import CalenderIcon from "@/components/icons/newcalender.vue";
import SendIcon from "@/components/icons/send.vue";
import refferModal from "./refferDailog.vue";
import StatusModal from "./status.vue";
import ViewModal from "./view.vue";
import { namespace } from "vuex-class";
import CheckIn from "./components/checkin.vue";
import CheckOut from "./components/checkout.vue";
import { IPatient } from "@/types/IPatient";
import IPractitioner from "@/types/IPractitioner";
import { mapDisplay } from "@/plugins/definitions";

const otherrequest = namespace("otherrequest");
const patients = namespace("patients");
const userStore = namespace("user");

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
@Options({
  components: {
    Table,
    CancelIcon,
    SortIcon,
    CalenderIcon,
    CheckinIcon,
    refferModal,
    ViewModal,
    NewviewIcon,
    UpdateIcon,
    TimelineIcon,
    StatusModal,
    ShareIcon,
    ThreeDotIcon,
    DangerIcon,
    PlusIcon,
    SendIcon,
    SearchIcon,
    MessageIcon,
    PrintIcon,
    CheckoutIcon,
    TableRefreshIcon,
    FilterIcon,
    IconInput,
    ColumnFilter,
    TableOptions,
    DeleteIcon,
    CheckIn,
    EyeIcon,
    EditIcon,
    CornieTable,
    CardText,
    CornieDialog,
    CheckOut,
  },
})
export default class ReferralExistingState extends Vue {
  showColumnFilter = false;
  showModal = false;
  loading = false;
  query = "";
  selected = 1;
  showNotes = false;
  showDiagnosticModal = false;
  requestId = "";
  tasknotes = [];
  showCheckout = false;
  onePatientId = "";
  showStatusModal = false;
  updatedBy = "";
  currentStatus = "";
  update = "";
  newname = "";
  practitonerId = "";
  showViewModal = false;
  name = [];
  medicationMapper = (code: string) => "";
  priorityMapper = (code: string) => "";

  // @Prop({ type: Array, default: [] })
  // requests!: IOtherrequest[];

  //  @otherrequest.State
  // otherrequests!: any[];

  @otherrequest.State
  patientrequests!: any[];

  @otherrequest.Action
  fetchOtherrequestsById!: (patientId: string) => Promise<void>;

  @otherrequest.State
  practitioners!: any[];

  @userStore.Getter
  authPractitioner!: IPractitioner;

  @patients.State
  patients!: IPatient[];

  @otherrequest.Action
  deleteOtherrequest!: (id: string) => Promise<boolean>;

  @patients.Action
  fetchPatients!: () => Promise<void>;

  @otherrequest.Action
  getPractitioners!: () => Promise<void>;

  getKeyValue = getTableKeyValue;
  preferredHeaders = [];
  rawHeaders = [
    { title: "Requested", key: "createdAt", show: true },
    {
      title: "rEQUISITION id",
      key: "id",
      show: true,
    },
    {
      title: "Patient",
      key: "patient",
      show: false,
    },
    {
      title: "Requester",
      key: "requester",
      show: true,
    },
    {
      title: "Category",
      key: "category",
      show: true,
    },
    {
      title: "Priority",
      key: "priority",
      show: true,
    },
    {
      title: "Dispenser",
      key: "dispenser",
      show: false,
    },
    {
      title: "Performer",
      key: "performer",
      show: true,
    },
    {
      title: "Status",
      key: "status",
      show: true,
    },
  ];
  async makeNotes(id: string) {
    this.requestId = id;
    this.showNotes = true;
    //this.fetchNotes();
  }

  get headers() {
    const preferred =
      this.preferredHeaders.length > 0
        ? this.preferredHeaders
        : this.rawHeaders;
    const headers = preferred.filter((header) => header.show);
    return [...first(4, headers), { title: "", value: "action", image: true }];
  }
  get patientId() {
    return this.$route.params.id as string;
  }
  async createMapper() {
    this.medicationMapper = await mapDisplay(
      "http://hl7.org/fhir/ValueSet/servicerequest-category"
    );
    this.priorityMapper = await mapDisplay(
      "http://hl7.org/fhir/ValueSet/request-priority"
    );
  }

  get items() {
    const patientrequests = this.patientrequests.map((otherrequest) => {
      (otherrequest as any).createdAt = new Date(
        (otherrequest as any).createdAt
      ).toDateString();

      (otherrequest as any).updatedAt = new Date(
        (otherrequest as any).updatedAt
      ).toDateString();
      this.updatedBy = this.getPatientName(this.patientId as string);
      this.currentStatus = otherrequest.status;

      this.update = otherrequest.updatedAt;
      this.practitonerId = otherrequest.performer.performer;
      return {
        ...otherrequest,
        action: otherrequest.id,
        patient: this.getPatientName(this.patientId as string),
        requester: this.getPatientName(this.patientId as string),
        dispenser:
          this.authPractitioner.firstName +
          "-" +
          this.authPractitioner.lastName,
        performer:
          this.authPractitioner.firstName +
          "-" +
          this.authPractitioner.lastName,
        status: otherrequest.status,
        category: this.medicationMapper(otherrequest.basicInfo.category),
        priority: this.priorityMapper(otherrequest.basicInfo.priority),
      };
    });
    if (!this.query) return patientrequests;
    return search.searchObjectArray(patientrequests, this.query);
  }
  async showStatus(value: string) {
    this.showStatusModal = true;
    this.requestId = value;
  }
  showCheckoutPane(id: string) {
    this.showCheckout = true;
  }
  async showDiagnostic(value: string) {
    this.showDiagnosticModal = true;
    this.requestId = value;
  }

  async showView(value: string) {
    this.showViewModal = true;
    this.requestId = value;
  }

  medicationAdded() {
    this.fetchOtherrequestsById(this.patientId);
  }
  getPatientName(id: string) {
    const pujhjht = this.patients.find((i: any) => i.id === id);
    return pujhjht ? `${pujhjht.firstname} ${pujhjht.lastname}` : "";
  }
  getPractitionerName(id: string) {
    const pt = this.practitioners.find((i: any) => i.id == id);
    this.name = pt;
    return pt ? `${pt.firstName} ${pt.lastName}` : "";
  }

  async deleteItem(id: string) {
    const confirmed = await window.confirmAction({
      message: "You are about to delete this request",
      title: "Delete request",
    });
    if (!confirmed) return;

    if (await this.deleteOtherrequest(id))
      window.notify({ msg: "Request deleted", status: "success" });
    else window.notify({ msg: "Request not deleted", status: "error" });
  }

  get sortMedications() {
    return this.items.slice().sort(function (a, b) {
      return a.createdAt < b.createdAt ? 1 : -1;
    });
  }

  async created() {
    await this.createMapper();
    this.getPractitioners();
    this.fetchPatients();
    this.fetchOtherrequestsById(this.patientId);
  }
}
</script>
<style>
.outline-primary {
  border: 2px solid #080056;
}
.status-accepted {
  background: #f3fcf8;
  color: #35ba83;
}
.status-inactive {
  background: #fff1f0;
  color: #fe4d3c;
}
.status-warning {
  background: #fefaf0;
  color: #f7b538;
}
</style>
