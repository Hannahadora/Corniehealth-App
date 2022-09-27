<template>
  <div class="flex h-screen items-center justify-center">
    <div
      class="absolute top-0 flex shadow-md w-full py-5 px-3 items-center space-x-3"
    >
      <div class="flex-none">
        <img src="@/assets/img/logo.svg" />
      </div>
      <div class="flex-1">
        <h2 class="text-primary text-xl font-semibold ml-1">CornieHealth</h2>
      </div>
    </div>
    <div
      class="flex flex-col space-y-10 justify-center text-center p-10 rounded-md"
    >
      <div v-if="isSuccess" class="font-bold text-2xl text-green-400">
        Your card has been added successfully
      </div>
      <div v-else class="font-bold text-2xl text-red-500">
        Your card could not be added
      </div>
      <div class="text-sm font-light">
        Redirecting you shortly....Please wait
      </div>
    </div>
  </div>
</template>
<script lang="ts">
  import { Options, Vue } from "vue-class-component";
  @Options({
    name: "Payment success page",
  })
  export default class PaymentSuccessPage extends Vue {
    paymentResponse: any = null;

    get isSuccess() {
      return this.paymentResponse && this.paymentResponse == "true";
    }
    mounted() {
      this.paymentResponse = this.$route.query.success;
      // console.log(this.paymentResponse);
      setTimeout(() => {
        this.$router.push("/dashboard/patient/account-settings");
      }, 2000);
    }
  }
</script>
