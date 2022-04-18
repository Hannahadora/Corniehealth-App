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
    <div class="w-full pb-7 mt-28" v-else>
      <cornie-table :columns="rawHeaders" v-model="items">
        <template #actions="{ item }">
          <div
            class="flex items-center hover:bg-gray-100 p-3 cursor-pointer"
            @click="viewItem(item.id)"
          >
            <eye-blue-bg class="text-danger fill-current" />
            <span class="ml-3 text-xs">View Result</span>
          </div>
          <div
            class="flex items-center hover:bg-gray-100 p-3 cursor-pointer"
            @click="showItem(item.id)"
          >
            <update-status-yellow class="text-danger fill-current" />
            <span class="ml-3 text-xs">Get Spwcimen ID</span>
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
            @click="deleteItem(item.id)"
          >
            <update-report-green class="text-danger fill-current" />
            <span class="ml-3 text-xs">Report</span>
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
    :organization="organizationInfo"
    :request="request"
  />
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
import EyeBlueBg from "@/components/icons/eye-blue-bg.vue";
import UpdateStatusYellow from "@/components/icons/update-status-yellow.vue";
import UpdateReportGreen from "@/components/icons/update-report-green.vue";
import PlusIconBlack from "@/components/icons/plus-icon-black.vue";
import ILocation, { HoursOfOperation } from "@/types/ILocation";
import { first, getTableKeyValue } from "@/plugins/utils";
import { IOrganization } from "@/types/IOrganization";

import ViewOrders from "./ViewOrders.vue";

const location = namespace("location");
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
    EyeBlueBg,
    PlusIconBlack,
    ColumnFilter,
    TableOptions,
    UpdateStatusYellow,
    UpdateReportGreen,
    ViewOrders,
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

  @organization.State
  organizationInfo!: IOrganization;

  @organization.Action
  fetchOrgInfo!: () => Promise<void>;

  getKeyValue = getTableKeyValue;
  preferredHeaders = [];
  rawHeaders = [
    {
      title: "REQUEST ID",
      key: "requestId",
      show: true,
    },
    {
      title: "REPORT ID",
      key: "reportId",
      show: true,
    },
    {
      title: "CATEGORY",
      key: "category",
      show: true,
    },
    {
      title: "SERVICE NAME",
      key: "serviceName",
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
      title: "INTERPRETER",
      key: "interpreter",
      show: true,
    },
    {
      title: "STATUS",
      key: "status",
      show: true,
    },
  ];

  get items() {
    const diagnosticsReports = this.diagnosticsReports.map((report) => {
      (report as any).createdAt = new Date(
        (report as any).createdAt
      ).toLocaleDateString("en-US");
      return {
        ...report,
        // action: sale.id,
        keydisplay: "XXXXXXX",
        requestId: "-----",
        reportId: "-----",
        category: "-----",
        serviceName: "-----",
        subject: "-----",
        performer: "-----",
        interpreter: "-----",
        status: "Active",
      };
    });
    if (!this.query) return diagnosticsReports;
    return search.searchObjectArray(diagnosticsReports, this.query);
  }

  showItem(value: string) {
    this.showRecord = true;
    this.typeId = value;
    this.fetchOrgInfo();
  }

  viewItem(value: string) {
    this.showResult = true;
    this.typeId = value;
    this.fetchOrgInfo();
  }

  closeModal() {
    this.showResult = false;
  }

  async created() {
    if (!this.organizationInfo) this.fetchOrgInfo();
  }
}
</script>

<style scoped>
.c-shadow {
  box-shadow: 0px 7px 15px rgba(20, 31, 21, 0.08);
}
</style>
