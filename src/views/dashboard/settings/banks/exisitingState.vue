<template>
  <div class="w-full pb-80">
    <ul class="nav nav-tabs nav-tabs-bottom widget_categories">
        <li class="nav-item cursor-pointer"><a class="nav-link" @click="select(1)"  :class="{'active' :  selected === 1  }" :aria-selected="selected === 1">Payments</a></li>
        <li class="nav-item cursor-pointer"><a class="nav-link" @click="select(2)"  :class="{'active' :  selected === 2  }" :aria-selected="selected === 2">Collection</a></li>
         <li class="nav-item cursor-pointer"><a class="nav-link" @click="select(3)"  :class="{'active' :  selected === 3  }" :aria-selected="selected === 3">Currency Conversion</a></li>
    </ul>
    <div class="tab-content">
      <div
        class="tab-pane"
        v-if="selected == 1"
        :class="{ active: selected === 1 }"
        id="Payments"
      >
        <Payments />
      </div>
      <div
        class="tab-pane"
        v-if="selected == 2"
        :class="{ active: selected === 2 }"
        id="Collection"
      >
        <div
          class="w-full flex flex-col justify-center items-center h-full mt-40"
          v-if="empty"
        >
          <img src="@/assets/img/Forms.svg" />
          <h3 class="text-center mt-5">
            You have no satisfactory surveys to display.
          </h3>
          <span class="flex justify-center w-full">
            <div class="dropdown inline-block relative">
              <button
                class="bg-danger rounded-full font-semibold text-white text-sm mt-5 py-3 pr-8 pl-8 px-3 focus:outline-none hover:opacity-90 inline-flex items-center"
              >
                <span class="mr-1">Create New </span>
                <chevron-down-icon
                  class="text-white mb-2 stroke-current mt-2 ml-1"
                />
              </button>
              <ul class="dropdown-menu absolute hidden text-gray-700 pt-1">
                <li class="">
                  <select-survey
                    v-model="showDatalist"
                    :items="[
                      'Scheduling Experience',
                      'Walk-In Experience',
                      'Patient Visit Experience',
                      'Physician Consultation Experience',
                      'Diagnostic Service Experience',
                      'Pharmacy Service Experience',
                      'Hospital Stay Experience',
                      'Billing Support Experience',
                      'Blank Survey',
                    ]"
                  ></select-survey>
                </li>
              </ul>
            </div>
          </span>
        </div>
        <div class="tab-pane" v-if="selected == 2"  :class="{'active' :  selected === 2  }" id="Collection">
            <Collections/>
        </div>
      </div>
      <div
        class="tab-pane"
        v-if="selected == 3"
        :class="{ active: selected === 3 }"
        id="Currency Convention"
      >
        <currency-conversion />
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";
import CornieTable from "@/components/cornie-table/CornieTable.vue";
import CardText from "@/components/cornie-card/CornieCardText.vue";
import CornieDialog from "@/components/CornieDialog.vue";
import Table from "@scelloo/cloudenly-ui/src/components/table";
import ThreeDotIcon from "@/components/icons/threedot.vue";
import SortIcon from "@/components/icons/sort.vue";
import SearchIcon from "@/components/icons/search.vue";
import ShareIcon from "@/components/icons/newshare.vue";
import LinkIcon from "@/components/icons/link.vue";
import ArchiveIcon from "@/components/icons/archive.vue";
import PrintIcon from "@/components/icons/print.vue";
import TableRefreshIcon from "@/components/icons/tablerefresh.vue";
import FilterIcon from "@/components/icons/filter.vue";
import IconInput from "@/components/IconInput.vue";
import ColumnFilter from "@/components/columnfilter.vue";
import TableOptions from "@/components/table-options.vue";
import search from "@/plugins/search";
import { first, getTableKeyValue } from "@/plugins/utils";
import { Prop } from "vue-property-decorator";
import Select from "@/components/formselect.vue";
import SelectSurvey from "@/components/surveyselect.vue";
import DeleteIcon from "@/components/icons/deleteorange.vue";
import EyeIcon from "@/components/icons/yelloweye.vue";
import EditIcon from "@/components/icons/edit.vue";
import CancelIcon from "@/components/icons/cancel.vue";
import TimelineIcon from "@/components/icons/timeline.vue";
import DangerIcon from "@/components/icons/danger.vue";
import NoteIcon from "@/components/icons/notes.vue";
import CheckinIcon from "@/components/icons/checkin.vue";
import UpdateIcon from "@/components/icons/newupdate.vue";
import PlusIcon from "@/components/icons/plus.vue";
import NewviewIcon from "@/components/icons/newview.vue";
import MessageIcon from "@/components/icons/message.vue";
import { namespace } from "vuex-class";
import IPracticeform from "@/types/IPracticeform";
import { cornieClient } from "@/plugins/http";
import ChevronDownIcon from "@/components/icons/chevrondown.vue";
import IPractitioner from "@/types/IPractitioner";
// import StatusModal from "./status.vue";
import Payments from "./payments/index.vue";
import CurrencyConversion from "./conversion/index.vue";
import Collections from "./collections/index.vue";

const practiceform = namespace("practiceform");
const userStore = namespace("user");

@Options({
  components: {
    Table,
    CancelIcon,
    Collections,
    SortIcon,
    CheckinIcon,
    NewviewIcon,
    UpdateIcon,
    ChevronDownIcon,
    TimelineIcon,
    SelectSurvey,
    NoteIcon,
    ShareIcon,
    ThreeDotIcon,
    DangerIcon,
    Select,
    CurrencyConversion,
    PlusIcon,
    SearchIcon,
    Payments,
    //  CloseIcon,
    MessageIcon,
    PrintIcon,
    TableRefreshIcon,
    LinkIcon,
    FilterIcon,
    IconInput,
    ColumnFilter,
    TableOptions,
    ArchiveIcon,
    DeleteIcon,
    EyeIcon,
    EditIcon,
    CornieTable,
    CardText,
    CornieDialog,
  },
})
export default class PracticeformExistingState extends Vue {
  showColumnFilter = false;
  showModal = false;
  loading = false;
  query = "";
  selected = 1;
  showNotes = false;
  showStatusModal = false;
  formId = "";
  surveyId = "";
  updatedBy = "";
  currentStatus = "";
  update = "";

  @practiceform.State
  practiceforms!: IPracticeform[];

  @practiceform.State
  practiceformsQuestionnaries!: IPracticeform[];

  @practiceform.Action
  fetchPracticeforms!: () => Promise<void>;

  @practiceform.Action
  fetchPracticeformsQuestionnaires!: () => Promise<void>;

  @practiceform.Action
  deletePracticeform!: (id: string) => Promise<boolean>;

  @userStore.Getter
  authPractitioner!: IPractitioner;

  getKeyValue = getTableKeyValue;
  preferredHeaders = [];
  rawHeaders = [
    { title: "Date Created", key: "createdAt", show: true },
    {
      title: "Last Modified",
      key: "updatedAt",
      show: true,
    },
    {
      title: "Name | Subject Type",
      key: "subjectType",
      show: true,
    },
    {
      title: "Title",
      key: "name",
      show: true,
    },
    {
      title: "Responses",
      key: "responses",
      show: true,
    },
    {
      title: "Status",
      key: "status",
      show: true,
    },
    {
      title: "Code",
      key: "code",
      show: false,
    },
    {
      title: "Reason Reference",
      key: "reasonReference",
      show: false,
    },
    {
      title: "Period",
      key: "excecutionPeriod",
      show: false,
    },
    {
      title: "Priority",
      key: "priority",
      show: false,
    },
    {
      title: "Description",
      key: "description",
      show: false,
    },
    {
      title: "Note",
      kwy: "note",
      show: false,
    },
    {
      title: "Focus",
      kwy: "focus",
      show: false,
    },
    {
      title: "Encounter",
      kwy: "encounter",
      show: false,
    },
    {
      title: "Repitition",
      kwy: "repitition",
      show: false,
    },
    {
      title: "Input Type",
      kwy: "inputType",
      show: false,
    },
    {
      title: "Input Value",
      kwy: "inputValue",
      show: false,
    },
    {
      title: "Output Type",
      kwy: "outputType",
      show: false,
    },
    {
      title: "Output Value",
      kwy: "outputValue",
      show: false,
    },
  ];

  rawHeaders2 = [
    // { title: "Date Created", key: "createdAt", show: true },
    {
      title: "Identifier",
      key: "id",
      show: true,
    },
    {
      title: "Name",
      key: "code",
      show: true,
    },
    {
      title: "Title",
      key: "name",
      show: true,
    },
    {
      title: "Status",
      key: "status",
      show: true,
    },
    {
      title: "Experimental",
      key: "experimental",
      show: true,
    },

    {
      title: "Subject Type",
      key: "subjectType",
      show: true,
    },
    {
      title: "Type",
      key: "type",
      show: false,
    },
    {
      title: "Purpose",
      key: "purpose",
      show: false,
    },
    {
      title: "Updated At",
      key: "updatedAt",
      show: false,
    },
    {
      title: "Created At",
      key: "createdAt",
      show: false,
    },
  ];

  get empty() {
    return this.practiceformsQuestionnaries.length < 1;
  }
  get empty2() {
    return this.practiceforms.length < 1;
  }
  get headers() {
    const preferred =
      this.preferredHeaders.length > 0
        ? this.preferredHeaders
        : this.rawHeaders;
    const headers = preferred.filter((header) => header.show);
    return [...first(4, headers), { title: "", value: "action", image: true }];
  }

  newexperiment = "";
  get items() {
    const practiceforms = this.practiceforms.map((practiceform) => {
      (practiceform as any).createdAt = new Date(
        (practiceform as any).createdAt
      ).toLocaleDateString("en-US");
      (practiceform as any).updatedAt = new Date(
        (practiceform as any).updatedAt
      ).toLocaleDateString("en-US");
      if (practiceform.experimental == true) {
        this.newexperiment = "Yes";
      } else {
        this.newexperiment = "No";
      }
      this.updatedBy =
        this.authPractitioner.firstName + " " + this.authPractitioner.lastName;
      this.currentStatus = practiceform.status;
      this.update = (practiceform as any).createdAt;
      // const practioner = this.stringifyPractioners(practiceform.createdBy);
      //  const updatedpractioner = this.stringifyUpdatedPractioners(practiceform.updatedBy);
      return {
        ...practiceform,
        //    createdBy: practioner,
        //   updatedBy: updatedpractioner,
        action: practiceform.id,
        experimental: this.newexperiment,
      };
    });
    if (!this.query) return practiceforms;
    return search.searchObjectArray(practiceforms, this.query);
  }
  get items2() {
    const practiceforms = this.practiceformsQuestionnaries.map(
      (practiceform) => {
        (practiceform as any).createdAt = new Date(
          (practiceform as any).createdAt
        ).toLocaleDateString("en-US");
        (practiceform as any).updatedAt = new Date(
          (practiceform as any).updatedAt
        ).toLocaleDateString("en-US");
        if (practiceform.experimental == true) {
          this.newexperiment = "Yes";
        } else {
          this.newexperiment = "No";
        }
        this.updatedBy =
          this.authPractitioner.firstName +
          " " +
          this.authPractitioner.lastName;
        this.currentStatus = practiceform.status;
        this.update = (practiceform as any).createdAt;
        // const practioner = this.stringifyPractioners(practiceform.createdBy);
        //  const updatedpractioner = this.stringifyUpdatedPractioners(practiceform.updatedBy);
        return {
          ...practiceform,
          //    createdBy: practioner,
          //   updatedBy: updatedpractioner,
          action: practiceform.id,
          experimental: this.newexperiment,
        };
      }
    );
    if (!this.query) return practiceforms;
    return search.searchObjectArray(practiceforms, this.query);
  }
  stautsadded() {
    this.fetchPracticeforms();
    this.fetchPracticeformsQuestionnaires();
  }

  select(i: number) {
    this.selected = i;
  }
  async archive(value: string) {
    const url = `/api/v1/practice-form/archive/${value}`;
    try {
      const response = await cornieClient().patch(url, {});
      if (response.success == true) {
        window.notify({ msg: "Practice form Archived", status: "success" });
        this.stautsadded();
      }
    } catch (error) {
      ;
      window.notify({ msg: "Practice form  not Archived", status: "error" });
      this.loading = false;
    }
  }
  async showStatus(value: string) {
    this.showStatusModal = true;
    this.formId = value;
  }
  async deleteItem(id: string) {
    const confirmed = await window.confirmAction({
      message: "You are about to delete this practice form",
      title: "Delete Practice Form",
    });
    if (!confirmed) return;

    if (await this.deletePracticeform(id))
      window.notify({ msg: "Practice form deleted", status: "success" });
    else window.notify({ msg: "Practice form not deleted", status: "error" });
  }

  get History() {
    const history = this.items.filter(
      (c) =>
        new Date(c.endDateTime).toLocaleDateString() <
        new Date().toLocaleDateString()
    );
    return history;
  }
  get Upcoming() {
    const history = this.items.filter(
      (c) =>
        new Date(c.endDateTime).toLocaleDateString() >
        new Date().toLocaleDateString()
    );
    return history;
  }

  async created() {
    this.History;
    this.fetchPracticeformsQuestionnaires();
    this.fetchPracticeforms();
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
