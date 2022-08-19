<template>
  <clinical-dialog v-model="show" :title="'Wallet'" class="w-1/4 h-full">
    <div class="flex flex-col space-y-4 h-full">
      <div>
        <div class="py-2" v-for="w in walletTypes" :key="w.text">
          <cornie-radio
            v-model="currentComponent"
            :value="w.component"
            :label="w.text"
          />
        </div>
      </div>
      <div class="flex flex-col space-y-2">
        <cornie-input
          class="w-full"
          v-model="name"
          label="Name"
          placeholder="Enter"
        />
        <cornie-input
          class="w-full"
          v-model="walletID"
          label="Wallet ID"
          placeholder="Enter"
        />
        <div class="flex w-full pt-8">
          <cornie-select
            :items="['NGN']"
            placeholder="Days"
            class="w-32 mt-0.5 flex-none rounded-r-none"
            v-model="walletCurrency"
          />
          <cornie-input
            placeholder="0.00"
            class="grow w-full rounded-l-none"
            :setfull="true"
            v-model="walletBalance"
            :disabled="true"
          />
        </div>
      </div>
      <div class="absolute bottom-0 w-full">
        <div class="flex justify-end space-x-3 px-6 py-2">
          <cornie-btn
            @click="show = false"
            class="border-primary border-2 px-1 mr-3 rounded-xl text-primary"
          >
            Cancel
          </cornie-btn>
          <cornie-btn
            @click="save"
            class="text-white bg-danger px-6 rounded-xl"
          >
            Save
          </cornie-btn>
        </div>
      </div>
    </div>
  </clinical-dialog>
</template>
<script lang="ts">
  import CornieInput from "@/components/cornieinput.vue";
  import CornieRadio from "@/components/cornieradio.vue";
  import CornieSelect from "@/components/cornieselect.vue";
  import ClinicalDialog from "@/views/dashboard/ehr/conditions/clinical-dialog.vue";
  import { Options, Vue } from "vue-class-component";
  import { PropSync } from "vue-property-decorator";

  @Options({
    components: {
      ClinicalDialog,
      CornieRadio,
      CornieInput,
      CornieSelect,
    },
  })
  export default class NewWalletPayment extends Vue {
    @PropSync("modelValue", { type: Boolean, default: false })
    show!: boolean;

    currentComponent = "";
    name: string = "";
    walletID: string = "";
    walletCurrency: string = "NGN";
    walletBalance: string = "";
    walletTypes = [
      {
        text: "Create New",
        component: "new-wallet",
      },
      {
        text: "Add Existing",
        component: "existing-wallet",
      },
    ];
    save() {}
  }
</script>
