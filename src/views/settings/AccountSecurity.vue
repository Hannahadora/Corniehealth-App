<template>
  <main>
    <h3>Account Security</h3>
    <section class="acc-main">
      <div class="password-main">
        <div>
          <h4>Password</h4>
          <p>
            The same password strength are enforced for all users across the
            app. <a href=""> VIEW POLICY</a>
          </p>
        </div>
        <button ref="pass" @click="displayUpadtePassword()">
          Update Password
        </button>
      </div>
      <div v-if="displayPasswordSetting">
        <update-password></update-password>
      </div>
      <div class="two-factor">
        <div>
          <h4>Two Factor Authentication</h4>
          <p>
            Two factor authentication enforced for all users within your domain.
            <img
              src="../../assets/notification-icon.png"
              alt="icon for notification"
            />
          </p>
        </div>
        <button>Configure</button>
      </div>
    </section>
  </main>
</template>

<script>
import UpdatePassword from "@/views/settings/UpdatePassword.vue";

export default {
  name: "AccountSecurity",
  components: {
    UpdatePassword,
  },
  data() {
    return {
      displayPasswordSetting: false,
    };
  },
  methods: {
    displayUpadtePassword() {
      this.displayPasswordSetting = true;
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
.two-factor {
  display: flex;
  justify-content: space-between;
  margin: 50px 0px;
}
.password-main p a {
  color: #3454d1;
}
</style>
