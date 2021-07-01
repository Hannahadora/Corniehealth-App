<template>
  <div class="h-full flex justify-center">
    <bank-empty-state  msg='No payment account recorded' v-if='false'/>  
    <bank-accounts-existing-state />
  </div>
</template>

<script lang="ts">
import BankEmptyState  from "../emptyState.vue";
import BankAccountsExistingState from "./existingState.vue";

export default {
  name: "Payment",
  components: {
     BankEmptyState,
     BankAccountsExistingState
  },
}
</script>
