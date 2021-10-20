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
        <cornie-input v-model="deviceModel.id" label="Identifier" disabled />
        <cornie-select
          v-model="deviceModel.reference"
          label="reference"
          disabled
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
        UDI CARRIER
      </span>
      <span class="grid grid-cols-2 gap-4 mt-3">
        <cornie-input
          label="Device identifier"
          v-model="deviceModel.udiCarrier.deviceIdentifier"
        />
        <cornie-input label="issuer" v-model="deviceModel.udiCarrier.issuer" />
        <cornie-input
          label="jurisdiction"
          v-model="deviceModel.udiCarrier.jurisdiction"
        />
        <cornie-input
          label="carrier aidc"
          v-model="deviceModel.udiCarrier.carrierAIDC"
        />
        <cornie-select
          label="carrier hr "
          v-model="deviceModel.udiCarrier.carrierHR"
        />
        <cornie-select
          label="entry type"
          v-model="deviceModel.udiCarrier.entryType"
          :items="dropdownData.entryType"
        />
        <cornie-select
          label="status"
          v-model="deviceModel.udiCarrier.status"
          :items="dropdownData.status"
        />
        <cornie-select
          label="status reason"
          v-model="deviceModel.udiCarrier.statusReason"
          :items="dropdownData.statusReason"
        />
        <cornie-input
          label="distinct identifier"
          v-model="deviceModel.udiCarrier.distinctIdentifier"
        />
        <cornie-input
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
        <cornie-input
          label="lot number"
          v-model="deviceModel.udiCarrier.lotNumber"
        />
        <cornie-input
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
        <cornie-input label="Name" v-model="deviceModel.deviceName.name" />
        <cornie-select
          label="Name Type"
          :items="dropdownData.nameType"
          v-model="deviceModel.deviceName.nameType"
        />
        <cornie-input
          label="Model number"
          v-model="deviceModel.deviceName.modelNumber"
        />
        <cornie-input
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
        <cornie-input
          label="System type"
          v-model="deviceModel.specialization.systemType"
        />
        <cornie-input
          label="Version"
          v-model="deviceModel.specialization.version"
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
        Version
      </span>
      <span class="grid grid-cols-2 gap-4 mt-3">
        <cornie-input label="type" v-model="deviceModel.version.versionType" />
        <cornie-input
          label="component"
          v-model="deviceModel.version.component"
        />
        <cornie-input label="value" v-model="deviceModel.version.value" />
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
        <cornie-input
          label="type"
          v-model="deviceModel.property.propertyType"
        />
        <cornie-input
          label="value quantity"
          v-model="deviceModel.property.valueQuantity"
        />
        <cornie-input
          label="value code"
          v-model="deviceModel.property.valueCode"
        />
        <cornie-select label="patient" v-model="deviceModel.property.patient" />
        <cornie-select label="owner" v-model="deviceModel.property.owner" />
        <cornie-select
          label="support contact"
          v-model="deviceModel.property.supportContact"
        />

        <cornie-input
          label="location"
          v-model="deviceModel.property.location"
        />
        <cornie-input label="url" v-model="deviceModel.property.url" />
        <cornie-input label="notes" v-model="deviceModel.property.notes" />
        <cornie-input label="safety" v-model="deviceModel.property.safety" />
        <cornie-input label="parent" v-model="deviceModel.property.parent" />
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
          {{ action }} Device
        </button>
      </span>
    </form>
  </div>
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";
import { Prop, Watch } from "vue-property-decorator";
import CornieInput from "@/components/cornieinput.vue";
import CornieSelect from "@/components/cornieselect.vue";
import DatePicker from "./datepicker.vue";
import IDevice from "@/types/IDevice";

import { namespace } from "vuex-class";
import { cornieClient } from "@/plugins/http";

const devices = namespace("device");
const dropdown = namespace("dropdown");
const emptyDevice: IDevice = {
  udiCarrier: {},
  deviceName: {},
  specialization: {},
  version: {},
  property: {},
};

@Options({
  components: {
    CornieInput,
    CornieSelect,
    DatePicker,
  },
})
export default class UpdateDevice extends Vue {
  @Prop({ type: Object, required: false, default: { ...emptyDevice } })
  device!: IDevice;

  deviceModel = {} as IDevice;

  dropdownData = {} as IIndexableObject;

  @dropdown.Action
  getDropdowns!: (key: string) => Promise<IIndexableObject>;

  @devices.Mutation
  updateDevices!: any;

  get isUpdate() {
    return Boolean(this.device.id);
  }

  get action() {
    return this.isUpdate ? "Update" : "Add";
  }

  @Watch("device")
  deviceUpdated(device: IDevice) {
    this.deviceModel = JSON.parse(JSON.stringify({ ...device }));
  }

  done() {
    this.$emit("device-added");
  }

  get payload() {
    const model = JSON.parse(JSON.stringify({ ...this.deviceModel }));
    const carrier = model.udiCarrier as any;
    if (carrier.manufacturerDate)
      carrier.manufacturerDate = new Date(
        carrier.manufacturerDate
      ).toISOString();
    if (carrier.manufacturerDate)
      carrier.expirationDate = new Date(carrier.expirationDate).toISOString();
    return model;
  }

  async submit() {
    if (this.isUpdate) return this.update();
    else this.create();
  }

  async create() {
    try {
      const response = await cornieClient().post(
        "/api/v1/devices",
        this.payload
      );
      if (response.success) {
        this.updateDevices([response.data]);
        window.notify({
          msg: "Device Added",
          status: "success",
        });
        this.done();
      }
    } catch (error) {
      console.error(error);
      window.notify({
        msg: "Device Not Added",
        status: "error",
      });
    }
  }

  async update() {
    const id = this.device.id;
    try {
      const response = await cornieClient().put(
        `/api/v1/devices/${id}`,
        this.payload
      );
      if (response.success) {
        this.updateDevices([response.data]);
        window.notify({
          msg: "Device updated",
          status: "success",
        });
        this.done();
      }
    } catch (error) {
      window.notify({
        msg: "Device Not updated",
        status: "error",
      });
    }
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
  async created() {
    this.setDeviceModel();
    this.dropdownData = await this.getDropdowns("device");
  }
}
</script>
