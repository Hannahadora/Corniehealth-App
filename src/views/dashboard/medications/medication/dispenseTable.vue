<template>
  <div>
    <div class="pb-4 mt-6 border-b border-gray-300">
      <p class="text-xl font-bold">{{ $route.name }}</p>
    </div>
    <div
      class="w-full h-2/3 mt-12 flex flex-col justify-center items-center"
      v-if="empty"
    >
      <img src="@/assets/rafiki.svg" class="mb-2" />
      <h4 class="text-black text-center">There is no record.</h4>
      <cornie-btn class="bg-danger px-3 rounded-full text-white m-5">
        Add New
      </cornie-btn>
    </div>
    <div class="w-full pb-7" v-else>
      <div class="grid grid-cols-3 gap-8 mt-8 pb-20">
        <div
          class="bg-white px-4 py-6 c-shadow flex items-center justify-between rounded-2xl"
        >
          <div>
            <p class="mb-1 text-sm" style="color: #667499">Total Rx</p>
            <p class="text-2xl font-bold" style="color: #114ff5">
              {{ totalRx }}
            </p>
          </div>
          <div>
            <img src="../../../../assets/img/total-sales-badge.png" alt="" />
          </div>
        </div>
        <div
          class="bg-white px-4 py-6 c-shadow flex items-center justify-between rounded-2xl"
        >
          <div>
            <p class="mb-1 text-sm" style="color: #667499">Total Dispensed</p>
            <p class="text-2xl font-bold" style="color: #114ff5">
              {{ totalDispensed }}
            </p>
          </div>
          <div>
            <img src="../../../../assets/img/completed-sales.png" alt="" />
          </div>
        </div>
        <div
          class="bg-white px-4 py-6 c-shadow flex items-center justify-between rounded-2xl"
        >
          <div>
            <p class="mb-1 text-sm" style="color: #667499">Total Volume</p>
            <p class="text-2xl font-bold" style="color: #114ff5">
              N {{ totalVolume }}
            </p>
          </div>
          <div>
            <img src="../../../../assets/img/total-sales-vol.png" alt="" />
          </div>
        </div>
      </div>
      <div class="flex justify-center space-x-6 w-full -mb-10">
        <span class="flex space-x-4">
          <substituted class="mr-2" /> Substitution Permitted
        </span>
        <span class="flex space-x-4">
          <substitution-allowed class="mr-2" /> Substituted
        </span>
      </div>
      <cornie-table :columns="rawHeaders" v-model="items">
        <template #actions="{ item }">
          <div
            class="flex items-center hover:bg-gray-100 p-3 cursor-pointer"
            @click="viewItem(item.id)"
          >
            <eye-yellow class="text-blue-500 fill-current" />
            <span class="ml-3 text-xs">View</span>
          </div>
          <div
            class="flex items-center hover:bg-gray-100 p-3 cursor-pointer"
            @click="showItem(item.id)"
          >
            <update-status class="text-danger fill-current" />
            <span class="ml-3 text-xs">Update Status</span>
          </div>
        </template>
        <template #dispenseId="{ item }">
          <p>{{ item.identifier }}</p>
          <p class="text-gray-400">
            {{ new Date(item.createdAt).toLocaleDateString() }}
          </p>
        </template>
        <template #subject="{ item }">
          <p>{{ item.patient.firstname + "" + item.patient.lastname }}</p>
          <p class="text-gray-400">{{ item.patient.mrn }}</p>
        </template>
        <template #medication="{ item }">
          <div class="flex space-x-3">
            <div>
              <p>{{ item.genericName }}</p>

              <p class="text-gray-400">{{ item.form }} days</p>
            </div>
            <substituted class="mr-2" v-if="item.substitutionAllowed" />
            <substitution-allowed v-else class="mr-2" />
          </div>
        </template>
        <template #unitPrice="{ item }">
          <p>{{ item.unitPrice }}/day</p>
        </template>
        <template #quantity="{ item }">
          <span>
            {{ item.quantity }}
          </span>
        </template>
        <template #amount="{ item }">
          <p>{{ item.amount }} Days</p>
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
              v-if="item.status == 'on-hold' || item.status == 'substituted'"
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
              v-if="item.status == 'completed' || item.status == 'ordered'"
            >
              {{ item.status }}
            </p>
            <p
              class="text-xs bg-red-100 text-red-600 p-1 rounded"
              v-if="item.status == 'revoked' || item.status == 'cancelled' || item.status == 'stopped'"
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
              v-if="item.status == 'do-not-perform' || item.status == 'dispensed'"
            >
              {{ item.status }}
            </p>
          </div>
        </template>
      </cornie-table>

      <div class="flex justify-between m-3">
        <div class="flex justify-around">
          <p class="text-sm">show</p>
          <input
            type="number"
            class="w-12 mr-2 ml-2 outline-none border border-blue-lighter rounded-r"
          />
          <p class="text-sm">per page</p>
        </div>
        <div class="flex justify-around">
          <p class="text-xs mr-3 mt-1">1-3 of 10 items</p>
          <div class="text-xs mr-3 mt-1" style="fontsize: 6px">
            <arrow-left-icon />
          </div>

          <!-- <delete-icon class="text-danger fill-current text-xs mr-2" /> -->
          <p class="text-sm mr-3 text-xs">1 2 3 ... 10</p>
          <div class="text-xs mt-1" style="fontsize: 5px">
            <arrow-right-icon />
          </div>
          <!-- <delete-icon class="text-danger fill-current" /> -->
        </div>
      </div>
    </div>

    <status-modal
      :id="requestId"
      v-model="statusModal"
      :request="request"
      @status-updated="closeModal"
    />

    <view-dispense
      :id="requestId"
      :request="request"
      :organization="organizationInfo"
      v-model="viewDispenseDetails"
    />
  </div>
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";
import ThreeDotIcon from "@/components/icons/threedot.vue";
import SortIcon from "@/components/icons/sort.vue";
import SearchIcon from "@/components/icons/search.vue";
import PrintIcon from "@/components/icons/print.vue";
import Substituted from "@/components/icons/substituted.vue";
import SubstitutionAllowed from "@/components/icons/substitution-allowed.vue";
import TableRefreshIcon from "@/components/icons/tablerefresh.vue";
import FilterIcon from "@/components/icons/filter.vue";
import IconInput from "@/components/IconInput.vue";
import ColumnFilter from "@/components/columnfilter.vue";
import { namespace } from "vuex-class";
import TableOptions from "@/components/table-options.vue";
import CornieTable from "@/components/cornie-table/CornieTable.vue";
import CornieBtn from "@/components/CornieBtn.vue";
import PlusIcon from "@/components/icons/add.vue";
import { cornieClient } from "@/plugins/http";
import search from "@/plugins/search";
import DeleteIcon from "@/components/icons/delete.vue";
import EyeYellow from "@/components/icons/eye-yellow.vue";
import UpdateStatus from "@/components/icons/update-status.vue";
import ArrowLeftIcon from "../components/arrowleft.vue";
import ArrowRightIcon from "../components/arrow-right.vue";
import { first, getTableKeyValue } from "@/plugins/utils";

import StatusModal from "./UpdateStatus.vue";
import ViewDispense from "./ViewDispense.vue";

import IMedicationReq from "@/types/ImedicationReq";
import IDispenseInfo from "@/types/IDispenseInfo";
import { IOrganization } from "@/types/IOrganization";

const dispense = namespace("dispense");
const request = namespace("request");
const user = namespace("user");
const organization = namespace("organization");

@Options({
  components: {
    CornieTable,
    SortIcon,
    ThreeDotIcon,
    SearchIcon,
    PrintIcon,
    CornieBtn,
    TableRefreshIcon,
    FilterIcon,
    PlusIcon,
    IconInput,
    DeleteIcon,
    EyeYellow,
    UpdateStatus,
    ColumnFilter,
    TableOptions,
    Substituted,
    SubstitutionAllowed,

    ArrowLeftIcon,
    ArrowRightIcon,
    StatusModal,
    ViewDispense,
  },
})
export default class DISPENSE extends Vue {
  query = "";
  empty = "";
  request = "";
  organization = "";
  requestId = "";
  statusModal = false;
  viewDispenseDetails = false;
  practitioner = [] as any;
  location = [] as any;
  updatedBy = "";
  currentStatus = "";
  showStatusModal = false;

  // get patientId() {
  //   return this.$route.params.id as string
  // }

  @dispense.State
  medicationRequest!: any[];

  @dispense.Action
  fetchMedReq!: () => Promise<void>;

  @request.State
  patients!: any[];

  @organization.State
  organizationInfo!: IOrganization;

  @organization.Action
  fetchOrgInfo!: () => Promise<void>;

  @request.State
  practitioners!: any[];

  @request.Action
  getPatients!: () => Promise<void>;

  @user.Getter
  authCurrentLocation!: any;

  @dispense.State
  dispense!: IDispenseInfo;

  @dispense.Action
  viewDispense!: (requestId: string, locationId: string) => Promise<void>;

  getKeyValue = getTableKeyValue;
  preferredHeaders = [];
  rawHeaders = [
    {
      title: "dispense id",
      key: "dispenseId",
      show: true,
      noOrder: true,
    },
    { title: "subject (PATIENT)", key: "subject", show: true, noOrder: true },
    {
      title: "medication",
      key: "medication",
      show: true,
      noOrder: true,
    },
    {
      title: "",
      key: "drug",
      show: false,
      noOrder: true,
    },
    {
      title: "unit price",
      key: "unitprice",
      show: true,
      noOrder: true,
    },
    {
      title: "quantity",
      key: "quantity",
      show: true,
      noOrder: true,
    },
    {
      title: "amount",
      key: "amount",
      show: true,
      noOrder: true,
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
      noOrder: true,
    },
    {
      title: "substitution?",
      key: "substitution",
      show: false,
      noOrder: true,
    },
    {
      title: "reason code",
      key: "reasoncode",
      show: false,
      noOrder: true,
    },
    {
      title: "refill?",
      key: "refill",
      show: false,
      noOrder: true,
    },
    {
      title: "dispense interval",
      key: "interval",
      show: false,
      noOrder: true,
    },
    {
      title: "validity period",
      key: "period",
      show: false,
      noOrder: true,
    },
    {
      title: "no of refill",
      key: "refillno",
      show: false,
      noOrder: true,
    },
    {
      title: "quantity",
      key: "qunatity",
      show: false,
      noOrder: true,
    },
    {
      title: "supply duration",
      key: "duration",
      show: false,
      noOrder: true,
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
    const combined = this.medicationRequest.map(this.medicationRequests);
    const medicationRequest = combined.flatMap((value) => value);

    if (!this.query) return medicationRequest;
    return search.searchObjectArray(medicationRequest, this.query);
  }

  medicationRequests(request: any) {
    const { medications, ...rest } = request;
    return medications.map((medication: any) => {
      return {
        ...medication,
        ...rest,
        medicationId: medication.id,
        requestId: request.id,
        createdAt: new Date(request.createdAt).toLocaleDateString(),
      };
    });
  }
  getPatientName(id: string) {
    const pt = this.patients.find((i: any) => i.id === id);
    return pt ? `${pt.firstname} ${pt.lastname}` : "";
  }
  getPatientMrn(id: string) {
    const pt = this.patients.find((i: any) => i.id === id);
    return pt ? `${pt.mrn}` : "";
  }

  //  async createMapper() {
  //   this.medicationMapper = await mapDisplay(
  //     "http://hl7.org/fhir/ValueSet/medication-codes"
  //   );

  get locationId() {
    return this.authCurrentLocation;
  }

  get totalRx() {
    const rx = this.medicationRequest?.map((el: any) => {
      el.status === "completed";
    });
    return rx.length || 0;
  }

  get totalDispensed() {
    return this.medicationRequest?.length || 0;
  }

  get totalVolume() {
    return 0;
  }

  showItem(value: string) {
    this.statusModal = true;
    this.requestId = value; 
    this.medicationRequest.filter((el: any) => {
      if (el.id == value) {
        this.request = el;
      }
    });
    // this.setRequest();
  }

  viewItem(value: string) {
    this.viewDispenseDetails = true;
    this.requestId = value;
    this.medicationRequest.filter((el: any) => {
      if (el.id == value) {
        this.request = el;
      }
    });
    // this.setRequest();
    this.fetchOrgInfo();
  }

  async setRequest() {
    // const request = await this.viewDispense(this.id, this.locationId);
    try {
      const { data } = await cornieClient().get(
        `/api/v1/pharmacy/dispense-view/${this.locationId}/${this.requestId}`
      );
      this.request = data;
    } catch (error) {
      window.notify({
        msg: "There was an error fetching request details",
        status: "error",
      });
    }
  }

  closeModal() {
    this.statusModal = false;
    this.fetchMedReq()
  }

  async created() {
    await this.fetchMedReq();

    if (this.medicationRequest.length < 1) this.fetchMedReq();

    if (!this.organizationInfo) this.fetchOrgInfo();
  }
}
</script>

<style scoped>
.c-shadow {
  box-shadow: 0px 7px 15px rgba(20, 31, 21, 0.08);
}
</style>
