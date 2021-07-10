<template>
  <div class="w-full">
    <span class="flex justify-end w-full">
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
        @click="$emit('add-location')"
      >
        New Location
      </button>
    </span>
    <div class="flex w-full justify-between mt-5 items-center">
      <span class="flex items-center">
        <sort-icon class="mr-5" />
        <icon-input
          class="border border-gray-600 rounded-full focus:outline-none"
          type="search"
          v-model="query"
        >
          <template v-slot:prepend>
            <search-icon />
          </template>
        </icon-input>
      </span>
      <span class="flex justify-between items-center">
        <print-icon class="mr-7" />
        <table-refresh-icon class="mr-7" />
        <filter-icon class="cursor-pointer" @click="showColumnFilter = true" />
      </span>
    </div>
    <Table :headers="headers" :items="items" class="tableu rounded-xl mt-5">
      <template v-slot:item="{ item }">
        <span v-if="getKeyValue(item).key == 'action'">
          <three-dot-icon
            class="cursor-pointer"
            @click="updateLocation(item.data.id)"
          />
        </span>
        <span v-else> {{ getKeyValue(item).value }} </span>
      </template>
    </Table>
    <column-filter
      :columns="rawHeaders"
      v-model:preferred="preferredHeaders"
      v-model:visible="showColumnFilter"
    />
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
import search from "@/plugins/search";
import { first, getTableKeyValue } from "@/plugins/utils";
import { Prop } from "vue-property-decorator";
import ILocation, { HoursOfOperation } from "@/types/ILocation";

@Options({
  components: {
    Table,
    SortIcon,
    ThreeDotIcon,
    SearchIcon,
    PrintIcon,
    TableRefreshIcon,
    FilterIcon,
    IconInput,
    ColumnFilter,
  },
})
export default class LocationExistingState extends Vue {
  showColumnFilter = false;
  query = "";

  @Prop({ type: Array, default: [] })
  locations!: ILocation[];

  getKeyValue = getTableKeyValue;
  preferredHeaders = [];
  rawHeaders = [
    {
      title: "Location Name",
      value: "name",
      show: true,
    },
    { title: "Address", value: "address", show: true },
    { title: "Country", value: "country", show: true },
    {
      title: "State",
      value: "state",
      show: true,
    },
    {
      title: "Hours of operation",
      value: "hoursOfOperation",
      show: false,
    },
    {
      title: "Operational Status",
      value: "operationalStatus",
      show: false,
    },
    {
      title: "Alias",
      value: "alias",
      show: false,
    },
    {
      title: "Description",
      value: "description",
      show: false,
    },
    {
      title: "Physical Type",
      value: "physicalType",
      show: false,
    },
  ];

  get headers() {
    const preferred =
      this.preferredHeaders.length > 0
        ? this.preferredHeaders
        : this.rawHeaders;
    const headers = preferred.filter((header) => header.show);
    return [...first(4, headers), { title: "", value: "action", image: true }];
  }

  get items() {
    const locations = this.locations.map((location) => {
      const opHours = this.stringifyOperationHours(location.hoursOfOperation);
      return {
        ...location,
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
  updateLocation(id: string) {
    const location = this.locations.find((l) => l.id == id);
    this.$emit("update-location", location);
  }
}
</script>
