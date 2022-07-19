<template>
  <div>
    <div class="w-full pb-80" v-if="diagnosticsRequests.length < 1">
      <div class="w-full flex flex-col justify-center items-center h-96">
        <div class="w-1/2 flex flex-col items-center justify-center mt-20">
          <img src="@/assets/img/no-impression.svg" />
          <h3 class="text-center mt-8 text-2xl font-bold">
            No Request on Record
          </h3>
          <!-- <p class="text-base text-center" style="color: #667499">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fermentum
            aenean mattis mi diam eget.
          </p> -->
        </div>
      </div>
    </div>
    <div v-else>
      <cornie-table class="mt-28" :columns="rawHeaders" v-model="items">
        <template #actions="{ item }">
          <div
            class="flex items-center hover:bg-gray-100 p-3 cursor-pointer"
            @click="$emit('ViewRequest', item.id, item)"
          >
            <eye-blue class="text-danger fill-current" />
            <span class="ml-3 text-xs">View Report</span>
          </div>
          <div
            class="flex items-center hover:bg-gray-100 p-3 cursor-pointer"
            @click="$emit('ViewRequest', item.id, item)"
          >
            <plus-icon-black class="text-danger fill-current" />
            <span class="ml-3 text-xs">create Report</span>
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
    </div>
    <div class="flex justify-between m-3">
      <!-- <div class="flex justify-around">
        <p class="text-sm">show</p>
        <input
          type="number"
          class="w-12 mr-2 ml-2 outline-none border border-blue-lighter rounded-r"
        />
        <p class="text-sm">per page</p>
      </div> -->
      <div class="flex justify-around">
        <!-- <p class="text-xs mr-3 mt-1">1-3 of 10 items</p>
        <div class="text-xs mr-3 mt-1" style="fontsize: 6px">
          <arrow-left-icon />
        </div> -->

        <!-- <delete-icon class="text-danger fill-current text-xs mr-2" /> -->
        <!-- <p class="text-sm mr-3 text-xs">1 2 3 ... 10</p>
        <div class="text-xs mt-1" style="fontsize: 5px">
          <arrow-right-icon />
        </div> -->
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
export default class RequestTable extends Vue {
  query = "";
  title = "";
  practitioners = <any>[];

  diagnosticsRequests = <any>[];

  getKeyValue = getTableKeyValue;
  preferredHeaders = [];
  rawHeaders = [
    {
      title: "REQUEST ID",
      key: "requisitiontId",
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
      title: "REQUESTER",
      key: "requester",
      show: true,
    },
    {
      title: "STATUS",
      key: "status",
      show: true,
    },
  ];

  get items() {
    const diagnosticsRequests = this.diagnosticsRequests.map((request: any) => {
      (request as any).createdAt = new Date(
        (request as any).createdAt
      ).toLocaleDateString("en-US");
      return {
        ...request,
        // action: sale.id,
        keydisplay: "XXXXXXX",
        requisitionId: this.printIdentifier(request?.identifier),
        category: request.category,
        serviceName: request.serviceName || "XXXX",
        subject: `${request.patient?.firstname} ${request.patient?.middlename} ${request.patient?.lastname}`,
        requester: this.findPractitionerName(request.requesterId) || "XXXX",
        performer: this.findPractitionerName(request?.performerId) || "XXXX",
        status: request.status,
      };
    });
    if (!this.query) return diagnosticsRequests;
    return search.searchObjectArray(diagnosticsRequests, this.query);
  }

  async fetchDiagnosticRepquests() {
    try {
      const data = await cornieClient().get(
        "/api/v1/diagnostic-requests/performer"
      );
      this.diagnosticsRequests = data.data;
    } catch (error) {
      window.notify({
        msg: "There was an error fetching Diagnostics Requests",
        status: "error",
      });
    }
  }

  printIdentifier(identifier?: any) {
    const i: any = identifier.split("-");
    const idn: any = `${i[0]}-${i[1]}`;
    const idd: any = `${i[2]}-${i[3]}`;
    return idn + "\n" + idd;
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
    await this.fetchDiagnosticRepquests();
    if (this.diagnosticsRequests.length < 1) this.fetchDiagnosticRepquests();
  }
}
</script>

<style scoped>
.c-shadow {
  box-shadow: 0px 7px 15px rgba(20, 31, 21, 0.08);
}
</style>
