<template>
  <main class="p-6 ">
    <h3
    class='
    text-primary
    text-xl
    font-bold
    border-b border-gray-300
    '
    >
      Account Security</h3>
    <section class="acc-main">
      <div class="flex justify-between my-10">
        <div>
          <h4 class='text-lg font-bold'>Password</h4>
          <p
           class='
              text-base
              text-black
              flex
            '
          >
            The same password strength are enforced for all users across the
            app.
            <a
              @click="viewPolicy = !viewPolicy"
              class="ml-1  text-blue-600 cursor-pointer text-xs"
            >
              VIEW POLICY
            </a>
          </p>
        </div>
        <div v-if="!isShowingPassword">
          <button 
            class='
              bg-white
              border
              border-gray-300
              rounded-3xl
              font-bold
              text-center
              text-primary
              py-3
              px-3
              '
          ref="pass" @click="displayUpadtePassword()">
            Update Password
          </button>
        </div>
      </div>
      <div v-if="displayPasswordSetting">
               <span
          class="cursor-pointer flex items-center justify-end"
           @click="closeUpadtePassword()"
        >
          <close-icon />
        </span>
        <update-password/>
      </div>
      <div class="flex justify-between my-10">
        <div>
          <h4 
          class='text-lg font-bold'
          >Two Factor Authentication</h4>
          <p
           class='
            text-base
            text-black
            flex
          '
          >
            Two factor authentication enforced for all users within your domain.
           <notification-icon class="cursor-pointer"/>
          </p>
        </div>
        <div v-if="!isShowingTwoFactor">
          <button
            class='
               bg-white
              border
              border-gray-300
              rounded-3xl
              font-bold
              text-center
              text-primary
              py-3
              px-3
                '
           @click="displayTwoFactorAuth()">Configure</button>
        </div>
      </div>
       <div v-if="displayTwoFactor">
        <span
          class="cursor-pointer flex items-center justify-end"
           @click="closeTwoFactor()"
        >
          <close-icon />
        </span>
      <TwoFactorAuth />
    </div>
    </section>
    <password-policy v-model:visible="viewPolicy" />
  </main>
</template>


<script>
import UpdatePassword from "./UpdatePassword.vue";
import TwoFactorAuth from "./TwoFactorAuth.vue";
import PasswordPolicy from "./passwordpolicy.vue";
import CloseIcon from "@/components/icons/close.vue";
import NotificationIcon from "@/components/icons/notification.vue";

export default {
  name: "AccountSecurity",
  components: {
    UpdatePassword,
    TwoFactorAuth,
    CloseIcon,
    PasswordPolicy,
    NotificationIcon
  },
  data() {
    return {
      displayPasswordSetting: false,
      displayTwoFactor: false,
      viewPolicy: false,
    };
  },
  computed: {
    isShowingPassword() {
      return this.displayPasswordSetting;
    },
    isShowingTwoFactor() {
      return this.displayTwoFactor;
    },
  },
  methods: {
    displayUpadtePassword() {
      this.displayPasswordSetting = true;
    },
    displayTwoFactorAuth() {
      this.displayTwoFactor = true;
    },
    closeUpadtePassword() {
      this.displayPasswordSetting = false;
    },
    closeTwoFactor() {
      this.displayTwoFactor = false;
    },
  },
};
</script>

<style scoped>
</style>
