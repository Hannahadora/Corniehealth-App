<template>
  <cornie-dialog v-model="show" right class="w-4/12 h-full" v-if="showInitial">
    <cornie-card height="100%" class="flex flex-col">
      <cornie-card-title>
        <cornie-icon-btn @click="show = false">
          <arrow-left-icon />
        </cornie-icon-btn>
        <span class="text-primary font-extrabold text-lg border-l-2 border-gray-100 pl-2">
          Providers
        </span>
      </cornie-card-title>
      <cornie-card-text class="flex-grow scrollable">
        <div class="flex items-center">
          <pill-icon class="mr-3"/>
          <div class="flex-grow">
            <span class="text-primary font-extrabold pl-2 block">
              Preferred Pharmacy
            </span>
            <span class="text-gray-50 text-xs block">
              0 Added
            </span>
          </div>
        </div>
      </cornie-card-text>
      <cornie-card>
        <cornie-card-text class="flex justify-end">
          <cornie-btn class="text-white bg-danger px-6 rounded-xl">
            Close
          </cornie-btn>
        </cornie-card-text>
      </cornie-card>
    </cornie-card>
  </cornie-dialog>
</template>

<script lang="ts">
import { Vue, Options } from "vue-class-component";
import { PropSync } from "vue-property-decorator";
import CornieCard from "@/components/cornie-card";
import CornieIconBtn from "@/components/CornieIconBtn.vue";
import ArrowLeftIcon from "@/components/icons/arrowleft.vue";
import CornieDialog from "@/components/CornieDialog.vue";
import CornieInput from "@/components/CornieInput.vue";
import CornieSelect from "@/components/NewCornieSelect.vue";
import CorniePhoneInput from "@/components/phone-input.vue";
import CornieDatePicker from "@/components/CornieDatePicker.vue";
import CornieBtn from "@/components/CornieBtn.vue";
import PillIcon from "@/components/icons/PillIcon.vue";

@Options({
  name: "guarantor-dialog",
  components: {
    ...CornieCard,
    CornieIconBtn,
    ArrowLeftIcon,
    CornieDialog,
    CornieInput,
    CornieSelect,
    CorniePhoneInput,
    CornieDatePicker,
    CornieBtn,
    PillIcon
  },
})
export default class EmergencyDontactDialog extends Vue {
  @PropSync("modelValue", { type: Boolean, default: false })
  show!: boolean;

  display: "initial" | "pharmacies" | "laboratories" = "initial";
  type = "";
  group = "";
  payer = "";
  plan = "";
  policyNo = "";
  deductible = "";
  mainPolicyHolder = "";
  groupPolicyNo = "";

  groupOptions = [ ];
  relationshipOptions = [];

  get showInitial() {
    return this.display == "initial";
  }

  get showPharmacies() {
    return this.display == "pharmacies";
  }

  get showLaboratories() {
    return this.display == "laboratories";
  }
}
</script>

<style>
</style>