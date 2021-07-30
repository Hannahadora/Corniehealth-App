<template>
  <main class="p-6">
    <h3>Account Security</h3>
    <section class="acc-main">
      <div class="password-main">
        <div>
          <h4>Password</h4>
          <span>
            The same password strength are enforced for all users across the
            app.
            <div  @click="viewPolicy = !viewPolicy" class="ml-1 text-blue-700 mt-1 font-bold cursor-pointer text-xs">
              VIEW POLICY
            </div>
          </span>
        </div>
        <div v-if="!isShowingPassword">
          <button ref="pass" @click="displayUpadtePassword()">
            Update Password
          </button>
        </div>
      </div>
      <div v-if="displayPasswordSetting">
        <span @click="closeUpadtePassword()" class="cursor-pointer float-right relative mb-5 -top-2">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none">
          <path d="M0 4C0 1.79086 1.79086 0 4 0H20C22.2091 0 24 1.79086 24 4V20C24 22.2091 22.2091 24 20 24H4C1.79086 24 0 22.2091 0 20V4Z" fill="white"/>
          <path d="M12 2C17.53 2 22 6.47 22 12C22 17.53 17.53 22 12 22C6.47 22 2 17.53 2 12C2 6.47 6.47 2 12 2ZM15.59 7L12 10.59L8.41 7L7 8.41L10.59 12L7 15.59L8.41 17L12 13.41L15.59 17L17 15.59L13.41 12L17 8.41L15.59 7Z" fill="#211F45"/>
          </svg>
        </span>
        <UpdatePassword />
      </div>
      <div class="two-factor-box">
        <div>
          <h4>Two Factor Authentication</h4>
          <p>
            Two factor authentication enforced for all users within your domain.
            <svg class="ml-2" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
               <path d="M11 7H9V5H11V7ZM11 15H9V9H11V15ZM10 0C8.68678 0 7.38642 0.258658 6.17317 0.761205C4.95991 1.26375 3.85752 2.00035 2.92893 2.92893C1.05357 4.8043 0 7.34784 0 10C0 12.6522 1.05357 15.1957 2.92893 17.0711C3.85752 17.9997 4.95991 18.7362 6.17317 19.2388C7.38642 19.7413 8.68678 20 10 20C12.6522 20 15.1957 18.9464 17.0711 17.0711C18.9464 15.1957 20 12.6522 20 10C20 8.68678 19.7413 7.38642 19.2388 6.17317C18.7362 4.95991 17.9997 3.85752 17.0711 2.92893C16.1425 2.00035 15.0401 1.26375 13.8268 0.761205C12.6136 0.258658 11.3132 0 10 0Z" fill="#211F45"/>
            </svg>
          </p>
        </div>
        <div v-if="!isShowingTwoFactor">
          <button @click="displayTwoFactorAuth()">Configure</button>
        </div>
      </div>
      <div v-if="displayTwoFactor">
        <span @click="closeTwoFactor()" class="cursor-pointer float-right relative mb-5 -top-2">
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M10 0C15.53 0 20 4.47 20 10C20 15.53 15.53 20 10 20C4.47 20 0 15.53 0 10C0 4.47 4.47 0 10 0ZM13.59 5L10 8.59L6.41 5L5 6.41L8.59 10L5 13.59L6.41 15L10 11.41L13.59 15L15 13.59L11.41 10L15 6.41L13.59 5Z"
              fill="#211F45"
            />
          </svg>
        </span>
        <TwoFactorAuth />
      </div>
      <div class="security-box">
        <div>
          <h4>Security Questions</h4>
          <p>
            Security questions not enforced for all users within your domain.
            <svg class="ml-2" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
               <path d="M11 7H9V5H11V7ZM11 15H9V9H11V15ZM10 0C8.68678 0 7.38642 0.258658 6.17317 0.761205C4.95991 1.26375 3.85752 2.00035 2.92893 2.92893C1.05357 4.8043 0 7.34784 0 10C0 12.6522 1.05357 15.1957 2.92893 17.0711C3.85752 17.9997 4.95991 18.7362 6.17317 19.2388C7.38642 19.7413 8.68678 20 10 20C12.6522 20 15.1957 18.9464 17.0711 17.0711C18.9464 15.1957 20 12.6522 20 10C20 8.68678 19.7413 7.38642 19.2388 6.17317C18.7362 4.95991 17.9997 3.85752 17.0711 2.92893C16.1425 2.00035 15.0401 1.26375 13.8268 0.761205C12.6136 0.258658 11.3132 0 10 0Z" fill="#211F45"/>
            </svg>
          </p>
        </div>
        <div v-if="!isShowingSecurity">
          <button @click="displaySecurityQuestion()">Configure</button>
        </div>
      </div>
        <div v-if="displaySecurity">
          <span @click="closeSecurity()" class="cursor-pointer float-right relative mb-5 -top-2">
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M10 0C15.53 0 20 4.47 20 10C20 15.53 15.53 20 10 20C4.47 20 0 15.53 0 10C0 4.47 4.47 0 10 0ZM13.59 5L10 8.59L6.41 5L5 6.41L8.59 10L5 13.59L6.41 15L10 11.41L13.59 15L15 13.59L11.41 10L15 6.41L13.59 5Z"
                fill="#211F45"
              />
            </svg>
          </span>
          <SecurityQuestion />
        </div>
    </section>
    
    <password-policy v-model:visible="viewPolicy" />
  </main>
</template>

<script>
import UpdatePassword from "./UpdatePassword.vue";
import TwoFactorAuth from "./TwoFactorAuth.vue";
import PasswordPolicy from "./passwordpolicy.vue";
import SecurityQuestion from "./SecurityQuestion.vue";

export default {
  name: "AccountSecurity",
  components: {
    UpdatePassword,
    TwoFactorAuth,
    PasswordPolicy,
    SecurityQuestion,
  },
  data() {
    return {
      displayPasswordSetting: false,
      displayTwoFactor: false,
      viewPolicy: false,
      displaySecurity: false,
    };
  },
  computed: {
    isShowingPassword() {
      return this.displayPasswordSetting;
    },
    isShowingTwoFactor() {
      return this.displayTwoFactor;
    },
    isShowingSecurity() {
      return this.displaySecurity;
    },
  },
  methods: {
    displayUpadtePassword() {
      this.displayPasswordSetting = true;
      this.displayTwoFactor = false;
      this.displaySecurity = false;
    },
    displayTwoFactorAuth() {
      this.displayPasswordSetting = false;
      this.displayTwoFactor = true;
      this.displaySecurity = false;
    },
    displaySecurityQuestion() {
      this.displayPasswordSetting = false;
      this.displayTwoFactor = false;
      this.displaySecurity = true;
    },
    closeUpadtePassword() {
      this.displayPasswordSetting = false;
    },
    closeTwoFactor() {
      this.displayTwoFactor = false;
    },
    closeSecurity() {
      this.displaySecurity = false;
    },
  },
};
</script>

<style scoped>
main {
  margin: 20px;
}

h3 {
  font-family: Inter;
  font-style: normal;
  font-weight: bold;
  font-size: 20px;
  line-height: 28px;
  color: #211F45;
  border-bottom: 1px solid #b8c3de;
}
h4 {
  font-family: Inter;
  font-style: normal;
  font-weight: bold;
  font-size: 18px;
  line-height: 27px;
  color: #2b2b2b;
  margin: 4px 0px;
}
p {
  font-family: Inter;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 20px;
  color: #2b2b2b;
  display: flex;
}
button {
  background: #ffffff;
  border: 1px solid #211F45;
  box-sizing: border-box;
  border-radius: 124px;
  font-family: Inter;
  font-style: normal;
  font-weight: bold;
  font-size: 16px;
  line-height: 24px;
  text-align: center;
  color: #211F45;
  width: 200px;
  height: 50px;
}
.password-main,
.two-factor-box,.security-box {
  display: flex;
  justify-content: space-between;
  margin: 50px 0px;
}
.password-main p a {
  color: #3454d1;
}
.update-password-button {
  background: #FE4D3C;
  border-radius: 124px;
  border: none;
}
</style>
