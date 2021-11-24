<template>
  <div class="w-full pb-7">
    <div class="flex items-center mb-6">
      <span class="flex-grow"></span>
      <button
        class="
          bg-danger
          rounded-full
          text-white
          py-2
          px-6
          focus:outline-none
          hover:opacity-90
        "
        @click="registerNew = true"
      >
        <img src="@/assets/img/plus.svg" class="inline-block mr-2" />
        Add New
      </button>
    </div>

    <cornie-table :columns="rawHeaders" v-model="items" :check="false">
      <template #actions="{ item }">
        <div
          class="flex items-center hover:bg-gray-100 p-3 cursor-pointer"
          @click="updateDesignation(item.id)"
        >
          <edit-icon class="text-yellow-500 fill-current" />
          <span class="ml-3 text-xs">Edit</span>
        </div>
        <div
          class="flex items-center hover:bg-gray-100 p-3 cursor-pointer"
          @click="removeDesignation(item.id)"
        >
          <delete-icon class="text-danger fill-current" />
          <span class="ml-3 text-xs">Delete</span>
        </div>
      </template>
    </cornie-table>
    <side-modal :visible="registerNew" @closesidemodal="closeModal" :header="'New Appointment'">
        <AppointmentModal  @closesidemodal="closeModal"  />
      </side-modal>
  </div>
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
    AppointmentModal,
    SideModal
  },
})
export default class DesignationsExistingState extends Vue {
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
