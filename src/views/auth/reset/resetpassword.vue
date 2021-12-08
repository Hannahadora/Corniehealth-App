<template>
  <auth>
    <password-reset v-if="step === 1" />
    <security-question v-if="step === 2" />
  </auth>
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";
import { Watch } from "vue-property-decorator";
import PasswordReset from "./passwordreset.vue";
import SecurityQuestion from "./securityquestion.vue";
import Confirmation from "./confirmation.vue";
import Auth from "../auth.vue";
type CreatedUser = { id: string; email: string };

@Options({
  components: {
    PasswordReset,
    SecurityQuestion,
    Confirmation,
    Auth,
  },
})
export default class SignUp extends Vue {
  user = {} as CreatedUser;
  code = "";
  private step: number = 1;

  userCreated = false;
  emailVerified = false;

  @Watch("user", { deep: true })
  userChanged(user: CreatedUser) {
    if (user.id) this.userCreated = true;
  }

  public section(data: string): void {
    this.step = parseInt(data);
  }
}
</script>
