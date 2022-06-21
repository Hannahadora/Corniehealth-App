<template>
  <div>
    <cornie-table class="mt-28" :columns="rawHeaders" v-model="items">
      <template #actions="{ item }">
        <div
          class="flex items-center hover:bg-gray-100 p-3 cursor-pointer"
          @click="$emit('ViewReport', item.id, item)"
        >
          <eye-blue class="text-danger fill-current" />
          <span class="ml-3 text-xs">View Report</span>
        </div>
        <div
          class="flex items-center hover:bg-gray-100 p-3 cursor-pointer"
          @click="$emit('updateStatus', item.id, item)"
        >
          <update-status-yellow class="text-danger fill-current" />
          <span class="ml-3 text-xs">Update Status</span>
        </div>
        <div
          class="flex items-center hover:bg-gray-100 p-3 cursor-pointer"
        >
          <plus-icon-black class="text-danger fill-current" />
          <span class="ml-3 text-xs">Add Appointment</span>
        </div>
         <div
          class="flex items-center hover:bg-gray-100 p-3 cursor-pointer"
          @click="$emit('updateReport', item.id, item)"
        >
          <update-report-green class="text-danger fill-current" />
          <span class="ml-3 text-xs">Update Report</span>
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
            v-if="item.status == 'partial' || item.status == 'corrected' || item.status == 'ammended'"
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
            v-if="item.status == 'unknown' || item.status == 'registered'"
          >
            {{ item.status }}
          </p>
          <p
            class="text-xs bg-green-100 text-green-400 p-1 rounded"
            v-if="item.status == 'completed' || item.status == 'final'"
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
            v-if="item.status == 'entered-in-error' || item.status == 'preliminary' || item.status == 'appended'"
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
import { cornieClient } from "@/plugins/http";
import { getTableKeyValue } from "@/plugins/utils";
import { Options, Vue } from "vue-class-component";
import { namespace } from "vuex-class";

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
  },
})
export default class ReportTable extends Vue {
  query = "";
  title = "";
  practitioners = <any>[];

  diagnosticReports = <any>[];

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
    const diagnosticReports = this.diagnosticReports.map((report: any) => {
      (report as any).createdAt = new Date(
        (report as any).createdAt
      ).toLocaleDateString("en-US");
      return {
        ...report,
        // action: sale.id,
        keydisplay: "XXXXXXX",
        requestId: "XXXXX",
        reportId: "XXXXX",
        category: report.category,
        serviceName: report.serviceName || "XXXX",
        subject: `${report.patient?.firstname} ${report.patient?.middlename} ${report.patient?.lastname}`,
        interpreter: this.findPractitionerName(report.interpreterId) || "XXXX",
        performer: this.findPractitionerName(report?.performerId) || "XXXX",
        status: report.status,
      };
    });
    if (!this.query) return diagnosticReports;
    return search.searchObjectArray(diagnosticReports, this.query);
  }

  async fetchDiagnosticReports() {
    try {
      const data = await cornieClient().get("/api/v1/diagnostic/report");
      this.diagnosticReports = data.data;
    } catch (error) {
      window.notify({
        msg: "There was an error fetching Diagnostics Reports",
        status: "error",
      });
    }
  }

  printIdentifier(identifier?: any) {
    if (identifier) {
      const i: any = identifier.split("-");
      const idn: any = `${i[0]}-${i[1]}`;
      const idd: any = `${i[2]}-${i[3]}`;
      return idn + "\n" + idd;
    } else return "";
  }

  async fetchPractitioners() {
    const url = "/api/v1/practitioner";
    const response = await cornieClient().get(url);
    this.practitioners = response.data;
  }

  findPractitionerName(id: any) {
    const p: any = this.practitioners?.find((el: any) => {
      el.id === id;
    });
    if (p) {
      return `${p?.firstName} ${p?.lastName}`;
    } else {
      return "";
    }
  }

  async created() {
    await this.fetchPractitioners();
    await this.fetchDiagnosticReports();
    if (this.diagnosticReports.length < 1) this.fetchDiagnosticReports();
  }
}
</script>

<style scoped>
.c-shadow {
  box-shadow: 0px 7px 15px rgba(20, 31, 21, 0.08);
}
</style>
