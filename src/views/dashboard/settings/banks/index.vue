<template>
  <div class="flex justify-center  bg-white shadow-md p-3 mt-2 mb-2 rounded w-full">
    <div class="w-full">
    <span
        class="
          flex
          flex-col
          w-full
          justify-center
          border-b-2
          font-bold
          mb-10
          text-xl text-primary
          py-2
        "
      >
        Bank & Accounts
      </span>
      <span class="w-full h-screen">
          <bank-accounts-existing-state/>
      </span>
    </div>
  </div>
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";
import BankAccountsExistingState from "./exisitingState.vue";
import { namespace } from "vuex-class";


@Options({
  name: "BanksAndAccounts",
  components: {
    BankAccountsExistingState,
  },
})
export default class BankAccountsIndex extends Vue {
  
 
  created() {
 
  }

}
</script>
