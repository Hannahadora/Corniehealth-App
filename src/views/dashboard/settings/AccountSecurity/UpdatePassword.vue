<template>
  <div class="border-t border-b border-primary-300">
    <div class="flex mt-10 mb-6 items-center">
      <div class="grid-cols-1 my-10">
        <label for="currentPassword" class="font-bold text-base uppercase mb-5">
          Current Password
        </label>
        <password-input
          class="appearance-none w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 sm:text-sm sm:leading-5"
          placeholder="Enter Password"
          v-model="currentPassword"
        />
      </div>
    </div>
    <div class="flex grid grid-cols-2 gap-4 my-10">
      <div>
        <label for="NewPassword" class="font-bold text-base uppercase mb-5">
          New Password
        </label>
        <password-input
          class="appearance-none w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
          placeholder="Enter Password"
          v-model="newPassword"
        />
      </div>
      <div>
        <label for="ConfirmPassword" class="font-bold text-base uppercase mb-5">
          Confirm Password
        </label>
        <password-input
          class="appearance-none w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
          placeholder="Confirm New Password"
          v-model="ConfirmPassword"
        />
      </div>
    </div>
    <span class="flex justify-end">
      <button
        type="submit"
        @click="updatePassword()"
        class="my-10 px-6 py-2 text-white appearance-none border-none bg-danger rounded-3xl placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
      >
        Save
      </button>
    </span>
  </div>
</template>

<script>
import PasswordInput from "@/components/PasswordInput.vue";
import { quantumClient } from "@/plugins/http";
import store from "@/store";

export default {
  name: "UpdatePassword",
  components: {
    PasswordInput,
  },
  data() {
    return {
      currentPassword: "",
      newPassword: "",
      userId: "",
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
      try {
        await quantumClient().post("auth/change-password", this.payload);
        alert("Password Changed Succesfully");
      } catch (error) {
        alert("An error occured when changing your password");
      }
    },
  },
};
</script>

<style scoped></style>
