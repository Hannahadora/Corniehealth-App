<template>
  <auth>
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
