<template>
  <div class="border-t border-b border-gray-300">
    <div class="flex mt-10 mb-6 items-center">
      Disabled
      <ToogleCheck v-model="twoFA" class="mx-4" />
      Enabled
    </div>
    <div class="flex items-center">
      <list-boxes types="checkbox" class="mt-2" />
      <span class="ml-2"
        >Enforce two factor authentication during sign in for all users within
        your domain.</span
      >
      <notification-icon class="cursor-pointer ml-2 my-auto" />
    </div>
    <div class="grid grid-cols-3 gap-x-16 my-10">
      <div class="col-span-2 mt-10">
        <label for="otp"> Enter the one time pin sent to you email </label>
        <br />
        <input
          type="text"
          id="otp"
          placeholder="Enter OTP"
          v-model="otp"
          class="
            appearance-none
            w-full
            px-3
            py-2
            border border-gray-300
            rounded-md
            placeholder-gray-400
            focus:outline-none
            focus:shadow-outline-blue
            focus:border-blue-300
            transition
            duration-150
            ease-in-out
            sm:text-sm
            sm:leading-5
          "
        />
        <br />
        <p class="text-pink-600 font-bold cursor-pointer" @click="sendCode">
          SEND CODE
        </p>
      </div>

      <div class="grid-cols-3 my-10">
        <label for="Password" class="font-bold text-base uppercase">
          Confirm Password
        </label>
        <br />
        <password-input
          id="ConfirmPassword"
          required
          class="
            appearance-none
            w-full
            px-3
            py-2
            border border-gray-300
            rounded-md
            placeholder-gray-400
            focus:outline-none
            focus:shadow-outline-blue
            focus:border-blue-300
            transition
            duration-150
            ease-in-out
            sm:text-sm
            sm:leading-5
          "
          placeholder="Confirm New Password"
          v-model="ConfirmPassword"
        />
      </div>
    </div>

    <span class="flex justify-end">
      <button
        type="submit"
        @click="saveTwoFactor()"
        class="
          my-10
          px-6
          py-2
          flex
          justify-end
          text-white
          appearance-none
          border-none
          bg-pink-600
          rounded-3xl
          placeholder-gray-400
          focus:outline-none
          focus:shadow-outline-blue
          focus:border-blue-300
          transition
          duration-150
          ease-in-out
          sm:text-sm
          sm:leading-5
        "
      >
        Save
      </button>
    </span>
  </div>
</template>

<script>
import ListBoxes from "@/components/ListBoxes.vue";
import ToogleCheck from "@/components/ToogleCheck.vue";
import NotificationIcon from "@/components/icons/notification.vue";
import PasswordInput from "@/components/PasswordInput.vue";
import { quantumClient } from "@/plugins/http";
import store from "@/store";

export default {
  name: "TwoFactorAuth",
  components: {
    ListBoxes,
    ToogleCheck,
    NotificationIcon,
    PasswordInput,
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
    saveTwoFactor() {
      console.log("Two Factor Completely Setup");
    },
    async sendCode() {
      const payload = {
        userId: store.state.user.user.id,
        email: store.state.user.user.email,
      };
      try {
        await quantumClient().post("/org/security/2fa/setup/otp", payload);
        alert("Code has been sent to your email " + payload.email);
      } catch (error) {
        alert("Code not sent please try again");
      }
    },
    async turnOn() {
      try {
        await quantumClient().post("/org/security/2fa/setup", this.payloadOn);
        alert("Turned ON Two-Factor Suceesfully");
      } catch (error) {
        console.log(error);
      }
    },
    async turnOff() {
      try {
        await quantumClient().post(
          "/org/security/2fa/status/off",
          this.payloadOff
        );
        alert("Turned Off Two-Factor Suceesfully");
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>

<style scoped></style>
