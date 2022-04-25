<template>
  <cornie-dialog v-model="show" right class="w-4/12 h-full">
    <cornie-card height="100%" class="flex flex-col">
      <cornie-card-title>
        <cornie-icon-btn @click="show = false">
          <arrow-left-icon />
        </cornie-icon-btn>
        <span
          class="text-primary font-extrabold text-lg border-l-2 border-gray-100 pl-2"
        >
         Wallet
        </span>
      </cornie-card-title>
      <cornie-card-text class="flex-grow scrollable">
        <v-form ref="form" class="grid grid-cols-1 gap-y-2">
            <cornie-radio
                name="wallet"
                :label="'Add Existing'"
            ></cornie-radio>
            <cornie-radio
                name="wallet"
                :label="'Create New'"
            ></cornie-radio>
          <cornie-input
            label="Name"
            class="w-full"
            placeholder="Enter"
          />
          <cornie-input
            label="Wallet ID"
            class="w-full"
            placeholder="--Enter--"
          />
          <span class="text-danger text-sm font-bold">SEND CODE</span>
         <cornie-input
            label="Authenticate Wallet"
            class="w-full"
            placeholder="--Enter authentication code--"
          />
        </v-form>
      </cornie-card-text>
      <cornie-card>
        <cornie-card-text class="flex justify-end">
          <cornie-btn
            @click="show = false"
            class="border-primary border-2 px-6 mr-3 rounded-xl text-primary"
          >
            Cancel
          </cornie-btn>
          <cornie-btn
            class="text-white bg-danger px-6 rounded-xl"
          >
            Save
          </cornie-btn>
        </cornie-card-text>
      </cornie-card>
    </cornie-card>
  </cornie-dialog>
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
import CornieRadio from "@/components/cornieradio.vue";

const patients = namespace("patients");

@Options({
  name: "WalletDialog",
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
    CornieRadio,
  },
  emits: ["canceled"],
})
export default class WalletDialog extends Vue {
  @PropSync("modelValue", { type: Boolean, default: false })
  show!: boolean;

}
</script>

<style></style>
