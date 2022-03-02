<template>
  <cornie-dialog v-model="show" center class="w-1/3 h-auto">
    <cornie-card height="100%" class="flex flex-col">
      <cornie-card-title>
        <cornie-icon-btn @click="show = false">
          <arrow-left-icon />
        </cornie-icon-btn>
        <span
          class="text-primary font-extrabold text-lg border-l-2 border-gray-100 pl-2"
        >
          Primary Account
        </span>
      </cornie-card-title>
      <cornie-card-text class="flex-grow scrollable">
        <v-form ref="form" class="grid grid-cols-1 gap-y-2">
          <cornie-select
            label="Account Type"
            class="w-full"
            placeholder="Select One"
            :items="['Cash', 'Transfer']"
            v-model="accountType"
          />
          <cornie-select
            label="Payment Type"
            class="w-full"
            placeholder="Select One"
            :items="['Card', 'Wallet', 'Issurance']"
            v-model="paymentType"
          />
        </v-form>
      </cornie-card-text>
      <cornie-card>
        <cornie-card-text class="flex justify-end">
          <cornie-btn
            @click="show = false"
            class="border-primary border-2 px-1 mr-3 rounded-xl text-primary"
          >
            Cancel
          </cornie-btn>
          <cornie-btn
            :loading="loading"
            @click="save"
            class="text-white bg-danger px-2 rounded-xl"
          >
            Save
          </cornie-btn>
        </cornie-card-text>
      </cornie-card>
    </cornie-card>
  </cornie-dialog>

  <insurance-dialog v-model="openInsuranceDialog" @canceled="handleCancel" />
  <card-dialog v-model="openCardDialog" @canceled="handleCancel" />
</template>

<script lang="ts">
import { Vue, Options } from "vue-class-component";
import { Prop, PropSync, Watch } from "vue-property-decorator";
import CornieCard from "@/components/cornie-card";
import CornieIconBtn from "@/components/CornieIconBtn.vue";
import ArrowLeftIcon from "@/components/icons/arrowleft.vue";
import CornieDialog from "@/components/CornieDialog.vue";
import CornieInput from "@/components/cornieinput.vue";
import CornieSelect from "@/components/cornieselect.vue";
import CorniePhoneInput from "@/components/phone-input.vue";
import CornieDatePicker from "@/components/datepicker.vue";
import CornieBtn from "@/components/CornieBtn.vue";
import { Insurance, IPatient } from "@/types/IPatient";
import { namespace } from "vuex-class";
import { cornieClient } from "@/plugins/http";
import InsuranceDialog from "./payments/InsuranceDialog.vue";
import CardDialog from "./payments/cardDialog.vue";

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
    InsuranceDialog,
    CardDialog,
  },
})
export default class PaymentDialog extends Vue {
  @PropSync("modelValue", { type: Boolean, default: false })
  show!: boolean;

  accountType = "";
  paymentType = "";
  openInsuranceDialog = false;
  openWalletDialog = false;
  openCardDialog = false;

  handleCancel() {
    this.show = true;
    this.paymentType = "";
    this.accountType = "";
  }

  @Watch("paymentType")
  handlePaymentDialog() {
    switch (this.paymentType) {
      case "Issurance":
        this.openInsuranceDialog = true;
        break;
      case "Wallet":
        this.openWalletDialog = true;
        break;
      default:
        this.openCardDialog = true;
    }

    this.show = false;
  }
}
</script>
