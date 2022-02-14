<template>
  <div class="border-t border-b border-gray-300">
    <div
      class="flex my-2 items-center border-b-2 border-gray-300 border-dotted pb-3"
    >
      <ToogleCheck
        v-model="twoFA"
        class="mx-2"
        checkedText="Enabled"
        uncheckedText="Disabled"
      />
    </div>
    <div class="grid mb-2 grid-cols-12 gap-4">
      <div class="col-span-4">
        <label for="Password" class="text-sm mb-0">
          Enter password to confirm
        </label>
        <password-input
          id="ConfirmPassword"
          required
          class="appearance-none w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
          placeholder="Confirm New Password"
          v-model="ConfirmPassword"
        />
        <span class="flex justify-start mt-2">
          <button
            type="submit"
            @click="saveTwoFactor()"
            class="px-6 py-2 flex justify-center items.-cnter text-white appearance-none border-none bg-danger rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5 focus-within w-full text-center"
          >
            Save
          </button>
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import ListBoxes from "@/components/ListBoxes.vue";
import ToogleCheck from "@/components/ToogleCheck.vue";
import NotificationIcon from "@/components/icons/notification.vue";
import PasswordInput from "@/components/PasswordInput.vue";
import CornieCheckbox from "@/components/custom-checkbox.vue";
import { quantumClient } from "@/plugins/http";
import store from "@/store";

export default {
  name: "TwoFactorAuth",
  components: {
    ListBoxes,
    ToogleCheck,
    NotificationIcon,
    PasswordInput,
    CornieCheckbox,
  },
  data() {
    return {
      value: "",
      password: "",
      userId: "",
      token: "",
      twoFA: false,
    };
  },
  created() {
    this.twoFA = this.requiresTwoFactorAuth;
  },
  watch: {
    requiresTwoFactorAuth() {
      this.twoFA = this.requiresTwoFactorAuth;
    },
  },
  computed: {
    requiresTwoFactorAuth() {
      return store.state.user.requiresTwoFactorAuth;
    },
    payloadOff() {
      return {
        password: store.state.user.password,
        userId: store.state.user.Id,
      };
    },
    payloadOn() {
      return {
        // token not yet given
        token: this.token,
        userId: store.state.user.user.id,
      };
    },
  },
  methods: {
    saveTwoFactor() {},
    async sendCode() {
      const payload = {
        userId: store.state.user.user.id,
        email: store.state.user.user.email,
      };
      try {
        await quantumClient().post("/org/security/2fa/setup/otp", payload);
        window.notify({
          msg: "Code has been sent to your email " + payload.email,
          status: "success",
        });
      } catch (error) {
        window.notify({
          msg: "Code not sent please try again",
          status: "error",
        });
      }
    },
    async turnOn() {
      try {
        await quantumClient().post("/org/security/2fa/setup", this.payloadOn);
        window.notify({
          msg: "Turned ON Two-Factor Suceesfully",
          status: "success",
        });
      } catch (error) {
        window.notify({
          msg: "Not turned on please try again",
          status: "error",
        });
      }
    },
    async turnOff() {
      try {
        await quantumClient().post(
          "/org/security/2fa/status/off",
          this.payloadOff
        );
        window.notify({
          msg: "Turned OFF Two-Factor Succesfully",
          status: "success",
        });
      } catch (error) {
        window.notify({
          msg: "Not turned off please try again",
          status: "error",
        });
      }
    },
  },
};
</script>

<style scoped></style>
