<template>
  <update-status-dialog title="CHANGE STATUS" v-model="updateStatusDiag">
    <form class="mt-5 w-full" @submit.prevent="updateDeviceStatus">
      <div class="col-span-12 mb-4">
        <cornie-select
          :rules="required"
          :items="dropdownData.status"
          label="STATUS"
          v-model="status"
        >
        </cornie-select>
      </div>
      <span class="flex justify-end w-full">
        <button
          @click="updateStatusDiag = false"
          type="button"
          class="outline-primary rounded-md text-black mt-5 mr-3 py-2 pr-8 pl-8 px-3 focus:outline-none hover:bg-primary hover:text-white"
        >
          Cancel
        </button>

        <cornie-btn
          :loading="loading"
          type="submit"
          class="bg-danger rounded-md text-white mt-5 pr-10 pl-10 focus:outline-none hover:opacity-90"
        >
          Update
        </cornie-btn>
      </span>
    </form>
  </update-status-dialog>
  <div class="w-full mx-5">
    <span
      class="flex border-b-2 w-full font-semibold text-xl text-primary py-2 mx-auto"
    >
      Devices
    </span>
    <span class="flex justify-end">
      <button
        class="bg-danger rounded-md text-white mt-5 py-2 px-3 focus:outline-none hover:opacity-90"
        @click="$router.push('update-add-device')"
      >
        Add a New Device
      </button>
    </span>
    <cornie-table :columns="rawHeaders" v-model="items" :check="false">
      <template #actions="{ item }">
        <div
          class="flex items-center hover:bg-gray-100 p-3 cursor-pointer"
          @click="$router.push(`update-add-device/${item.id}`)"
        >
          <edit-view-icon />
          <span class="ml-3 text-xs">Edit & View</span>
        </div>
        <div
          class="flex items-center hover:bg-gray-100 p-3 cursor-pointer"
          @click="handleUpdateStatus(item.id)"
        >
          <update-status-icon />
          <span class="ml-3 text-xs">Update Status</span>
        </div>
        <div
          class="flex items-center hover:bg-gray-100 p-3 cursor-pointer"
          @click="removeDevice(item.id)"
        >
          <delete-icon class="text-red-500 fill-current" />
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
import EditViewIcon from "@/components/icons/edit-view.vue";
import UpdateStatusIcon from "@/components/icons/update-status.vue";
import UpdateStatusDialog from "@/components/update-status-dialog.vue";
import CornieSelect from "@/components/cornieselect.vue";
import { cornieClient } from "@/plugins/http";
import { namespace } from "vuex-class";
const dropdown = namespace("dropdown");

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
    EditViewIcon,
    UpdateStatusIcon,
    DeleteIcon,
    ColumnFilter,
    TableOption,
    UpdateStatusDialog,
    CornieSelect,
  },
})
export default class DeviceExistingState extends Vue {
  @dropdown.Action
  getDropdowns!: (key: string) => Promise<IIndexableObject>;

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
  updateStatusDiag = false as boolean;
  deviceId = "";
  required = true;
  loading = false;
  status = "";
  dropdownData = {} as IIndexableObject;

  handleUpdateStatus(id: string) {
    // const devices = this.devices.find((d) => d.id == id);
    this.deviceId = id;
    let device: any = { ...this.devices.find((device) => device.id == id) };
    this.status = device.udiCarrier.status || "";
    this.updateStatusDiag = true;
  }

  async updateDeviceStatus() {
    if (!this.deviceId && !this.status) {
      window.notify({ msg: "Please select a status", status: "error" });
      return;
    }

    try {
      let device: any = {
        ...this.devices.find((device) => device.id == this.deviceId),
      };
      device.udiCarrier.status = this.status;

      const response = await cornieClient().put(
        `/api/v1/devices/${this.deviceId}`,
        device
      );

      if (response.success) {
        window.notify({
          msg: "Device status was updated",
          status: "success",
        });
      }
    } catch (error) {
      window.notify({
        msg: "Device status was not updated",
        status: "error",
      });
    }

    this.updateStatusDiag = false;
  }

  async removeDevice(id: string) {
    const confirmed = await window.confirmAction({
      title: "Delete Device",
      message:
        "Are you sure you want to delete this device? This action cannot be undone.",
    });
    if (!confirmed) return;
    const deleted = await this.deleteDevice(id);
    if (deleted) {
      window.notify({ msg: "Device Deleted", status: "success" });
    } else {
      window.notify({ msg: "Device not deleted", status: "error" });
    }
  }

  async created() {
    this.dropdownData = await this.getDropdowns("device");
  }
}
</script>
