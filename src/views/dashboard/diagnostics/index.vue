<template>
  <div>
    <div class="pb-4 mt-6 border-b border-gray-300">
      <p class="text-xl font-bold">{{ $route.name }} Report</p>
    </div>
    <div
      class="w-full h-2/3 mt-12 flex flex-col justify-center items-center"
      v-if="empty"
    >
      <img src="@/assets/rafiki.svg" class="mb-2" />
      <h4 class="text-black text-center">There is no record.</h4>
      <cornie-btn class="bg-danger px-3 rounded-full text-white m-5" @click="viewItem()">
        Add New
      </cornie-btn>
    </div>
    <div class="w-full pb-7" v-else>
      <div class="flex flex-row w-full justify-end mt-10">
        <div
          @click="viewItem()"
          class="bg-danger p-2 rounded-xl text-white font-bold px-8 py-3 mx-2 cursor-pointer"
        >
          Create New
        </div>
      </div>
      <cornie-table class="mt-28" :columns="rawHeaders" v-model="items">
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
            <update-status-yellow class="text-danger fill-current" />
            <span class="ml-3 text-xs">Update Status</span>
          </div>
          <div
            class="flex items-center hover:bg-gray-100 p-3 cursor-pointer"
            @click="showItem(item.id)"
          >
            <plus-icon-black class="text-danger fill-current" />
            <span class="ml-3 text-xs">Add Appointment</span>
          </div>
          <div
            class="flex items-center hover:bg-gray-100 p-3 cursor-pointer"
            @click="deleteItem(item.id)"
          >
            <update-report-green class="text-danger fill-current" />
            <span class="ml-3 text-xs">Update Report</span>
          </div>
        </template>
        <template #status="{ item }">
          <div class="flex items-center">
            <p class="text-xs bg-gray-300 p-1 rounded" v-if="item.status == 'draft'">
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
            <p class="text-xs bg-gray-300 p-1 rounded" v-if="item.status == 'unknown'">
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
  <update-status v-model="showRecord" :id="typeId" @sales-added="salesAdded" />
  <report-dialog v-model="showResult" :id="typeId" />
</template>
<script lang="ts">
import ColumnFilter from "@/components/columnfilter.vue";
import CornieTable from "@/components/cornie-table/CornieTable.vue";
import CornieBtn from "@/components/CornieBtn.vue";
import IconInput from "@/components/IconInput.vue";
import PlusIcon from "@/components/icons/add.vue";
import EyeBlue from "@/components/icons/eye-blue.vue";
import FilterIcon from "@/components/icons/filter.vue";
import PlusIconBlack from "@/components/icons/plus-icon-black.vue";
import PrintIcon from "@/components/icons/print.vue";
import SearchIcon from "@/components/icons/search.vue";
import SortIcon from "@/components/icons/sort.vue";
import TableRefreshIcon from "@/components/icons/tablerefresh.vue";
import ThreeDotIcon from "@/components/icons/threedot.vue";
import UpdateReportGreen from "@/components/icons/update-report-green.vue";
import UpdateStatusYellow from "@/components/icons/update-status-yellow.vue";
import TableOptions from "@/components/table-options.vue";
import search from "@/plugins/search";
import { getTableKeyValue } from "@/plugins/utils";
import { Options, Vue } from "vue-class-component";
import { namespace } from "vuex-class";
import UpdateStatus from "./updateStatus.vue";
import ReportDialog from "./ReportDialog.vue";

const location = namespace("location");

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
    UpdateStatus,
    ReportDialog,
  },
})
export default class DiagnosticReport extends Vue {
  query = "";
  typeId = "";
  empty = false;
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
  title = "";

  diagnosticsReports = [{}];

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
      (report as any).createdAt = new Date((report as any).createdAt).toLocaleDateString(
        "en-US"
      );
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
  }

  viewItem(value?: string) {
    this.showResult = true;
    this.typeId = value || "";
  }

  closeModal() {
    this.showRecord = false;
  }
}
</script>

<style scoped>
.c-shadow {
  box-shadow: 0px 7px 15px rgba(20, 31, 21, 0.08);
}
</style>
