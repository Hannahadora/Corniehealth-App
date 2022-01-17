<template>
  <div class="w-full pb-7">
    <span class="flex justify-end w-full">
      <button
        class="bg-danger rounded-full text-white mt-5 mb-5 py-3 px-5 text-sm font-semibold focus:outline-none hover:opacity-90"
        @click="$router.push('add-practitioner')"
      >
        Add a Practitioner
      </button>
    </span>
    <cornie-table :columns="rawHeaders" v-model="items" :check="false">
      <template #actions="{ item }">
        <div
          class="flex items-center hover:bg-gray-100 p-3 cursor-pointer"
          @click="$router.push(`add-practitioner/${item.id}`)"
        >
          <edit-icon class="text-primary fill-current" />
          <span class="ml-3 text-xs">Edit</span>
        </div>
        <div
          class="flex items-center hover:bg-gray-100 p-3 cursor-pointer"
          @click="showModal(item.id)"
        >
           <update-icon class="text-yellow-500 fill-current" />
          <span class="ml-3 text-xs">Update Location</span>
        </div>
        <div
          class="flex items-center hover:bg-gray-100 p-3 cursor-pointer"
          @click="remove(item.id)"
        >
          <delete-icon class="text-danger fill-current" />
          <span class="ml-3 text-xs">Delete</span>
        </div>
      </template>
    </cornie-table>
  </div>
  <location-modal v-model="showLocationModal" @location-update="updateLocation" :id="locationId"/>
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";
import CornieTable from "@/components/cornie-table/CornieTable.vue";
import ThreeDotIcon from "@/components/icons/threedot.vue";
import SortIcon from "@/components/icons/sort.vue";
import SearchIcon from "@/components/icons/search.vue";
import PrintIcon from "@/components/icons/print.vue";
import TableRefreshIcon from "@/components/icons/tablerefresh.vue";
import FilterIcon from "@/components/icons/filter.vue";
import IconInput from "@/components/IconInput.vue";
import ColumnFilter from "@/components/columnfilter.vue";
import search from "@/plugins/search";
import IPractitioner, { HoursOfOperation } from "@/types/IPractitioner";
import { namespace } from "vuex-class";
import TableOptions from "@/components/table-options.vue";
import DeleteIcon from "@/components/icons/delete.vue";
import EyeIcon from "@/components/icons/newview.vue";
import EditIcon from "@/components/icons/edit.vue";
import LocationModal from './locationModal.vue';
import UpdateIcon from "@/components/icons/newupdate.vue";

const practitioner = namespace("practitioner");

@Options({
  components: {
    CornieTable,
    SortIcon,
    ThreeDotIcon,
    SearchIcon,
    PrintIcon,
    TableRefreshIcon,
    FilterIcon,
    IconInput,
    DeleteIcon,
    EyeIcon,
    ColumnFilter,
    TableOptions,
    EditIcon,
    LocationModal,
    UpdateIcon
  },
})
export default class PractitionerExistingState extends Vue {
  showColumnFilter = false;
  query = "";
  showLocationModal= false;
  locationId="";

  @practitioner.State
  practitioners!: IPractitioner[];

  @practitioner.Action
  deletePractitioner!: (id: string) => Promise<boolean>;

  @practitioner.Action
  fetchPractitioners!: () => Promise<void>;

  rawHeaders = [
    {
      title: "IDENTIFIER",
      key: "id",
      show:true
    },
    {
      title: "Name",
      key: "name",
      show: true,
    },
    { title: "Department", key: "department", show: true },
    { title: "Job Designation", key: "jobDesignation", show: true },
    {
      title: "Status",
      key: "activeState",
      show: true,
    },
    {
      title: "Code",
      key: "qualificationIssuer",
      show: false,
    },
    {
      title: "Address",
      key: "address",
      show: false,
    },
    {
      title: "Access Role",
      key: "accessRole",
      show: false,
    },
    {
      title: "Gender",
      key: "gender",
      show: false,
    },
    {
      title: "Description",
      key: "description",
      show: false,
    },
    {
      title: "Physical Type",
      key: "physicalType",
      show: false,
    },
  ];

  get items() {
    const practitioners = this.practitioners.map((practitioner) => {
      const opHours = this.stringifyOperationHours(
        practitioner.hoursOfOperation
      );
      return {
        ...practitioner,
        action: practitioner.id,
        hoursOfOperation: opHours,
        name: `${practitioner.firstName} ${practitioner.lastName}`,
      };
    });
    if (!this.query) return practitioners;
    return search.searchObjectArray(practitioners, this.query);
  }

  stringifyOperationHours(opHours: HoursOfOperation[]) {
    const [opHour, ...rest] = opHours;
    if (!opHour) return "All Day";
    return `${opHour.openTime} - ${opHour.closeTime}`;
  }

  async remove(id: string) {
    const confirmed = await window.confirmAction({
      message: "You are about to delete this practitioner",
    });
    if (!confirmed) return;
    if (await this.deletePractitioner(id))
      window.notify({ msg: "Practitioner deleted", status: "success" });
    else window.notify({ msg: "Practitioner not deleted", status: "error" });
  }
  async updateLocation(){
    await this.fetchPractitioners();
  }

  showModal(value:string){
    this.showLocationModal = true;
    this.locationId = value;
  }
}
</script>
