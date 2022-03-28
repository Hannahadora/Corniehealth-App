<template>
  <div class="block rounded-lg bg-white">
    <form class="w-full h-full flex flex-col py-9 px-12">
      <div class="flex flex-col" v-if="requiresTwoFactor">
        <h3 class="font-bold text-primary text-4xl mb-5">Sign-In Protection</h3>
        <p class="block text-sm">
          This helps us verify your identity. You can enable or disable this in
          your profile account settings.
        </p>
      </div>
      <div class="flex flex-col mb-44" v-else>
        <h3 class="font-bold text-primary text-4xl mb-5">Sign-In Protection</h3>
        <p class="block text-sm">2FA Verification not available</p>
      </div>
      <div class="flex flex-col w-full" v-if="requiresTwoFactor">
        <h3 class="font-bold text-primary text-lg">
          1 of 2: Enter your 2FA Verification Code
        </h3>
        <span class="items-center flex">
          <multi-input :length="6" class="mt-2 w-full" v-model="token" />
          <check-icon class="ml-2" />
        </span>
      </div>
      <div class="flex flex-col mt-8 w-full" v-if="requiresSecurityQuestion">
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
      </div>
      <div class="flex items-center justify-center mt-auto w-full">
        <cornie-btn
          v-if="requiresTwoFactor"
          type="submit"
          :loading="loading"
          class="py-1 px-3 w-1/3 bg-danger text-white font-semibold rounded-lg"
        >
          Submit
        </cornie-btn>
        <cornie-btn
          else
          @click="$router.push('/signup')"
          type="button"
          class="py-1 px-3 w-1/3 bg-gray-600 text-white font-semibold rounded-lg"
        >
          Back
        </cornie-btn>
      </div>
    </form>
  </div>
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";
import MultiInput from "@/components/multi-input.vue";
import CornieInput from "@/components/cornieinput.vue";
import CheckIcon from "@/components/icons/check.vue";
import store from "@/store";
import { quantumClient } from "@/plugins/http";

@Options({
  components: {
    MultiInput,
    CornieInput,
    CheckIcon,
  },
})
export default class TwoFactor extends Vue {
  get requiresSecurityQuestion() {
    return store.state.user.requiresSecurityQuestion;
  }

  get requiresTwoFactor() {
    return store.state.user.requiresTwoFactorAuth;
  }

  token = "";
  loading = false;
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
      this.$router.replace("/dashboard");
    } catch (error) {
      alert("An error occured, please try again");
    }
  }

  async submitSecurityAnswer() {
    // not implemented
  }

  mounted() {
    this.$emit('change-path')
  }
}
</script>
