<template>
  <auth>
    <verify-mail @nextStep="confirm" v-if="step === 1" />
    <confirmation
      @nextStep="reset"
      v-if="step === 2"
      :email="email"
    />
    <password-reset v-if="step === 3" 
      :code="code"
      :signature="signature"
    />
    <security-question v-if="step === 4" />
  </auth>
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";
import { Watch } from "vue-property-decorator";
import PasswordReset from "./passwordreset.vue";
import VerifyMail from "./verifymail.vue";
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
    VerifyMail,
  },
})
export default class SignUp extends Vue {
  user = {} as CreatedUser;
  code = "";
  private step: number = 1;
  signature = "";
  email = "";

  userCreated = false;
  emailVerified = false;

  @Watch("user", { deep: true })
  userChanged(user: CreatedUser) {
    if (user.id) this.userCreated = true;
  }

  public section(data: string): void {
    this.step = parseInt(data);
  }

  confirm(signature: any, email: any) {
    this.step = 2;
    this.signature = signature;
    this.email = email
  }

  reset(codeSync: any) {
    this.step = 3;
    this.code = codeSync;
  }
}
</script>
