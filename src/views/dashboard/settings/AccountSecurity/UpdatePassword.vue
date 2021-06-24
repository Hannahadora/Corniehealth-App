<template>
  <div class="border-t border-b border-gray-300">
  
    <section class='my-10 grid grid-cols-2 gap-4 '>
        <div>
      <label  
      for="currentPassword"
      class="
      font-bold
      text-base
      uppercase
      "
      > Current Password </label>
      <br />
      <password-input
                    id="currentPassword"
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
                    placeholder="Enter Password"
                    v-model="currentPassword"
                  />
    </div>
    </section>
  
    <section class="  grid grid-cols-2 gap-4">
      <div>
        <label for="NewPassword"
        class='font-bold
          text-base
          uppercase
      '
        > New Password </label>
        <br />
        <password-input
                    id="newPassword"
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
                    placeholder="Enter Password"
                    v-model="newPassword"
                  />
      </div>
      <div>
        <label for="ConfirmPassword"
        class='
        font-bold
      text-base
      uppercase
        '
        > Confirm Password </label>
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
    </section>

  <span class="flex justify-end"> 
    <button
  type="submit"
  @click ='updatePassword()'
   class='my-10 px-6 py-2  text-white appearance-none
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
                    '
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
      userId:''
    };
  },
  computed: {
    payload() {
      return {
       previousPassword: this.currentPassword,
      newPassword: this.newPassword,
      userId:store.state.user.Id
      };
    },
  },
    methods: {
    async updatePassword() {
      try {
        await quantumClient().post("/auth/change-password", this.payload);
        alert('Password Changed Suceesfully')
      } catch (error) {
        console.log( error);
      }
    },
  },
 
};
</script>

<style scoped>
</style>
