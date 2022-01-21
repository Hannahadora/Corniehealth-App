<template>
  <div class="w-full mx-auto mb-10">
    <span
      class="flex border-b-2 w-full font-semibold text-xl text-primary py-2 mx-auto"
    >
      {{ isUpdate ? "Update " : "Add a New " }} Device
    </span>

    <form class="mt-5 w-full" @submit.prevent="submit">
      <accordion-component :title="'Carrier Details'" v-model="show">
        <template v-slot:misc>
          <info></info>
        </template>
        <div class="grid grid-cols-12 gap-4 mt-10 w-full">
          <div class="col-span-6">
            <cornie-input
              v-model="deviceModel.id"
              label="IDENTIFIER"
              placeholder="xxxxxxxxx"
              disabled
            />
          </div>
          <div class="col-span-6">
            <cornie-select
              v-model="deviceModel.reference"
              label="reference"
              disabled
            />
          </div>
        </div>

        <div class="flex w-full items-center justify-center">
          <span class="font-semibold text-lg text-primary mr-2">
            UDI CARRIER
          </span>
          <div class="border-b-2 flex-1 border-grays"></div>
        </div>

        <div class="grid grid-cols-12 gap-4 mt-3">
          <div class="col-span-4">
            <cornie-input
              label="Device identifier"
              v-model="deviceModel.udiCarrier.deviceIdentifier"
            />
          </div>
          <div class="col-span-4">
            <cornie-input
              label="issuer"
              v-model="deviceModel.udiCarrier.issuer"
            />
          </div>
          <div class="col-span-4">
            <cornie-input
              label="jurisdiction"
              v-model="deviceModel.udiCarrier.jurisdiction"
            />
          </div>

          <div class="col-span-4">
            <cornie-input
              label="carrier aidc"
              v-model="deviceModel.udiCarrier.carrierAIDC"
            />
          </div>
          <div class="col-span-4">
            <cornie-select
              label="carrier hr "
              v-model="deviceModel.udiCarrier.carrierHR"
            />
          </div>
          <div class="col-span-4">
            <cornie-select
              label="entry type"
              v-model="deviceModel.udiCarrier.entryType"
              :items="dropdownData.entryType"
            />
          </div>

          <div class="col-span-4">
            <cornie-select
              label="status"
              v-model="deviceModel.udiCarrier.status"
              :items="dropdownData.status"
            />
          </div>
          <div class="col-span-4">
            <cornie-select
              label="status reason"
              v-model="deviceModel.udiCarrier.statusReason"
              :items="dropdownData.statusReason"
            />
          </div>
          <div class="col-span-4">
            <cornie-input
              label="distinct identifier"
              v-model="deviceModel.udiCarrier.distinctIdentifier"
            />
          </div>
          <div class="col-span-4">
            <cornie-input
              label="manufacturer"
              v-model="deviceModel.udiCarrier.manufacturer"
            />
          </div>
          <div class="col-span-4">
            <date-picker
              label="manufacturer date"
              v-model="deviceModel.udiCarrier.manufacturerDate"
            />
          </div>
          <div class="col-span-4">
            <date-picker
              label="expiration date"
              v-model="deviceModel.udiCarrier.expirationDate"
            />
          </div>

          <div class="col-span-4">
            <cornie-input
              label="lot number"
              v-model="deviceModel.udiCarrier.lotNumber"
            />
          </div>
          <div class="col-span-4">
            <cornie-input
              label="serial number"
              v-model="deviceModel.udiCarrier.serialNumber"
            />
          </div>
        </div>
      </accordion-component>

      <accordion-component :title="'Device Details'">
        <template v-slot:misc>
          <info></info>
        </template>
        <div class="grid grid-cols-12 gap-4 mt-10">
          <div class="col-span-4">
            <cornie-input label="Name" v-model="deviceModel.deviceName.name" />
          </div>
          <div class="col-span-4">
            <cornie-select
              label="Name Type"
              :items="dropdownData.nameType"
              v-model="deviceModel.deviceName.nameType"
            />
          </div>
          <div class="col-span-4">
            <cornie-input
              label="Model number"
              v-model="deviceModel.deviceName.modelNumber"
            />
          </div>

          <div class="col-span-4">
            <cornie-input
              label="Part Number"
              v-model="deviceModel.deviceName.partNumber"
            />
          </div>
        </div>

        <div class="flex w-full items-center justify-center my-5">
          <span class="font-semibold text-lg text-primary mr-2">
            Specialization
          </span>
          <div class="border-b-2 flex-1 border-grays"></div>
        </div>

        <span class="grid grid-cols-12 gap-4 mt-3">
          <div class="col-span-4">
            <cornie-input
              label="System type"
              v-model="deviceModel.specialization.systemType"
            />
          </div>
          <div class="col-span-4">
            <cornie-input
              label="Version"
              v-model="deviceModel.specialization.version"
            />
          </div>
        </span>

        <div class="flex w-full items-center justify-center my-5">
          <span class="font-semibold text-lg text-primary mr-2"> Version </span>
          <div class="border-b-2 flex-1 border-grays"></div>
        </div>

        <span class="grid grid-cols-12 gap-4 mt-3">
          <div class="col-span-4">
            <cornie-input
              label="type"
              v-model="deviceModel.version.versionType"
            />
          </div>
          <div class="col-span-4">
            <cornie-input
              label="component"
              v-model="deviceModel.version.component"
            />
          </div>
          <div class="col-span-4">
            <cornie-input label="value" v-model="deviceModel.version.value" />
          </div>
        </span>
      </accordion-component>

      <accordion-component :title="'Property Details'">
        <template v-slot:misc>
          <info></info>
        </template>
        <div class="flex w-full items-center justify-center my-10">
          <span class="font-semibold text-lg text-primary mr-2">
            Property
          </span>
          <div class="border-b-2 flex-1 border-grays"></div>
        </div>

        <span class="grid grid-cols-12 gap-4 mt-3">
          <div class="col-span-4">
            <cornie-input
              label="type"
              v-model="deviceModel.property.propertyType"
            />
          </div>
          <div class="col-span-4">
            <cornie-input
              label="value quantity"
              v-model="deviceModel.property.valueQuantity"
            />
          </div>
          <div class="col-span-4">
            <cornie-input
              label="value code"
              v-model="deviceModel.property.valueCode"
            />
          </div>
          <div class="col-span-4">
            <cornie-select
              label="patient"
              v-model="deviceModel.property.patient"
            />
          </div>
          <div class="col-span-4">
            <cornie-select label="owner" v-model="deviceModel.property.owner" />
          </div>
          <div class="col-span-4">
            <cornie-select
              label="support contact"
              v-model="deviceModel.property.supportContact"
            />
          </div>

          <div class="col-span-4">
            <cornie-input
              label="location"
              v-model="deviceModel.property.location"
            />
          </div>
          <div class="col-span-4">
            <cornie-input label="url" v-model="deviceModel.property.url" />
          </div>
          <div class="col-span-4">
            <cornie-input label="notes" v-model="deviceModel.property.notes" />
          </div>
          <div class="col-span-4">
            <cornie-input
              label="parent"
              v-model="deviceModel.property.parent"
            />
          </div>
          <div class="col-span-4">
            <cornie-input
              label="safety"
              v-model="deviceModel.property.safety"
            />
          </div>
        </span>
      </accordion-component>
      <span
        class="flex border-b-2 w-full font-semibold text-xl text-primary py-2 mt-4 mx-auto mb-3"
      />
      <span class="flex full-width mb-2 justify-end">
        <button
          class="rounded-md font-semibold p-2 text-primary border border-primary w-1/4 mr-3"
          @click="done"
        >
          Revert Changes
        </button>
        <button
          class="w-1/4 rounded-md font-semibold p-2 text-white border bg-danger"
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
import AccordionComponent from "@/components/accordion-extended-component.vue";
import Info from "@/components/icons/info-blue-bg.vue";
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
    AccordionComponent,
    Info,
  },
})
export default class UpdateDevice extends Vue {
  @devices.State
  devices!: IDevice[];

  device = {} as IDevice;
  deviceModel = {} as IDevice;
  show = true as boolean;
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
    if (this.$route.params.id) {
      this.device = {
        ...(this.devices.find(
          (device) => device.id === this.$route.params.id
        ) || this.device),
      };
    } else {
      this.device = { ...emptyDevice };
    }
    this.setDeviceModel();
    this.dropdownData = await this.getDropdowns("device");
  }
}
</script>
