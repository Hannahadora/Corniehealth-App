<template>
  <main class="p-6">
    <h3>Account Security</h3>
    <section class="acc-main">
      <div class="password-main">
        <div>
          <h4>Password</h4>
          <p>
            The same password strength are enforced for all users across the
            app.
            <a
              @click="viewPolicy = !viewPolicy"
              class="ml-1 cursor-pointer text-xs"
            >
              VIEW POLICY
            </a>
          </p>
        </div>
        <div v-if="!isShowingPassword">
          <button ref="pass" @click="displayUpadtePassword()">
            Update Password
          </button>
        </div>
      </div>
      <div v-if="displayPasswordSetting">
        <span @click="closeUpadtePassword()" class="cursor-pointer float-right">
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M10 0C15.53 0 20 4.47 20 10C20 15.53 15.53 20 10 20C4.47 20 0 15.53 0 10C0 4.47 4.47 0 10 0ZM13.59 5L10 8.59L6.41 5L5 6.41L8.59 10L5 13.59L6.41 15L10 11.41L13.59 15L15 13.59L11.41 10L15 6.41L13.59 5Z"
              fill="#0A4269"
            />
          </svg>
        </span>
        <update-password></update-password>
      </div>
      <div class="two-factor-box">
        <div>
          <h4>Two Factor Authentication</h4>
          <p>
            Two factor authentication enforced for all users within your domain.
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M11 7H9V5H11V7ZM11 15H9V9H11V15ZM10 0C8.68678 0 7.38642 0.258658 6.17317 0.761205C4.95991 1.26375 3.85752 2.00035 2.92893 2.92893C1.05357 4.8043 0 7.34784 0 10C0 12.6522 1.05357 15.1957 2.92893 17.0711C3.85752 17.9997 4.95991 18.7362 6.17317 19.2388C7.38642 19.7413 8.68678 20 10 20C12.6522 20 15.1957 18.9464 17.0711 17.0711C18.9464 15.1957 20 12.6522 20 10C20 8.68678 19.7413 7.38642 19.2388 6.17317C18.7362 4.95991 17.9997 3.85752 17.0711 2.92893C16.1425 2.00035 15.0401 1.26375 13.8268 0.761205C12.6136 0.258658 11.3132 0 10 0Z"
                fill="#0A4269"
              />
            </svg>
          </p>
        </div>
        <div v-if="!isShowingTwoFactor">
          <button @click="displayTwoFactorAuth()">Configure</button>
        </div>
      </div>
    </section>
    <div v-if="displayTwoFactor">
      <span @click="closeTwoFactor()" class="float-right">
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M10 0C15.53 0 20 4.47 20 10C20 15.53 15.53 20 10 20C4.47 20 0 15.53 0 10C0 4.47 4.47 0 10 0ZM13.59 5L10 8.59L6.41 5L5 6.41L8.59 10L5 13.59L6.41 15L10 11.41L13.59 15L15 13.59L11.41 10L15 6.41L13.59 5Z"
            fill="#0A4269"
          />
        </svg>
      </span>
      <TwoFactorAuth />
    </div>
    <password-policy v-model:visible="viewPolicy" />
  </main>
</template>

<script>
import UpdatePassword from "./UpdatePassword.vue";
import TwoFactorAuth from "./TwoFactorAuth.vue";
import PasswordPolicy from "./passwordpolicy.vue";

export default {
  name: "AccountSecurity",
  components: {
    UpdatePassword,
    TwoFactorAuth,
    PasswordPolicy,
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
      this.displayTwoFactor = false;
    },
    displayTwoFactorAuth() {
      this.displayPasswordSetting = false;
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
main {
  margin: 20px;
}

h3 {
  font-family: Inter;
  font-style: normal;
  font-weight: bold;
  font-size: 20px;
  line-height: 28px;
  color: #0a4269;
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
  border: 1px solid #0a4269;
  box-sizing: border-box;
  border-radius: 124px;
  font-family: Inter;
  font-style: normal;
  font-weight: bold;
  font-size: 16px;
  line-height: 24px;
  text-align: center;
  color: #0a4269;
  width: 200px;
  height: 50px;
}
.password-main,
.two-factor-box {
  display: flex;
  justify-content: space-between;
  margin: 50px 0px;
}
.password-main p a {
  color: #3454d1;
}
.update-password-button {
  background: #ec0868;
  border-radius: 124px;
  border: none;
}
</style>
