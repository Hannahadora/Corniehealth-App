<template>
  <div>
    <cornie-dialog v-model="show" right class="w-4/12 h-full">
      <cornie-card height="100%" class="flex flex-col">
        <cornie-card-title>
          <cornie-icon-btn @click="show = false">
            <arrow-left-icon />
          </cornie-icon-btn>
          <span
            class="
              text-primary
              font-extrabold
              text-lg
              border-l-2 border-gray-100
              pl-2
            "
          >
            Providers
          </span>
        </cornie-card-title>
        <div>
          <cornie-card-text class="flex-grow scrollable">
            <div class="flex items-center">
              <pill-icon class="mr-3" />
              <div class="flex-grow">
                <span class="text-primary font-extrabold pl-2 block">
                  Preferred Pharmacy
                </span>
                <span class="text-gray-300 text-xs block">
                  {{ pharmCount }} Added
                </span>
              </div>
              <cornie-btn
                @click="add('Pharmacy')"
                class="text-primary border-2 border-primary"
              >
                Add
              </cornie-btn>
            </div>
          </cornie-card-text>
          <cornie-card-text class="flex-grow scrollable">
            <div class="flex items-center">
              <test-tube-icon class="mr-3" />
              <div class="flex-grow">
                <span class="text-primary font-extrabold pl-2 block">
                  Preferred Laboratories
                </span>
                <span class="text-gray-300 text-xs block">
                  {{ labCount }} Added
                </span>
              </div>
              <cornie-btn
                @click="add('Laboratory')"
                class="text-primary border-2 border-primary"
              >
                Add
              </cornie-btn>
            </div>
          </cornie-card-text>
        </div>

        <cornie-card class="mt-auto">
          <cornie-card-text class="flex justify-end">
            <cornie-btn
              @click="show = false"
              class="text-white bg-danger px-6 rounded-xl"
            >
              Close
            </cornie-btn>
          </cornie-card-text>
        </cornie-card>
      </cornie-card>
      <register-provider
        v-model:labs="labsSync"
        v-model:pharmacies="pharmaciesSync"
        :patient="patient"
        :title="provider"
        v-model="showProviderPicker"
      />
    </cornie-dialog>
  </div>
</template>

<script lang="ts">
import { Vue, Options } from "vue-class-component";
import { Prop, PropSync, Watch } from "vue-property-decorator";
import CornieCard from "@/components/cornie-card";
import CornieIconBtn from "@/components/CornieIconBtn.vue";
import ArrowLeftIcon from "@/components/icons/arrowleft.vue";
import CornieDialog from "@/components/CornieDialog.vue";
import CornieInput from "@/components/cornieinput.vue";
import CornieSelect from "@/components/NewCornieSelect.vue";
import CorniePhoneInput from "@/components/phone-input.vue";
import CornieDatePicker from "@/components/CornieDatePicker.vue";
import CornieBtn from "@/components/CornieBtn.vue";
import PillIcon from "@/components/icons/PillIcon.vue";
import TestTubeIcon from "@/components/icons/test-tube.vue";
import RegisterProvider from "./register-provider.vue";
import { namespace } from "vuex-class";
import { IPatient, Provider } from "@/types/IPatient";

const patients = namespace("patients");

@Options({
  name: "guarantor-dialog",
  components: {
    ...CornieCard,
    TestTubeIcon,
    RegisterProvider,
    CornieIconBtn,
    ArrowLeftIcon,
    CornieDialog,
    CornieInput,
    CornieSelect,
    CorniePhoneInput,
    CornieDatePicker,
    CornieBtn,
    PillIcon,
  },
})
export default class EmergencyDontactDialog extends Vue {
  @PropSync("modelValue", { type: Boolean, default: false })
  show!: boolean;

  @Prop({ type: Boolean, default: false })
  modelValue!: boolean;

  @Prop({ type: Array })
  labs!: Provider[];

  @Prop({ type: Array })
  pharmacies!: Provider[];

  @PropSync("labs")
  labsSync!: Provider[];

  @PropSync("pharmacies")
  pharmaciesSync!: Provider[];

  provider = "";
  showProviderPicker = false;

  @Prop({ type: Object })
  patient!: IPatient;

  get labCount() {
    const labs = this.patient?.preferredLabs || this.labsSync || [];
    return labs.length;
  }

  get pharmCount() {
    const pharms =
      this.patient?.preferredPharmacies || this.pharmaciesSync || [];
    return pharms.length;
  }
  add(key: string) {
    this.provider = key;
    this.showProviderPicker = true;
  }

  hydrate() {
    this.pharmaciesSync = [...(this.patient.preferredPharmacies || [])];
    this.labsSync = [...(this.patient.preferredLabs || [])];
  }

  @Watch("patient")
  patientChanged() {
    if (this.patient?.id) this.hydrate();
  }

  created() {
    if (this.patient?.id) this.hydrate();
  }
}
</script>

<style></style>
