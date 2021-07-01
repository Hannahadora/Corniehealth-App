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
      Add a New Device
    </span>
    <form class="mt-5 w-full" @submit.prevent="submit">
      <span class="grid grid-cols-2">
        <d-input v-model="deviceModel.id" label="Identifier" />
        <d-select v-model="deviceModel.reference" label="reference" disabled />
      </span>
      <span
        class="
          flex
          border-b-2
          w-full
          font-semibold
          text-xl text-primary
          py-2
          mt-4
          mx-auto
        "
      >
        UDI CARRIER
      </span>
      <span class="grid grid-cols-2 gap-4 mt-3">
        <d-input
          label="Device identifier"
          v-model="deviceModel.udiCarrier.deviceIdentifier"
        />
        <d-input label="issuer" v-model="deviceModel.udiCarrier.issuer" />
        <d-input
          label="jurisdiction"
          v-model="deviceModel.udiCarrier.jurisdiction"
        />
        <d-input
          label="carrier aidc"
          v-model="deviceModel.udiCarrier.carrierAIDC"
        />
        <d-select
          label="carrier hr "
          v-model="deviceModel.udiCarrier.carrierHR"
        />
        <d-select
          label="entry type"
          v-model="deviceModel.udiCarrier.entryType"
          :items="dropdownData.entryType"
        />
        <d-select
          label="status"
          v-model="deviceModel.udiCarrier.status"
          :items="dropdownData.status"
        />
        <d-select
          label="status reason"
          v-model="deviceModel.udiCarrier.statusReason"
          :items="dropdownData.statusReason"
        />
        <d-input
          label="distinct identifier"
          v-model="deviceModel.udiCarrier.distinctIdentifier"
        />
        <d-input
          label="manufacturer"
          v-model="deviceModel.udiCarrier.manufacturer"
        />
        <date-picker
          label="manufacturer date"
          v-model="deviceModel.udiCarrier.manufacturerDate"
        />
        <date-picker
          label="expiration date"
          v-model="deviceModel.udiCarrier.expirationDate"
        />
        <d-input
          label="lot number"
          v-model="deviceModel.udiCarrier.lotNumber"
        />
        <d-input
          label="serial number"
          v-model="deviceModel.udiCarrier.serialNumber"
        />
      </span>
      <span
        class="
          flex
          border-b-2
          w-full
          font-semibold
          text-xl text-primary
          py-2
          mt-4
          mx-auto
        "
      >
        Device Name
      </span>
      <span class="grid grid-cols-2 gap-4 mt-3">
        <d-input label="Name" v-model="deviceModel.deviceName.name" />
        <d-select
          label="Name Type"
          :items="dropdownData.nameType"
          v-model="deviceModel.deviceName.nameType"
        />
        <d-input
          label="Model number"
          v-model="deviceModel.deviceName.modelNumber"
        />
        <d-input
          label="Part Number"
          v-model="deviceModel.deviceName.partNumber"
        />
      </span>
      <span
        class="
          flex
          border-b-2
          w-full
          font-semibold
          text-xl text-primary
          py-2
          mt-4
          mx-auto
        "
      >
        Specialization
      </span>
      <span class="grid grid-cols-2 gap-4 mt-3">
        <d-input
          label="System type"
          v-model="deviceModel.specialization.systemType"
        />
        <d-input label="Version" v-model="deviceModel.specialization.version" />
      </span>
      <span
        class="
          flex
          border-b-2
          w-full
          font-semibold
          text-xl text-primary
          py-2
          mt-4
          mx-auto
        "
      >
        Version
      </span>
      <span class="grid grid-cols-2 gap-4 mt-3">
        <d-input label="type" v-model="deviceModel.version.versionType" />
        <d-input label="component" v-model="deviceModel.version.component" />
        <d-input label="value" v-model="deviceModel.version.value" />
      </span>
      <span
        class="
          flex
          border-b-2
          w-full
          font-semibold
          text-xl text-primary
          py-2
          mt-4
          mx-auto
        "
      >
        Property
      </span>
      <span class="grid grid-cols-2 gap-4 mt-3">
        <d-input label="type" v-model="deviceModel.property.propertyType" />
        <d-input
          label="value quantity"
          v-model="deviceModel.property.valueQuantity"
        />
        <d-input label="value code" v-model="deviceModel.property.valueCode" />
        <d-select label="patient" v-model="deviceModel.property.patient" />
        <d-select label="owner" v-model="deviceModel.property.owner" />
        <d-select
          label="support contact"
          v-model="deviceModel.property.supportContact"
        />

        <d-input label="location" v-model="deviceModel.property.location" />
        <d-input label="url" v-model="deviceModel.property.url" />
        <d-input label="notes" v-model="deviceModel.property.notes" />
        <d-input label="safety" v-model="deviceModel.property.safety" />
        <d-input label="parent" v-model="deviceModel.property.parent" />
      </span>
      <span
        class="
          flex
          border-b-2
          w-full
          font-semibold
          text-xl text-primary
          py-2
          mt-4
          mx-auto
          mb-3
        "
      />
      <span class="flex full-width mb-2 justify-end">
        <button
          class="
            rounded-full
            font-semibold
            p-2
            text-primary
            border border-primary
            w-1/4
            mr-3
          "
          @click="done"
        >
          Revert Changes
        </button>
        <button
          class="
            w-1/4
            rounded-full
            font-semibold
            p-2
            text-white
            border
            bg-danger
          "
          type="submit"
        >
          Add Device
        </button>
      </span>
    </form>
  </div>
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";
import { Prop, Watch } from "vue-property-decorator";
import DInput from "./dinput.vue";
import DSelect from "./dselect.vue";
import DatePicker from "./datepicker.vue";
import IDevice from "@/types/IDevice";

import { namespace } from "vuex-class";
import { cornieClient } from "@/plugins/http";

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
    DInput,
    DSelect,
    DatePicker,
  },
})
export default class UpdateDevice extends Vue {
  @Prop({ type: Object, required: false, default: { ...emptyDevice } })
  device!: IDevice;

  deviceModel = {} as IDevice;

  @devices.State
  dropdownData!: any;

  @devices.Action
  fetchDropdownData!: () => Promise<void>;

  @devices.Mutation
  setDevices!: any;

  @Watch("device")
  deviceUpdated(device: IDevice) {
    this.deviceModel = { ...device };
  }
  done() {
    this.$emit("device-added");
  }

  get payload() {
    const model = JSON.parse(JSON.stringify({ ...this.deviceModel }));
    const carrier = model.udiCarrier as any;
    carrier.manufacturerDate = new Date(carrier.manufacturerDate).toISOString();
    carrier.expirationDate = new Date(carrier.expirationDate).toISOString();
    return model;
  }
  async submit() {
    //this.done();
    try {
      const response = await cornieClient().post("/api/v1/devices/create", [
        this.payload,
      ]);
      if (response.success) {
        this.setDevices(response.data.devices);
        alert("Device added");
      }
    } catch (error) {
      console.error(error);
    }
    console.log(this.payload);
  }
  setDeviceModel() {
    this.deviceModel = JSON.parse(JSON.stringify({ ...this.device }));
    let manDate = this.deviceModel.udiCarrier.manufacturerDate;
    let expDate = this.deviceModel.udiCarrier.expirationDate;
    if (manDate) {
      manDate = new Date(manDate).toLocaleDateString("en-US");
    }
    if (expDate) expDate = new Date(expDate).toLocaleDateString("en-US");
  }
  created() {
    this.setDeviceModel();
    if (this.dropdownData && Object.values(this.dropdownData).length > 1)
      return;
    this.fetchDropdownData();
  }
}
</script>
<style>
input[type="date"]::-webkit-calendar-picker-indicator {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: auto;
  height: auto;
  color: transparent;
  background: transparent;
}
</style>
