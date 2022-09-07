<template>
  <div
    class="flex flex-col justify-center text-center w-full h-full pt-40 items-center"
  >
    <div class="self-center">
      <!-- <empty-icon /> -->
      <img src="@/assets/img/nopaymentaccount.svg" />
    </div>
    <div class="font-bold text-xl mt-3">No Bills to Display</div>
    <p class="text-gray-600 text-sm pt-2">
      Setup your payment account to manage your healthcare bills.
    </p>
    <div></div>
    <div class="flex flex-col pt-5 space-y-4">
      <div class="">
        <div
          @click="newPaymentAccount"
          class="bg-danger p-2 rounded-xl text-white font-bold px-8 py-3 mx-2 cursor-pointer"
        >
          Setup Payment Account
        </div>
      </div>
      <div class="">
        <div
          @click="newPaymentAccount"
          class="border border-primary p-2 rounded-xl text-primary font-bold px-8 py-3 mx-2 cursor-pointer"
        >
          See Private Payment Accounts Profiles
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
  import { Options, Vue } from "vue-class-component";
  // import EmptyIcon from "./empty-icon.vue";

  @Options({
    components: {
      // EmptyIcon,
    },
    emits: ["newpaymentaccount"],
  })
  export default class EmptyState extends Vue {
    newPaymentAccount() {
      this.$emit("newpaymentaccount");
    }
  }
</script>
