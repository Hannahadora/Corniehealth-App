<template>
  <div class="w-full pb-7">
    <span class="flex justify-end w-full mb-3">
      <button
        class="bg-danger rounded-md text-white font-semibold text-sm mt-5 py-3 px-8 focus:outline-none hover:opacity-90"
      >
       Add Provider
      </button>
    </span>
    <cornie-table
      :columns="rawHeaders"
      v-model="items"
      :check="false"
      :fixeHeight="true"
    >
      <template #actions>
        <div
          class="flex items-center hover:bg-gray-100 p-3 cursor-pointer"
          @click="showViewProvider = true"
        >
          <eye-icon class="text-primary fill-current" />
          <span class="ml-3 text-xs">View</span>
        </div>
        <div
          class="flex items-center hover:bg-gray-100 p-3 cursor-pointer"
        >
          <edit-icon class="text-primary fill-current" />
          <span class="ml-3 text-xs">Edit</span>
        </div>
        <div
          class="flex items-center hover:bg-gray-100 p-3 cursor-pointer"
        >
          <delete-icon class="text-danger fill-current" />
          <span class="ml-3 text-xs">Delete</span>
        </div>
      </template>
      <template #status>
          <span
            class="bg-green-200 text-green-800 text-center rounded-md p-1 bg-opacity-20"
          >
            Active
          </span>
        </template>
      <!-- <template #status="{item}">
          <span
            :class="{
              'bg-green-200 text-green-800': status == 'active',
              ' bg-red-500 text-red-400': status == 'inactive',
            }"
            class="text-center rounded-md p-1 bg-opacity-20"
          >
            {{ status }}
          </span>
        </template> -->
    </cornie-table>
  </div>
  <view-modal v-model="showViewProvider"/>
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
import search from "@/plugins/search";
import { getTableKeyValue } from "@/plugins/utils";
import ILocation, { HoursOfOperation } from "@/types/ILocation";
import { namespace } from "vuex-class";
import TableOptions from "@/components/table-options.vue";
import CornieTable from "@/components/cornie-table/CornieTable.vue";
import DeleteIcon from "@/components/icons/delete.vue";
import LocationIcon from "@/components/icons/location.vue";
import EyeIcon from "@/components/icons/newview.vue";
import EditIcon from "@/components/icons/edit.vue";
import { Watch } from "vue-property-decorator";

import ViewModal from "./viewModal.vue";

const location = namespace("location");
const dropdown = namespace("dropdown");

@Options({
  components: {
    CornieTable,
    SortIcon,
    ThreeDotIcon,
    SearchIcon,
    PrintIcon,
    TableRefreshIcon,
    FilterIcon,
    EditIcon,
    LocationIcon,
    IconInput,
    DeleteIcon,
    EyeIcon,
    ColumnFilter,
    TableOptions,
    ViewModal,
  },
})
export default class ProviderExistingState extends Vue {
  showColumnFilter = false;
  query = "";

  @location.State
  locations!: ILocation[];

  @location.Action
  fetchLocations!: () => Promise<void>;

  @location.Action
  deleteLocation!: (id: string) => Promise<boolean>;

  @dropdown.Action
  getDropdowns!: (a: string) => Promise<IIndexableObject>;

  getKeyValue = getTableKeyValue;

  refreshing = false;
  showViewProvider = false;

  dropdowns = {} as IIndexableObject;

  rawHeaders = [
    {
      title: "NAME",
      key: "name",
      show: true,
    },
    { title: "TYPE", key: "type", show: true },
    { title: "ADDRESS", key: "address", show: true },
    {
      title: "CONTACT NUMBERS",
      key: "contactnumber",
      show: true,
    },
    {
      title: "EMAIL  ADDRESS",
      key: "emailaddress",
      show: false,
    },
    {
      title: "STATUS",
      key: "status",
      show: false,
    }
  ];

   get items() {
    return [{
        ...location,
        name: 'Kessigton Hospital',
        type: 'Hospital/Clinic',
        address: '5. Avenue Road, Surulere ',
        contactnumber: '09083445488',
        emailaddress: 'Info@kessignton.com',
      }];
  }

//   get items() {
//     const locations = this.locations.map((location) => {
//       return {
//         ...location,
//         name: 'Kessigton Hospital',
//         type: 'Hospital/Clinic',
//         address: '5. Avenue Road, Surulere ',
//         contactnumber: '09083445488',
//         emailaddress: 'Info@kessignton.com',
//       };
//     });
//     if (!this.query) return locations;
//     return search.searchObjectArray(locations, this.query);
//   }


  async deleteLoc(id: string) {
    const confirmed = await window.confirmAction({
      message: "You are about to delete this location",
    });
    if (!confirmed) return;

    if (await this.deleteLocation(id))
      window.notify({ msg: "Location deleted", status: "success" });
    else window.notify({ msg: "Location not deleted", status: "error" });
  }
//   get sortLocations() {
//     return this.items.slice().sort(function (a, b) {
//       return a.createdAt < b.createdAt ? 1 : -1;
//     });
//   }


  async created() {

  }
}
</script>
