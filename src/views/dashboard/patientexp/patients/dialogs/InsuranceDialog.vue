<template>
  <cornie-dialog v-model="show" right class="w-4/12 h-full">
    <cornie-card height="100%" class="flex flex-col">
      <cornie-card-title>
        <cornie-icon-btn @click="show = false">
          <arrow-left-icon />
        </cornie-icon-btn>
        <span class="text-primary font-extrabold text-lg border-l-2 border-gray-100 pl-2">
          Insurance
        </span>
      </cornie-card-title>
      <cornie-card-text class="flex-grow scrollable">
        <p class="text-sm mb-5">Fill the form below to add Insurance.</p>
        <v-form>
          <cornie-input label="Type" class="mb-5" placeholder="Enter" v-model="type"/>
          <cornie-select label="Group" class="mb-5" placeholder="Select One" :items="groupOptions" v-model="group"/>
          <cornie-input label="Payer" class="mb-5" placeholder="Enter" v-model="payer"/>
          <cornie-input label="plan" class="mb-5" placeholder="Enter" v-model="plan"/>
          <cornie-input label="policy No." class="mb-5" placeholder="Enter" v-model="policyNo"/>
          <cornie-date-picker label="Policy Expiry" class="mb-5" v-model="policyExpiry"/>
          <cornie-input label="Deductible/Co-pay AMT" class="mb-5" placeholder="Enter" v-model="deductible"/>
          <cornie-input label="Main Policy Holder" class="mb-5" placeholder="Enter" v-model="mainPolicyHolder"/>
          <cornie-input label="Group Policy No." class="mb-5" placeholder="Enter" v-model="groupPolicyNo"/>
        </v-form>
      </cornie-card-text>
      <cornie-card>
        <cornie-card-text class="flex justify-end">
          <cornie-btn class="border-primary border-2 px-6 mr-3 rounded-xl text-primary">
            Cancel
          </cornie-btn>
          <cornie-btn class="text-white bg-danger px-6 rounded-xl">
            Save
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
import CornieInput from "@/components/cornieinput.vue";
import CornieSelect from "@/components/NewCornieSelect.vue";
import CorniePhoneInput from "@/components/phone-input.vue";
import CornieDatePicker from "@/components/CornieDatePicker.vue";
import CornieBtn from "@/components/CornieBtn.vue";

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
    CornieBtn
  },
})
export default class EmergencyDontactDialog extends Vue {
  @PropSync("modelValue", { type: Boolean, default: false })
  show!: boolean;

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
}
</script>

<style>
</style>