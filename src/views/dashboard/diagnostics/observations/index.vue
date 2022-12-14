<template>
  <div>
    <div class="pb-4 mt-6 border-b border-gray-300">
      <p class="text-xl font-bold">{{ $route.name }}</p>
    </div>
    <div
      class="w-full flex flex-col justify-center items-center h-96"
      v-if="empty"
    >
        <img src="@/assets/img/empty-requests.svg" />
        <h3 class="text-center mt-5">No Record!<br /></h3>
      <cornie-btn
        class="bg-danger px-3 rounded-full text-white m-5"
        @click="createObs = true"
      >
        Add New
      </cornie-btn>
    </div>

    <div class="w-full pb-7 mt-28" v-else>
      <span class="flex justify-end">
        <cornie-btn
          class="bg-danger px-3 py-1 text-base rounded-lg text-white m-5"
          @click="
            typeId = '';
            selectedObservation = {};
            createObs = true;
          "
        >
          Create New
        </cornie-btn>
      </span>

      <cornie-table :columns="rawHeaders" v-model="items">
        <template #actions="{ item }">
          <div
            class="flex items-center hover:bg-gray-100 p-3 cursor-pointer"
            @click="viewItem(item.id)"
          >
            <eye-blue class="text-danger fill-current" />
            <span class="ml-3 text-xs">View</span>
          </div>
          <div
            class="flex items-center hover:bg-gray-100 p-3 cursor-pointer"
            @click="viewItem(item.id)"
          >
            <update-status-yellow class="text-danger fill-current" />
            <span class="ml-3 text-xs">Update</span>
          </div>
          <div
            class="flex items-center hover:bg-gray-100 p-3 cursor-pointer"
            @click="updateStatus(item.id)"
          >
            <update-status-purple class="text-danger fill-current" />
            <span class="ml-3 text-xs">Update Status</span>
          </div>
          <div
            class="flex items-center hover:bg-gray-100 p-3 cursor-pointer"
            @click="showItem(item.id)"
          >
            <correct-green class="text-danger fill-current" />
            <span class="ml-3 text-xs">Correct</span>
          </div>
          <div
            class="flex items-center hover:bg-gray-100 p-3 cursor-pointer"
            @click="showItem(item.id)"
          >
            <amend-blue class="text-danger fill-current" />
            <span class="ml-3 text-xs">Amend</span>
          </div>
          <div
            class="flex items-center hover:bg-gray-100 p-3 cursor-pointer"
            @click="deleteItem(item.id)"
          >
            <cancel-red-bg class="text-danger fill-current" />
            <span class="ml-3 text-xs">Cancel</span>
          </div>
        </template>
        <template #status="{ item }">
          <div class="flex items-center">
            <!-- <p
              class="text-xs bg-gray-300 p-1 rounded"
              v-if="item.status == 'draft'"
            >
              {{ item.status }}
            </p> -->
            <p
              class="text-xs bg-yellow-100 text-yellow-400 p-1 rounded"
              v-if="item.status == 'on-hold' || item.status == 'preliminary'"
            >
              {{ item.status }}
            </p>
            <p
              class="text-xs bg-green-100 text-green-500 p-1 rounded"
              v-if="item.status == 'registered'"
            >
              {{ item.status }}
            </p>
            <!-- <p
              class="text-xs bg-gray-300 p-1 rounded"
              v-if="item.status == 'unknown'"
            >
              {{ item.status }}
            </p> -->
            <p
              class="text-xs bg-green-100 text-green-400 p-1 rounded"
              v-if="item.status == 'final'"
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
              v-if="item.status == 'corrected'"
            >
              {{ item.status }}
            </p>
            <!-- <p
              class="text-xs bg-blue-300 text-blue-600 p-1 rounded"
              v-if="item.status == 'do-not-perform'"
            >
              {{ item.status }}
            </p> -->
          </div>
        </template>
      </cornie-table>
    </div>

    <update-status
      :id="typeId"
      :observation="selectedObservation"
      :dateUpdated="dateUpdated"
      :currentStatus="currentStatus"
      :updatedBy="updatedBy"
      v-model="statusModal"
      @status-updated="fetchObservations"
    />
    <create-observation
      :id="typeId"
      :observation="selectedObservation"
      v-model="createObs"
      @observation-added="fetchObservations"
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
import CorrectGreen from "@/components/icons/correct-green.vue";
import AmendBlue from "@/components/icons/amend-blue.vue";
import CancelRedBg from "@/components/icons/cancel-red-bg.vue";
import IconInput from "@/components/IconInput.vue";
import ColumnFilter from "@/components/columnfilter.vue";
import { namespace } from "vuex-class";
import TableOptions from "@/components/table-options.vue";
import CornieTable from "@/components/cornie-table/CornieTable.vue";
import CornieBtn from "@/components/CornieBtn.vue";
import PlusIcon from "@/components/icons/add.vue";
import { cornieClient } from "@/plugins/http";
import search from "@/plugins/search";
import EyeBlue from "@/components/icons/eye-blue.vue";
import UpdateStatusYellow from "@/components/icons/update-status-yellow.vue";
import UpdateStatusPurple from "@/components/icons/update-status-purple.vue";
import UpdateReportGreen from "@/components/icons/update-report-green.vue";
import PlusIconBlack from "@/components/icons/plus-icon-black.vue";
import ILocation, { HoursOfOperation } from "@/types/ILocation";
import { IOrganization } from "@/types/IOrganization";

import { first, getTableKeyValue } from "@/plugins/utils";

import CreateObservation from "./create-observation.vue";
import UpdateStatus from "./update-status.vue";
import { IPatient } from "@/types/IPatient";

const location = namespace("location");
const user = namespace("user");
const organization = namespace("organization");
const patients = namespace("patients");

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
    UpdateStatusPurple,
    UpdateReportGreen,
    CorrectGreen,
    AmendBlue,
    CancelRedBg,
    CreateObservation,
    UpdateStatus,
  },
})
export default class DiagnosticReport extends Vue {
  query = "";
  typeId = "";

  selectedObservation = <any>{};
  dateUpdated = "";
  currentStatus = "";
  updatedBy = "";

  showRecord = false;
  showResult = false;
  createObs = false;

  statusModal = false;
  practitioner = [] as any;
  location = [] as any;

  observations = [] as any;

  @patients.State
  patients!: IPatient[];

  @user.Getter
  authCurrentLocation!: any;

  @organization.State
  organizationInfo!: IOrganization;

  @organization.Action
  fetchOrgInfo!: () => Promise<void>;

  getKeyValue = getTableKeyValue;
  preferredHeaders = [];
  rawHeaders = [
    {
      title: "OBSERVATION ID",
      key: "observationId",
      show: true,
    },
    {
      title: "BASED ON",
      key: "basedOn",
      show: true,
    },
    {
      title: "CATEGORY",
      key: "category",
      show: true,
    },
    {
      title: "OBSERVATION CODE",
      key: "observationCode",
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

  get empty() {
    return this.observations.length === 0;
  }

  get items() {
    const observations = this.observations.map((report: any) => {
      (report as any).createdAt = new Date(
        (report as any).createdAt
      ).toLocaleDateString("en-US");
      return {
        ...report,
        // action: sale.id,
        keydisplay: report.id,
        observationId: report.identifier ?? "XXXX",
        basedOn: report.basicInfo?.basedOn,
        category: report.basicInfo?.category,
        observationCode: report.basicInfo.code,
        subject: report.basicInfo?.subject,
        performer: report.issueInfo?.performer,
        interpreter: report.reasonInfo.interpretation,
        status: report.status,
      };
    });
    if (!this.query) return observations;
    return search.searchObjectArray(observations, this.query);
  }

  showItem(value: string) {
    this.showRecord = true;
    this.typeId = value;
  }
  updateStatus(value: string) {
    this.statusModal = true;
    this.typeId = value;
    this.selectedObservation = this.observations.find(
      (el: any) => el.id === value
    );
    this.dateUpdated = this.selectedObservation.updatedAt;
    this.currentStatus = this.selectedObservation.status;
    this.updatedBy = this.selectedObservation.performer;
  }

  viewItem(value: string) {
    this.createObs = true;
    this.typeId = value;
    this.selectedObservation = this.observations.find(
      (el: any) => el.id === value
    );
  }

  closeModal() {
    this.showRecord = false;
  }

  deleteItem(id: any) {}

  get locationId() {
    // return this.authCurrentLocation;
    return "21b84341-2051-4cad-b6b6-feae04f81215";
  }

  async fetchObservations() {
    try {
      const data = await cornieClient().get("/api/v1/observations");
      this.observations = data.data;
    } catch (error) {
      window.notify({
        msg: "There was an error fetching observations",
        status: "error",
      });
    }
  }

  async created() {
    await this.fetchObservations();

    if (this.observations.length < 1) this.fetchObservations();

    if (!this.organizationInfo) this.fetchOrgInfo();
  }
}
</script>

<style scoped>
.c-shadow {
  box-shadow: 0px 7px 15px rgba(20, 31, 21, 0.08);
}
</style>
