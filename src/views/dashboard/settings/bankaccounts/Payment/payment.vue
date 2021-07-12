<template>
  <div class="h-screen flex justify-center">
    <AddPaymentAccount v-if="addAccount" :payment="payment"  @add-account="addAccount = true" />
    <template v-else>
      <bank-accounts-existing-state
         v-if="!empty"
        @update-payment="updatePayment"
         :payments="payments"
        @add-account="onAddAccount"
      />
      <bank-empty-state
        v-else
        @add-account="addAccount = true"
        msg="No payment account recorded"
      />
    </template>
  </div>
</template>

<script  lang="ts">
import { Options, Vue } from "vue-class-component";
import BankEmptyState from "../emptyState.vue";
import BankAccountsExistingState from "./existingState.vue";
import AddPaymentAccount from "./addPaymentAccount.vue";
import IPayment from "@/types/IPayment";
import { cornieClient } from "@/plugins/http";



@Options({
  components: {
      BankEmptyState,
    BankAccountsExistingState,
    AddPaymentAccount,
  },
})
export default class Payment extends Vue {
  addAccount = false;

  payment = {} as  IPayment;

editPayments = {};
 payments = [] as  IPayment[];

  updatePayment(payment: any) {
    this.payment = payment;
    this.addAccount = true;
  }
  onAddAccount(payload: IPayment){
    console.log(payload);
    console.log("payload", payload);
    this.payment = payload;
    this.addAccount = true;
  }
  get empty() {
    return this.payments.length < 1;
  }
  async fetchPayments() {
    try {
      const response = await cornieClient().get(
        "/api/v1/payments/myOrg/getMyOrgPayments"
      );
      if (response.success){
          this.payments = [...response.data];
      } 
      else console.log(response.message);
    } catch (error) {
      console.log("failed to fetch payments");
    }
  }
  paymentAdded() {
    this.addAccount = false;
     this.payment;
  }
  created() {
    this. fetchPayments();
  }
  
};

</script>
