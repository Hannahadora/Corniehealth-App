<template>
  <div class="w-full pb-7">
    <span class="flex justify-end w-full mb-3">
      <button
        class="bg-danger rounded-md text-white font-semibold text-sm mt-5 py-3 px-8 focus:outline-none hover:opacity-90"
        @click="$router.push('add-locations')"
      >
        Add New Sub-Location
      </button>
    </span>
    <cornie-table
      v-model:refreshing="refreshing"
      :columns="rawHeaders"
      v-model="sortLocations"
      :check="false"
      :fixeHeight="true"
    >
      <template #actions="{ item }">
        <div
          class="flex items-center hover:bg-gray-100 p-3 cursor-pointer"
          @click="
            $router.push(
              `/dashboard/provider/practice/location/${item.id}/add-locations`
            )
          "
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
        <div
          class="flex items-center hover:bg-gray-100 p-3 cursor-pointer"
          @click="
            $router.push(
              `/dashboard/provider/practice/location/${item.id}/sub-locations`
            )
          "
        >
          <eye-icon class="text-yellow-400 fill-current" />
          <span class="ml-3 text-xs">Sub locations</span>
        </div>
      </template>
      <template #name="{ item }">
        <div class="flex space-x-4 items-center">
          <location-icon class="fill-current text-primary" />
          <span>{{ item.name }} </span>
        </div>
      </template>
      <template #hoursOfOperation="{ item }">
        <div class="items-center">
          <p class="mb-1">{{ item.hoursOfOperation }}</p>
          <p class="text-xs text-gray-700">(Mon - Fri)</p>
        </div>
      </template>
    </cornie-table>
  </div>
</template>
<script lang="ts">
  import ColumnFilter from "@/components/columnfilter.vue";
  import CornieTable from "@/components/cornie-table/CornieTable.vue";
  import IconInput from "@/components/IconInput.vue";
  import AddIcon from "@/components/icons/add.vue";
  import DeleteIcon from "@/components/icons/delete.vue";
  import EditIcon from "@/components/icons/edit.vue";
  import FilterIcon from "@/components/icons/filter.vue";
  import LocationIcon from "@/components/icons/location.vue";
  import EyeIcon from "@/components/icons/newview.vue";
  import PrintIcon from "@/components/icons/print.vue";
  import SearchIcon from "@/components/icons/search.vue";
  import SortIcon from "@/components/icons/sort.vue";
  import TableRefreshIcon from "@/components/icons/tablerefresh.vue";
  import ThreeDotIcon from "@/components/icons/threedot.vue";
  import TableOptions from "@/components/table-options.vue";
  import search from "@/plugins/search";
  import { getTableKeyValue } from "@/plugins/utils";
  import ILocation, { HoursOfOperation } from "@/types/ILocation";
  import { Options, Vue } from "vue-class-component";
  import { Watch } from "vue-property-decorator";
  import { namespace } from "vuex-class";

  const location = namespace("sublocation");
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
      AddIcon,
    },
  })
  export default class LocationExistingState extends Vue {
    showColumnFilter = false;
    query = "";

    @location.State
    locations!: ILocation[];

    @location.Action
    fetchLocations!: (id: string) => Promise<void>;

    @location.Action
    deleteLocation!: (id: string) => Promise<boolean>;

    @dropdown.Action
    getDropdowns!: (a: string) => Promise<IIndexableObject>;

    getKeyValue = getTableKeyValue;

    refreshing = false;

    dropdowns = {} as IIndexableObject;

    rawHeaders = [
      {
        title: "Location Name",
        key: "name",
        show: true,
      },
      { title: "Address", key: "address", show: true },
      { title: "Alias", key: "alias", show: true },
      // {
      //   title: "Altitude",
      //   key: "altitude",
      //   show: false,
      // },
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
        let operationalStatus = this.dropdowns.operationalStatus?.find(
          (item: any) => item.code === location.operationalStatus
        );
        return {
          ...location,
          action: location.id,
          hoursOfOperation: opHours,
          operationalStatus: operationalStatus?.display,
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

      if (await this.deleteLocation(id))
        window.notify({ msg: "Location deleted", status: "success" });
      else window.notify({ msg: "Location not deleted", status: "error" });
    }
    get sortLocations() {
      return this.items.slice().sort(function (a, b) {
        return a.createdAt < b.createdAt ? 1 : -1;
      });
    }

    @Watch("refreshing")
    async refresh(val: boolean) {
      if (!val) return;
      await this.fetchLocations(this.$route.params.id.toString());
      this.refreshing = false;
    }

    async created() {
      const data = await this.getDropdowns("location");
      await this.fetchLocations(this.$route.params.id.toString());

      let op = data.operationalStatus.filter((item: any) => item.code !== "U");
      let operationalStatus = [{ code: "U", display: "Opened" }, ...op];

      this.dropdowns = {
        mode: data.mode,
        physicalType: data.physicalType,
        type: data.type,
        operationalStatus,
      };
    }
  }
</script>
