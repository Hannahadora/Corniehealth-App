<template>
  <clinical-dialog v-model="show" :title="'Wallet'" class="w-1/4 h-full">
    <div class="flex flex-col space-y-4 h-full">
      <div>
        <div class="py-2" v-for="w in walletTypes" :key="w.text">
          <cornie-radio
            v-model="currentComponent"
            :value="w.value"
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
          :modelValue="walletDetails.walletId"
          label="Wallet ID"
          placeholder="Enter"
          readonly
        >
          <template v-slot:labelicon>
            <div class="flex text-red-500 cursor-pointer">
              <img src="@/assets/topup-wallet.svg" /> <span>Top up</span>
            </div>
          </template>
        </cornie-input>
        <div class="flex w-full pt-8">
          <cornie-select
            :items="['NGN']"
            placeholder="Days"
            class="w-32 mt-0.5 flex-none rounded-r-none"
            v-model="walletCurrency"
          />
          <cornie-input
            placeholder="0.00"
            class="grow w-full rounded-none"
            :setfull="true"
            :modelValue="walletDetails.walletBalance"
            readonly
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
            :loading="loading"
            class="text-white bg-danger px-6 rounded-xl"
          >
            {{ buttonText }}
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
  import { cornieClient } from "@/plugins/http";
  import ClinicalDialog from "@/views/dashboard/ehr/conditions/clinical-dialog.vue";
  import { Options, Vue } from "vue-class-component";
  import { Prop, PropSync, Watch } from "vue-property-decorator";
  import { namespace } from "vuex-class";

  const account = namespace("user");

  @Options({
    components: {
      ClinicalDialog,
      CornieRadio,
      CornieInput,
      CornieSelect,
    },
    emits: ["reloadPayment"],
  })
  export default class NewWalletPayment extends Vue {
    @PropSync("modelValue", { type: Boolean, default: false })
    show!: boolean;

    @Prop({ type: Object })
    walletD!: any;

    @Prop()
    accountId!: string;

    @account.Getter
    corniePatient!: any;

    currentComponent = "createNew";
    name: string = "";
    walletID: string = "";
    walletCurrency: string = "NGN";
    walletBalance: string = "";
    loading = false;
    walletTypes = [
      {
        text: "Create New",
        value: "createNew",
      },
      {
        text: "Add Existing",
        value: "existingWallet",
      },
    ];

    walletDetails: any = {};
    get payload() {
      return {
        accountType: this.corniePatient?.accountType,
        type: "wallet",
        ownerId: this.corniePatient?.id,
        wallet: {
          walletName: this.name,
        },
      };
    }
    get buttonText() {
      if (this.walletDetails?.walletId && !this.walletD) {
        return "Close";
      }
      return "Save";
    }

    @Watch("walletD", { deep: true, immediate: true })
    setW() {
      this.setWallet();
    }
    setWallet() {
      console.log("wallet", this.walletD);
      if (!this.walletD) return;
      this.name = this.walletDetails?.walletName;
      this.walletDetails = { ...this.walletD };
    }
    async save() {
      if (!this.name) return;
      if (this.walletDetails?.walletId && !this.walletD) {
        this.show = false;
        return;
      }
      try {
        this.loading = true;
        let response;
        if (this.accountId) {
          response = await cornieClient().put(
            `/api/v1/patient-portal/payment/${this.accountId}`,
            this.payload
          );
        } else {
          response = await cornieClient().post(
            `/api/v1/patient-portal/payment`,
            this.payload
          );
        }
        console.log("response:", response.data);
        const { account } = response.data;
        this.walletDetails = account.wallet;
        window.notify({
          msg: "Payment account added successfully",
          status: "success",
        });
        this.loading = false;
        // this.show = false;
        this.$emit("reloadPayment");
      } catch (error) {
        this.loading = false;
        window.notify({
          msg: "Error updating payment account",
          status: "error",
        });
      }
    }

    mounted(): void {
      console.log("wallet", this.walletD);
      this.setWallet();
    }
  }
</script>
