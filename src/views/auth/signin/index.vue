<template>
  <auth>
    <template v-if="loggedIn">
      <two-factor v-if="twoFactor" />
      <recommendation v-else />
    </template>
    <sign-in v-else @logged-in="loggedIn = true" />
  </auth>
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";
import Auth from "../auth.vue";
import SignIn from "./signin.vue";
import Recommendation from "./recommedation.vue";
import TwoFactor from "./twofactor.vue";
import store from "@/store";

@Options({
  components: {
    Auth,
    Recommendation,
    TwoFactor,
    SignIn,
  },
})
export default class BaseSignIn extends Vue {
  loggedIn = false;

  get twoFactor() {
    return (
      store.state.user.requiresTwoFactorAuth ||
      store.state.user.requiresSecurityQuestion
    );
  }
}
</script>
