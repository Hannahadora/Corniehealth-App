<template>
  <div>
    <div
      class="w-full h-2/3 mt-12 flex flex-col justify-center items-center"
      v-if="empty"
    >
      <img src="@/assets/type.svg" class="mb-2" />
      <h4 class="text-black text-center">
        There are no appointment types on record.
      </h4>
      <cornie-btn
        class="bg-danger px-3 rounded-full text-white m-5"
        @click="registerNew = true"
      >
        Add New
      </cornie-btn>
    </div>
    <div class="w-full pb-7" v-else>
      <div class="flex justify-end items-center mb-6">
        <cornie-btn
          class="bg-danger px-3 rounded-full text-white m-5"
          @click="registerNew = true"
        >
          Add New
        </cornie-btn>
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
    </div>
  </div>
  <appointment-modal v-model="registerNew" @type-added="typeadded" @closesidemodal="closeModal" />
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
import search from "@/plugins/search";
import { namespace } from "vuex-class";
import TableOptions from "@/components/table-options.vue";
import DeleteIcon from "@/components/icons/delete.vue";
import EditIcon from "@/components/icons/edit.vue";
import { IDesignation } from "@/types/IDesignation";
import { Prop } from "vue-property-decorator";
import IAppointmentTypes from "@/types/IAppointmentTypes";
import { first, getTableKeyValue } from "@/plugins/utils";

const designation = namespace("designation");
const appointmentType = namespace("appointmentType");

@Options({
  name: "AppoitmentTypesExistingState",
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
    SideModal,
  },
})
export default class AppointmentTypes extends Vue {
  @Prop({ type: Array, required: true })
  designations!: IDesignation[];

  registerNew = false;
  query = "";

  @appointmentType.State
  appointmentTypes!: IAppointmentTypes[];

  @appointmentType.Action
  fetchappointmentTypes!: () => Promise<void>;

  // appointmentId ="";
  rawHeaders = [
    {
      title: "service name",
      key: "service",
      show: true,
    },
    {
      title: "Duration",
      key: "duration",
      show: true,
    },
    {
      title: "Link forms",
      key: "forms",
      show: true,
    },
    {
      title: "Practitioners",
      key: "practitioners",
      show: true,
    },
    {
      title: "Booking site links",
      key: "booking",
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
  get empty() {
    return this.appointmentTypes.length < 1;
  }
 async typeadded(){
   this.fetchappointmentTypes;
 }
  get items() {
    const appointmentTypes = this.appointmentTypes.map((appointmentType) => {
      (appointmentType as any).createdAt = new Date(
        (appointmentType as any).createdAt
      ).toLocaleDateString("en-US");
      return {
        ...appointmentType,
        action: appointmentType.id,
        keydisplay: "XXXXXXX",
        service: "-----",
        duration: "-----",
        forms: "-----",
        practitioners: "-----",
        booking: "-----",
        status: "Active",
      };
    });
    if (!this.query) return appointmentTypes;
    return search.searchObjectArray(appointmentTypes, this.query);
  }
  // get items() {
  //   return this.designations.map((designation) => ({
  //     ...designation,
  //     jobLevel: designation?.level?.name || "N/A",
  //     jobFunction: designation?.orgFunction?.name,
  //     supervisor: designation.reportsTo?.name || "N/A",
  //   }));
  // }

  created() {
    this.fetchappointmentTypes();
    
  }
}
</script>
