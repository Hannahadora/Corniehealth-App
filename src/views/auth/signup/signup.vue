<template>
  <auth :step="user" :currentStep="currentStep" :type="type" areaPath="signup">
    <create-account v-model:user="user" @check-type="setType" @set-step="setCurrentStep" />
  </auth>
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";
import CreateAccount from "./createaccount/index.vue";
import VerifyActivate from "./createaccount/verify-activate.vue";
import { Prop, PropSync, Watch } from "vue-property-decorator";
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
  @Prop({ required: false, type: Boolean })
  showText!: boolean;

  // @Prop({ type: String, default:'' })
  // type!: String;

  user = {} as CreatedUser;
  type = "Patient";
  currentStep = 2;

  userCreated = false;

  @Watch("user", { deep: true })
  userChanged(user: CreatedUser) {
    if (user.id) this.userCreated = true;
  }
  setType(value: string) {
    this.type = value;
  }
  setCurrentStep(value: any) {
    this.currentStep = value;
  }
}
</script>
