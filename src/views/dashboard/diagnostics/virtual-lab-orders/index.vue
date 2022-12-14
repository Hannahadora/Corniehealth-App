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
      <h4 class="text-black text-center">There is no virtual lab order on record.</h4>
    </div>
    <div class="w-full pb-7 mt-28" v-else>
      <cornie-table :columns="rawHeaders" v-model="items">
        <template #actions="{ item }">
          <div
            class="flex items-center hover:bg-gray-100 p-3 cursor-pointer"
            @click="viewItem(item.id)"
          >
            <eye-blue class="text-danger fill-current" />
            <span class="ml-3 text-xs">View Result</span>
          </div>
          <div
            class="flex items-center hover:bg-gray-100 p-3 cursor-pointer"
            @click="showItem(item.id)"
          >
            <get-specimen class="text-danger fill-current" />
            <span class="ml-3 text-xs">Get Specimen ID</span>
          </div>
          <div
            class="flex items-center hover:bg-gray-100 p-3 cursor-pointer"
            @click="showItem(item.id)"
          >
            <update-report-green class="text-danger fill-current" />
            <span class="ml-3 text-xs">Update Status</span>
          </div>
          <div
            class="flex items-center hover:bg-gray-100 p-3 cursor-pointer"
          >
            <report class="text-danger fill-current" />
            <span class="ml-3 text-xs">Report</span>
          </div>
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
  </div>
  <view-orders
    v-model="showResult"
    :id="typeId"
  />
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";
import ILocation, { HoursOfOperation } from "@/types/ILocation";
import { first, getTableKeyValue } from "@/plugins/utils";
import { cornieClient } from "@/plugins/http";
import search from "@/plugins/search";
import { namespace } from "vuex-class";

import ThreeDotIcon from "@/components/icons/threedot.vue";
import SortIcon from "@/components/icons/sort.vue";
import SearchIcon from "@/components/icons/search.vue";
import PrintIcon from "@/components/icons/print.vue";
import TableRefreshIcon from "@/components/icons/tablerefresh.vue";
import FilterIcon from "@/components/icons/filter.vue";
import IconInput from "@/components/IconInput.vue";
import Report from "@/components/icons/report.vue";
import ColumnFilter from "@/components/columnfilter.vue";
import TableOptions from "@/components/table-options.vue";
import CornieTable from "@/components/cornie-table/CornieTable.vue";
import CornieBtn from "@/components/CornieBtn.vue";
import PlusIcon from "@/components/icons/add.vue";
import GetSpecimen from "@/components/icons/get-specimen.vue";
import EyeBlue from "@/components/icons/eye-blue.vue";
import UpdateStatusYellow from "@/components/icons/update-status-yellow.vue";
import UpdateReportGreen from "@/components/icons/update-report-green.vue";
import PlusIconBlack from "@/components/icons/plus-icon-black.vue";

import  IVirtuallaborder  from "@/types/IVirtuallaborder";

import ViewOrders from "./ViewOrders.vue";

const virtuallab = namespace("virtuallab");
const user = namespace("user");

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
    EyeBlue,
    PlusIconBlack,
    ColumnFilter,
    TableOptions,
    UpdateStatusYellow,
    UpdateReportGreen,
    ViewOrders,
    GetSpecimen,
    Report,
  },
})
export default class VirtualLabOrder extends Vue {
  query = "";
  typeId = "";
  showRecord = false;
  showResult = false;
  practitioner = [] as any;
  location = [] as any;
  updatedBy = "";
  currentStatus = "";
  showStatusModal = false;
  totalSales = 0;
  completedSales = 0;
  totalSalesVolume = 0;

  diagnosticsReports = [{}];

  @virtuallab.State
  virtuallaborders!: IVirtuallaborder[];

  @virtuallab.Action
  fetchVirtualLabOrder!: (locationId:string) => Promise<void>;

  @user.Getter
  authCurrentLocation!: any;

  getKeyValue = getTableKeyValue;
  preferredHeaders = [];
  rawHeaders = [
    {
      title: "ORDER ID",
      key: "orderId",
      show: true,
    },
    {
      title: "CATEGORY",
      key: "category",
      show: true,
    },
    {
      title: "SERVICE NAME",
      key: "serviceId",
      show: true,
    },
    {
      title: "SUBJECT",
      key: "subject",
      show: true,
    },
    {
      title: "PERFORMER",
      key: "performer",
      show: true,
    },
    {
      title: "AMOUNT PAID",
      key: "amountPaid",
      show: true,
    },
    {
      title: "STATUS",
      key: "status",
      show: true,
    },
  ];

  get items() {
    const virtuallaborders = this.virtuallaborders.map((laborder) => {
      (laborder as any).createdAt = new Date(
        (laborder as any).createdAt
      ).toLocaleDateString("en-US");
      return {
        ...laborder,
        // action: sale.id,

      };
    });
    if (!this.query) return virtuallaborders;
    return search.searchObjectArray(virtuallaborders, this.query);
  }

  get empty() {
    return this.virtuallaborders.length < 1;
  }


  showItem(value: string) {
    this.showRecord = true;
    this.typeId = value;
  
  }

  viewItem(value: string) {
    this.showResult = true;
    this.typeId = value;
    
  }

  closeModal() {
    this.showResult = false;
  }

  async created() {
    await this.fetchVirtualLabOrder(this.authCurrentLocation);
  }
}
</script>

<style scoped>
.c-shadow {
  box-shadow: 0px 7px 15px rgba(20, 31, 21, 0.08);
}
</style>
