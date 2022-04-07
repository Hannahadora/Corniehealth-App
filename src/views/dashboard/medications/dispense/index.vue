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
      <cornie-btn
        class="bg-danger px-3 rounded-full text-white m-5"
        @click="showRoom = true"
      >
        Add New
      </cornie-btn>
    </div>
    <div class="w-full pb-7" v-else>
      <div class="grid grid-cols-3 gap-8 my-8">
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
              {{ totalVolume }}
            </p>
          </div>
          <div>
            <img src="../../../../assets/img/total-sales-vol.png" alt="" />
          </div>
        </div>
      </div>

      <cornie-table :columns="rawHeaders" v-model="items" class="mt-28">
        <template #actions="{ item }">
          <div
            class="flex items-center hover:bg-gray-100 p-3 cursor-pointer"
            @click="viewItem(item.id)"
          >
            <eye-yellow class="text-danger fill-current" />
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

    <dispense-modal
      :id="typeId"
      v-model="openDispense"
      @closesidemodal="closeModal"
    />

    <view-dispense
      :id="typeId"
      v-model="viewDispense"
    />
  </div>
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";
import ThreeDotIcon from "@/components/icons/threedot.vue";
import SortIcon from "@/components/icons/sort.vue";
import SearchIcon from "@/components/icons/search.vue";
import PrintIcon from "@/components/icons/print.vue";
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
import EyeYelllow from "@/components/icons/eye-yellow.vue";
import UpdateStatus from "@/components/icons/update-status.vue";
import ArrowLeftIcon from "../components/arrowleft.vue";
import ArrowRightIcon from "../components/arrow-right.vue";
import { first, getTableKeyValue } from "@/plugins/utils";

import DispenseModal from "./DispenseModal.vue";
import ViewDispense from "./ViewDispense.vue";

import IMedicationReq from "@/types/ImedicationReq";

const dispense = namespace("dispense");
const request = namespace("request");

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
    EyeYelllow,
    UpdateStatus,
    ColumnFilter,
    TableOptions,

    ArrowLeftIcon,
    ArrowRightIcon,
    DispenseModal,
    ViewDispense,
  },
})
export default class DISPENSE extends Vue {
  query = "";
  typeId = "";
  openDispense = false;
  viewDispense = false;
  practitioner = [] as any;
  location = [] as any;
  updatedBy = "";
  currentStatus = "";
  showStatusModal = false;
  totalRx = 0;
  totalDispensed = 0;
  totalVolume = 0;

  // get patientId() {
  //   return this.$route.params.id as string
  // }

  @dispense.State
  medicationRequest!: any[];

  @dispense.Action
  fetchMedReq!: () => Promise<void>;

  @request.State
  patients!: any[];

  @request.State
  practitioners!: any[];

  @request.Action
  getPatients!: () => Promise<void>;

  getKeyValue = getTableKeyValue;
  preferredHeaders = [];
  rawHeaders = [
    {
      title: "DISPENSE ID",
      key: "dispenseId",
      show: true,
    },
    {
      title: "SUBJECT (PATIENT)",
      key: "date",
      show: true,
    },
    {
      title: "MEDICATION",
      key: "medication",
      show: true,
    },
    {
      title: "UNIT PRICE",
      key: "unitPrice",
      show: true,
    },
    {
      title: "QUANNTITY",
      key: "quantity",
      show: true,
    },
    {
      title: "AMOUNT",
      key: "amount",
      show: true,
    },
    {
      title: "STATUS",
      key: "status",
      show: true,
    },
  ];

  // get items() {
  //   const medReq = this.medicationRequest && this.medicationRequest.map((request) => {
  //     (request as any).createdAt = new Date(
  //       (request as any).createdAt
  //     ).toLocaleDateString("en-US");
  //     return {
  //       ...request,
  //       action: request.id,
  //       keydisplay: request.keydisplay,
  //       dispenseId: request.dispenseId,
  //       subject: request.subject,
  //       medication: request.medications.map((el: any) => el.name),
  //       unitPrice: request.medications.map((el: any) => el.unitPrice),
  //       qantity: request.medications.map((el: any) => el.quantity),
  //       amount: request.medications.map((el: any) => el.amount),
  //       status: request.status,
  //     };
  //   });
  //   if (!this.query) return medReq;
  //   return search.searchObjectArray(medReq, this.query);
  // }

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
    const combined = this.medicationRequest.map(this.medicationReq);
    const requests = combined.flatMap((value) => value);
    if (!this.query) return requests;
    return search.searchObjectArray(requests, this.query);
  }

  medicationReq(request: any) {
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

  showItem(value: string) {
    this.openDispense = true;
    this.typeId = value;
  }

  viewItem(value: string) {
    this.viewDispense = true;
    this.typeId = value;
  }

  closeModal() {
    this.openDispense = false;
  }

  async created() {
    await this.fetchMedReq();

    if (this.medicationRequest.length < 1) this.fetchMedReq();
  }
}
</script>

<style scoped>
.c-shadow {
  box-shadow: 0px 7px 15px rgba(20, 31, 21, 0.08);
}
</style>
