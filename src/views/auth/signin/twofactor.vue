<template>
  <div class="block rounded-lg bg-white">
    <form
      class="w-full h-full flex flex-col md:py-12 py-4 md:px-9 px-4"
      @submit="submit"
    >
      <div class="flex flex-col" v-if="requiresTwoFactor">
        <h3 class="font-bold text-primary text-3xl mb-4">Sign-In Protection</h3>
        <p class="block text-sm p-4" style="background: #f6f8f9">
          Your admin has setup a mandatory use of 2FA for account Sign In. Enter
          the 6 digits code sent to your account email to continue.
        </p>
      </div>
      <div class="flex flex-col mb-44" v-else>
        <h3 class="font-bold text-primary text-4xl mb-5">Sign-In Protection</h3>
        <p class="block text-base">2FA Verification not available</p>
      </div>
      <div class="flex flex-col w-full my-12" v-if="requiresTwoFactor">
        <h3 class="font-bold text-primary text-lg">
          Enter your 2FA Verification Code
        </h3>
        <span class="items-center flex">
          <multi-input :length="6" class="mt-2 w-full" v-model="token" />
          <check-icon class="ml-2" v-if="verifiedSync" />
        </span>
        <p class="mt-4 text-sm">
          Didn’t receive code?
          <span class="cursor-pointer text-danger">Resend</span>
          <vue-countdown :time="300 * 1000" v-slot="{ minutes, seconds }">
            {{ minutes }} : {{ seconds }}
          </vue-countdown>
        </p>
      </div>
      <!-- <div class="flex flex-col mt-8 w-full" v-if="requiresSecurityQuestion">
        <h3 class="font-bold text-primary text-lg">
          2 of 2: Answer your security question
        </h3>
        <span class="text-xs text-primary font-semibold block mb-3">
          Please answer your security question to complete your login
        </span>
        <label class="mb-5">
          <span class="font-semibold">What is your mother’s maiden name?</span>
          <cornie-input placeholder="Answer" class="w-full" />
          <span
            class="text-right text-xs text-primary block w-full font-semibold"
          >
            Forgot Answer?
          </span>
        </label>
      </div> -->
      <div class="flex items-center justify-center mt-auto w-full mt-12">
        <cornie-btn
          type="submit"
          :loading="loading"
          class="py-1 px-3 w-full bg-danger text-white font-semibold rounded-lg"
        >
          Submit
        </cornie-btn>
      </div>
    </form>
  </div>
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";
import { Prop, PropSync, Watch } from "vue-property-decorator";
import MultiInput from "@/components/multi-input.vue";
import CornieInput from "@/components/cornieinput.vue";
import CheckIcon from "@/components/icons/check.vue";
import store from "@/store";
import { quantumClient } from "@/plugins/http";
import VueCountdown from "@chenfengyuan/vue-countdown";
import { fetchCornieData } from "@/plugins/auth";

@Options({
  components: {
    MultiInput,
    CornieInput,
    CheckIcon,
    VueCountdown,
  },
})
export default class TwoFactor extends Vue {

  get requiresSecurityQuestion() {
    return store.state.user.requiresSecurityQuestion;
    // return true;
  }

  get requiresTwoFactor() {
    return store.state.user.requiresTwoFactorAuth;
    // return true;
  }

  token = "";
  loading = false;
  countDown = 10;
  verifiedSync = false;

  get twoFactorPayload() {
    return {
      userId: store.state.user.user.id,
      twoFAToken: this.token,
    };
  }

  get securityQuestionPayload() {
    return {
      // this is not implemented by quantum yet so it is empty
    };
  }

  countDownTimer() {
    if (this.countDown > 0) {
      setTimeout(() => {
        this.countDown -= 1;
        this.countDownTimer();
      }, 10000);
    } else if ((this.countDown = 0)) {
      this.$router.push("/login");
    }
  }

  async submit() {
    this.loading = true;
    if (this.requiresTwoFactor) {
      await this.submitTwoFactor();
    } else {
      await this.submitSecurityAnswer();
    }
    this.loading = false;
  }

  async submitTwoFactor() {
    try {
      await quantumClient().post(
        "/org/security/2fa/token/verify",
        this.twoFactorPayload
      );
      this.verifiedSync = true;
      await fetchCornieData()
      this.$router.push("/dashboard");
    } catch (error) {
      console.log(error)
      window.notify({
        msg: "An error occured, please try again",
        status: "error",
      });
    }
  }

  async submitSecurityAnswer() {
    // not implemented
  }

  mounted() {
    this.$emit("change-path");
    this.countDownTimer();
  }
}
</script>
