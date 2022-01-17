<template>
  <div class="w-full mx-5">
    <span
      class="flex border-b-2 w-full font-semibold text-lg text-primary py-2 mx-auto"
    >
      Add a New Device
    </span>
        <accordion-component title="Carrier Details" :opened="true">
               <template v-slot:default>
                 <span class="grid grid-cols-2 gap-4 w-full mt-5">
                  <cornie-input v-model="deviceModel.id" placeholder="--Autofilled--" label="Identifier" disabled />
                  <cornie-select
                    v-model="deviceModel.reference"
                    label="reference"
                    disabled
                    class="w-full"
                    placeholder="--Select--"
                  />
                </span>
                 <div class="flex space-x-1 w-full mt-5 mb-5 col-span-full justify-between">
                          <span class="text-sm w-32 -mb-2 capitalize"> UDI CARRIER</span>
                          <span class="border-b-2 border-gray-200 w-full"></span>
                  </div>
                 <div class="grid grid-cols-3 gap-4 w-full mt-5">   
                        <cornie-input
                          label="Device identifier"
                          v-model="deviceModel.udiCarrier.deviceIdentifier"
                          placeholder="--Enter--"
                        />
                        <cornie-input label="issuer"  placeholder="--Enter--" v-model="deviceModel.udiCarrier.issuer" />
                        <cornie-input
                          label="jurisdiction"
                          v-model="deviceModel.udiCarrier.jurisdiction"
                           placeholder="--Enter--"
                           
                        />
                        <cornie-input
                          label="carrier aidc"
                          v-model="deviceModel.udiCarrier.carrierAIDC"
                           placeholder="--Enter--"
                        />
                        <cornie-select
                          label="carrier hr "
                          v-model="deviceModel.udiCarrier.carrierHR"
                          class="w-full"
                           placeholder="--Select--"
                        />
                        <cornie-select
                          label="entry type"
                          v-model="deviceModel.udiCarrier.entryType"
                          :items="dropdownData.entryType"
                          class="w-full"
                           placeholder="--Select--"
                        />
                        <cornie-select
                          label="status"
                          v-model="deviceModel.udiCarrier.status"
                          :items="dropdownData.status"
                          class="w-full"
                           placeholder="--Select--"
                        />
                        <cornie-select
                          label="status reason"
                          v-model="deviceModel.udiCarrier.statusReason"
                          :items="dropdownData.statusReason"
                          class="w-full"
                           placeholder="--Select--"
                        />
                        <cornie-input
                          label="distinct identifier"
                          v-model="deviceModel.udiCarrier.distinctIdentifier"
                           placeholder="--Enter--"
                        />
                        <cornie-input
                          label="manufacturer"
                          v-model="deviceModel.udiCarrier.manufacturer"
                           placeholder="--Enter--"
                        />
                        <date-picker
                          label="manufacturer date"
                          v-model="deviceModel.udiCarrier.manufacturerDate"
                           placeholder="--Enter--"
                        />
                        <date-picker
                          label="expiration date"
                          v-model="deviceModel.udiCarrier.expirationDate"
                           placeholder="--Enter--"
                        />
                        <cornie-input
                          label="lot number"
                          v-model="deviceModel.udiCarrier.lotNumber"
                           placeholder="--Enter--"
                        />
                        <cornie-input
                          label="serial number"
                          v-model="deviceModel.udiCarrier.serialNumber"
                           placeholder="--Enter--"
                        />
                 </div>
               </template>
                <template v-slot:misc>
                  <info-icon class="fill-current text-primary"/>
               </template>
        </accordion-component>
          <accordion-component title="Device Details" :opened="false">
               <template v-slot:default>
                 <div class="grid grid-cols-3 gap-4 w-full mt-5">   
                       <cornie-input label="Name" placeholder="--Enter--" v-model="deviceModel.deviceName.name" />
                        <cornie-select
                          label="Name Type"
                          :items="dropdownData.nameType"
                          v-model="deviceModel.deviceName.nameType"
                          class="w-full"
                          placeholder="--Select--"
                        />
                        <cornie-input
                          label="Model number"
                          v-model="deviceModel.deviceName.modelNumber"
                         placeholder="--Enter--"
                        />
                        <cornie-input
                          label="Part Number"
                          v-model="deviceModel.deviceName.partNumber"
                          placeholder="--Enter--"
                        />
                 </div>
                  <div class="flex space-x-1 w-full mt-5 mb-5 col-span-full justify-between">
                          <span class="text-sm w-32 -mb-2 capitalize">  Specialization</span>
                          <span class="border-b-2 border-gray-200 w-full"></span>
                  </div>
                  <div class="grid grid-cols-3 gap-4 w-full">
                       <cornie-input
                          label="System type"
                          v-model="deviceModel.specialization.systemType"
                        />
                        <cornie-input
                          label="Version"
                          v-model="deviceModel.specialization.version"
                        />
                  </div>
                   <div class="flex space-x-1 w-full mt-5 mb-5 col-span-full justify-between">
                          <span class="text-sm w-32 -mb-2 capitalize">  Version</span>
                          <span class="border-b-2 border-gray-200 w-full"></span>
                  </div>
                  <div class="grid grid-cols-3 gap-4 w-full">
                     <cornie-input label="type" placeholder="--Enter--" v-model="deviceModel.version.versionType" />
                      <cornie-input
                        label="component"
                        placeholder="--Enter--"
                        v-model="deviceModel.version.component"
                      />
                      <cornie-input placeholder="--Enter--" label="value" v-model="deviceModel.version.value" />

                  </div>

               </template>
                <template v-slot:misc>
                  <info-icon class="fill-current text-primary"/>
               </template>
        </accordion-component>
        <accordion-component title="Property Details" :opened="false">
               <template v-slot:default>
                    <div class="flex space-x-1 w-full mt-5 mb-5 col-span-full justify-between">
                          <span class="text-sm w-32 -mb-2 capitalize">  Property</span>
                          <span class="border-b-2 border-gray-200 w-full"></span>
                  </div>
                 <div class="grid grid-cols-3 gap-4 w-full mt-5">   
                       <cornie-input
                          label="type"
                          v-model="deviceModel.property.propertyType"
                          placeholder="--Enter--"
                        />
                        <cornie-input
                          label="value quantity"
                          v-model="deviceModel.property.valueQuantity"
                          placeholder="--Enter--"
                        />
                        <cornie-input
                          label="value code"
                          v-model="deviceModel.property.valueCode"
                          placeholder="--Enter--"
                        />
                        <cornie-select label="patient" placeholder="--Select--" class="w-full" v-model="deviceModel.property.patient" />
                        <cornie-select label="owner" placeholder="--Seelct--" class="w-full" -model="deviceModel.property.owner" />
                        <cornie-select
                          label="support contact"
                          placeholder="--Select--"
                          class="w-full"
                          v-model="deviceModel.property.supportContact"
                        />
                        <cornie-input
                          label="location"
                          placeholder="--Enter--"
                          v-model="deviceModel.property.location"
                        />
                        <cornie-input label="url"   placeholder="--Enter--" v-model="deviceModel.property.url" />
                        <cornie-input label="notes"   placeholder="--Enter--" v-model="deviceModel.property.notes" />
                        <cornie-input label="safety"   placeholder="--Enter--" v-model="deviceModel.property.safety" />
                        <cornie-input label="parent"  placeholder="--Enter--"  v-model="deviceModel.property.parent" />
                 </div>
               </template>
                <template v-slot:misc>
                  <info-icon class="fill-current text-primary"/>
               </template>
        </accordion-component>

      
      <span class="flex mb-5 pb-32 mt-5 justify-end">
        <button
          class="rounded-full font-semibold py-2 px-5 text-primary border border-primary mr-3"
          @click="done"
        >
          Revert Changes
        </button>
        <button
          class=" rounded-full font-semibold  py-2 px-5 text-white border bg-danger"
          type="submit"
          :loading="loading"
          @click="submit"
            >
          {{ action }} Device
        </button>
      </span>

  </div>
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";
import { Prop, Watch } from "vue-property-decorator";
import CornieInput from "@/components/cornieinput.vue";
import CornieSelect from "@/components/cornieselect.vue";
import DatePicker from "./datepicker.vue";
import IDevice from "@/types/IDevice";
import AccordionComponent from "@/components/form-accordion.vue";
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
    AccordionComponent
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
