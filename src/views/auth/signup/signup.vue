<template>
  <auth>
    <template v-slot:text>
      <div v-if="userCreated">
        <h2 class="text-3xl font-bold text-white">
          You’ve successfully created an account
        </h2>
        <p class="text-white">
          One last step and you are all good to go <br />
          An email with a verification code has been sent to you
        </p>
      </div>
    </template>
    <verify-activate v-if="userCreated" :user="user" />
    <create-account v-model:user="user" v-else />
  </auth>
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";
import CreateAccount from "./createaccount.vue";
import VerifyActivate from "./verify-activate.vue";
import { Watch } from "vue-property-decorator";
import Auth from "../auth.vue";

type CreatedUser = { id: string; email: string };

@Options({
  components: {
    CreateAccount,
    Auth,
    VerifyActivate,
  },
})
export default class SignUp extends Vue {
  user = {} as CreatedUser;

  userCreated = false;

  @Watch("user", { deep: true })
  userChanged(user: CreatedUser) {
    if (user.id) this.userCreated = true;
  }
}
</script>
