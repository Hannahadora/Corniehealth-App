<template>
  <div class="border-t border-b border-primary-300">
    <div class="grid grid-cols-12 gap-4 w-full">
      <div class="col-span-6">
        <label for="currentPassword" class="mb-0 text-sm capitalise">
          Current Password
        </label>
        <password-input
          class="appearance-none w-full border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 sm:text-sm sm:leading-5"
          placeholder="--Enter password--"
          v-model="currentPassword"
        />
      </div>
    </div>
    <div class="grid grid-cols-12 gap-4 w-full">
      <div class="col-span-6">
        <label for="NewPassword" class="mb-0 text-sm capitalise">
          New Password
        </label>
        <password-input
          class="appearance-none w-full border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
          placeholder="--Enter new password--"
          v-model="newPassword"
        />
        <password-meter :password="newPassword" />
      </div>
      <div class="col-span-6">
        <label for="ConfirmPassword" class="mb-0 text-sm capitalise">
          Confirm Password
        </label>
        <password-input
          class="appearance-none w-full border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
          placeholder="--Confirm new password--"
          v-model="ConfirmPassword"
        />
      </div>
    </div>

    <span class="flex justify-end">
      <cornie-btn
        type="submit"
        @click="updatePassword()"
        :loading="loading"
        class="py-1 px-4 mb-5 mt-5 text-white appearance-none border-none bg-danger rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
      >
        Save
      </cornie-btn>
    </span>
  </div>
</template>

<script>
import PasswordInput from "@/components/PasswordInput.vue";
import { quantumClient } from "@/plugins/http";
import store from "@/store";
import PasswordMeter from "vue-simple-password-meter";

export default {
  name: "UpdatePassword",
  components: {
    PasswordInput,
    PasswordMeter,
  },
  data() {
    return {
      currentPassword: "",
      newPassword: "",
      userId: "",
      loading: false,
    };
  },

  computed: {
    payload() {
      return {
        previousPassword: this.currentPassword,
        newPassword: this.newPassword,
        userId: store.state.user.user.id,
      };
    },
  },
  methods: {
    async updatePassword() {
      this.loading = true;
      try {
        await quantumClient().post("auth/change-password", this.payload);
        this.loading = false;
        window.notify({
          msg: "Password Changed Succesfully",
          status: "success",
        });
      } catch (error) {
        this.loading = false;
        window.notify({
          msg: "An error occured when changing your password",
          status: "error",
        });
      }
    },
  },
};
</script>

<style>
.po-password-strength-bar.risky {
  background-color: #f95e68;
  width: 10%;
  margin-right: 10px;
}
</style>
