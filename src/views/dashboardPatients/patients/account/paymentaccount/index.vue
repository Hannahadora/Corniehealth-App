<template>
  <div
    class="flex-col justify-center bg-white p-3 mt-2 mb-2 rounded w-full h-full overflow-auto"
  >
    <!-- <cornie-card-text>
      <div class="md:grid md:grid-cols-2 my-3 w-full">
        <div
          class="py-3 px-6"
          v-for="(optionalItem, index) in optionalItems"
          :key="index"
        >
          <cornie-card
            height="150px"
            @click="optionalItem.click"
            class="cursor-pointer hover:bg-gray-50"
          >
            <cornie-card-text class="h-full">
              <div class="flex h-full items-center">
                <component :is="optionalItem.icon" class="mx-4" />
                <div>
                  <p class="font-extrabold text-lg text-primary">
                    {{ optionalItem.name }}
                  </p>
                  <p class="text-xs text-gray-500">
                    {{ optionalItem.number }} Added
                  </p>
                </div>
              </div>
            </cornie-card-text>
          </cornie-card>
        </div>
      </div>
    </cornie-card-text> -->
    <div class="w-full">
      <empty-state
        v-if="allPatientAccount.length <= 0"
        @newpaymentaccount="() => (showNewPaymentAccount = true)"
      />
      <existing-state
        @reloadPayment="fetchPaymentAccounts"
        @newpaymentaccount="() => (showNewPaymentAccount = true)"
        :patientAccounts="allPatientAccount"
        v-else
      />
      <new-payment-account
        @continueProcess="continueProcess"
        v-model="showNewPaymentAccount"
      />
      <new-card-payment v-model="showCardPayment" />
      <new-wallet-payment v-model="showWalletPayment" />
      <new-insurance-payment
        @reloadPayment="fetchPaymentAccounts"
        v-model="showInsurancePayment"
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
    },
  })
  export default class PaymentAccount extends Vue {
    showCardPayment = false;
    showWalletPayment = false;
    allPatientAccount = [];
    showNewPaymentAccount = false;
    showInsurancePayment = false;
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
  }
</script>
