<template>
  <div class="h-screen flex justify-center">
    <update-device
      :device="device"
      v-if="addDevice"
      @device-added="deviceAdded"
    />
    <template v-else>
      <device-existing-state
        @update-device="updateDevice"
        v-if="hasDevices"
        :devices="devices"
        @add-device="addDevice = true"
      />
      <device-empty-state v-else @add-device="addDevice = true" />
    </template>
  </div>
</template>
<script lang="ts">
import IDevice from "@/types/IDevice";
import { Options, Vue } from "vue-class-component";
import { namespace } from "vuex-class";
import DeviceEmptyState from "./emptyState.vue";
import DeviceExistingState from "./existingState.vue";
import UpdateDevice from "./updatedevice.vue";
const devices = namespace("device");

const emptyDevice: IDevice = {
  udiCarrier: {},
  deviceName: {},
  specialization: {},
  version: {},
  property: {},
};

@Options({
  components: {
    DeviceEmptyState,
    DeviceExistingState,
    UpdateDevice,
  },
})
export default class Devices extends Vue {
  addDevice = false;

  device: IDevice = emptyDevice;

  get hasDevices() {
    return this.devices?.length > 0;
  }

  @devices.State
  devices!: IDevice[];

  @devices.Action
  fetchDevices!: () => Promise<void>;

  updateDevice(device: any) {
    this.device = device;
    this.addDevice = true;
  }

  deviceAdded() {
    this.addDevice = false;
    this.device = { ...emptyDevice };
  }
  created() {
    if (!this.hasDevices) this.fetchDevices();
  }
}
</script>
