<template>
  <div class="h-screen flex justify-center">
     
   <span class="w-full">
      <bank-empty-state
         v-if="empty"
         msg="No payment account recorded"
      />
      <bank-accounts-existing-state
           v-else
            :payments="payments"
      />
    </span>
 
  </div>
</template>

<script  lang="ts">
import { Options, Vue } from "vue-class-component";
import BankEmptyState from "../emptyState.vue";
import BankAccountsExistingState from "./existingState.vue";
import AddPaymentAccount from "./addPaymentAccount.vue";
import IPayment from "@/types/IPayment";
import { cornieClient } from "@/plugins/http";
import { namespace } from "vuex-class";

const payment = namespace("payment");

@Options({
  components: {
      BankEmptyState,
    BankAccountsExistingState,
    AddPaymentAccount,
  },
})
export default class Payment extends Vue {
  addPaymentAccount = false;
 
PaymentToUpdate = {} as IPayment;

  get empty() {
    return this.payments.length < 1;
  }

  @payment.State
  payments!: IPayment[];

  @payment.Action
  fetchPayments!: () => Promise<void>;

  created() {
    this.fetchPayments();
  }



  // updatePayment(payment: any) {
  //   this.payment = payment;
  //   this.addAccount = true;
  // }
  // onAddAccount(payload: IPayment){
  //   console.log(payload);
  //   console.log("payload", payload);
  //   this.payment = payload;
  //   this.addAccount = true;
  // }
  // get empty() {
  //   return this.payments.length < 1;
  // }
  // async fetchPayments() {
  //   try {
  //     const response = await cornieClient().get(
  //       "/api/v1/payments/myOrg/getMyOrgPayments"
  //     );
  //     if (response.success){
  //         this.payments = [...response.data];
  //     } 
  //     else console.log(response.message);
  //   } catch (error) {
  //     console.log("failed to fetch payments");
  //   }
  // }
  // paymentAdded() {
  //   this.addAccount = false;
  //    this.payment;
  // }
  // created() {
  //   this. fetchPayments();
  // }
  
};

</script>
