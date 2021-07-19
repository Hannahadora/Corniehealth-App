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
          <table-options>
            <table-option @click="updateDevice(item.data.id)">
              <eye-icon class="mr-3 mt-1" />
              View & Edit
            </table-option>
            <table-option @click="removeDevice(item.data.id)">
              <delete-icon class="mr-3" />
              Delete Device
            </table-option>
          </table-options>
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
import SortIcon from "@/components/icons/sort.vue";
import SearchIcon from "@/components/icons/search.vue";
import PrintIcon from "@/components/icons/print.vue";
import TableRefreshIcon from "@/components/icons/tablerefresh.vue";
import FilterIcon from "@/components/icons/filter.vue";
import IconInput from "@/components/IconInput.vue";
import ColumnFilter from "@/components/columnfilter.vue";
import { Prop } from "vue-property-decorator";
import IDevice from "@/types/IDevice";
import search from "@/plugins/search";
import { first, flatten } from "@/plugins/utils";
import TableOptions from "@/components/table-options.vue";
import TableOption from "@/components/table-option.vue";
import DeleteIcon from "@/components/icons/delete.vue";
import EyeIcon from "@/components/icons/eye.vue";
import { namespace } from "vuex-class";

const device = namespace("device");
@Options({
  components: {
    Table,
    SortIcon,
    TableOptions,
    SearchIcon,
    PrintIcon,
    TableRefreshIcon,
    FilterIcon,
    IconInput,
    EyeIcon,
    DeleteIcon,
    ColumnFilter,
    TableOption,
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

  @device.Action
  deleteDevice!: (id: string) => Promise<boolean>;

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

  updateDevice(id: string) {
    const device = this.devices.find((d) => d.id == id);
    this.$emit("update-device", device);
  }

  async removeDevice(id: string) {
    const confirmed = await window.confirmAction({
      title: "You are about to delete this device",
      message: "Are you sure?",
    });
    if (!confirmed) return;
    const deleted = await this.deleteDevice(id);
    if (deleted) {
      window.notify({ msg: "Device Deleted", status: "success" });
    } else {
      window.notify({ msg: "Device not deleted", status: "error" });
    }
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
