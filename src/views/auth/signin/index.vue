<template>
  <auth>
    <template v-slot:text>
      <div v-if="userCreated || showText" :userCreated="userCreated"  :user="user" :showText="showText">
        <h2 class="text-3xl font-bold mb-3 text-white">
          You’ve successfully created an account
        </h2>
        <p class="text-white">
         Login to your account to get started
        </p>
      </div>
    </template>
    <template v-if="loggedIn">
      <two-factor v-if="twoFactor" />
      <recommendation v-else />
    </template>
    <sign-in v-else @logged-in="loggedIn = true"/>
  </auth>
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";
import { Prop, PropSync, Watch } from "vue-property-decorator";
import Auth from "../auth.vue";
import SignIn from "./signin.vue";
import Recommendation from "./recommedation.vue";
import TwoFactor from "./twofactor.vue";
import store from "@/store";
import { namespace } from "vuex-class";
type CreatedUser = { id: string; email: string };
const user = namespace("user");
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

  @Prop({type: Boolean })
  showText!: boolean;

  @PropSync("user", { required: false })
  userSync!: CreatedUser;
  user = {} as CreatedUser;

  userCreated = false;
  

  @Watch("user", { deep: true })
  userChanged(user: CreatedUser) {
    if (user.id) this.userCreated = true;
  }

  @user.Mutation
  setCornieData!: (data: any) => void;

  get twoFactor() {
    return (
      store.state.user.requiresTwoFactorAuth ||
      store.state.user.requiresSecurityQuestion
    );
  }
}
</script>
