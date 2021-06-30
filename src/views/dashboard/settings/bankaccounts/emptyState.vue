<template>
  <div class="w-1/2 flex flex-col justify-center items-center my-8">
    <img src="@/assets/img/nobank.svg" />
    <h3 class="text-center mt-5">
        No payment account recorded
        <br>
       Add new account 
    </h3>
    <button
      class="
        bg-danger
        rounded-full
        text-white
        mt-5
        py-2
        px-3
        focus:outline-none
        hover:opacity-90
        flex
        cursor-pointer
      "
    >
     <span class='mt-2 mr-3'> <bank-add-icon/>  </span> 
    <p> New  Account   </p>
    </button>
  </div>
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";
import BankAddIcon from "@/components/icons/bankadd.vue"


@Options({
  components: {
      BankAddIcon
  },
})
export default class BankAccountsEmptyState extends Vue {}
</script>
