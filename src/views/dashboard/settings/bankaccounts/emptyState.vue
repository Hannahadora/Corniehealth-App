<template>
  <div class="w-full h-full flex flex-col justify-center items-center">
    <img src="@/assets/img/nobank.svg" />
    <h3 class="text-center text-black mt-5">{{ msg }}</h3>
    <h4 class="text-black text-center">Add new account</h4>
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
      "
      @click="$emit('add-account')"
    >
      <span class="mt-2 mr-2"> <bank-add-icon /> </span>
      New Account
    </button>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";

@Options({})
export default class BankEmptyState extends Vue {
  msg!: string;
}
</script>
