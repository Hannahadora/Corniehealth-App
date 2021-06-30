<template>
  <div class="h-full flex justify-center">
    <bank-account-empty-state v-if='false'/>
    <bank-accounts-existing-state />
  </div>
</template>

<script lang="ts">
import BankAccountEmptyState from "../emptyState.vue";
import BankAccountsExistingState from "./existingState.vue";

export default {
  name: "Payment",
  components: {
     BankAccountEmptyState,
     BankAccountsExistingState
  },
}
</script>
