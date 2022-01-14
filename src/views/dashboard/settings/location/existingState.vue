<template>
  <div class="w-full pb-7">
    <span class="flex justify-end w-full mb-3">
      <button
        class="bg-danger rounded-full text-white font-semibold  text-sm mt-5 py-3 px-8 focus:outline-none hover:opacity-90"
        @click="$router.push('add-location')"
      >
        Add New Location
      </button>
    </span>
    <cornie-table :columns="rawHeaders" v-model="sortLocations" :check="false">
      <template #actions="{ item }">
        <div
          class="flex items-center hover:bg-gray-100 p-3 cursor-pointer"
          @click="$router.push(`add-location/${item.id}`)"
        >
          <edit-icon class="text-primary fill-current" />
          <span class="ml-3 text-xs">Edit</span>
        </div>
        <div
          class="flex items-center hover:bg-gray-100 p-3 cursor-pointer"
          @click="deleteLoc(item.id)"
        >
          <delete-icon class="text-danger fill-current" />
          <span class="ml-3 text-xs">Delete</span>
        </div>
      </template>
         <template #name="{ item }">
              <div class="flex space-x-4 items-center">
                <location-icon class="fill-current text-primary"/>
                <span>{{ item.name }} 
                </span>
              </div>
          </template>
          <template #hoursOfOperation="{ item }">
              <div class="items-center">
                <p class="mb-1">{{item.hoursOfOperation}}</p>
                <p class="text-xs text-gray-700">
                   (Mon - Fri)
                </p>
              </div>
          </template>
    </cornie-table>
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

const location = namespace("location");

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
  },
})
export default class LocationExistingState extends Vue {
  showColumnFilter = false;
  query = "";

  @location.State
  locations!: ILocation[];

  @location.Action
  fetchLocations!: () => Promise<void>;

  @location.Action
  deleteLocation!: (id: string) => Promise<boolean>;

  getKeyValue = getTableKeyValue;

  rawHeaders = [
    {
      title: "Location Name",
      key: "name",
      show: true,
    },
    { title: "Address", key: "address", show: true },
    { title: "Alias", key: "alias", show: true },
    {
      title: "Altitude",
      key: "altitude",
      show: true,
    },
    {
      title: "Hours of operation",
      key: "hoursOfOperation",
      show: true,
    },
    {
      title: "Operational Status",
      key: "operationalStatus",
      show: false,
    },
    {
      title: "Alias",
      key: "alias",
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
    const locations = this.locations.map((location) => {
      const opHours = this.stringifyOperationHours(location.hoursOfOperation);
      return {
        ...location,
        action: location.id,
        hoursOfOperation: opHours,
      };
    });
    if (!this.query) return locations;
    return search.searchObjectArray(locations, this.query);
  }

  stringifyOperationHours(opHours: HoursOfOperation[]) {
    const [opHour, ...rest] = opHours;
    if (!opHour) return "All Day";
    return `${opHour.openTime} - ${opHour.closeTime}`;
  }

  async deleteLoc(id: string) {
    const confirmed = await window.confirmAction({
      message: "You are about to delete this location",
    });
    if (!confirmed) return;

    if (await this.deleteLocation(id)) window.notify({ msg: "Location deleted", status: "success" }); 
    else window.notify({ msg: "Location not deleted", status: "error" }); 
  }
  get sortLocations() {
    return this.items.slice().sort(function (a, b) {
      return a.createdAt < b.createdAt ? 1 : -1;
    });
  }
  async created(){
    await this.fetchLocations();
  }
}
</script>
