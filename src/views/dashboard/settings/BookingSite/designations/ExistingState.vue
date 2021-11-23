<template>
<tabs :items="tabLinks" v-model="currentTab"> 
        <designations-3 />
        <designations />
      </tabs>

</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";
import Table from "@scelloo/cloudenly-ui/src/components/table";
import ThreeDotIcon from "@/components/icons/threedot.vue";
import SortIcon from "@/components/icons/sort.vue";
import SearchIcon from "@/components/icons/search.vue";
import PrintIcon from "@/components/icons/print.vue";
import TableRefreshIcon from "@/components/icons/tablerefresh.vue";
import FilterIcon from "@/components/icons/filter.vue";
import IconInput from "@/components/IconInput.vue";
import ColumnFilter from "@/components/columnfilter.vue";
import CornieTable from "@/components/cornie-table/CornieTable.vue";
import AppointmentModal from "./Appointmentdialog.vue";
import SideModal from "@/views/dashboard/schedules/components/side-modal.vue";

import { namespace } from "vuex-class";
import TableOptions from "@/components/table-options.vue";
import DeleteIcon from "@/components/icons/delete.vue";
import EditIcon from "@/components/icons/edit.vue";
import { IDesignation } from "@/types/IDesignation";
import { Prop } from "vue-property-decorator";

import Tabs from "../tabs.vue";
import Functions from "../appointmentrooms/Functions.vue";
import Designations from "../designations2/Designations.vue";
import Designations3 from "../designations3/Designations.vue";

import JobLevel from "../joblevel/JobLevel.vue";
import AddLocation from "../addLocation.vue";

const designation = namespace("designation");

@Options({
  name: "DesignationsExistingState",
  components: {
    Table,
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
    Designations3,
    JobLevel,
    AddLocation
  },
})
export default class DesignationsExistingState extends Vue {
  tabLinks = ["InApp", "Email Notification"];
  currentTab = 0;

  @Prop({ type: Array, required: true })
  designations!: IDesignation[];
  registerNew=false;

  // appointmentId ="";
  rawHeaders = [
    {
      title: "Appointment Type",
      key: "appointment type",
      show: true,
    },
    {
      title: "Duration",
      key: "duration",
      show: true,
    },
    {
      title: "Link forms",
      key: "link forms",
      show: true,
    },
    {
      title: "Practioners",
      key: "practioners",
      show: true,
    },
    {
      title: "Booking site links",
      key: "booking site links",
      show: true,
    },
    {
      title: "Status",
      key: "status",
      show: true,
    },
  ];

  @designation.Action
  deleteDesignation!: (id: string) => Promise<void>;

   closeModal() {
    this.registerNew = false;
    // this.selectedTeamId = "";
  }
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
