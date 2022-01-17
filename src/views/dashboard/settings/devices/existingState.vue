<template>
  <div class="w-full mx-5">
    <span
      class="flex border-b-2 w-full font-semibold text-lg text-primary py-2 mx-auto"
    >
      Devices
    </span>
    <span class="flex justify-end">
      <button
        class="bg-danger rounded-full text-white font-semibold text-sm mt-5 py-2 px-5 focus:outline-none hover:opacity-90"
        @click="$emit('add-device')"
      >
        Add a New Device
      </button>
    </span>
    <cornie-table :columns="rawHeaders" v-model="items" :check="false">
      <template #actions="{ item }">
        <div
          class="flex items-center hover:bg-gray-100 p-3 cursor-pointer"
          @click="updateDevice(item.id)"
        >
          <eye-icon class="text-yellow-500 fill-current" />
          <span class="ml-3 text-xs">View</span>
        </div>
        <div
          class="flex items-center hover:bg-gray-100 p-3 cursor-pointer"
          @click="removeDevice(item.id)"
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
import CornieTable from "@/components/cornie-table/CornieTable.vue";
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
    CornieTable,
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

  rawHeaders = [
    {
      title: "Identifier",
      key: "id",
      show: true,
    },
    { title: "Device Type", key: "name", show: true },
    { title: "Manufacture Date", key: "manufacturerDate", show: true },
    {
      title: "Expiration Date",
      key: "expirationDate",
      filter: true,
      show: true,
    },
    {
      title: "Name Type",
      key: "nameType",
      show: false,
    },
    {
      title: "Status",
      key: "status",
      show: false,
    },
    {
      title: "Status Reason",
      key: "statusReason",
      show: false,
    },
    {
      title: "System Type",
      key: "systemType",
      show: false,
    },
    {
      title: "Issuer",
      key: "issuer",
      show: false,
    },
    {
      title: "Jurisdiction",
      key: "id",
      show: false,
    },
  ];

  @device.Action
  deleteDevice!: (id: string) => Promise<boolean>;

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
    return devices;
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
}
</script>
