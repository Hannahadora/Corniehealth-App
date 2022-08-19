<template>
  <cornie-dialog
    v-model="show"
    center
    class="md:w-1/4 md:h-2/4 h-2/3 w-full p-2"
  >
    <cornie-card height="100%" class="flex flex-col bg-white">
      <cornie-card-title>
        <div class="w-full flex items-center justify-between">
          <div class="w-full flex items-center">
            <h2 class="font-bold text-lg text-primary ml-3 -mt-0.5">
              Payment Accounts
            </h2>
          </div>
          <delete-icon
            class="text-danger fill-current cursor-pointer"
            @click="show = false"
          />
        </div>
      </cornie-card-title>
      <cornie-card-text class="overflow-y-auto h-full">
        <cornie-select
          :items="['Default', 'Secondary']"
          placeholder="Select one"
          label="Account Type"
          class="w-full mt-0.5 flex-none"
          v-model="accountType"
        />
        <cornie-select
          :items="['Card', 'Wallet', 'Insurance']"
          label="Payment Type"
          placeholder="Select one"
          class="w-full mt-0.5 flex-none"
          v-model="paymentType"
        />
      </cornie-card-text>
      <div class="flex justify-end mx-4 mt-auto mb-4 pt-5">
        <cornie-btn
          @click="show = false"
          class="border-primary border-2 px-1 mr-3 rounded-xl text-primary"
        >
          Cancel
        </cornie-btn>
        <cornie-btn
          @click="continueProcess"
          class="text-white bg-danger px-6 rounded-xl"
        >
          Proceed
        </cornie-btn>
      </div>
    </cornie-card>
  </cornie-dialog>
</template>
<script lang="ts">
  import CornieCard from "@/components/cornie-card";
  import CornieDialog from "@/components/CornieDialog.vue";
  import CornieIconBtn from "@/components/CornieIconBtn.vue";
  import CornieSelect from "@/components/cornieselect.vue";
  import ArrowLeftIcon from "@/components/icons/arrowleft.vue";
  import DeleteIcon from "@/components/icons/cancel.vue";
  import { Options, Vue } from "vue-class-component";
  import { Prop, PropSync } from "vue-property-decorator";

  @Options({
    name: "ClinicalDialog",
    components: {
      ...CornieCard,
      CornieIconBtn,
      CornieDialog,
      ArrowLeftIcon,
      DeleteIcon,
      CornieSelect,
    },
    emits: ["continueProcess"],
  })
  export default class AddCondition extends Vue {
    @Prop({ type: Boolean, default: false })
    modelValue!: boolean;

    @PropSync("modelValue")
    show!: boolean;

    accountType = "";
    paymentType = "";

    continueProcess() {
      this.$emit("continueProcess", {
        paymentType: this.paymentType,
        accountType: this.accountType,
      });
      this.show = false;
    }
  }
</script>
