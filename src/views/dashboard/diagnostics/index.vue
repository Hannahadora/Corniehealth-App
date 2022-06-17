<template>
  <div>
    <bread-crumbs />
    <div class="pb-4 mt-6 border-b border-gray-300">
      <p class="text-xl font-bold">Diagnostics {{ type }}</p>
    </div>
    <div class="flex items-center space-x-8 border-b-4 border-gray-300">
      <span
        class="px-3 pt-9 pb-2 -mb-1 cursor-pointer"
        :class="{ 'border-b-4 border-red-500': type === 'reports' }"
        @click="type = 'reports'"
        >Reports</span
      >
      <span
        class="px-3 pt-9 pb-2 -mb-1 cursor-pointer"
        :class="{ 'border-b-4 border-red-500': type === 'requests' }"
        @click="type = 'requests'"
        >Requests</span
      >
    </div>
    <div class="w-full pb-7">
      <request-table v-if="type === 'requests'" @viewRequest="createReport" />
      <report-table
        v-if="type === 'reports'"
        @viewReport="viewItem"
        @updateStatus="showStatusModal"
      />
    </div>
  </div>
  <update-status
    v-model="statusUpdateModal"
    :id="reportId"
    @status-updated="statusUpdated"
    :report="selectedReport"
  />
  <report-dialog
    v-model="showResult"
    :reportId="reportId"
    :requestId="requestId"
    :report="selectedReport"
    :request="selectedRequest"
  />
</template>
<script lang="ts">
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
import search from "@/plugins/search";
import { getTableKeyValue } from "@/plugins/utils";
import { Options, Vue } from "vue-class-component";
import { namespace } from "vuex-class";
import UpdateStatus from "./updateStatus.vue";
import ReportDialog from "./ReportDialog.vue";
import RequestTable from "./RequestTable.vue";
import ReportTable from "./ReportTable.vue";
import BreadCrumbs from "@/components/breadcrumbs.vue";

@Options({
  components: {
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
    UpdateStatusYellow,
    UpdateReportGreen,
    UpdateStatus,
    ReportDialog,
    BreadCrumbs,
    ReportTable,
    RequestTable,
  },
})
export default class DiagnosticReport extends Vue {
  query = "";
  requestId = "";
  reportId = "";
  statusUpdateModal = false;
  showResult = false;
  updatedBy = "";
  currentStatus = "";
  selectedReport = <any>{};
  selectedRequest = <any>{};
  type = "reports";

  showStatusModal(value: string, item: any) {
    this.statusUpdateModal = true;
    this.reportId = value;
    this.selectedReport = item;
  }

  createReport(itemId?: string, item?: any) {
    if (itemId) {
      this.requestId = itemId;
      this.selectedRequest = item;
    }
    this.showResult = true;
  }

  viewItem(itemId?: string, item?: any) {
    if (itemId) {
      this.reportId = itemId;
      this.selectedReport = item;
    }
    this.showResult = true;
  }

  closeModal() {
    this.statusUpdateModal = false;
  }
}
</script>

<style scoped>
.c-shadow {
  box-shadow: 0px 7px 15px rgba(20, 31, 21, 0.08);
}
</style>
