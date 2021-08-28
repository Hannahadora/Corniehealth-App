<template>
  <div class="w-full pb-7">
    <span class="flex justify-end w-full mb-3">
      <button
        class="
          bg-danger
          rounded-full
          text-white
          mt-5
          py-2
          px-3
          focus:outline-none
          hover:opacity-90
        "
        @click="$router.push('add-location')"
      >
        New Location
      </button>
    </span>
    <cornie-table :columns="rawHeaders" v-model="items" :check="false">
      <template #actions="{ item }">
        <div
          class="flex items-center hover:bg-gray-100 p-3 cursor-pointer"
          @click="$router.push(`add-location/${item.id}`)"
        >
          <eye-icon class="text-yellow-500 fill-current" />
          <span class="ml-3 text-xs">View</span>
        </div>
        <div
          class="flex items-center hover:bg-gray-100 p-3 cursor-pointer"
          @click="deleteLoc(item.id)"
        >
          <delete-icon class="text-yellow-500 fill-current" />
          <span class="ml-3 text-xs">Delete</span>
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
import EyeIcon from "@/components/icons/newview.vue";

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
  deleteLocation!: (id: string) => Promise<boolean>;

  getKeyValue = getTableKeyValue;

  rawHeaders = [
    {
      title: "Location Name",
      key: "name",
      show: true,
    },
    { title: "Address", key: "address", show: true },
    { title: "Country", key: "country", show: true },
    {
      title: "State",
      key: "state",
      show: true,
    },
    {
      title: "Hours of operation",
      key: "hoursOfOperation",
      show: false,
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

    if (await this.deleteLocation(id)) alert("Location deleted");
    else alert("Location not deleted");
  }
}
</script>
