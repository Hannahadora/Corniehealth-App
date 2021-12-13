<template>
  <div class="border-t border-b border-gray-300">
    <div class="flex mt-10 mb-6 items-center">
      <ToogleCheck
        v-model="twoFA"
        class="mx-2"
        checkedText="Enabled"
        uncheckedText="Disabled"
      />
    </div>
    <div class="flex items-center">
      <list-boxes types="checkbox" class="mt-2" />
      <span class="ml-2"
        >Enforce two factor authentication during sign in for all users within
        your domain.</span
      >
      <div class="cursor-pointer ml-2 my-auto">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
        >
          <path
            d="M11 7H9V5H11V7ZM11 15H9V9H11V15ZM10 0C8.68678 0 7.38642 0.258658 6.17317 0.761205C4.95991 1.26375 3.85752 2.00035 2.92893 2.92893C1.05357 4.8043 0 7.34784 0 10C0 12.6522 1.05357 15.1957 2.92893 17.0711C3.85752 17.9997 4.95991 18.7362 6.17317 19.2388C7.38642 19.7413 8.68678 20 10 20C12.6522 20 15.1957 18.9464 17.0711 17.0711C18.9464 15.1957 20 12.6522 20 10C20 8.68678 19.7413 7.38642 19.2388 6.17317C18.7362 4.95991 17.9997 3.85752 17.0711 2.92893C16.1425 2.00035 15.0401 1.26375 13.8268 0.761205C12.6136 0.258658 11.3132 0 10 0Z"
            fill="#080056"
          />
        </svg>
      </div>
    </div>
    <div class="grid grid-cols-3 gap-x-16 my-10 border-t-2 border-dashed">
      <div class="col-span-2 mt-10">
        <label for="otp"> Enter the one time pin sent to you email </label>
        <br />
        <input
          autocomplete="false"
          type="text"
          id="otp"
          placeholder="Enter OTP"
          v-model="otp"
          class="appearance-none w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
        />
        <br />
        <p class="text-danger font-bold cursor-pointer" @click="sendCode">
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
          class="appearance-none w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
          placeholder="Confirm New Password"
          v-model="ConfirmPassword"
        />
      </div>
    </div>

    <span class="flex justify-end">
      <button
        type="submit"
        @click="saveTwoFactor()"
        class="my-10 px-6 py-2 flex justify-end text-white appearance-none border-none bg-danger rounded-3xl placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
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
      ;
    },
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
