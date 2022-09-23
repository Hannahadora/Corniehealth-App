<template>
  <div
    class="flex-col justify-center bg-white p-3 mt-2 mb-2 rounded w-full min-h-screen"
  >
    <div class="w-full">
      <empty-state
        v-if="allPatientAccount.length <= 0"
        @newpaymentaccount="() => (showNewPaymentAccount = true)"
      />
      <existing-state
        @reloadPayment="fetchPaymentAccounts"
        @newpaymentaccount="() => (showNewPaymentAccount = true)"
        :patientAccounts="allPatientAccount"
        @viewPaymentAccount="viewPaymentAccount"
        @editPaymentAccount="editPaymentAccount"
        v-else
      />
      <new-payment-account
        @continueProcess="continueProcess"
        v-model="showNewPaymentAccount"
      />
      <new-card-payment :accountId="accountId" v-model="showCardPayment" />
      <new-wallet-payment
        :walletD="walletD"
        :accountId="accountId"
        v-model="showWalletPayment"
        @reloadPayment="fetchPaymentAccounts"
      />
      <new-insurance-payment
        @reloadPayment="fetchPaymentAccounts"
        v-model="showInsurancePayment"
        :accountId="accountId"
        :insuranceD="insuranceD"
      />
      <view-wallet
        @reloadPayment="fetchPaymentAccounts"
        :walletId="walletId"
        :accountId="accountId"
        v-model="showViewWallet"
      />
    </div>
  </div>
</template>
<script lang="ts">
  import CornieCard from "@/components/cornie-card/index";
  import { cornieClient } from "@/plugins/http";
  import IPractitioner from "@/types/IPractitioner";
  import { CornieUser } from "@/types/user";
  import { Options, Vue } from "vue-class-component";
  import { namespace } from "vuex-class";
  import EmptyState from "./components/empty-state.vue";
  import existingState from "./components/existing-state.vue";
  import NewCardPayment from "./components/new-card-payment.vue";
  import NewInsurancePayment from "./components/new-insurance-payment.vue";
  import newPaymentAccount from "./components/new-payment-account.vue";
  import NewWalletPayment from "./components/new-wallet-payment.vue";
  import ViewWallet from "./components/view-wallet.vue";

  const account = namespace("user");

  @Options({
    components: {
      EmptyState,
      // ExistingState,
      // NewProgressNote,
      existingState,
      newPaymentAccount,
      ...CornieCard,
      NewWalletPayment,
      NewCardPayment,
      NewInsurancePayment,
      ViewWallet,
    },
  })
  export default class PaymentAccount extends Vue {
    showCardPayment = false;
    showWalletPayment = false;
    allPatientAccount = [];
    showNewPaymentAccount = false;
    showInsurancePayment = false;
    showViewWallet = false;
    accountId = "";
    insuranceD = "";
    walletId = "";
    walletD = "";
    @account.Getter
    cornieUser!: CornieUser;

    @account.Getter
    corniePatient!: any;

    @account.Mutation
    updatePractitioner!: (practitioners: IPractitioner[]) => void;

    @account.Getter
    authPractitioner!: IPractitioner;

    get userId() {
      return this.cornieUser?.id;
    }
    async fetchPaymentAccounts() {
      const response = await cornieClient().get(
        `/api/v1/patient-portal/payment`
      );
      this.allPatientAccount = response.data;
    }

    continueProcess(data: any) {
      const { paymentType } = data;
      if (paymentType == "Card") this.showCardPayment = true;
      if (paymentType == "Wallet") this.showWalletPayment = true;
      if (paymentType == "Insurance") this.showInsurancePayment = true;
    }
    async mounted() {
      await this.updatePractitioner(this.authPractitioner as any);
      await this.fetchPaymentAccounts();
      console.log("payment accounts", this.allPatientAccount);
    }

    viewPaymentAccount(data: any) {
      const { paymentType, accountId, insurance, wallet } = data;
      this.accountId = accountId;
      this.insuranceD = insurance;
      this.walletId = wallet?.id;
      if (paymentType == "Card") this.showCardPayment = true;
      if (paymentType == "Wallet") this.showViewWallet = true;
      if (paymentType == "Insurance") this.showInsurancePayment = true;
    }

    editPaymentAccount(data: any) {
      const { paymentType, accountId, insurance, wallet } = data;
      this.accountId = accountId;
      this.insuranceD = insurance;
      this.walletId = wallet?.id;
      this.walletD = wallet;
      if (paymentType == "Card") this.showCardPayment = true;
      if (paymentType == "Wallet") this.showWalletPayment = true;
      if (paymentType == "Insurance") this.showInsurancePayment = true;
    }
  }
</script>
