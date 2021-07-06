<template>
  <auth>
    <template v-if="userCreated">
      <recommendation v-if="false" />
      <two-factor />
    </template>
    <sign-in v-else />
  </auth>
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";
import Auth from "../auth.vue";
import SignIn from "./signin.vue";
import Recommendation from "./recommedation.vue";
import TwoFactor from "./twofactor.vue";

@Options({
  components: {
    Auth,
    Recommendation,
    TwoFactor,
    SignIn,
  },
})
export default class BaseSignIn extends Vue {
  userCreated = false;
}
</script>
