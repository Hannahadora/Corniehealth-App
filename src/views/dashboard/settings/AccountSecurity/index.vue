<template>
  <main class="px-6 w-full">
    <h2 class="font-semibold text-lg pb-2 border-b border-primary text-primary">
      Account Security
    </h2>
    <div class="w-full flex flex-col">
      <div class="w-full mt-10">
        <h3 class="font-semibold">Password</h3>
        <span class="text-sm mt-2 flex items-center">
          Cornie Health enforces a strict password policy to ensure you adopt a
          strong password.
          <span @click="showPolicy" class="text-blue-600 ml-2 cursor-pointer">
            View Password
          </span>
        </span>
      </div>

      <security-action
        title="Two Factor Authentication"
        text="You can further secure your account by setting a madatory 2FA policy
            for all your users."
        tooltip="Admin can enable security question and 2FA for the rest of the
              users in any account. When enabled users MUST set-up their
              security questions and 2FA in their next login."
      >
        <two-factor-settings />
      </security-action>
    </div>
    <password-policy v-model:visible="viewPolicy" />
  </main>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import PasswordPolicy from "./components/passwordpolicy.vue";
import Tooltip from "./components/tooltip.vue";
import CornieBtn from "@/components/CornieBtn.vue";
import SecBtn from "./components/sec-button.vue";
import SecurityAction from "./components/action.vue";
import TwoFactorSettings from "./components/twofactor.vue";

@Options({
  name: "AdminAccountSecurity",
  components: {
    TwoFactorSettings,
    PasswordPolicy,
    SecBtn,
    SecurityAction,
    Tooltip,
    CornieBtn,
  },
})
export default class extends Vue {
  viewPolicy = false;

  showPolicy() {
    this.viewPolicy = true;
    console.log("Okay");
  }
}
</script>
