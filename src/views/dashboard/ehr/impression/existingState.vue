<template>
  <div class="w-full pb-80">
    <div>
      <span class="flex justify-end w-full mb-8">
        <button
          class="bg-danger rounded-full text-white mt-5 py-2 pr-12 pl-12 px-3 mb-5 font-semibold focus:outline-none hover:opacity-90"
          @click="createNewImpression"
        >
          New Impression
        </button>
      </span>
      <cornie-table :columns="rawHeaders" v-model="items">
        <template #actions="{ item }">
          <div class="flex items-center hover:bg-gray-100 p-3 cursor-pointer" @click="showImpression(item.id)">
            <newview-icon class="text-yellow-500 fill-current" />
            <span class="ml-3 text-xs">View</span>
          </div>
          <div
            class="flex items-center hover:bg-gray-100 p-3 cursor-pointer"
            @click="showStatus(item.id)"
          >
            <update-icon class="text-purple-800 fill-current" />
            <span class="ml-3 text-xs">Update Status</span>
          </div>
          <div
            class="flex items-center hover:bg-gray-100 p-3 cursor-pointer"
            @click="showImpression(item.id)"
          >
            <edit-icon class="text-purple-600 fill-current" />
            <span class="ml-3 text-xs">Edit</span>
          </div>
          <div class="flex items-center hover:bg-gray-100 p-3 cursor-pointer">
            <cancel-icon />
            <span class="ml-3 text-xs">Cancel</span>
          </div>
        </template>
        <template #status="{ item }">
          <div class="flex items-center">
            <p
              class="text-xs bg-yellow-100 text-yellow-400 p-1 rounded"
              v-if="item.status == 'In-progress'"
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
              class="text-xs bg-purple-300 text-purple-600 p-1 rounded"
              v-if="item.status == 'Entered-in-error'"
            >
              {{ item.status }}
            </p>
          </div>
        </template>
      </cornie-table>
    </div>

    <impression-modal
      @impression-added="impressionAdded"
      @update="showImpression"
      v-model="showImpressionModal"
      :id="impressionId"
      :impression="selectedImpression"
      :allImpressions="impressions"
    />

    <status-modal
      :id="impressionId"
      :impression="selectedImpression"
      :practitioners="practitioners"
      @update="showStatus"
      @status-added="getPatientImpressions"
      v-model="showStatusModal"
    />
  </div>
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";
import CornieTable from "@/components/cornie-table/CornieTable.vue";
import CardText from "@/components/cornie-card/CornieCardText.vue";
import CornieDialog from "@/components/CornieDialog.vue";
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
import IImpression from "@/types/IImpression";
import DeleteIcon from "@/components/icons/delete.vue";
import EyeIcon from "@/components/icons/yelloweye.vue";
import EditIcon from "@/components/icons/edit.vue";
import CancelIcon from "@/components/icons/cancel.vue";
import TimelineIcon from "@/components/icons/timeline.vue";
import DangerIcon from "@/components/icons/danger.vue";
import ShareIcon from "@/components/icons/share.vue";
import CheckinIcon from "@/components/icons/checkin.vue";
import UpdateIcon from "@/components/icons/newupdate.vue";
import PlusIcon from "@/components/icons/plus.vue";
import NewviewIcon from "@/components/icons/newview.vue";
import MessageIcon from "@/components/icons/message.vue";
import ImpressionModal from "./impressionDialog.vue";
import { namespace } from "vuex-class";
import { cornieClient } from "@/plugins/http";
import StatusModal from "./status.vue";
import { mapDisplay } from "@/plugins/definitions";

const impression = namespace("impression");

@Options({
  components: {
    CancelIcon,
    SortIcon,
    CheckinIcon,
    ImpressionModal,
    NewviewIcon,
    UpdateIcon,
    TimelineIcon,
    ShareIcon,
    ThreeDotIcon,
    StatusModal,
    DangerIcon,
    PlusIcon,
    SearchIcon,
    MessageIcon,
    PrintIcon,
    TableRefreshIcon,
    FilterIcon,
    IconInput,
    ColumnFilter,
    TableOptions,
    DeleteIcon,
    EyeIcon,
    EditIcon,
    CornieTable,
    CardText,
    CornieDialog,
  },
})
export default class ImpressionExistingState extends Vue {
  showColumnFilter = false;
  showModal = false;
  loading = false;
  query = "";
  selected = 1;
  showNotes = false;
  showImpressionModal = false;
  showStatusModal = false;
  impressionId = "";
  tasknotes: any = [];
  updatedBy = "";
  currentStatus = "";
  update = "";
  practitioners: any = [];
  selectedImpression: any = {};

  impressions: IImpression[] = [];

  // @Prop({ type: Array, default: [] })
  // impressions!: IImpression[];

  // @impression.State
  // impressions!: IImpression[];

  
  findingMapper = (code: string) => "";

  @impression.Action
  deleteImpression!: (id: string) => Promise<boolean>;

  @impression.Action
  fetchImpressions!: (patientId: string) => Promise<void>;

  getKeyValue = getTableKeyValue;
  preferredHeaders = [];
  rawHeaders = [
    {
      title: "Clinical impression id",
      key: "cid",
      show: true,
    },
    { title: "Date Recorded", key: "createdAt", show: true },
    {
      title: "problem",
      key: "problem",
      show: false,
    },
    {
      title: "investigation type",
      key: "investigation",
      show: false,
    },
    {
      title: "finding code",
      key: "findings",
      show: true,
    },
    {
      title: "prognosis code",
      key: "prognosis",
      show: true,
    },
    {
      title: "assessor",
      key: "assessor",
      show: true,
    },
    {
      title: "verification status",
      key: "status",
      show: true,
    },
    {
      title: "Status Reason",
      key: "statusReason",
      show: false,
    },
    {
      title: "Period",
      key: "onsetPeriod",
      show: false,
    },
    {
      title: "description",
      key: "description",
      show: false,
    },
    {
      title: "subject",
      key: "subject",
      show: false,
    },
    {
      title: "encounter",
      key: "encounter",
      show: false,
    },
    //  {
    //   title: "Encounter",
    //   kwy: "encounter",
    //   show: false,
    // },
    //  {
    //   title: "Repitition",
    //   kwy: "repitition",
    //   show: false,
    // },
    //  {
    //   title: "Input Type",
    //   kwy: "inputType",
    //   show: false,
    // },
    //  {
    //   title: "Input Value",
    //   kwy: "inputValue",
    //   show: false,
    // },
    //  {
    //   title: "Output Type",
    //   kwy: "outputType",
    //   show: false,
    // },
    //  {
    //   title: "Output Value",
    //   kwy: "outputValue",
    //   show: false,
    // },
  ];

  async createMapper() {
    this.findingMapper = await mapDisplay(
      "http://hl7.org/fhir/ValueSet/clinical-findings"
    );
  }

  get headers() {
    const preferred =
      this.preferredHeaders.length > 0
        ? this.preferredHeaders
        : this.rawHeaders;
    const headers = preferred.filter((header) => header.show);
    return [...first(4, headers), { title: "", value: "action", image: true }];
  }

  get items() {
    const impressions = this.impressions?.map((impression: any) => {
      impression.createdAt = new Date(impression.createdAt).toLocaleDateString(
        "en-GB"
      );
      impression.updatedAt = new Date(impression.updatedAt).toLocaleDateString(
        "en-GB"
      );
      return {
        ...impression,
        action: impression.id,
        keydisplay: "XXXXXXX",
        cid: "XXXXXXX",
        prognosis: impression.prognosis?.length > 0 ? impression.prognosis[0]?.itemCode : "N/A",
        findings: impression.findings?.length > 0 ? this.findingMapper(impression.findings[0]?.basis) : "N/A",
        assessor:
          this.findPractitioner(impression?.recorded?.asserterId) || "N/A",
        status: impression.status,
      };
    });

    if (!this.query) return impressions;
    return search.searchObjectArray(impressions, this.query);
  }

  async showStatus(value: string) {
    this.impressionId = value;
    await  this.findImpression(value)
    this.showStatusModal = true;
  }

  async showImpression(value: string) {
    //this.stopEvent = true;
    this.impressionId = value;
    await  this.findImpression(value)
    this.showImpressionModal = true;
  }

  async findImpression(id: any) {
    const url = `/api/v1/clinical-impressions/${this.impressionId}`;
    try {
      const response: any = await cornieClient().get(url);
      if (response.success) {
        this.selectedImpression = response.data;
      }
    } catch (e: any) {
      window.notify({
        msg: "There was an error when fetching Impression",
        status: "error",
      });
    }
  }

  get activePatientId() {
    const id = this.$route?.params?.id as string;
    return id;
  }

  async fetchPractitioners() {
    const url = "/api/v1/practitioner";
    const response: any = await cornieClient().get(url);
    if (response.success) {
      this.practitioners = response.data;
    }
  }

  findPractitioner(id: any) {
    const ptn = this.practitioners?.find((el: any) => (el.id = id));
    return ptn?.firstName + " " + ptn?.lastName;
  }

  async getPatientImpressions() {
    const url = `/api/v1/clinical-impressions/findAllByPatient/${this.activePatientId}`;
    try {
      const response: any = await cornieClient().get(url);
      if (response.success) {
        this.impressions = response.data;
      }
    } catch (e: any) {
      window.notify({
        msg: "There was an error fetching Impressions",
        status: "error",
      });
    }
  }

  createNewImpression() {
    this.showImpressionModal = true; 
    this.impressionId = ''; 
    this.selectedImpression = {}
  }

  impressionAdded() {
    this.getPatientImpressions();
  }

  async deleteItem(id: string) {
    const confirmed = await window.confirmAction({
      message: "You are about to delete this impression",
      title: "Delete impression",
    });
    if (!confirmed) return;

    if (await this.deleteImpression(id))
      window.notify({ msg: "impression cancelled", status: "success" });
    else window.notify({ msg: "Impression not cancelled", status: "error" });
  }

  get sortImpressions() {
    return this.items.slice().sort(function (a, b) {
      return a.createdAt < b.createdAt ? 1 : -1;
    });
  }

  async created() {
    await this.fetchPractitioners();
    await this.getPatientImpressions();
    this.sortImpressions;
    await this.createMapper();
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
