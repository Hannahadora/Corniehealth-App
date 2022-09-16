<template>
  <clinical-dialog v-model="show" :title="'View Wallet'" class="w-3/4 h-full">
    <div class="flex flex-col space-y-7">
      <div class="p-4 bg-blue-200 text-sm space-y-3">
        <p>
          We charge a processing fee of N100 each time you fund your wallet
          account.
        </p>
        <p>
          Fund transfers to your wallet account appear in your available balance
          within 24hrs. Before then, the net amount transferred will appear
          under 'Unsettled Balance'.
        </p>
        <p>
          Regular transaction charges capped at N50 per transaction apply when
          you pay for healthcare services.
        </p>
      </div>
      <div class="flex items-center justify-end">
        <div
          @click="fundWallet"
          class="bg-danger p-2 rounded-xl text-white font-bold px-8 py-3 mx-2 cursor-pointer"
        >
          Fund Wallet
        </div>
      </div>
      <div
        class="flex w-full flex-col md:flex-row md:space-y-0 shadow-sm capitalize"
      >
        <div
          class="flex md:border-r md:border w-full p-2 items-center space-x-2"
        >
          <img src="@/assets/img/wallet-account-profile.svg" />
          <div class="flex flex-col">
            <p class="text-gray-400 uppercase">Account Name</p>
            <p class="font-bold">{{ walletOverView.accountName }}</p>
          </div>
        </div>
        <div
          class="flex md:border-r md:border w-full p-2 items-center space-x-2"
        >
          <img src="@/assets/img/topup-wallet-blue.svg" />
          <div class="flex flex-col">
            <p class="text-gray-400 uppercase">Wallet ID</p>
            <p class="font-bold">{{ walletOverView.walletId }}</p>
          </div>
        </div>
        <div
          class="flex md:border-r md:border w-full p-2 items-center space-x-2"
        >
          <img src="@/assets/img/wallet-account-unsettled.svg" />
          <div class="flex flex-col">
            <p class="text-gray-400 uppercase">Unsettled bal. (NGN)</p>
            <p class="font-bold">₦ {{ walletOverView.unsettledBalance }}</p>
          </div>
        </div>
        <div
          class="flex md:border-r md:border w-full p-2 items-center space-x-2"
        >
          <img src="@/assets/img/wallet-account-availableB.svg" />
          <div class="flex flex-col">
            <p class="text-gray-400 uppercase">Available bal. (NGN)</p>
            <p class="font-bold">₦ {{ walletOverView.availableBalance }}</p>
          </div>
        </div>
      </div>
      <div class="flex space-x-9 w-full capitalize">
        <div class="flex md:flex-1 items-center space-x-2">
          <span
            :class="{
              'bg-red-500': walletOverView.status !== 'active',
              'bg-green-500': walletOverView.status == 'active',
            }"
            class="rounded-full w-3 h-3"
          ></span>
          <span>{{ walletOverView.status }}</span>
        </div>
        <div class="flex space-x-1">
          <img src="@/assets/img/eye-closed.svg" />
          <span class="text-gray-400">View History</span>
        </div>
        <div
          @click="deactivateWallet"
          class="flex space-x-2 items-center cursor-pointer"
        >
          <Cancel class="text-danger fill-current" />
          <span>Deactivate</span>
        </div>
      </div>
    </div>
  </clinical-dialog>
</template>
<script lang="ts">
  import { cornieClient } from "@/plugins/http";
  import ClinicalDialog from "@/views/dashboard/ehr/conditions/clinical-dialog.vue";
  import Cancel from "@/views/dashboard/visits/components/cancel.vue";
  import { Options, Vue } from "vue-class-component";
  import { Prop, PropSync, Watch } from "vue-property-decorator";

  @Options({
    components: {
      ClinicalDialog,
      Cancel,
    },
  })
  export default class ViewWallet extends Vue {
    @PropSync("modelValue", { type: Boolean, default: false })
    show!: boolean;

    @Prop()
    walletId!: string;

    walletOverView = {
      accountName: "",
      walletId: "",
      unsettledBalance: 0,
      availableBalance: 0,
      status: "",
      id: "",
    };

    walletTransaction = [];

    fundWallet() {}

    @Watch("walletId")
    async fetchW() {
      await this.getWalletOverView();
      await this.getWalletTransactions();
    }

    async getWalletOverView() {
      if (!this.walletId) return;
      try {
        const response = await cornieClient().get(
          `/api/v1/patient-portal/wallet/${this.walletId}/overview`
        );
        this.walletOverView = response?.data;
      } catch (error) {
        window.notify({
          msg: "Error fetching wallet overview",
          status: "error",
        });
      }
    }

    async getWalletTransactions() {
      if (!this.walletId) return;
      try {
        const response = await cornieClient().get(
          `/api/v1/patient-portal/wallet/${this.walletId}/transactions`
        );
        this.walletTransaction = response?.data;
      } catch (error) {
        window.notify({
          msg: "Error fetching wallet overview",
          status: "error",
        });
      }
    }

    async deactivateWallet() {
      this.show = false;
      const confirmed = await window.confirmAction({
        message: "Are you sure you want to deactivate this Wallet Account?",
        submessage:
          "*Note: You will not be able to make payments for your healthcare services with this Account once deactivated.",
        title: "Deactivate Wallet",
      });
      if (!confirmed) return;
      try {
        const response = await cornieClient().patch(
          `/api/v1/patient-portal/wallet/${this.walletId}/deactivate`,
          {}
        );
        // this.walletOverView = response?.data;
        await this.getWalletOverView();
        window.notify({
          msg: "Wallet deactivated",
          status: "success",
        });
        this.$emit("reloadPayment");
      } catch (error) {
        window.notify({
          msg: "Error deactivating wallet",
          status: "error",
        });
      }
    }

    async mounted(): Promise<void> {
      await this.getWalletOverView();
      await this.getWalletTransactions();
    }
  }
</script>
