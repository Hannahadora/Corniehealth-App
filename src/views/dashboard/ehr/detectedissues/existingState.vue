<template>
  <div class="w-full pb-80">
    <div>
      <span class="flex justify-end w-full mb-8">
        <button
          class="bg-danger rounded-full text-white mt-5 py-2 pr-12 pl-12 px-3 mb-5 font-semibold focus:outline-none hover:opacity-90"
          @click="showIssues"
        >
          Register Detected Issues
        </button>
      </span>
      <cornie-table :columns="rawHeaders" v-model="sortIssues">
        <template #actions="{ item }">
          <div
            class="flex items-center hover:bg-gray-100 p-3 cursor-pointer"
            @click="$router.push(`/dashboard/experience/add-task/${item.id}`)"
          >
            <newview-icon class="text-yellow-500 fill-current" />
            <span class="ml-3 text-xs">View</span>
          </div>
          <div
            class="flex items-center hover:bg-gray-100 p-3 cursor-pointer"
            @click="
              $router.push('/dashboard/provider/experience/add-appointment')
            "
          >
            <plus-icon class="text-green-400 fill-current" />
            <span class="ml-3 text-xs">Add Occurrence</span>
          </div>
          <div
            class="flex items-center hover:bg-gray-100 p-3 cursor-pointer"
            @click="showIssues(item.id)"
          >
            <edit-icon class="text-purple-600 fill-current" />
            <span class="ml-3 text-xs">Edit</span>
          </div>
        </template>
        <!-- <template #asserter="{ item }">
          <p class="cursor-pointer">{{ item.asserter }}</p>
        </template> -->
        <!-- <template #recorder="{ item }">
          <p class="cursor-pointer">{{ item.asserter }}</p>
        </template> -->
      </cornie-table>
    </div>

    <issues-modal
      @update:preferred="showIssues"
      v-model="showIssuesModal"
      :id="currentIssue"
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
import IIssues from "@/types/IIssues";
// import IAllergy from "@/types/IAllergy";
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
import IssuesModal from "./issuesdialog.vue";
import { namespace } from "vuex-class";
import { cornieClient } from "@/plugins/http";

const issues = namespace("issues");

@Options({
  components: {
    CancelIcon,
    SortIcon,
    CheckinIcon,
    IssuesModal,
    NewviewIcon,
    UpdateIcon,
    TimelineIcon,
    ShareIcon,
    ThreeDotIcon,
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
export default class IssuesExistingState extends Vue {
  showColumnFilter = false;
  showModal = false;
  loading = false;
  query = "";
  selected = 1;
  showNotes = false;
  showIssuesModal = false;
  issuesId = "";
  tasknotes = [];

  // @Prop({ type: Array, default: [] })
  // issues!: IIssues[];

  // @allergy.State
  // allergys!: IAllergy[];

  @issues.State
  issues!: any[];

  // @issues.Action
  // deleteAllergy!: (id: string) => Promise<boolean>;

  @issues.Action
  getPractitioners!: () => Promise<void>;

  @issues.Action
  fetchIssues!: (patientId: string) => Promise<void>;

  getKeyValue = getTableKeyValue;
  preferredHeaders = [];
  rawHeaders = [
    { title: "Date", key: "createdAt", show: true },
    {
      title: "identifier",
      key: "id",
      show: true,
    },
    {
      title: "Code",
      key: "code",
      show: true,
    },
    {
      title: "Author",
      key: "author",
      show: true,
    },
    {
      title: "Identified(Date)",
      key: "date",
      show: true,
    },
    {
      title: "Implicated",
      key: "implicated",
      show: true,
    },
    {
      title: "Patient",
      key: "patient",
      show: true,
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

  get headers() {
    const preferred =
      this.preferredHeaders.length > 0
        ? this.preferredHeaders
        : this.rawHeaders;
    const headers = preferred.filter((header) => header.show);
    return [...first(4, headers), { title: "", value: "action", image: true }];
  }
  currentIssue: any = null;
  get items() {
    const issues = this.issues.map((issue) => {
      (issue as any).identified.identifiedPeriod.start = new Date(
        (issue as any).identified.identifiedPeriod.start
      ).toLocaleDateString("en-US");
      (issue as any).identified.identifiedPeriod.end = new Date(
        (issue as any).identified.identifiedPeriod.end
      ).toLocaleDateString("en-US");
      (issue as any).createdAt = new Date(
        (issue as any).createdAt
      ).toLocaleDateString("en-US");
      return {
        ...issue,
        date: issue.createdAt,
        code: issue.code,
        author: issue.mitigation.author,
        implicated: issue.identified.implicated,
        patient: issue.patient,
        // onsetPeriod:
        // issue.onSet.onsetPeriod.start + "-" + issue.onSet.onsetPeriod.end,
        // asserter: this.getPractitionerName(allergy.onSet.asserter),
        // product: issue.reaction.substance,
      };
    });
    if (!this.query) return issues;
    return search.searchObjectArray(issues, this.query);
  }
  // getPractitionerName(id: string) {
  //   const pt = this.practitioners.find((i: any) => i.id === id);
  //   return pt ? `${pt.firstName} ${pt.lastName}` : "";
  // }
  async showIssues(issue: String) {
    this.showIssuesModal = true;
    //this.stopEvent = true;
    this.currentIssue = issue;
  }
  get activePatientId() {
    const id = this.$route?.params?.id as string;
    return id;
  }

  allergyAdded() {
    this.issues;
    this.fetchIssues(this.activePatientId);
  }
  // async deleteItem(id: string) {
  //   const confirmed = await window.confirmAction({
  //     message: "You are about to delete this allergy",
  //     title: "Delete allergy",
  //   });
  //   if (!confirmed) return;

  //   if (await this.deleteAllergy(id))
  //     window.notify({ msg: "Allergy cancelled", status: "success" });
  //   else window.notify({ msg: "Allergy not cancelled", status: "error" });
  // }

  get sortIssues() {
    return this.items.slice().sort(function (a, b) {
      return a.createdAt < b.createdAt ? 1 : -1;
    });
  }

  async created() {
    // this.getPractitioners();
    this.sortIssues;
    this.fetchIssues(this.activePatientId);
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
