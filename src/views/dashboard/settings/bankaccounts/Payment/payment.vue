<template>
  <div class="h-screen flex justify-center">
    <AddPaymentAccount v-if="addAccount" />
    <template v-else>
      <bank-accounts-existing-state
        v-if="hasPayments"
        @add-account="addAccount = true"
      />
      <bank-empty-state
        v-if="!hasPayments"
        @add-account="addAccount = true"
        msg="No payment account recorded"
      />
    </template>
  </div>
</template>

<script>
import BankEmptyState from "../emptyState.vue";
import BankAccountsExistingState from "./existingState.vue";
import AddPaymentAccount from "./addPaymentAccount.vue";
import IPayment from "@/types/IPayment";

import { cornieClient } from "@/plugins/http";

export default {
  name: "Payment",
  components: {
    BankEmptyState,
    BankAccountsExistingState,
    AddPaymentAccount,
  },
  data() {
    return {
      addAccount: false,
      hasPayments: false,
    };
  },
  async created() {
    const OrgPayments = cornieClient().get(
      "/api/v1/payments/myOrg/getMyOrgPayments"
    );
    const response = await OrgPayments;
    if (response.data.length > 0) {
      this.hasPayments = true;
    }
  },
};
</script>
