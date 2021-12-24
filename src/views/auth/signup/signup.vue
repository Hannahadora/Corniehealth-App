<template>
  <auth>
    <create-account v-model:user="user" />
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

  user = {} as CreatedUser;

  userCreated = false;

  @Watch("user", { deep: true })
  userChanged(user: CreatedUser) {
    if (user.id) this.userCreated = true;
  }
}
</script>
