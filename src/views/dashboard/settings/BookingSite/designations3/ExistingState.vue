<template>
  <div class="w-full pb-7">
    <div class="flex items-center mb-6">
      <span class="flex-grow"></span>
      <button
        class="bg-danger rounded-full text-white py-2 px-6 focus:outline-none hover:opacity-90"
        @click="$router.push({ name: 'New Designation' })"
      >
        <img src="@/assets/img/plus.svg" class="inline-block mr-2" />
        New Designation
      </button>
    </div>
    <div class="w-1/2">
      <div class="flex justify-between">
        <newview-icon class="text-primary-500 fill-current" />
        <!-- <edit-icon class="text-primary fill-current ml-8 mr-2" /> -->
        <div class="flex justify-between text-xs">
          <refer-icon
            class="text-primary text-xs bg-primary fill-current mr-2"
          />
          Reset <edit-icon class="text-primary fill-current ml-8 mr-2" /> Edit
        </div>
      </div>

      <div class="my-4 bg-gray-100 px-4 py-4 rounded-md text-base">
        <div class="flex mt-4">
          <div class="flex">
            <file-icon class="cursor-pointer" />
            <span>
              <span class="text-base"> Dear patient, </span>
              <br />
              <span class="text-xs text-gray-400">
                You have an appointment with (Dr. Physicians name) on (Day),
                (Date & Time). Kindly confirm availability

                <ul>
                  <li class="text-xs text-gray-400">Appointment Type</li>
                  <li class="text-xs text-gray-400">Physician's Name</li>
                </ul>
                Kindly confirm availability, Best wishes, Management
              </span>
            </span>
          </div>

          <div class="flex">
            <file-icon class="cursor-pointer" />
            <span>
              <!-- <span class="text-base"> NAPS Profile Request </span>
              <br />
              <span class="text-xs text-gray-400">
                Addressed to your account officer
              </span> -->
            </span>
          </div>
        </div>
        <div class="mt-2 flex justify-end">
          <button
            class="rounded-full text-black ml-2 px-5 mx-3 focus:outline-none hover:bg-primary hover:text-white"
          >
            Cancel
          </button>
          <button
            class="bg-primary rounded-full text-white py-1 px-5 focus:outline-none hover:opacity-90"
          >
            <img src="@/assets/img/plus.svg" class="inline-block mr-2" />
            Confirm
          </button>
        </div>
      </div>
      <div class="mt-2 flex justify-end">
        <button
          class="bg-danger rounded-full text-white py-1 px-5 focus:outline-none hover:opacity-90"
        >
          <!-- <img src="@/assets/img/plus.svg" class="inline-block mr-2" /> -->
          Save
        </button>
      </div>
    </div>
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
import IconInput from "@/components/IconInput.vue";
import ColumnFilter from "@/components/columnfilter.vue";
import CornieTable from "@/components/cornie-table/CornieTable.vue";

import { namespace } from "vuex-class";
import TableOptions from "@/components/table-options.vue";
import DeleteIcon from "@/components/icons/delete.vue";
import EditIcon from "@/components/icons/edit.vue";
import { IDesignation } from "@/types/IDesignation";
import { Prop } from "vue-property-decorator";

import Tabs from "../tabs.vue";
import Functions from "../appointmentrooms/Functions.vue";
import Designations from "../designations/Designations.vue";
import JobLevel from "../joblevel/JobLevel.vue";
import AddLocation from "../addLocation.vue";
import NewviewIcon from "@/components/icons/newview.vue";
import ReferIcon from "@/components/icons/refer.vue";

const designation = namespace("designation");

@Options({
  name: "DesignationsExistingState",
  components: {
    SortIcon,
    ThreeDotIcon,
    CornieTable,
    SearchIcon,
    PrintIcon,
    TableRefreshIcon,
    FilterIcon,
    IconInput,
    DeleteIcon,
    EditIcon,
    ColumnFilter,
    TableOptions,

    Tabs,
    Functions,
    Designations,
    JobLevel,
    AddLocation,
    NewviewIcon,
    ReferIcon,
  },
})
export default class DesignationsExistingState extends Vue {
  tabLinks = ["InApp", "Email Notification"];
  currentTab = 0;

  @Prop({ type: Array, required: true })
  designations!: IDesignation[];

  rawHeaders = [
    {
      title: "Title",
      key: "name",
      show: true,
    },
    {
      title: "Job Level",
      key: "jobLevel",
      show: true,
    },
    {
      title: "Function",
      key: "jobFunction",
      show: true,
    },
    {
      title: "Reporting To",
      key: "supervisor",
      show: true,
    },
  ];

  @designation.Action
  deleteDesignation!: (id: string) => Promise<void>;

  get items() {
    return this.designations.map((designation) => ({
      ...designation,
      jobLevel: designation?.level?.name || "N/A",
      jobFunction: designation?.orgFunction?.name,
      supervisor: designation.reportsTo?.name || "N/A",
    }));
  }

  removeDesignation(id: string) {
    this.deleteDesignation(id);
  }

  updateDesignation(id: string) {
    this.$router.push({ name: "New Designation", params: { id } });
  }
}
</script>
