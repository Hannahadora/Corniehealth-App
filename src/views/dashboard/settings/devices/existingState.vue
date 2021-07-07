<template>
  <div class="w-full mx-5">
    <span
      class="
        flex
        border-b-2
        w-full
        font-semibold
        text-xl text-primary
        py-2
        mx-auto
      "
    >
      Devices
    </span>
    <span class="flex justify-end">
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
        @click="$emit('add-device')"
      >
        Add a New Device
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
            @click="updateDevice(item.data.id)"
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
import { Prop } from "vue-property-decorator";
import IDevice from "@/types/IDevice";
import { flatten } from "@/plugins/flatten";
import search from "@/plugins/search";

const first = (num: number, vals: any[]) => {
  const res = [];
  for (let index = 0; index < vals.length; index++) {
    const element = vals[index];
    res.push(element);
  }
  return res;
};

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
export default class DeviceExistingState extends Vue {
  @Prop({ type: Array, default: [] })
  devices!: IDevice[];

  query = "";
  preferredHeaders = [];
  rawHeaders = [
    {
      title: "Identifier",
      value: "id",
      show: true,
    },
    { title: "Device Type", value: "name", show: true },
    { title: "Manufacture Date", value: "manufacturerDate", show: true },
    {
      title: "Expiration Date",
      value: "expirationDate",
      filter: true,
      show: true,
    },
    {
      title: "Name Type",
      value: "nameType",
      show: false,
    },
    {
      title: "Status",
      value: "status",
      show: false,
    },
    {
      title: "Status Reason",
      value: "statusReason",
      show: false,
    },
    {
      title: "System Type",
      value: "systemType",
      show: false,
    },
    {
      title: "Issuer",
      value: "issuer",
      show: false,
    },
    {
      title: "Jurisdiction",
      value: "id",
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
    const devices = this.devices.map((device) => {
      const flattened = flatten(device);
      if (flattened.manufacturerDate) {
        flattened.manufacturerDate = new Date(
          flattened.manufacturerDate
        ).toLocaleDateString("en-US");
      }
      if (flattened.expirationDate) {
        flattened.expirationDate = new Date(
          flattened.expirationDate
        ).toLocaleDateString("en-US");
      }
      flattened.action = flattened.id;
      return flattened;
    });
    if (!this.query) return devices;
    return search.searchObjectArray(devices, this.query);
  }

  showColumnFilter = false;
  columns = [
    { selected: false, name: "Car" },
    { selected: false, name: "Bus" },
  ];

  updateDevice(id: string) {
    const device = this.devices.find((d) => d.id == id);
    this.$emit("update-device", device);
  }
  getKeyValue(item: any) {
    const { data, index, ...rest } = item;
    const key = Object.values(rest)[0] as string;
    const value = data[key];
    return {
      key,
      value,
      index,
    };
  }
}
</script>
<style>
table thead th {
  background: #0a4269 !important;

  color: white !important;
}
table thead th:first-child {
  border-top-left-radius: 0.4rem 0.4rem !important;
}
table thead th:last-child {
  border-top-right-radius: 0.4rem 0.4rem !important;
}
table thead tr th {
  padding-top: 1rem !important;
  padding-bottom: 1rem !important;
}

table tbody td {
  padding-top: 1.5rem !important;
  padding-bottom: 1.5rem !important;
}
table tbody tr {
  border: 1px solid #b8c3de;
}
table tbody tr:nth-child(even) {
  background-color: white !important;
}
</style>
