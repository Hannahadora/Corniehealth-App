<template>
  <div class="w-1/2 flex flex-col justify-center items-center">
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
    >
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
